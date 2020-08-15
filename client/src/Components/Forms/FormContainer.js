import React, { useState, useEffect } from "react";
import { Box, Paper, Grid } from "@material-ui/core";
import { FormProvider } from "./FormContext";
import FormHandler from "./FormHandler";
import { getWorkout, getTemplate } from "../HelperFunctions/RequestFunctions";
import {
  workoutDBToEditState,
  templateDBToEditState,
  templateDBToWorkoutState,
} from "../HelperFunctions/ConvertDataFunctions";
import auth from "../../Auth";

function FormContainer(props) {
  const [state, setState] = useState(null);
  const action =
    props.match.params.formType && props.match.params.id && !props.useTemplate
      ? "update"
      : "create";
  const type = props.match.params.formType;

  useEffect(() => {
    // Only attempt to fetch the data if we are updating a workout or template
    if (props.match.params.id) {
      (async () => {
        if (props.useTemplate) {
          let templateID = props.match.params.id;
          let template = await getTemplate(auth.getUser(), templateID);
          setState(templateDBToWorkoutState(template));
        } else if (props.match.params.formType === "workouts") {
          let workoutID = props.match.params.id;
          let workout = await getWorkout(auth.getUser(), workoutID);
          setState(workoutDBToEditState(workout));
        } else if (props.match.params.formType === "templates") {
          let templateID = props.match.params.id;
          let template = await getTemplate(auth.getUser(), templateID);
          setState(templateDBToEditState(template));
        }
      })();
    }
  }, [props.useTemplate, props.match.params.formType, props.match.params.id]);

  // If we are creating a workout or template then we will use the default initial state found in FormContext.js
  if ((action === "create" && !props.useTemplate) || state) {
    return (
      <FormProvider providedState={state}>
        <Grid container justify="center">
          <Grid item xs={12} md={6}>
            <Paper variant="outlined">
              <Box m="1rem">
                {/* Action can be create or update */}
                {/* Type can be workout or template */}
                <FormHandler
                  action={action}
                  type={type}
                  match={props.match}
                  useTemplate={props.useTemplate}
                />
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
