// ClassroomInstructor.jsx

import React, { useState, useEffect } from "react";
import { useParams, useLoaderData, Link } from "react-router-dom";
import { postQuestion } from "../../Services/api";
import socket from "../../socket";
import "./Classroom.css"

const ClassroomInstructorView = () => {
  const { classroomId } = useParams();
  const { classroomData, questionsData } = useLoaderData();
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [questions, setQuestions] = useState(questionsData);

  useEffect(() => {
    socket.emit("joinClassroom", classroomId);

    return () => {
      socket.emit("leaveClassroom", classroomId);
    };
  }, [classroomId]);

  const handlePostQuestion = async (questionData) => {
    const newQuestion = {
      classroom: classroomData._id,
      ...questionData,
    };

    await postQuestion(newQuestion);
    setQuestions([...questions, newQuestion]);
  };

  const toggleActiveQuestion = (id) => {
    setActiveQuestion(id);
    socket.emit(
      "activateQuestion",
      classroomData._id,
      questions.find((q) => q._id === id)
    );
  };

  return !classroomData ? (
    <div>Loading...</div>
  ) : (
    <div className="Classroom0">
        <div className="Content0">
        <h1>{classroomData.name}</h1>
        <h2>Instructor {classroomData.instructor}</h2>
        <h2>Join Code: {classroomData.joinCode}</h2>
        <Link to="/instructor">Back</Link>
        <QuestionsList
          questions={questions}
          activeQuestion={activeQuestion}
          toggleActiveQuestion={toggleActiveQuestion}
        />
        <CreateQuestionForm handlePostQuestion={handlePostQuestion} />
      </div>
    </div>
  );
};

const QuestionsList = ({ questions, activeQuestion, toggleActiveQuestion }) => {
  return (
    <>
      <h3>Questions</h3>
      <ul>
        {questions.map((question) => (
          <li
            key={question._id}
            onClick={() => toggleActiveQuestion(question._id)}
          >
            {question.prompt} {activeQuestion === question._id && "*"}
          </li>
        ))}
      </ul>
    </>
  );
};

const CreateQuestionForm = ({ handlePostQuestion }) => {
  const [questionType, setQuestionType] = useState("multiple-choice");
  const [questionPrompt, setQuestionPrompt] = useState("");
  const [numericAnswer, setNumericAnswer] = useState(0);
  const [choices, setChoices] = useState([""]);

  const addChoice = () => {
    setChoices([...choices, ""]);
  };

  const updateChoice = (index, value) => {
    const newChoices = [...choices];
    newChoices[index] = value;
    setChoices(newChoices);
  };

  const removeChoice = (index) => {
    setChoices(choices.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newQuestion = {
      type: questionType,
      prompt: questionPrompt,
      numericAnswer: numericAnswer,
      multipleChoiceAnswers: choices,
    };
    handlePostQuestion(newQuestion)
      .then(() => {
        setQuestionPrompt("");
        setNumericAnswer(0);
        setChoices([""]);
      })
      .catch((error) => {
        console.log(error);
        alert("Error creating question");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create a new question</h3>
      <select
        value={questionType}
        onChange={(e) => setQuestionType(e.target.value)}
      >
        <option value="multiple-choice">Multiple Choice</option>
        <option value="numeric-input">Numeric Input</option>
      </select>

      <input
        type="text"
        placeholder="Question prompt"
        value={questionPrompt}
        onChange={(e) => setQuestionPrompt(e.target.value)}
        required
      />

      {questionType === "multiple-choice" && (
        <>
          {choices.map((choice, index) => (
            <div key={`choice-${index}`}>
              <input
                type="text"
                value={choice}
                onChange={(e) => updateChoice(index, e.target.value)}
              />
              <button type="button" onClick={() => removeChoice(index)}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addChoice}>
            Add choice
          </button>
        </>
      )}

      {questionType === "numeric-input" && (
        <input
          type="number"
          value={numericAnswer}
          onChange={(e) => setNumericAnswer(e.target.value)}
        />
      )}

      <button type="submit">Add question</button>
    </form>
  );
};

export default ClassroomInstructorView;
