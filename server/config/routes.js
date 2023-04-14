import UserRouter from "../src/routes/user";
import ClassroomRouter from "../src/routes/classroom";
import QuestionRouter from "../src/routes/question";
import AnswerRouter from "../src/routes/answer";

export default function setRoutes(server) {
  server.use("/api/users", UserRouter);
  server.use("/api/classrooms", ClassroomRouter);
  server.use("/api/questions", QuestionRouter);
  server.use("/api/answers", AnswerRouter);
}
