import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getQuestions, getClassroom, postAnswer } from "../Services/api";

const ClassroomStartTest = ({
  isAuthenticated,
  setIsAuthenticated,
  user,
  setUser,
  classroomData,
  setClassroomData,
}) => {
  const navigateTo = useNavigate();
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [questionAnswerData, setQuestionAnswerData] = useState([]);

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
  }, [classroomData, id]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getQuestions(classroomData);
      if (response && response.data) {
        setQuestions(response.data);
        setQuestionAnswerData(
          response.data.map((question) => ({
            question: question,
            answer: null,
          }))
        );
      }
    };
    fetchData();
  }, [classroomData]);

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log("qd", questionAnswerData);
    questionAnswerData.forEach(async (datum) => {
      if (datum.answer) {
        const answerData = {
          question: datum.question._id,
          // user: user._id,
          answer: datum.answer,
          // isCorrect: false,
          classroomId: id,
        };
        const response = await postAnswer(answerData);
        if (!response) {
          alert("Failed to submit answers, please try again");
          return;
        }
        // console.log(response);
      }
    });
    alert("Submitted!");
    return;
    console.log("SUBMIT");
    for (var i = 0; i < questions.length; i++) {
      console.log(questions[i]._id);
      console.log(answers[i]);
      console.log(id);
      fetch("http://localhost:3000/api/answers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: questions[i]._id,
          answer: answers[i].answer,
          classroom: id,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          alert("Submitted " + i + "!");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const onChangingAnswer = (e) => {
    setQuestionAnswerData(
      questionAnswerData.map((datum, index) => {
        if (index == e.target.id) {
          datum.answer = e.target.value;
        }
        return datum;
      })
    );

    return;

    console.log("CHANGING ANSWER");
    console.log(e.target.value);
    console.log(e.target.id);
    var id = e.target.id;

    var answer = e.target.value;

    // push to answers array, update if id already exists
    //

    // check if id exists in answers array
    // if it does, update the answer
    // if it doesn't, push to answers array
    //

    if (answers[id] != undefined) {
      answers[id].answer = answer;
      setAnswers(answers);
      console.log("UPDATED ANSWER");
      console.log(answers);
      return;
    } else {
      setAnswers([...answers, { answer: answer }]);
    }
    console.log("PUSHED ANSWER");

    console.log(answers);
  };

  if (!classroomData) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  // TODO: make components for MCQ question and numeric question
  if (!questionAnswerData) {
    return (
      <div>
        <h1>Loading...</h1>
        {/* <button
          onClick={() => {
            console.log("class", classroomData);
            console.log("qadata", questionAnswerData);
          }}
        >
          test
        </button> */}
      </div>
    );
  }
  return (
    <div>
      <h1>{classroomData.name} Questions</h1>
      {!questionAnswerData.length && <div>No questions yet</div>}
      <ul>
        {questionAnswerData.length &&
          questionAnswerData.map((datum, index) => (
            <li key={index}>
              <p>{datum.question.prompt}</p>
              {datum.question.type == "numeric" && (
                <div>
                  <input
                    type="number"
                    name="answer"
                    id={index}
                    placeholder="Answer"
                    onChange={onChangingAnswer}
                  ></input>
                </div>
              )}
              {datum.question.type == "multiple-choice" && (
                <div>
                  <select
                    className="form-control"
                    id={index}
                    onChange={onChangingAnswer}
                  >
                    {datum.question.multipleChoiceAnswers.map(
                      (answerChoice) => (
                        <option>{answerChoice}</option>
                      )
                    )}
                  </select>
                </div>
              )}
            </li>
          ))}
      </ul>
      <br></br>
      <button onClick={onSubmit}>Submit</button>
      {/* <button
        onClick={() => {
          console.log("class", classroomData);
          console.log("qadata", questionAnswerData);
        }}
      >
        test
      </button> */}
    </div>
  );
};

export default ClassroomStartTest;
