import BASE_URL from "./baseUrl";
import axios from "axios";

export const joinClassroom = async (joinCode, netid) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/classrooms?joinCode=${joinCode}`,
      { netid },
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
    const response = await axios.get(`${BASE_URL}/api/users?_id=${studentId}`);
    const student = response.data;
    return student.classrooms;
  } catch (error) {
    alert(error);
    return false;
  }
};
