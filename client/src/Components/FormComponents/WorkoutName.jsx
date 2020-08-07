import React from "react";
import { TextField } from "@material-ui/core";

class WorkoutName extends React.PureComponent {
  render() {
    return (
      <TextField
        name="name"
        label="Workout Name"
        variant="outlined"
        size="small"
        fullWidth
        onChange={this.props.handleDetailsChange}
        inputProps={{ maxLength: 40 }}
        required={true}
      />
    );
  }
}

export default WorkoutName;
