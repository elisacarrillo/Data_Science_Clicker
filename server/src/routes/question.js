import express from "express";
import QuestionController from "../controllers/QuestionController";
const QuestionRouter = express.Router();

QuestionRouter.get(`/`, QuestionController.getAll);
QuestionRouter.post(`/`, QuestionController.insert);
QuestionRouter.put(`/:id`, QuestionController.update);
QuestionRouter.delete(`/:id`, QuestionController.delete);


QuestionRouter.get(`/`, QuestionController.getAll);
QuestionRouter.post(`/`, QuestionController.insert);
QuestionRouter.post('/:code', QuestionController.insertQuestion);
QuestionRouter.get('/:code', QuestionController.getQuestions);
QuestionRouter.put(`/:id`, QuestionController.update);
QuestionRouter.delete(`/:id`, QuestionController.delete);



export default QuestionRouter;

