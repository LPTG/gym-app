import { cloneDeep } from "lodash";

const addExerciseFunc = (exerciseState, setExercises) => {
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

  setExercises(updatedExercises);
};

// Removes the last exercise from the list of exercises
const removeExerciseFunc = (exerciseState, setExercises, exerciseID) => {
  const exerciseCopy = exerciseState.slice();

  //const exerciseIndex = exerciseCopy.findIndex((x) => x.id === exerciseID);

  setExercises(exerciseCopy);
};

const addSetFunc = (exerciseState, setExercises, exerciseID, wsrID) => {
  // Get index of current exercise
  const exerciseIndex = exerciseState.findIndex((x) => x.id === exerciseID);
  const wsrIndex = exerciseState[exerciseIndex].wsr.findIndex((x) => x.id === wsrID);

  // Who needs more than 10 sets?
  if (exerciseState[exerciseIndex].wsr.length >= 10) return exerciseState;

  // Copy the exercises array
  const exerciseCopy = exerciseState.slice();

  // Add a new set to the current exercise after the specified wsr
  exerciseCopy[exerciseIndex].wsr.splice(wsrIndex + 1, 0, {
    id: "wsr" + (wsrIndex + 2),
  });

  // Increment each wsr id after new wsr
  for (let i = wsrIndex + 2; i < exerciseCopy[exerciseIndex].wsr.length; i++) {
    exerciseCopy[exerciseIndex].wsr[i].id = "wsr" + (i + 1);
  }

  setExercises(exerciseCopy);
};

const removeSetFunc = (exerciseState, setExercises, exerciseID, wsrID) => {
  // Copy the exercises array
  const exerciseCopy = exerciseState.slice();

  // Get index of current exercise
  const exerciseIndex = exerciseCopy.findIndex((x) => x.id === exerciseID);
  const wsrIndex = exerciseCopy[exerciseIndex].wsr.findIndex((x) => x.id === wsrID);

  exerciseCopy[exerciseIndex].wsr.splice(wsrIndex, 1);

  for (let i = wsrIndex, x = 1; i < exerciseCopy[exerciseIndex].wsr.length; i++, x++) {
    exerciseCopy[exerciseIndex].wsr[i].id = "wsr" + (wsrIndex + x);
  }

  console.log(exerciseCopy[exerciseIndex].wsr);

  setExercises(exerciseCopy);
};

const handleDetailsChangeFunc = (event) => {
  // const target = event.target;
  // const value = target.value;
  // const name = target.name;
  // return { [name]: value };
  return event.target.value;
};

// const handleNameChangeFunc = (event) => {
//   // const target = event.target;
//   // const value = target.value;
//   return event.target.value;
// };

const handleExerciseChangeFunc = (setExercises, exerciseState, event) => {
  // Create a copy of the current state
  var stateCopy = cloneDeep(exerciseState);

  const target = event.target;

  // Find the index of the modified exercise name
  var exerciseIndex = stateCopy.findIndex((ex) => ex.id === target.id);

  stateCopy[exerciseIndex].name = target.value;

  setExercises(stateCopy);
};

const handleWSRChangeFunc = (setExercises, exerciseState, event) => {
  console.log(exerciseState);
  // Create a copy of the current state
  var stateCopy = cloneDeep(exerciseState);
  console.log(stateCopy);

  const target = event.target;
  console.log(target.id);

  const targetSplit = target.id.split("-");
  const exerciseID = targetSplit[0];
  const wsrID = targetSplit[1];

  // Find the index of the modified exercise name
  var exerciseIndex = stateCopy.findIndex((ex) => ex.id === exerciseID);

  // Find the index of the modified weight, set, or rep
  var wsrIndex = stateCopy[exerciseIndex].wsr.findIndex((wsr) => wsr.id === wsrID);

  // Update the value of the weight, set, or rep
  if (targetSplit[2] === "w") stateCopy[exerciseIndex].wsr[wsrIndex].weight = target.value;
  if (targetSplit[2] === "s") stateCopy[exerciseIndex].wsr[wsrIndex].sets = target.value;
  if (targetSplit[2] === "r") stateCopy[exerciseIndex].wsr[wsrIndex].reps = target.value;

  console.log(stateCopy);
  setExercises(stateCopy);
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
