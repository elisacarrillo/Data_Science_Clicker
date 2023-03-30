import Controller from "./Controller";
import ClassroomService from "./../services/ClassroomService";
import Classroom from "./../models/Classroom";
const classroomService = new ClassroomService(new Classroom().getInstance());

class ClassroomController extends Controller {
    constructor(service) {
        super(service);
    }

    // define new method for inserting student into classroom
    insertStudent = async (req, res) => {
        try {
            const { id } = req.params;
            
            console.log("req.body.name: ",req.body.name)
            const { code, name } = req.body;
            console.log("code: ", code)
            console.log("student ID: ", name)
            const classroom = await this.service.insertStudent(id, name);
            res.status(200).json(classroom);
        } catch (error) {
            res.status(500).json(error);
        }

    

    }
    }

export default new ClassroomController(classroomService);
