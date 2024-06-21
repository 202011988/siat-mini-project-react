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
  const response = await axios.delete(`/api/projects/${id}`);
  return response.data;
};

const updateProject = async (id, name, description) => {
  console.log({
    name,
    description,
  });

  const response = await axios.put(`/api/projects/${id}`, {
    name,
    description,
  });

  return response.data;
};

export const apiProject = {
  getProjects: fetchProjects,
  addProject: insertProject,
  removeProject: deleteProject,
  updateProject: updateProject,
};
