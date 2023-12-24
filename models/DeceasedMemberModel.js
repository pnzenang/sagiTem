import mongoose from 'mongoose';
// import { MEMBER_STATUS, DELEGATE_RECOMMENDATIONS } from '../utils/constants.js';

const DeceasedMemberSchema = new mongoose.Schema(
  {
    deceasedAssociationName: String,
    deceasedAssociationCode: String,
    deceasedFirstName: String,
    deceasedLastAndMiddleNames: String,
    deceasedDateOfBirth: Date,
    deceasedCountryOfBirth: String,
    deceasedMemberStatus: String,
    deceasedRegistrationDate: String,
    deceasedDelegateRecommendation: String,
    comment: String,
    placeOfDeath: String,
    deceasedMemberMatriculation: String,
    dateOfDeath: Date,
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

export default mongoose.model('DeceasedMember', DeceasedMemberSchema);
