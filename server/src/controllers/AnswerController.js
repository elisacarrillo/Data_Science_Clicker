import Controller from "./Controller";
import AnswerService from "./../services/AnswerService";
import Answer from "./../models/Answer";
const answerService = new AnswerService(Answer);

class AnswerController extends Controller {
  constructor(service) {
    super(service);
  }
}

export default new AnswerController(answerService);
