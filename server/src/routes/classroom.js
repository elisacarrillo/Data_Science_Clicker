import express from "express";
import cors from "cors";
const router = express.Router();
router.use(cors());

router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
    });





import ClassroomController from "../controllers/ClassroomController";

router.get(`/`, ClassroomController.getAll);
router.post(`/`, ClassroomController.insert);
router.put(`/:id`, ClassroomController.update);
router.delete(`/:id`, ClassroomController.delete);
router.post('/:id/student', ClassroomController.insertStudent);

export default router;

