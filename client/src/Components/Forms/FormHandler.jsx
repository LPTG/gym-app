import React from "react";
import { Grid } from "@material-ui/core";
import { useForm } from "./FormContext";
import {
  WorkoutDetails,
  ExerciseList,
  AddExerciseButton,
  SubmitFormButton,
} from "../FormComponents";
// import WorkoutDetails from "../FormComponents/WorkoutDetails";
// import ExerciseList from "../FormComponents/ExerciseList";
// import AddExerciseButton from "../FormComponents/AddExerciseButton";
// import SubmitFormButton from "../FormComponents/SubmitFormButton";
import { workoutStateToDB, templateStateToDB } from "../HelperFunctions/ConvertDataFunctions";
import {
  createWorkout,
  createTemplate,
  updateWorkout,
  updateTemplate,
} from "../HelperFunctions/RequestFunctions";
import auth from "../../Auth";

function FormHandler(props) {
  const [state] = useForm();

  const submitForm = (e, state) => {
    e.preventDefault();
    if (props.type === "workouts") {
      var workout = workoutStateToDB(state);
    } else {
      var template = templateStateToDB(state);
    }

    // Create workout
    // Update workout
    // Create template
    // Update template

    if (props.type === "workouts") {
      if (props.action === "create") {
        createWorkout(auth.getUser(), workout);
      } else {
        updateWorkout(auth.getUser(), props.match.params.id, workout);
      }
    } else {
      if (props.action === "create") {
        createTemplate(auth.getUser(), template);
      } else {
        updateTemplate(auth.getUser(), props.match.params.id, template);
      }
    }
  };

  return (
    <form onSubmit={(e) => submitForm(e, state)}>
      <Grid container spacing={2}>
        {/* Info */}
        <WorkoutDetails
          action={props.action}
          type={props.type}
          match={props.match}
          useTemplate={props.useTemplate}
        />

        <Grid item xs={12}>
          {/* Exercise list */}
          <ExerciseList />
        </Grid>

        <Grid container item justify="space-between" xs={12}>
          <Grid container item spacing={1} xs={8}>
            <Grid item>
              <AddExerciseButton />
            </Grid>
          </Grid>

          <Grid item>
            <SubmitFormButton
              action={props.action}
              type={props.type}
              useTemplate={props.useTemplate}
            />
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}

export default FormHandler;
