import axios from "axios";

const insertUser = async (email, password, nickname) => {
  const response = await axios.post(`/api/users`, {
    email,
    password,
    nickname,
  });
  return response.data;
};

const loginUser = async (email, password) => {
  const response = await axios.post(`/api/login`, { email, password });
  return response.data;
};

const logoutUser = async () => {
  const response = await axios.post(`/api/logout`);
  return response.data;
};

export const apiUser = {
  addUser: insertUser,
  login: loginUser,
  logout: logoutUser,
};
