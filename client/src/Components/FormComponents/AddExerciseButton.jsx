import React from "react";
import { useForm } from "../Forms/FormContext";
import { Button } from "@material-ui/core";

function AddExerciseButton(props) {
  const [, dispatch] = useForm();

  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={() => dispatch({ type: "add_exercise" })}
    >
      Add Exercise
    </Button>
  );
}

export default AddExerciseButton;
