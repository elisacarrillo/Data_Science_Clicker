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
    classrooms: [
      {
        type: Schema.Types.ObjectId,
        ref: "classrooms",
        unique: true,
        sparse: true,
      },
    ],
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

// UserSchema.post("save", async function (doc) {
//   console.log("Saved User: ", doc);
//   if (this.isNew || this.isModified("classrooms")) {
//     const Classroom = mongoose.model("classrooms");
//     const classrooms = await Classroom.find({
//       _id: { $in: doc.classrooms },
//     });
//     const promises = [];

//     // Update classroom when user is added
//     doc.classrooms.forEach((classroomId) => {
//       if (!classrooms.includes(classroomId)) {
//         promises.push(
//           Classroom.updateOne(
//             { _id: classroomId },
//             {
//               $addToSet: { students: doc._id },
//             }
//           )
//         );
//       }
//     });

//     // Update classroom when user is removed
//     const oldUser = await User.findById(doc._id);
//     oldUser.classrooms.forEach((classroomId) => {
//       if (!doc.classrooms.includes(classroomId)) {
//         promises.push(
//           Classroom.updateOne(
//             { _id: classroomId },
//             {
//               $pull: { students: doc._id },
//             }
//           )
//         );
//       }
//     });

//     await Promise.all(promises);
//   }
// });

const User = mongoose.model("users", UserSchema);

export default User;
