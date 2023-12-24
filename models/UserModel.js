import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastAndMiddleNames: String,
  email: String,
  phoneNumber: String,
  associationName: String,
  associationCode: String,
  streetAddress: String,
  city: String,
  state: String,
  zipCode: String,
  password: String,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  avatar: String,
  avatarPublicId: String,
});

UserSchema.methods.toJSON = function () {
  let obj = this.toObject();
  delete obj.password;
  return obj;
};
export default mongoose.model("User", UserSchema);
