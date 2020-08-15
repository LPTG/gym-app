import React from "react";
import { Grid } from "@material-ui/core";
import { useForm } from "./FormContext";
import WorkoutDetails from "../FormComponents/WorkoutDetails";
import ExerciseList from "../FormComponents/ExerciseList";
import AddExerciseButton from "../FormComponents/AddExerciseButton";
import SubmitFormButton from "../FormComponents/SubmitFormButton";
import { workoutStateToDB } from "./ConvertDataFunctions";
import auth from "../../Auth";
import axios from "axios";

const submitForm = (e, state) => {
  e.preventDefault();
  const payload = workoutStateToDB(state);

  // Create new workout
  axios.post(`/api/users/${auth.getUser().username}/workouts`, { workout: payload }).then((res) => {
    console.log(res);
  });
};

function CreateNewForm(props) {
  const [state] = useForm();

  return (
    <form onSubmit={(e) => submitForm(e, state)}>
      <Grid container spacing={2}>
        {/* Info */}
        <WorkoutDetails />

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
            <SubmitFormButton />
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}

export default CreateNewForm;
