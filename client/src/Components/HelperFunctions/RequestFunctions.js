import axios from "axios";

const statusHandler = (res, code) => {
  if (code === 201 || code === 204) return "success";
  if (code === 200 || code === 400 || code === 403) return res.data;

  return res.data;
};

const createWorkout = async (user, workout) => {
  return axios.post(`/api/users/${user}/workouts`, { username: user, workout }).then((res) => {
    return statusHandler(res, res.status);
  });
};

const createTemplate = async (user, template) => {
  return axios.post(`/api/users/${user}/templates`, { username: user, template }).then((res) => {
    return statusHandler(res, res.status);
  });
};

const getWorkouts = async (user) => {
  return axios.get(`/api/users/${user}/workouts`).then((res) => {
    return statusHandler(res, res.status);
  });
};

const getWorkout = async (user, workoutId) => {
  return axios.get(`/api/users/${user}/workouts/${workoutId}`).then((res) => {
    return statusHandler(res, res.status);
  });
};

const getTemplates = async (user) => {
  return axios.get(`/api/users/${user}/templates`).then((res) => {
    return statusHandler(res, res.status);
  });
};

const getTemplate = async (user, templateId) => {
  return axios.get(`/api/users/${user}/templates/${templateId}`).then((res) => {
    return statusHandler(res, res.status);
  });
};

const updateWorkout = (user, workoutId, update) => {
  // Right now we're sending the entire workout/template as an update but
  // maybe we could use a lodash function to find the difference between the
  // original workout/template and the new one to only send the updated pieces
  return axios.put(`/api/users/${user}/workouts/${workoutId}`, { update }).then((res) => {
    return statusHandler(res, res.status);
  });
};

const updateTemplate = async (user, templateId, update) => {
  return axios.put(`/api/users/${user}/templates/${templateId}`, { update }).then((res) => {
    return statusHandler(res, res.status);
  });
};

const deleteWorkout = async (user, workoutId) => {
  return axios.delete(`/api/users/${user}/workouts/${workoutId}`).then((res) => {
    return statusHandler(res, res.status);
  });
};

const deleteTemplate = async (user, templateId) => {
  return axios.delete(`/api/users/${user}/templates/${templateId}`).then((res) => {
    return statusHandler(res, res.status);
  });
};

export {
  createWorkout,
  createTemplate,
  getWorkouts,
  getWorkout,
  getTemplates,
  getTemplate,
  updateWorkout,
  updateTemplate,
  deleteWorkout,
  deleteTemplate,
};
