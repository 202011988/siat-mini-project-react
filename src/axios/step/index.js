import axios from "axios";

const fetchSteps = async (taskId) => {
  const response = await axios.get(`/api/steps/`, {
    params: {
      taskId: taskId,
    },
  });

  return response.data;
};

const insertStep = async (taskId, title, description) => {
  const response = await axios.post(`/api/steps/${taskId}`, {
    title,
    description,
  });
  return response.data;
};

const deleteStep = async (id) => {
  const response = await axios.delete(`/api/steps/${id}`);
  return response.data;
};

export const apiStep = {
  getSteps: fetchSteps,
  addStep: insertStep,
  removeStep: deleteStep,
};
