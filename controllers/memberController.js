import Member from '../models/MemberModel.js';
import { customAlphabet } from 'nanoid';
import { StatusCodes } from 'http-status-codes';
import User from '../models/UserModel.js';
import day from 'dayjs';
import mongoose from 'mongoose';
import DeceasedMember from '../models/DeceasedMemberModel.js';

const randomMatriculation = customAlphabet('1234567890', 6);

export const getAllMembers = async (req, res) => {
  const { searchNames, memberStatus, delegateRecommendation, sort } = req.query;
  const queryObject = {
    createdBy: req.user.userId,
  };
  const queryObject2 = {
    createdBy: req.user.userId,
    memberStatus: 'vested',
    delegateRecommendation: 'deceased',
  };

  if (searchNames) {
    queryObject.$or = [
      { firstName: { $regex: searchNames, $options: 'i' } },
      { lastAndMiddleNames: { $regex: searchNames, $options: 'i' } },
    ];
    queryObject2.$or = [
      { firstName: { $regex: searchNames, $options: 'i' } },
      { lastAndMiddleNames: { $regex: searchNames, $options: 'i' } },
    ];
  }

  if (memberStatus && memberStatus !== 'all') {
    queryObject.memberStatus = memberStatus;
  }
  if (memberStatus && memberStatus !== 'all') {
    queryObject2.memberStatus = memberStatus;
  }
  if (delegateRecommendation && delegateRecommendation !== 'all') {
    queryObject.delegateRecommendation = delegateRecommendation;
  }
  if (delegateRecommendation && delegateRecommendation !== 'all') {
    queryObject2.delegateRecommendation = delegateRecommendation;
  }

  const sortOptions = {
    newest: '-createdAt',
    oldest: 'createdAt',
    'a-z': 'lastAndMiddleNames',
    'z-a': '-lastAndMiddleNames',
  };

  const sortKey = sortOptions[sort] || sortOptions.newest;

  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const members = await Member.find(queryObject)
    .sort(sortKey)
    .skip(skip)
    .limit(limit);

  const membersForAnnouncement = await Member.find(queryObject2)
    .sort(sortKey)
    .skip(skip)
    .limit(limit);

  const totalMembers = await Member.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalMembers / limit);

  const totalMembers2 = await Member.countDocuments(queryObject2);
  const numOfPages2 = Math.ceil(totalMembers2 / limit);

  res.status(StatusCodes.OK).json({
    totalMembers,
    numOfPages,
    totalMembers2,
    numOfPages2,
    currentPage: page,
    members,
    membersForAnnouncement,
  });
};

//   const members = await Member.find({ createdBy: req.user.userId });
//   res.status(StatusCodes.OK).json({ members });
// };

export const createMember = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });

  req.body.createdBy = req.user.userId;
  req.body.associationName = user.associationName;
  req.body.associationCode = user.associationCode;

  req.body.memberMatriculation = `AS${user.associationCode.toLocaleUpperCase()}${randomMatriculation()}`;
  const member = await Member.create(req.body);

  res.status(StatusCodes.CREATED).json({ member });
};
export const createDeceasedMember = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });

  req.body.createdBy = req.user.userId;

  const deceasedMember = await DeceasedMember.create(req.body);

  res.status(StatusCodes.CREATED).json({ deceasedMember });
};
export const deleteMember = async (req, res) => {
  const removedMember = await Member.findByIdAndDelete(req.params.id);

  res
    .status(StatusCodes.OK)
    .json({ msg: 'member deleted', member: removedMember });
};

export const getMember = async (req, res) => {
  const member = await Member.findById(req.params.id);
  res.status(StatusCodes.OK).json({ member });
};

export const updateMember = async (req, res) => {
  const member = await Member.findById(req.params.id);
  const updatedMember = await Member.findByIdAndUpdate(
    req.params.id,
    req.body,
    { $set: (req.body.associationName = member.associationName) },
    { $set: (req.body.associationCode = member.associationCode) },
    { $set: (req.body.firstName = member.firstName) },
    { $set: (req.body.lastAndMiddleNames = member.lastAndMiddleNames) },
    { $set: (req.body.dateOfBirth = member.dateOfBirth) },
    { $set: (req.body.countryOfBirth = member.countryOfBirth) },
    { $set: (req.body.memberStatus = member.memberStatus) },
    {
      new: true,
    }
  );
  res
    .status(StatusCodes.OK)
    .json({ msg: 'member modified', member: updatedMember });
};

export const showStats = async (req, res) => {
  let stats = await Member.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$memberStatus', count: { $sum: 1 } } },
  ]);

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  console.log(stats);

  const defaultStats = {
    pending: stats.pending || 0,
    vested: stats.vested || 0,
  };

  let delegateStats = await Member.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$delegateRecommendation', count: { $sum: 1 } } },
  ]);

  delegateStats = delegateStats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  console.log(stats);

  const delegateDefaultStats = {
    confirm: delegateStats.confirm || 0,
    remove: delegateStats.remove || 0,
    transfer: delegateStats.transfer || 0,
    deceased: delegateStats.deceased || 0,
  };

  let monthlyApplications = await Member.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 12 },
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = day()
        .month(month - 1)
        .year(year)
        .format('MMM YY');
      return { date, count };
    })
    .reverse();

  // let monthlyApplications = [
  //   {
  //     date: "May 23",
  //     count: 12,
  //   },
  //   {
  //     date: "Jun 13",
  //     count: 15,
  //   },
  //   {
  //     date: "Jul 23",
  //     count: 24,
  //   },
  // ];
  res
    .status(StatusCodes.OK)
    .json({ defaultStats, monthlyApplications, delegateDefaultStats });
};
