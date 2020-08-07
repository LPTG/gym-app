import React from "react";
import { TextField } from "@material-ui/core";

class WorkoutDesc extends React.PureComponent {
  render() {
    return (
      <TextField
        name="desc"
        label="Description"
        variant="outlined"
        size="small"
        fullWidth
        multiline
        rows={3}
        onChange={this.props.handleDetailsChange}
        inputProps={{ maxLength: 200 }}
        helperText={`${this.props.length}/200`}
      />
    );
  }
}

export default WorkoutDesc;
