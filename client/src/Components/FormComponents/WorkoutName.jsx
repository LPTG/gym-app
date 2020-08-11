import React, { memo } from "react";
import { TextField } from "@material-ui/core";

function WorkoutName(props) {
  return (
    <TextField
      name="name"
      label="Workout Name"
      variant="outlined"
      size="small"
      fullWidth
      onChange={props.handleDetailsChange}
      inputProps={{ maxLength: 40 }}
      required
    />
  );
}

export default memo(WorkoutName);
