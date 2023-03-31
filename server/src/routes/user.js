import express from "express";
import UserController from "../controllers/UserController";
const UserRouter = express.Router();

UserRouter.get(`/`, UserController.getAll);

/*
already implemented in auth.js
UserRouter.post(`/`, UserController.insert);
*/

// UserRouter.get(`/:id`, UserController.getAll({ _id: req.params.id }));
UserRouter.get(`/:id`, UserController.getAll);
UserRouter.put(`/:id`, UserController.update);
UserRouter.delete(`/:id`, UserController.delete);

export default UserRouter;
