import QuestionRouter from "../src/routes/question";

export default (server) => {
  server.use(`/api/question`, QuestionRouter);
};
