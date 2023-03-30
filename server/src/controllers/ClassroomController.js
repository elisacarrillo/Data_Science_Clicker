import Controller from "./Controller";
import ClassroomService from "./../services/ClassroomService";
import Classroom from "./../models/Classroom";
const classroomService = new ClassroomService(new Classroom().getInstance());

class ClassroomController extends Controller {
    constructor(service) {
        super(service);
    }
    
    getStudents = async (req, res) => {
        console.log("getting students");
        try {
            const { classCode } = req.params;
            console.log("code: ", classCode)
            // trim last char of classCode
            // const classCode2 = classCode.slice(0, -1);
            
            // pass a query 
            const classroom = await this.service.getAll( { code: classCode });
            console.log("students: " + classroom.data[0].student)
            console.log(classroom);
            res.status(200).json(classroom.data[0].student);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    // define new method for inserting student into classroom
    insertStudent = async (req, res) => {
        try {
            
            console.log("code: ", code)
            console.log(req);
            
            console.log("req.body.name: ",req.body.name)
            console.log("req.body.code: ",req.body.code)
            const { code } = req.body.code;
            const { name } = req.body.name;
            // const { code2, name } = req.body;
            
            
            const classroom = await this.service.insertStudent(req.body.code, req.body.name);
            res.status(200).json(classroom);
        } catch (error) {
            res.status(500).json(error);
        }

    

    }
    }

export default new ClassroomController(classroomService);
