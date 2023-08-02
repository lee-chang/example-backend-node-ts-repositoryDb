import { ROL, User } from "@/interfaces/user.interface";
import { uuidV4Generator } from "@/utils/UuidV4Generator.util";
import { model, Schema } from "mongoose";

const userSchema: Schema = new Schema<User>({
  _id: {
    type: String,
    default: uuidV4Generator.generate(),
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
  authority: {
    type: String,
    default: ROL.USER,
    require: true,
  },
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
