import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    netid: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      default: "Anonymous",
    },
    email: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      enum: ["student", "instructor"],
      default: "student",
    },
    classrooms: {
      type: [Schema.Types.ObjectId],
      ref: "classrooms",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("users", UserSchema);

export default User;
