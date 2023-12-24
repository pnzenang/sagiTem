import { body, param, validationResult } from 'express-validator';
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from '../errors/customErrors.js';
import { DELEGATE_RECOMMENDATIONS, MEMBER_STATUS } from '../utils/constants.js';
import mongoose from 'mongoose';
import Member from '../models/MemberModel.js';
import User from '../models/UserModel.js';
import DeceasedMember from '../models/DeceasedMemberModel.js';

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);

        if (errorMessages[0].startsWith('no member')) {
          throw new NotFoundError(errorMessages);
        }
        if (errorMessages[0].startsWith('not authorized')) {
          throw new UnauthorizedError('not authorized to access this route');
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateMemberInput = withValidationErrors([
  // body("memberMatriculation")
  //   .notEmpty()
  //   .withMessage("member matriculation is required")
  //   .isLength({ min: 12, max: 12 }),

  body('associationName')
    .notEmpty()
    .withMessage('association name is required')
    .isLength({ min: 5 }),

  body('associationCode')
    .notEmpty()
    .withMessage('association code is required')
    .isLength({ min: 4, max: 4 }),

  body('lastAndMiddleNames')
    .notEmpty()
    .withMessage('last ans/or middle names are required'),
  body('dateOfBirth').notEmpty().withMessage('date of birth is required'),
  body('countryOfBirth').notEmpty().withMessage('country of birth is required'),
  body('memberStatus')
    .isIn(Object.values(MEMBER_STATUS))
    .withMessage('invalid status value'),
  body('delegateRecommendation')
    .isIn(Object.values(DELEGATE_RECOMMENDATIONS))
    .withMessage('invalid recommendation'),
]);

export const validateIdParam = withValidationErrors([
  param('id').custom(async (value, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new BadRequestError('invalid mongoDb id');

    const member = await Member.findById(value);
    if (!member) throw new NotFoundError(`no member with id ${value}`);

    const isAdmin = req.user.role === 'admin';
    const isOwner = req.user.userId === member.createdBy.toString();

    if (!isAdmin && !isOwner)
      throw new UnauthorizedError('not authorized to access this route');
  }),
]);

export const validateRegisterInput = withValidationErrors([
  body('lastAndMiddleNames')
    .notEmpty()
    .withMessage('last ans/or middle names are required'),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format')
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new BadRequestError('email already exists');
      }
    }),
  body('phoneNumber').notEmpty().withMessage('phone number required'),
  body('associationName')
    .notEmpty()
    .withMessage('association name is required'),
  body('associationCode')
    .notEmpty()
    .withMessage('association code is required')
    .isLength({ min: 4, max: 4 })
    .withMessage('association code should have 4 letters')
    .custom(async (associationCode) => {
      const user = await User.findOne({ associationCode });
      if (user) {
        throw new BadRequestError(
          `code ${associationCode} is already taken, choose another code`
        );
      }
    }),
  body('streetAddress').notEmpty().withMessage('street address is required'),
  body('city').notEmpty().withMessage('city is required'),
  body('state').notEmpty().withMessage('state is required'),
  body('zipCode')
    .notEmpty()
    .withMessage('zip code is required')
    .isLength({ min: 5, max: 5 })
    .withMessage('Zip code must be of 5 digits'),
  body('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 8 })
    .withMessage('password must be at least 8 characters long'),
]);

export const validateLoginInput = withValidationErrors([
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format'),

  body('password').notEmpty().withMessage('password is required'),
]);

export const validateUpdateUserInput = withValidationErrors([
  body('lastAndMiddleNames')
    .notEmpty()
    .withMessage('last ans/or middle names are required'),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format')
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.userId) {
        throw new BadRequestError('email already exists');
      }
    }),
  body('phoneNumber').notEmpty().withMessage('phone number required'),
  body('associationName')
    .notEmpty()
    .withMessage('association name is required'),
  body('associationCode')
    .notEmpty()
    .withMessage('association code is required')
    .isLength({ min: 4, max: 4 })
    .withMessage('association code should have 4 letters')
    .custom(async (associationCode, { req }) => {
      const user = await User.findOne({ associationCode });
      if (user && user._id.toString() !== req.user.userId) {
        throw new BadRequestError(
          `code ${associationCode} is already chosen, choose another code`
        );
      }
    }),
  body('streetAddress').notEmpty().withMessage('street address is required'),
  body('city').notEmpty().withMessage('city is required'),
  body('state').notEmpty().withMessage('state is required'),
  body('zipCode')
    .notEmpty()
    .withMessage('zip code is required')
    .isLength({ min: 5, max: 5 }),
]);

export const validateDeadMemberInput = withValidationErrors([
  body('deceasedMemberMatriculation')
    .notEmpty()
    .withMessage('amember matriculation is required')
    .isLength({ min: 12, max: 12 })
    .withMessage('association code should have 12 characters')
    .custom(async (deceasedMemberMatriculation) => {
      const member = await DeceasedMember.findOne({
        deceasedMemberMatriculation,
      });
      if (member) {
        throw new BadRequestError(
          `This death was already announced, Thank you`
        );
      }
    }),
]);
