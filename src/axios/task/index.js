import axios from "axios";

const fetchTasks = async (id) => {
  const response = await axios.get(`/api/projects/${id}`);
  console.log(response);
  return response.data.resultList;
};

const insertTask = async (projectId, title, description, dueDate, status) => {
  const response = await axios.post(`/api/projects/${projectId}`, {
    title,
    description,
    dueDate,
    status,
  });
  return response.data;
};

const updateTask = async () => {};

const deleteTask = async (id) => {};

export const apiTask = {
  getTasks: fetchTasks,
  addTask: insertTask,
  removeTask: deleteTask,
  updateTask: updateTask,
};
