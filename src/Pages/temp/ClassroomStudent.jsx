// ClassroomStudent.jsx

// import React, { useState, useEffect } from "react";
// import { Link, useParams, useLoaderData } from "react-router-dom";
// import socket from "../../socket";

// const ClassroomStudent = () => {
//   const { classroomId } = useParams();
//   const { classroomData, questionsData } = useLoaderData();
//   const [activeQuestion, setActiveQuestion] = useState(null);
//   const [submittedAnswer, setSubmittedAnswer] = useState(null);

//   useEffect(() => {
//     socket.emit("joinClassroom", classroomId);

//     socket.on("questionActivated", (data) => {
//       setActiveQuestion(data);
//     });

//     return () => {
//       socket.emit("leaveClassroom", classroomId);
//       socket.off("questionActivated");
//     };
//   }, [classroomId]);

//   return !classroomData ? (
//     <div>Loading...</div>
//   ) : (
//     <div>
//       <h1>{classroomData.name}</h1>
//       <h2>Join Code: {classroomData.joinCode}</h2>
//       <Link to="/">Back</Link>
//       {activeQuestion != null && <Question question={activeQuestion} />}
//     </div>
//   );
// };

// const Question = ({ question, submittedAnswer, setSubmittedAnswer }) => {
//   return (
//     <div>
//       <h1>{question.prompt}</h1>
//       {question.type == "multiple-choice" ? (
//         question.multipleChoiceAnswers.map((answer, index) => (
//           <div key={index}>
//             <input type="radio" value={answer} />
//             <label>{answer}</label>
//           </div>
//         ))
//       ) : (
//         <input
//           type="text"
//           value={submittedAnswer}
//           onChange={(e) => setSubmittedAnswer(e.target.value)}
//         />
//       )}
//     </div>
//   );
// };

// export default ClassroomStudent;

// ClassroomStudent.jsx

import React, { useState, useEffect } from "react";
import { Link, useParams, useLoaderData } from "react-router-dom";
import { useAuth } from "../../Helpers/AuthProvider";
import socket from "../../socket";
import { postAnswer } from "../../Services/api";

const ClassroomStudent = () => {
  const { classroomId } = useParams();
  const { user } = useAuth();
  const { classroomData, questionsData } = useLoaderData();
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [submittedAnswer, setSubmittedAnswer] = useState(null);

  useEffect(() => {
    socket.emit("joinClassroom", classroomId);

    socket.on("questionActivated", (data) => {
      setActiveQuestion(data);
    });

    return () => {
      socket.emit("leaveClassroom", classroomId);
      socket.off("questionActivated");
    };
  }, [classroomId]);

  const handleSubmitAnswer = async (answer) => {
    setSubmittedAnswer(answer);
    const answerData = {
      classroom: classroomData._id,
      question: activeQuestion._id,
      user: user,
      answer: answer,
    };
    await postAnswer(answerData);
    setSubmittedAnswer(null);
  };

  return !classroomData ? (
    <div>Loading...</div>
  ) : (
    <div>
      <h1>{classroomData.name}</h1>
      <h2>Join Code: {classroomData.joinCode}</h2>
      <Link to="/">Back</Link>
      {activeQuestion != null && (
        <Question
          question={activeQuestion}
          handleSubmitAnswer={handleSubmitAnswer}
        />
      )}
    </div>
  );
};

const Question = ({ question, handleSubmitAnswer }) => {
  return (
    <div>
      <h1>{question.prompt}</h1>
      {question.type === "multiple-choice" ? (
        <MultipleChoiceQuestion
          question={question}
          handleSubmitAnswer={handleSubmitAnswer}
        />
      ) : (
        <NumericInputQuestion
          question={question}
          handleSubmitAnswer={handleSubmitAnswer}
        />
      )}
    </div>
  );
};

const MultipleChoiceQuestion = ({ question, handleSubmitAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleChange = (e) => {
    setSelectedAnswer(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSubmitAnswer(selectedAnswer);
  };

  return (
    <form onSubmit={handleSubmit}>
      {question.multipleChoiceAnswers.map((answer, index) => (
        <div key={index}>
          <input
            type="radio"
            value={answer}
            checked={selectedAnswer === answer}
            onChange={handleChange}
          />
          <label>{answer}</label>
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

const NumericInputQuestion = ({ question, handleSubmitAnswer }) => {
  const [numericAnswer, setNumericAnswer] = useState("");

  const handleChange = (e) => {
    setNumericAnswer(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSubmitAnswer(numericAnswer);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={numericAnswer}
        onChange={handleChange}
        placeholder="Enter your answer"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ClassroomStudent;
