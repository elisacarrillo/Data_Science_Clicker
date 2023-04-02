import mongoose, { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const ClassroomSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    instructor: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    joinCode: {
      type: String,
      required: true,
      unique: true,
    },
    students: {
      type: [Schema.Types.ObjectId],
      ref: "users",
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

ClassroomSchema.plugin(uniqueValidator);
const Classroom = mongoose.model("classrooms", ClassroomSchema);

export default Classroom;
