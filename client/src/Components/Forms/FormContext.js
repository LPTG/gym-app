// https://kentcdodds.com/blog/how-to-use-react-context-effectively
import React from "react";

const FormStateContext = React.createContext();
const FormDispatchContext = React.createContext();

const initialState = {
  name: "",
  desc: "",
  exercises: ["ex1"],
  exercisesById: { ex1: { name: "", namePlaceholder: "", wsr: ["ex1-wsr1"], wsrCount: 1 } },
  wsrById: { "ex1-wsr1": { weight: "", weightPH: "", sets: "", setsPH: "", reps: "", repsPH: "" } },
  exerciseCount: 1,
};

const initialWsrState = { weight: "", weightPH: "", sets: "", setsPH: "", reps: "", repsPH: "" };

function formReducer(state, action) {
  switch (action.type) {
    case "workout_name_change":
      return { ...state, name: action.value };
    case "desc_change":
      return { ...state, desc: action.value };
    case "exercise_name_change":
      const stateCopy = { ...state, exercisesById: { ...state.exercisesById } };
      const updatedExercise = { ...state.exercisesById[action.id] };
      updatedExercise.name = action.value;
      stateCopy.exercisesById[action.id] = updatedExercise;
      return stateCopy;
    case "weight_change":
      const stateCopyW = { ...state, wsrById: { ...state.wsrById } };
      const newWsrW = { ...state.wsrById[action.id] };
      newWsrW.weight = action.value;
      stateCopyW.wsrById[action.id] = newWsrW;
      return stateCopyW;
    case "set_change":
      const stateCopyS = { ...state, wsrById: { ...state.wsrById } };
      const newWsrS = { ...state.wsrById[action.id] };
      newWsrS.sets = action.value;
      stateCopyS.wsrById[action.id] = newWsrS;
      return stateCopyS;
    case "rep_change":
      const stateCopyR = { ...state, wsrById: { ...state.wsrById } };
      const newWsrR = { ...state.wsrById[action.id] };
      newWsrR.reps = action.value;
      stateCopyR.wsrById[action.id] = newWsrR;
      return stateCopyR;
    case "add_exercise":
      const stateCopyForAdd = {
        ...state,
        exercisesById: { ...state.exercisesById },
        wsrById: { ...state.wsrById },
      };

      stateCopyForAdd.exerciseCount++;

      // Create new exercise id and initial exercise
      const newExerciseId = "ex" + stateCopyForAdd.exerciseCount;
      const initialWsrId = newExerciseId + "-wsr1";
      const newExercise = { name: "", namePlaceholder: "", wsr: [initialWsrId] };

      // Add exercise to exercises array and to exercisesById
      stateCopyForAdd.exercises.push(newExerciseId);
      stateCopyForAdd.exercisesById[newExerciseId] = newExercise;

      // Set initial sate of wsrCount and wsrById for current exercise
      stateCopyForAdd.exercisesById[newExerciseId].wsrCount = 1;
      stateCopyForAdd.wsrById[initialWsrId] = { ...initialWsrState };

      return stateCopyForAdd;
    case "remove_exercise":
      if (!state.exercises.includes(action.id)) return state;

      const stateCopyForRemove = {
        ...state,
        exercisesById: { ...state.exercisesById },
        wsrById: { ...state.wsrById },
      };

      // Remove all wsr from wsrById for the given exercise id
      const wsrToRemove = stateCopyForRemove.exercisesById[action.id].wsr;
      wsrToRemove.forEach((wsr) => {
        delete stateCopyForRemove.wsrById[wsr];
      });

      // Delete the exercise from exercisesById
      delete stateCopyForRemove.exercisesById[action.id];

      // Delete the exercise from exercises array
      const exerciseIndex = stateCopyForRemove.exercises.findIndex((x) => x === action.id);
      stateCopyForRemove.exercises.splice(exerciseIndex, 1);

      return stateCopyForRemove;
    case "add_set":
      const stateCopyForAddSet = {
        ...state,
        exercisesById: { ...state.exercisesById },
        wsrById: { ...state.wsrById },
      };

      // Create new wsr id
      const wsrCount = ++stateCopyForAddSet.exercisesById[action.parent].wsrCount;
      const newWsrId = action.parent + "-wsr" + wsrCount;

      // Find index of wsr to insert after
      const wsrIndex = stateCopyForAddSet.exercisesById[action.parent].wsr.indexOf(action.id);

      // Insert new wsrId after given wsr
      stateCopyForAddSet.exercisesById[action.parent].wsr.splice(wsrIndex + 1, 0, newWsrId);

      // Set new wsrById to initial wsr state
      stateCopyForAddSet.wsrById[newWsrId] = initialWsrState;

      return stateCopyForAddSet;
    case "remove_set":
      const stateCopyForRemoveSet = {
        ...state,
        exercisesById: { ...state.exercisesById },
        wsrById: { ...state.wsrById },
      };

      // Remove set from wsrById
      delete stateCopyForRemoveSet.wsrById[action.id];

      // Remove set from wsr of exercises[action.parent]
      const indexOfWsr = stateCopyForRemoveSet.exercisesById[action.parent].wsr.indexOf(action.id);
      stateCopyForRemoveSet.exercisesById[action.parent].wsr.splice(indexOfWsr, 1);

      return stateCopyForRemoveSet;
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function FormProvider(props) {
  const [state, dispatch] = React.useReducer(formReducer, props.providedState || initialState);
  return (
    <FormStateContext.Provider value={state}>
      <FormDispatchContext.Provider value={dispatch}>{props.children}</FormDispatchContext.Provider>
    </FormStateContext.Provider>
  );
}

function useFormState() {
  const context = React.useContext(FormStateContext);
  if (context === undefined) {
    throw new Error("useFormState must be used within a FormProvider");
  }
  return context;
}

function useFormDispatch() {
  const context = React.useContext(FormDispatchContext);
  if (context === undefined) {
    throw new Error("useFormDispatch must be used within a FormProvider");
  }
  return context;
}

function useForm() {
  return [useFormState(), useFormDispatch()];
}

export { FormProvider, useForm };
