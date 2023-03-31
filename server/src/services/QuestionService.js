import Service from "./Service";

class QuestionService extends Service {
  constructor(model) {
    super(model);
  }

  insertQuestion = async (question) => {
    try {
      const result = await this.model.create(question);
      return result;
    } catch (error) {
      throw error;



    }

  

  }

}

export default QuestionService;
