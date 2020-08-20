import React from "react";
import { Grid } from "@material-ui/core";
import { useForm } from "./FormContext";
import {
  WorkoutDetails,
  ExerciseList,
  AddExerciseButton,
  SubmitFormButton,
} from "../FormComponents";
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
    (async () => {
      if (props.type === "workouts") {
        if (props.action === "create") {
          let createWorkoutStatus = await createWorkout(auth.getUser(), workout);
          if (createWorkoutStatus.error) console.log(createWorkoutStatus.error);
          else props.history.push(`/${auth.getUser()}/workouts`);
        } else {
          let updateWorkoutStatus = await updateWorkout(
            auth.getUser(),
            props.match.params.id,
            workout
          );
          if (updateWorkoutStatus.error) console.log(updateWorkoutStatus.error);
          else props.history.push(`/${auth.getUser()}/workouts`);
        }
      } else {
        if (props.action === "create") {
          let createTemplateStatus = await createTemplate(auth.getUser(), template);
          if (createTemplateStatus.error) console.log(createTemplateStatus.error);
          else props.history.push(`/${auth.getUser()}/templates`);
        } else {
          let updateTemplateStatus = await updateTemplate(
            auth.getUser(),
            props.match.params.id,
            template
          );
          if (updateTemplateStatus.error) console.log(updateTemplateStatus.error);
          else props.history.push(`/${auth.getUser()}/templates`);
        }
      }
    })();
  };

  return (
    <form onSubmit={(e) => submitForm(e, state)}>
      <Grid container spacing={2}>
        {/* Info */}
        <WorkoutDetails
          action={props.action}
          type={props.type}
          match={props.match}
          history={props.history}
          useTemplate={props.useTemplate}
        />

        <Grid item xs={12}>
          {/* Exercise list */}
          <ExerciseList formType={props.match.params.formType} />
        </Grid>

        <Grid container item justify="space-between" xs={12}>
          <Grid container item spacing={1} xs={6}>
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
