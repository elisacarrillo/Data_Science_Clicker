import mongoose, { Schema } from "mongoose";

const AnswerSchema = new Schema(
  {
    question: {
      type: Schema.Types.ObjectId,
      ref: "questions",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      // required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    isCorrect: {
      type: Boolean,
      // required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    classroomId: {
      type: Schema.Types.ObjectId,
      ref: "classrooms",
      required: true,

    },
  },
  { timestamps: true }
);

const Answer = mongoose.model("answers", AnswerSchema);

export default Answer;
