import BASE_URL from "./baseUrl";
import axios from "axios";

export const joinClassroom = async (joinCode, netid) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/users/joinClassroom`,
      { netid, joinCode },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    alert(error);
    return false;
  }
};

export const createClassroom = async (joinCode, instructorId, name) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/classrooms`,
      { joinCode, instructor: instructorId, name, students: [instructorId] },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    alert(error);
    return false;
  }
};

export const getCreatedClassrooms = async (instructorId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/classrooms?instructor=${instructorId}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    alert(error);
    return false;
  }
};

export const getJoinedClassrooms = async (studentId) => {
  try {
    // get student by id
    const response = await axios.get(
      `${BASE_URL}/api/users/${studentId}/joinedClassrooms`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    alert(error);
    return false;
  }
};

export const getClassroom = async (classroomId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/classrooms?_id=${classroomId}&limit=1`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    alert(error);
    return false;
  }
};

export const postQuestion = async (question) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/questions`,
      { ...question },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    alert(error);
    return false;
  }
};
