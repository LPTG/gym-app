import axios from "axios";

const createWorkout = (user, workout) => {
  axios.post(`/api/users/${user}/workouts`, { username: user, workout }).then((res) => {
    console.log(res);
  });
};

const createTemplate = (user, template) => {
  axios.post(`/api/users/${user}/templates`, { username: user, template }).then((res) => {
    console.log(res);

    return res.data;
  });
};

const getWorkout = async (user, workoutId) => {
  return axios.get(`/api/users/${user}/workouts/${workoutId}`).then((res) => {
    if (res.status === 200) {
      return res.data;
    }

    // Case where workoutid is not a valid id

    // need handle errors
    return res.data;
  });
};

const getTemplate = async (user, templateId) => {
  return axios.get(`/api/users/${user}/templates/${templateId}`).then((res) => {
    return res.data;
  });
};

const updateWorkout = (user, workoutId, update) => {
  // Right now we're sending the entire workout/template as an update but
  // maybe we could use a lodash function to find the difference between the
  // original workout/template and the new one to only send the updated pieces
  axios.put(`/api/users/${user}/workouts/${workoutId}`, { update }).then((res) => {
    console.log(res);
  });
};

const updateTemplate = (user, templateId, update) => {
  axios.put(`/api/users/${user}/templates/${templateId}`, { update }).then((res) => {
    console.log(res);
  });
};

const deleteWorkout = (user, workoutId) => {
  axios.delete(`/api/users/${user}/workouts/${workoutId}`).then((res) => {
    console.log(res);
  });
};

const deleteTemplate = (user, templateId) => {
  axios.delete(`/api/users/${user}/templates/${templateId}`).then((res) => {
    console.log(res);
  });
};

export {
  createWorkout,
  createTemplate,
  getWorkout,
  getTemplate,
  updateWorkout,
  updateTemplate,
  deleteWorkout,
  deleteTemplate,
};
