import mongoose from 'mongoose'
import { MEMBER_STATUS, DELEGATE_RECOMMENDATIONS } from '../utils/constants.js'

const MemberSchema = new mongoose.Schema(
  {
    memberMatriculation: {
      type: String,
    },
    associationName: String,
    associationCode: String,
    firstName: String,
    lastAndMiddleNames: String,
    comment: String,
    dateOfDeath: Date,
    placeOfDeath: String,
    dateOfBirth: Date,
    countryOfBirth: String,
    memberStatus: {
      type: String,
      enum: Object.values(MEMBER_STATUS),
      default: MEMBER_STATUS.PENDING,
    },
    delegateRecommendation: {
      type: String,
      enum: Object.values(DELEGATE_RECOMMENDATIONS),
      default: DELEGATE_RECOMMENDATIONS.CONFIRM,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
)

export default mongoose.model('Member', MemberSchema)
