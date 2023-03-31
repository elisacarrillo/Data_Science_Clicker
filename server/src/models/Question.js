import mongoose, { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import slugify from "slugify";

class Question {
  initSchema() {
    const schema = new Schema(
      {
        prompt: {
          type: String,
          required: true,
        },
        code: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          required: true,
          enum: ["multiple-choice", "numeric"],
        },
        numericAnswer: {
          type: Number,
          required: function () {
            return this.type === "numeric";
          },
        },
        multipleChoiceAnswers: {
          type: [String],
          required: function () {
            return this.type === "multiple-choice";
          },
          validate: {
            validator: function (arr) {
              return true;
              //   return !arr || arr.length == 5;
            },
            message: "Multiple choice questions must have 5 answers.",
          },
        },
        correctAnswerIndex: {
          type: Number,
          required: function () {
            return this.type === "multiple-choice";
          },
          validate: {
            validator: function (num) {
              return true;
              //   return !num || (num >= 0 && num <= 4);
            },
            message: "Correct answer index must be between 0 and 4.",
          },
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

    schema.plugin(uniqueValidator);

    mongoose.model("questions", schema);
  }

  getInstance() {
    this.initSchema();
    return mongoose.model("questions");
  }
}

export default Question;
