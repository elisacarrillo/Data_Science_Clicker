// server/index.js

import http from "http";
import socketIO from "socket.io";
import cors from "cors";

import Question from "./src/models/Question";
import Answer from "./src/models/Answer";
import User from "./src/models/User";
import Classroom from "./src/models/Classroom";

import app from "./config/server";
import "./config/database";
import setRoutes from "./config/routes";

setRoutes(app);

const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  // Join a classroom
  socket.on("joinClassroom", (classroomId) => {
    socket.join(classroomId);
  });

  // Leave a classroom
  socket.on("leaveClassroom", (classroomId) => {
    socket.leave(classroomId);
  });

  // Update questions
  socket.on("updateQuestion", async (questionId, updates) => {
    const updatedQuestion = await Question.findByIdAndUpdate(
      questionId,
      updates,
      { new: true }
    );
    io.to(updatedQuestion.classroom).emit("questionUpdate", updatedQuestion);
  });

  // Submit a question
  socket.on("submitQuestion", async (questionData) => {
    const newQuestion = await new Question(questionData).save();
    io.to(newQuestion.classroom).emit("newQuestion", newQuestion);
  });

  // // Submit an answer
  // socket.on("submitAnswer", async (answerData) => {
  //   const newAnswer = await new Answer(answerData).save();
  //   io.to(newAnswer.classroom).emit("newAnswer", newAnswer);
  // });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
