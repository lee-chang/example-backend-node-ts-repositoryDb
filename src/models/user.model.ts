import { User } from "@/interfaces/entities/user.interface";
import { uuidDBGenerator } from "@/utils/UuidGenerator.util";
import { model, Schema } from "mongoose";

const userSchema: Schema = new Schema<User>({
  _id: {
    type: String,
    default: uuidDBGenerator.generate(),
  },
  userName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  authority: [{
    type: String,
    ref: "Role"
  }],
  fullName: {
    type: String,
    trim: true,
  }
},
{
  timestamps: true,
  versionKey: false,
});

const UserModel = model<User>("User", userSchema);
export default UserModel;
