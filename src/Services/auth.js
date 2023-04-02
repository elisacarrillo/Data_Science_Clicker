import BASE_URL from "./baseUrl";
import axios from "axios";

export const checkAuth = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/auth/isAuthenticated`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    alert(error);
    return false;
  }
};

export const login = async (netid) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/auth/login`,
      { netid },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    alert(error);
    return false;
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/logout`, null, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    alert(error);
    return false;
  }
};
