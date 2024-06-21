import axios from "axios";

const fetchTasks = async (id) => {
  const response = await axios.get(`/api/projects/${id}`);
  return response.data.tasks;
};

export const apiTask = {
  getTasks: fetchTasks,
};
