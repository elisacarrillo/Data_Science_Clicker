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
    return false;
  }
};

export const getStudents = async (classroom) => {
  // array of studentIds
  const studentIds = classroom.students;
  try {
    // for each id in studentIds, fetch student object and return in in complete array
    const response = await Promise.all(
      studentIds.map(async (studentId) => {
        const response = await axios.get(
          `${BASE_URL}/api/users?_id=${studentId}&limit=1`,
          { withCredentials: true }
        );
        return response.data[0];
      })
    );
    return response;
  } catch (error) {
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
    return false;
  }
};

export const getQuestions = async (classroom) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/questions?classroom=${classroom._id}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return false;
  }
};

export const postAnswer = async (answer) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/answers`,
      { ...answer },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return false;
  }
};

export const getAnswerDataCSV = async (questionId) => {
  return;
  // TODO: Implement /questions/:qid/answerDataCSV endpoint
  try {
    const response = await axios.get(
      `${BASE_URL}/api/questions/${questionId}/answerDataCSV`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return false;
  }
};
