import axios from "axios";

const fetchTasks = async (id) => {
  const response = await axios.get(`/api/projects/${id}`);
  console.log(response);
  return response.data.resultList;
};

export const apiTask = {
  getTasks: fetchTasks,
  addTask: insertTask,
  removeTask: deleteTask,
  updateTask: updateTask,
};
