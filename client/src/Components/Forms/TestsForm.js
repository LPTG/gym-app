import React from "react";
import { Box, Paper, Grid } from "@material-ui/core";
import { FormProvider } from "./FormContext";
import WorkoutDetails from "../FormComponents/WorkoutDetails";
import ExerciseList from "../FormComponents/ExerciseList";
import AddExerciseButton from "../FormComponents/AddExerciseButton";

function TestForm(props) {
  return (
    <FormProvider>
      <Grid container justify="center">
        <Grid item xs={12} md={6}>
          <Paper variant="outlined">
            <Box m="1rem">
              <form onSubmit={null}>
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
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

export default TestForm;
