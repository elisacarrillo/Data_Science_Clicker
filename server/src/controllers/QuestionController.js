import Controller from "./Controller";
import QuestionService from "./../services/QuestionService";
import Question from "./../models/Question";
const questionService = new QuestionService(new Question().getInstance());

class QuestionController extends Controller {
  constructor(service) {
    super(service);
  }
}

export default new QuestionController(questionService);
