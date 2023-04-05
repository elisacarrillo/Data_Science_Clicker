import Service from "./Service";
// const { Types } = this.model.mongoose;

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

  // getQuestions = async (code) => {
  //   try {
  //     console.log("getting questions for code: ", code);
  //     // console.log(this.model.getAll({_id: code}));
  //     const result = await this.model.getAll({_id: code});
      
  //     console.log("result: ", result)
  //     return result;
  //   }
  //   catch (error) {
  //     throw error;
  //   }

  // }
  getQuestions = async (id) => {
    try {
      console.log("getting questions for code : ", id);
      
      // console.log("got types: ", Types);
      // const query = { _id: Types.ObjectId(code) };
      // console.log("query: ", query)
      const result = await this.getAll({classroom: id});
      console.log("result: ", result);
      return result;
    } catch (error) {
      throw error;
    }
  };
  


}

export default QuestionService;
