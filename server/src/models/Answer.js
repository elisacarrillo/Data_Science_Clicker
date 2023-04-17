// models/Answer.js

import mongoose, { Schema } from "mongoose";

const AnswerSchema = new Schema(
  {
    classroom: {
      type: Schema.Types.ObjectId,
      ref: "classrooms",
      required: true,
    },
    question: {
      type: Schema.Types.ObjectId,
      ref: "questions",
      required: true,
    },
    user: {
      type: String,
    },
    answer: {
      type: String,
      required: true,
    },
    isCorrect: {
      type: Boolean,
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

const Answer = mongoose.model("answers", AnswerSchema);

export default Answer;
