import mongoose from "mongoose";

export interface IUser {
    username: string;
    email: string;
    password: string;
    phone: string;
    _id?: string;
    refreshTokens?: string[];
  }
  
  const userSchema = new mongoose.Schema<IUser>({
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    refreshTokens: {
      type: [String],
      //required: false,
    },
  });
  
  export default mongoose.model<IUser>("User", userSchema);
