import { StatusCodes } from 'http-status-codes';
import User from '../models/UserModel.js';
import Member from '../models/MemberModel.js';
import cloudinary from 'cloudinary';
import { promises as fs } from 'fs';

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  const userWithoutPassword = user.toJSON();
  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};
export const getRegistrationStats = async (req, res) => {
  const users = await User.countDocuments();
  const vestedMembers = await Member.countDocuments({ memberStatus: 'vested' });
  const pendingMembers = await Member.countDocuments({
    memberStatus: 'pending',
  });
  const confirmedMembers = await Member.countDocuments({
    delegateRecommendation: 'confirm',
  });
  const membersToRemove = await Member.countDocuments({
    delegateRecommendation: 'remove',
  });
  const membersToTransfer = await Member.countDocuments({
    delegateRecommendation: 'transfer',
  });
  const deceasedMembers = await Member.countDocuments({
    delegateRecommendation: 'deceased',
  });
  res.status(StatusCodes.OK).json({
    users,
    vestedMembers,
    pendingMembers,
    confirmedMembers,
    membersToRemove,
    membersToTransfer,
    deceasedMembers,
  });
};

export const adminGetAllMembers = async (req, res) => {
  // const adminMembers = await Member.find({});
  // res.status(StatusCodes.OK).json({ adminMembers });
  const {
    searchNames,
    searchCodes,
    memberStatus,
    delegateRecommendation,
    sort,
  } = req.query;
  const queryObject = {
    // createdBy: req.user.userId,
  };

  if (searchNames) {
    queryObject.$or = [
      { firstName: { $regex: searchNames, $options: 'i' } },
      { lastAndMiddleNames: { $regex: searchNames, $options: 'i' } },
      // { associationCode: { $regex: search, $options: 'i' } },
    ];
  }
  if (searchCodes) {
    queryObject.$or = [
      //   { firstName: { $regex: search, $options: 'i' } },
      //   { lastAndMiddleNames: { $regex: search, $options: 'i' } },
      { associationCode: { $regex: searchCodes, $options: 'i' } },
    ];
  }

  if (searchCodes && searchNames) {
    queryObject.$or = [
      { associationCode: { $regex: searchCodes, $options: 'i' } },
    ];
    queryObject.$or = [
      { associationCode: { $regex: searchNames, $options: 'i' } },
    ];
  }

  if (memberStatus && memberStatus !== 'all') {
    queryObject.memberStatus = memberStatus;
  }
  if (delegateRecommendation && delegateRecommendation !== 'all') {
    queryObject.delegateRecommendation = delegateRecommendation;
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

  const adminMembers = await Member.find(queryObject)
    .sort(sortKey)
    .skip(skip)
    .limit(limit);

  const totalMembers = await Member.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalMembers / limit);

  res
    .status(StatusCodes.OK)
    .json({ totalMembers, numOfPages, currentPage: page, adminMembers });
};
export const adminUpdateMember = async (req, res) => {
  // const member = await Member.findById(req.params.id);
  const updatedMember = await Member.findByIdAndUpdate(
    req.params.id,
    req.body,

    {
      new: true,
    }
  );
  res
    .status(StatusCodes.OK)
    .json({ msg: 'member modified', member: updatedMember });
};

export const deleteMember = async (req, res) => {
  const removedMember = await Member.findByIdAndDelete(req.params.id);

  res
    .status(StatusCodes.OK)
    .json({ msg: 'member deleted', member: removedMember });
};

export const updateUser = async (req, res) => {
  const newUser = { ...req.body };
  delete newUser.password;

  if (req.file) {
    const response = await cloudinary.v2.uploader.upload(req.file.path);
    await fs.unlink(req.file.path);
    newUser.avatar = response.secure_url;
    newUser.avatarPublicId = response.public_id;
  }

  const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser);

  if (req.file && updatedUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
  }

  res.status(StatusCodes.OK).json({ msg: 'user updated' });
};
