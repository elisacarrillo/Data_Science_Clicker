import express from "express";
import cors from "cors";
import QuestionController from "../controllers/QuestionController";
const router = express.Router();
router.use(cors());

router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
  });
  

router.get(`/`, QuestionController.getAll);
router.post(`/`, QuestionController.insert);
router.post('/:code', QuestionController.insertQuestion);
router.get('/:code', QuestionController.getQuestions);
router.put(`/:id`, QuestionController.update);
router.delete(`/:id`, QuestionController.delete);

export default router;
