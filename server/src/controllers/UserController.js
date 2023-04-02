import Controller from "./Controller";
import UserService from "../services/UserService";
import User from "../models/User";
const userService = new UserService(User);

import Classroom from "../models/Classroom";

class UserController extends Controller {
  constructor(service) {
    super(service);
    this.joinClassroom = this.joinClassroom.bind(this);
    this.getJoinedClassrooms = this.getJoinedClassrooms.bind(this);
  }

  async joinClassroom(req, res) {
    const { netid, joinCode } = req.body;
    try {
      const user = await User.findOne({ netid: netid });
      if (!user) {
        return res.status(404).json({
          message: "User not found.",
        });
      }

      const classroom = await Classroom.findOne({ joinCode: joinCode });
      if (!classroom) {
        return res.status(404).json({
          message: "Classroom not found.",
        });
      }

      if (
        user.classrooms.includes(classroom._id) &&
        classroom.students.includes(user._id)
      ) {
        return res.status(200).json({
          message: "User already in classroom.",
          classroom: classroom,
          user: user,
        });
      }

      if (!user.classrooms.includes(classroom._id)) {
        user.classrooms.push(classroom._id);
        await user.save();
      }

      if (!classroom.students.includes(user._id)) {
        classroom.students.push(user._id);
        await classroom.save();
      }

      return res.status(200).json({
        message: "User joined classroom.",
        classroom: classroom,
        user: user,
      });
    } catch (e) {
      res.status(500).json({
        message: "Internal Server Error",
        error: e.message,
      });
    }
  }

  async getJoinedClassrooms(req, res) {
    const { userId } = req.params;
    console.log("userId", userId);
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({
          message: "User not found.",
        });
      }

      const classroomObjs = await Classroom.find({
        _id: { $in: user.classrooms },
      });

      return res.status(200).json({
        message: "User joined classrooms.",
        classrooms: classroomObjs,
      });
    } catch (e) {
      res.status(500).json({
        message: "Internal Server Error",
        error: e.message,
      });
    }
  }
}

export default new UserController(userService);
