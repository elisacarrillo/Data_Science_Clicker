import Controller from "./Controller";
import QuestionService from "./../services/QuestionService";
import Question from "./../models/Question";
const questionService = new QuestionService(Question);

class QuestionController extends Controller {
  constructor(service) {
    super(service);
  }

  insertQuestion = async (req, res) => {
    try {
      const result = await this.service.insertQuestion(req.body);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  getQuestions = async (req, res) => {
    try {
      const id = req.params._id;
      console.log("code: ", id)
      const result = await this.service.getQuestions(id);
      console.log("result: ", result)
      console.log(req.params)
      
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }

}



export default new QuestionController(questionService);
