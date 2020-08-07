import { cloneDeep } from "lodash";

const addExerciseFunc = (exerciseState) => {
  // Copy the exercises array
  const exercises = exerciseState.slice();

  // Create id for new exercise object
  const id = "exercise" + (exercises.length + 1);

  // Add a new exercise with a single set
  const updatedExercises = exercises.concat([
    {
      id: id,
      wsr: [{ id: "wsr1", weight: "", sets: "", reps: "" }],
    },
  ]);

  return updatedExercises;
};

// Removes the last exercise from the list of exercises
const removeExerciseFunc = (exerciseState, exerciseID) => {
  console.log(exerciseState);
  const exerciseCopy = exerciseState.slice();

  const exerciseIndex = exerciseCopy.findIndex((x) => x.id === exerciseID);
  console.log(exerciseCopy.splice(exerciseIndex, 1));

  console.log(exerciseCopy);

  return exerciseCopy;
};

const addSetFunc = (exerciseState, exerciseID) => {
  // Copy the exercises array
  const exerciseCopy = exerciseState.slice();

  // Get index of current exercise
  const exerciseIndex = exerciseCopy.findIndex((x) => x.id === exerciseID);

  // Who needs more than 10 sets?
  if (exerciseCopy[exerciseIndex].wsr.length >= 10) return exerciseCopy;

  // Add a new set to the current exercise
  exerciseCopy[exerciseIndex].wsr = exerciseCopy[exerciseIndex].wsr.concat([
    { id: "wsr" + (exerciseCopy[exerciseIndex].wsr.length + 1) },
  ]);

  return exerciseCopy;
};

const removeSetFunc = (exerciseState, exerciseID) => {
  // Copy the exercises array
  const exerciseCopy = exerciseState.slice();

  // Get index of current exercise
  const exerciseIndex = exerciseCopy.findIndex((x) => x.id === exerciseID);

  exerciseCopy[exerciseIndex].wsr = exerciseCopy[exerciseIndex].wsr.slice(0, -1);

  return exerciseCopy;
};

const handleDetailsChangeFunc = (event) => {
  const target = event.target;
  const value = target.value;
  const name = target.name;
  return { [name]: value };
};

const handleExerciseChangeFunc = (state, event) => {
  // Create a copy of the current state
  var stateCopy = cloneDeep(state);

  const target = event.target;

  // Find the index of the modified exercise name
  var exerciseIndex = stateCopy.exercises.findIndex((ex) => ex.id === target.id);

  stateCopy.exercises[exerciseIndex].name = target.value;

  return stateCopy;
};

const handleWSRChangeFunc = (state, event) => {
  // Create a copy of the current state
  var stateCopy = cloneDeep(state);

  const target = event.target;

  const targetSplit = target.id.split("-");
  const exerciseID = targetSplit[0];
  const wsrID = targetSplit[1];

  // Find the index of the modified exercise name
  var exerciseIndex = stateCopy.exercises.findIndex((ex) => ex.id === exerciseID);

  // Find the index of the modified weight, set, or rep
  var wsrIndex = stateCopy.exercises[exerciseIndex].wsr.findIndex((wsr) => wsr.id === wsrID);

  // Update the value of the weight, set, or rep
  if (targetSplit[2] === "w")
    stateCopy.exercises[exerciseIndex].wsr[wsrIndex].weight = target.value;
  if (targetSplit[2] === "s") stateCopy.exercises[exerciseIndex].wsr[wsrIndex].sets = target.value;
  if (targetSplit[2] === "r") stateCopy.exercises[exerciseIndex].wsr[wsrIndex].reps = target.value;

  return stateCopy;
};

export {
  addExerciseFunc,
  removeExerciseFunc,
  addSetFunc,
  removeSetFunc,
  handleDetailsChangeFunc,
  handleExerciseChangeFunc,
  handleWSRChangeFunc,
};
