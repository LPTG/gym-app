import React, { useState, useEffect } from "react";
import { Box, Paper, Grid } from "@material-ui/core";
import { FormProvider } from "./FormContext";
import WorkoutForm from "./NewForm";
import { getWorkout, getTemplate } from "./RequestFunctions";
import { workoutStateToDB, workoutDBToState } from "./ConvertDataFunctions";
import auth from "../../Auth";

function FormContainer(props) {
  const [state, setState] = useState(null);
  const action = props.match.params.formType && props.match.params.id ? "update" : "create";
  const type = props.match.params.formType;

  useEffect(() => {
    // Only attempt to fetch the data if we are updating a workout or template
    if (props.match.params.id) {
      (async () => {
        if (props.match.params.formType === "workouts") {
          let workoutID = props.match.params.id;
          let workout = await getWorkout(auth.getUser().username, workoutID);
          setState(workoutDBToState(workout));
        } else {
          //let templateID = props.match.params.id;
          //let template = getTemplate(auth.getUser().username, templateID);
          console.log("Need a templateDBToState conversion function");
        }
      })();
    }
  }, [props.match.params.formType, props.match.params.id]);

  // If we are creating a workout or template then we will use the default initial state found in FormContext.js
  if (action === "create" || state) {
    return (
      <FormProvider providedState={state}>
        <Grid container justify="center">
          <Grid item xs={12} md={6}>
            <Paper variant="outlined">
              <Box m="1rem">
                {/* Action can be create or update */}
                {/* Type can be workout or template */}
                <WorkoutForm action={action} type={type} />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </FormProvider>
    );
  } else {
    return <>Loading...</>;
  }
}

export default FormContainer;
