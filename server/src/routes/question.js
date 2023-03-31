import express from "express";
import QuestionController from "../controllers/QuestionController";
const QuestionRouter = express.Router();

QuestionRouter.get(`/`, QuestionController.getAll);
QuestionRouter.post(`/`, QuestionController.insert);
QuestionRouter.put(`/:id`, QuestionController.update);
QuestionRouter.delete(`/:id`, QuestionController.delete);

export default QuestionRouter;
