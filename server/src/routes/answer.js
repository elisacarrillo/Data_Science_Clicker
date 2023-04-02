import express from "express";
import AnswerController from "../controllers/AnswerController";
const AnswerRouter = express.Router();

AnswerRouter.get(`/`, AnswerController.getAll);
AnswerRouter.post(`/`, AnswerController.insert);
AnswerRouter.put(`/:id`, AnswerController.update);
AnswerRouter.delete(`/:id`, AnswerController.delete);

export default AnswerRouter;
