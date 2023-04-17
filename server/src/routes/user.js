import express from "express";
import UserController from "../controllers/UserController";
const UserRouter = express.Router();

UserRouter.get(`/`, UserController.getAll);
UserRouter.put(`/:id`, UserController.update);
UserRouter.delete(`/:id`, UserController.delete);

// UserRouter.post(`/joinClassroom`, UserController.joinClassroom);
// UserRouter.get(`/:userId/joinedClassrooms`, UserController.getJoinedClassrooms);

// TODO: Implement this route
// UserRouter.get(`/:id`, UserController.getAll);

// Handled by auth middleware
// UserRouter.post(`/`, UserController.insert);

export default UserRouter;
