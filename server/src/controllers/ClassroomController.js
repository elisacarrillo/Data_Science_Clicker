import Controller from "./Controller";
import ClassroomService from "./../services/ClassroomService";
import Classroom from "./../models/Classroom";
const classroomService = new ClassroomService(Classroom);

class ClassroomController extends Controller {
  constructor(service) {
    super(service);
  }
}

export default new ClassroomController(classroomService);
