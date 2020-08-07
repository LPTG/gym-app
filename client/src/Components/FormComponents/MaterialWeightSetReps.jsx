import React from "react";
//import { PropTypes } from "prop-types";
import { Grid, TextField } from "@material-ui/core";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import AddCircleIcon from "@material-ui/icons/AddCircle";

class MaterialWeightSetReps extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.values.weight !== nextProps.values.weight) return true;

    if (this.props.values.sets !== nextProps.values.sets) return true;

    if (this.props.values.reps !== nextProps.values.reps) return true;

    return false;
  }

  render() {
    if (this.props.newTemplate) {
      return (
        <Grid container justify="flex-start" spacing={2}>
          <Grid item xs={4} sm={3}>
            <TextField
              id={this.props.parent + "-" + this.props.id + "-w"}
              label="Weight"
              variant="outlined"
              value={this.props.values.weight || ""}
              placeholder={this.props.placeholders.weight || ""}
              size="small"
              onChange={this.props.handleWeightSetRepChange}
              inputProps={{ maxLength: 15 }}
            />
          </Grid>

          <Grid item xs={4} sm={3}>
            <TextField
              id={this.props.parent + "-" + this.props.id + "-s"}
              label="Sets"
              variant="outlined"
              value={this.props.values.sets || ""}
              placeholder={this.props.placeholders.sets || ""}
              size="small"
              onChange={this.props.handleWeightSetRepChange}
              inputProps={{ maxLength: 15 }}
            />
          </Grid>

          <Grid item xs={4} sm={3}>
            <TextField
              id={this.props.parent + "-" + this.props.id + "-r"}
              label="Reps"
              variant="outlined"
              value={this.props.values.reps || ""}
              placeholder={this.props.placeholders.reps || ""}
              size="small"
              onChange={this.props.handleWeightSetRepChange}
              inputProps={{ maxLength: 15 }}
            />
          </Grid>

          <Grid item>
            <RemoveCircleIcon
              color="secondary"
              fontSize="large"
              style={{ cursor: "pointer" }}
              onClick={() => this.props.removeSet(this.props.parent, this.props.id)}
            />

            <AddCircleIcon
              color="secondary"
              fontSize="large"
              style={{ cursor: "pointer" }}
              onClick={() => this.props.addSet(this.props.parent, this.props.id)}
            />
          </Grid>
        </Grid>
      );
    } else {
      return (
        <Grid container justify="flex-start" spacing={2}>
          <Grid item xs={4} sm={3}>
            <TextField
              id={this.props.parent + "-" + this.props.id + "-w"}
              label="Weight"
              variant="outlined"
              value={this.props.values.weight || ""}
              placeholder={this.props.placeholders.weight || ""}
              size="small"
              fullWidth
              onChange={this.props.handleWeightSetRepChange}
              type="number"
              inputProps={{ min: 1, max: 2000 }}
            />
          </Grid>

          <Grid item xs={4} sm={3}>
            <TextField
              id={this.props.parent + "-" + this.props.id + "-s"}
              label="Sets"
              variant="outlined"
              value={this.props.values.sets || ""}
              placeholder={this.props.placeholders.sets || ""}
              size="small"
              fullWidth
              onChange={this.props.handleWeightSetRepChange}
              type="number"
              inputProps={{ min: 1, max: 20 }}
            />
          </Grid>

          <Grid item xs={4} sm={3}>
            <TextField
              id={this.props.parent + "-" + this.props.id + "-r"}
              label="Reps"
              variant="outlined"
              value={this.props.values.reps || ""}
              placeholder={this.props.placeholders.reps || ""}
              size="small"
              fullWidth
              onChange={this.props.handleWeightSetRepChange}
              type="number"
              inputProps={{ min: 1, max: 100 }}
            />
          </Grid>

          <Grid item>
            <RemoveCircleIcon
              color="secondary"
              fontSize="large"
              style={{ cursor: "pointer" }}
              onClick={() => this.props.removeSet(this.props.parent, this.props.id)}
            />

            <AddCircleIcon
              color="secondary"
              fontSize="large"
              style={{ cursor: "pointer" }}
              onClick={() => this.props.addSet(this.props.parent, this.props.id)}
            />
          </Grid>
        </Grid>
      );
    }
  }
}

// This isn't working for some reason so I'm using (|| "") for now
MaterialWeightSetReps.defaultProps = {
  placeholders: {
    weight: "",
    sets: "",
    reps: "",
  },
  values: {
    weight: "",
    reps: "",
    sets: "",
  },
};

export default MaterialWeightSetReps;
