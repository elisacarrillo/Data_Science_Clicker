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
    students: [{ type: Schema.Types.ObjectId, ref: "users" }],
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

ClassroomSchema.pre("save", async function (next) {
  try {
    if (this.isNew || this.isModified("students")) {
      const User = mongoose.model("users");
      const students = await User.find({ _id: { $in: this.students } });

      const promises = [];

      // Update user when added to class
      students.forEach((student) => {
        if (!student.classrooms.includes(this._id)) {
          promises.push(
            User.updateOne(
              { _id: student._id },
              {
                $addToSet: { classrooms: this._id },
              }
            )
          );
        }
      });

      // Update user when removed from class
      const oldClassroom = await this.constructor.findById(this._id);
      oldClassroom.students.forEach((studentId) => {
        if (!this.students.includes(studentId)) {
          promises.push(
            User.updateOne(
              { _id: studentId },
              {
                $pull: { classrooms: this._id },
              }
            )
          );
        }
      });

      await Promise.all(promises);
    }
  } catch (err) {
    next(err);
  }
});

ClassroomSchema.plugin(uniqueValidator);
const Classroom = mongoose.model("classrooms", ClassroomSchema);

export default Classroom;
