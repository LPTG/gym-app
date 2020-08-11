import React, { memo } from "react";
import { TextField } from "@material-ui/core";

function WorkoutDesc(props) {
  return (
    <TextField
      name="desc"
      label="Description"
      variant="outlined"
      size="small"
      fullWidth
      multiline
      rows={3}
      onChange={props.handleDetailsChange}
      inputProps={{ maxLength: 200 }}
      helperText={`${props.length}/200`}
    />
  );
}

export default memo(WorkoutDesc);
