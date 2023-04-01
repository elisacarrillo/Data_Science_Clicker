import express from "express";
import ClassroomController from "../controllers/ClassroomController";
const classroomRouter = express.Router();

classroomRouter.get(`/`, ClassroomController.getAll);
classroomRouter.post(`/`    , ClassroomController.insert);
classroomRouter.put(`/:id`, ClassroomController.update);
classroomRouter.delete(`/:id`, ClassroomController.delete);
classroomRouter.post("/:classCode/student", ClassroomController.insertStudent);
// query that class code of student matches class code of classroom
// classroomRouter.get('/:id/student', ClassroomController.getAll);
classroomRouter.get("/:classCode/student", ClassroomController.getStudents);

export default classroomRouter;
