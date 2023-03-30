import Controller from "./Controller";
import ClassroomService from "./../services/ClassroomService";
import Classroom from "./../models/Classroom";
const classroomService = new ClassroomService(new Classroom().getInstance());

class ClassroomController extends Controller {
    constructor(service) {
        super(service);
    }
    }

export default new ClassroomController(classroomService);
