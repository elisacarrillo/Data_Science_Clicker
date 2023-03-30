import express from "express";
const router = express.Router();

import QuestionController from "../controllers/QuestionController";

router.get(`/`, QuestionController.getAll);
router.post(`/`, QuestionController.insert);
router.put(`/:id`, QuestionController.update);
router.delete(`/:id`, QuestionController.delete);

export default router;
