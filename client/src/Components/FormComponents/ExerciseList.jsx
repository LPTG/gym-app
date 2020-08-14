import React from "react";
import TestExerciseForm from "./TestExerciseForm";
import { Box, Paper } from "@material-ui/core";
import { useForm } from "../Forms/FormContext";

function ExerciseList(props) {
  const [state] = useForm();

  return (
    <>
      {state.exercises.map((exercise) => (
        <Box key={exercise} my="1rem">
          <Paper variant="outlined">
            <Box m="1rem">
              <TestExerciseForm id={exercise} />
            </Box>
          </Paper>
        </Box>
      ))}
    </>
  );
}

export default ExerciseList;
