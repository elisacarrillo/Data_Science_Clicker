
const QuestionSchema = new Schema(
  {
    classroom: {
      type: Schema.Types.ObjectId,
      ref: "classrooms",
    },
    prompt: {
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
>>>>>>> 628cc6ee938601ab839a09e9cb5155234a7d6e92
      },
    },
    multipleChoiceAnswers: {
      type: [String],
      required: function () {
        return this.type === "multiple-choice";
      },
      validate: {
        validator: function (arr) {
          return this.type !== "multiple-choice" || arr.length === 5;
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
          return this.type !== "multiple-choice" || (num >= 0 && num <= 4);
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

const Question = mongoose.model("questions", QuestionSchema);

export default Question;
