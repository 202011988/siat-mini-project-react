import axios from "axios";

const fetchProjects = async () => {
  const response = await axios.get("/api/projects");
  return response.data;
};

const insertProject = async (name, description) => {
  const response = await axios.post("/api/projects", { name, description });
  return response.data;
};

const deleteProject = async (id) => {
  await axios.delete(`/api/projects/${id}`);
};

const updateProject = async (id, name, description) => {
  await axios.put(`/api/projects/${id}`, { name, description });
};

export const apiProject = {
  getProjects: fetchProjects,
  addProject: insertProject,
  removeProject: deleteProject,
  updateProject: updateProject,
};
