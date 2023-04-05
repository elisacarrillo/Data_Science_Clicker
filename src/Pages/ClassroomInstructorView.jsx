import react, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getClassroom, postQuestion } from "../Services/api";

import "./ClassroomInstructorView.css";

const ClassroomInstructorView = ({
  isAuthenticated,
  setIsAuthenticated,
  user,
  setUser,
  classroomData,
  setClassroomData,
}) => {
  const { id } = useParams();

  const [tab, setTab] = useState("mcq");

  const handleTabChange = (tab) => {
    setTab(tab);
  };

  useEffect(() => {
    if (!classroomData) {
      const fetchData = async () => {
        const response = await getClassroom(id);
        if (response.data) {
          setClassroomData(response.data[0]);
        }
      };
      fetchData();
    }
  }, [classroomData]);

  const debugLog = () => {
    console.log(classroomData);
  };

  if (!classroomData) {
    return (
      <div className="container">
        <p>Loading Classroom...</p>
      </div>
    );
  }
  return (
    <div className="container">
      <h1>Welcome to {classroomData.name}</h1>
      <div>
        <div className="tabs">
          <button
            className={tab === "mcq" ? "active" : ""}
            onClick={() => handleTabChange("mcq")}
          >
            Create Multiple Choice Question
          </button>
          <button
            className={tab === "numeric" ? "active" : ""}
            onClick={() => handleTabChange("numeric")}
          >
            Create Numeric Input Question
          </button>
        </div>
        {tab === "mcq" && (
          <MultipleChoiceForm
            classroomData={classroomData}
            setClassroomData={setClassroomData}
          />
        )}
        {tab === "numeric" && (
          <NumericInputForm
            classroomData={classroomData}
            setClassroomData={setClassroomData}
          />
        )}
      </div>
    </div>
  );
};

export default ClassroomInstructorView;

const MultipleChoiceForm = ({ classroomData, setClassroomData }) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
  ]);

  const handleOptionTextChange = (index, text) => {
    const newOptions = [...options];
    newOptions[index].text = text;
    setOptions(newOptions);
  };

  const handleOptionIsCorrectChange = (index, isCorrect) => {
    const newOptions = [...options];
    newOptions[index].isCorrect = isCorrect;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(question, options);
    const questionData = {
      classroom: classroomData._id,
      prompt: question,
      type: "multiple-choice",
      multipleChoiceAnswers: options.map((option) => option.text),
      correctAnswerIndex: options.findIndex((option) => option.isCorrect),
    };
    console.log("questionData", questionData);
    const response = await postQuestion(questionData);
    console.log(response);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>MCQ Question</h1>
      <textarea
        rows="4"
        cols="50"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <div className="options">
        <h1>Options</h1>
        {options.map((option, index) => (
          <div className="option" key={index}>
            <h1>{["A", "B", "C", "D", "E"][index]}</h1>
            <div className="input-container">
              <textarea
                rows="4"
                cols="50"
                value={option.text}
                onChange={(e) => handleOptionTextChange(index, e.target.value)}
              />
              <input
                type="checkbox"
                name="option"
                value={index}
                checked={option.isCorrect}
                onChange={(e) =>
                  handleOptionIsCorrectChange(index, e.target.checked)
                }
              />
            </div>
          </div>
        ))}
      </div>
      <button type="submit">
        <h1>Submit</h1>
      </button>
    </form>
  );
};

const NumericInputForm = ({ classroomData, setClassroomData }) => {
  const [question, setQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(question, correctAnswer);
    const questionData = {
      classroom: classroomData._id,
      prompt: question,
      type: "numeric",
      numericAnswer: Number(correctAnswer),
    };
    const response = await postQuestion(questionData);
    // console.log(response);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Numeric Input Question</h1>
      <textarea
        rows="4"
        cols="50"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <h1>Answer</h1>
      <input
        type="number"
        name="answer"
        value={correctAnswer}
        onChange={(e) => setCorrectAnswer(e.target.value)}
        step=".01"
      />
      <button type="submit">
        <h1>Submit</h1>
      </button>
    </form>
  );
};

//   const [classId, setClassId] = useState("");
//   const [joinCode, setJoinCode] = useState("");
//   const [buttonVisible, setButtonVisible] = useState(false);
//   const [className, setClassName] = useState("");
//   const [classStarted, setClassStarted] = useState(false);
//   const [students, setStudents] = useState([]);
//   const [id, setId] = useState("");

//   useEffect(() => {
//     // get class code from url
//     const url = window.location.href;
//     const classId = url.substring(url.lastIndexOf("/") + 1);
//     setClassId(classId);
//     console.log(classId);

//     // fetch joinCode that matches classId
//     fetch("http://localhost:3000/api/classrooms?_id=" + classId, {
//       method: "GET",

//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("Success:", data);
//         setJoinCode(data.data[0].joinCode);
//         // setClassName(data.data.name);
//         // setId(data.data._id);
//         // setButtonVisible(true);
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   }, []);
//   const getStudents = async () => {
//     // get classes and find class id that matches class code
//     // get students in class
//     // set request mode to  no-cors
//     console.log(classId);
//     // get all users
//     fetch("http://localhost:3000/api/users?limit=0", {
//       method: "GET",
//       credentials: "include",

//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("Success:", data);
//         // get students in class
//         const students = data.data.filter((user) =>
//           user.classrooms.includes(classId)
//         );
//         console.log(students);
//         setStudents(students);
//         // set students
//         // setStudents(students);
//         // setButtonVisible(true);
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   };
//   const startClass = () => {
//     console.log("Start Class");
//     // get class code from url
//     const url = window.location.href;
//     const classCode = url.substring(url.lastIndexOf("/") + 1);
//     console.log(classId);
//     window.location.href = "/classroom/instructor/" + classId;
//   };
//   //  getStudents();

//   return (
//     <div className="container">
//       <p>Welcome to Classroom {joinCode}</p>
//       {/* map out students */}
//       <button onClick={getStudents}>Get Students</button>
//       <p>Joined Students: </p>
//       {/* <ul> */}
//       {students.map((student) => (
//         <p>{student.name}</p>
//       ))}

//       {/* </ul> */}
//       <button onClick={startClass}>Start Class</button>
//     </div>
//   );
