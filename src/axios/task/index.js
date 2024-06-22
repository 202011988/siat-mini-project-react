import axios from "axios";

const fetchTasks = async (id) => {
  const response = await axios.get(`/api/projects/${id}`);
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

const updateTask = async (
  projectId,
  id,
  title,
  description,
  dueDate,
  status,
) => {
  const response = await axios.put(`/api/projects/${projectId}/tasks/${id}`, {
    title,
    description,
    dueDate,
    status,
  });

  console.log(response.data);
  return response.data;
};

const deleteTask = async (projectId, id) => {
  console.log(projectId);
  console.log(id);

  const response = await axios.delete(`/api/projects/${projectId}/tasks/${id}`);
  return response.data;
};

export const apiTask = {
  getTasks: fetchTasks,
  addTask: insertTask,
  removeTask: deleteTask,
  updateTask: updateTask,
};
