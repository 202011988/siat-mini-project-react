import axios from "axios";

const fetchTasks = async (id) => {
  const response = await axios.get(`/api/projects/${id}`);
  return response.data.resultList;
};

export const apiTask = {
  getTasks: fetchTasks,
};
