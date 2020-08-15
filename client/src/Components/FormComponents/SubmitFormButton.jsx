import React from "react";
import { Button } from "@material-ui/core";

function SubmitFormButton(props) {
  const action = props.action === "create" || props.useTemplate ? "Create" : "Update";
  const type = props.type === "workouts" ? "Workout" : "Template";

  return (
    <Button type="submit" variant="contained" color="primary">
      {action + " " + type}
    </Button>
  );
}

export default SubmitFormButton;
