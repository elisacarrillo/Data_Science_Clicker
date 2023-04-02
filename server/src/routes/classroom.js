import express from "express";
import ClassroomController from "../controllers/ClassroomController";
const classroomRouter = express.Router();

classroomRouter.get(`/`, ClassroomController.getAll);
classroomRouter.post(`/`, ClassroomController.insert);
classroomRouter.put(`/:id`, ClassroomController.update);
classroomRouter.delete(`/:id`, ClassroomController.delete);
classroomRouter.get(`/:id`, ClassroomController.getAll);
classroomRouter.post("/:classroomId/join", ClassroomController.insertStudent);
classroomRouter.get("/:classroomId/members", ClassroomController.getStudents);

export default classroomRouter;
