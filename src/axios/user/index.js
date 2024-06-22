import axios from "axios";

const insertUser = async (email, password, nickname) => {
  const response = await axios.post(`/api/users`, {
    email,
    password,
    nickname,
  });
  return response.data;
};

export const apiUser = {
  addUser: insertUser,
};
