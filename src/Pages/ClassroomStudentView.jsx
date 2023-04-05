import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { getClassroom } from "../Services/api";

/* NOTE: This page has horrible naming, needs to be fixed */
const ClassroomStudentView = ({
  isAuthenticated,
  setIsAuthenticated,
  user,
  setUser,
  classroomData,
  setClassroomData,
}) => {
  const navigateTo = useNavigate();
  const { id } = useParams();
  const gotoQuestions = () => {
    navigateTo(`/classroom/${id}/student/start_test`);
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

  if (!classroomData) {
    return <div>Loading...</div>;
  }
  return (
    <div className="App">
      <p>You have successfully joined class {classroomData.name}</p>
      <button onClick={gotoQuestions}>Start Answering Questions!</button>
    </div>
  );
};

export default ClassroomStudentView;
