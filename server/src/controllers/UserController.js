import Controller from "./Controller";
import UserService from "../services/UserService";
import User from "../models/User";
const userService = new UserService(User);

import Classroom from "../models/Classroom";

class UserController extends Controller {
  constructor(service) {
    super(service);
    this.joinClassroom = this.joinClassroom.bind(this);
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
        return res.status(400).json({
          message: "User already in classroom.",
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
