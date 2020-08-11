import React, { memo } from "react";
//import { PropTypes } from "prop-types";
import { Grid, TextField } from "@material-ui/core";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import AddCircleIcon from "@material-ui/icons/AddCircle";

function arePropsEqual(prevProps, nextProps) {
  if (prevProps.values.weight !== nextProps.values.weight) return false;

  if (prevProps.values.sets !== nextProps.values.sets) return false;

  if (prevProps.values.reps !== nextProps.values.reps) return false;

  return true;
}

function MaterialWeightSetReps(props) {
  if (props.newTemplate) {
    return (
      <Grid container justify="flex-start" spacing={2}>
        <Grid item xs={4} sm={3}>
          <TextField
            id={props.parent + "-" + props.id + "-w"}
            label="Weight"
            variant="outlined"
            value={props.values.weight || ""}
            placeholder={props.placeholders.weight || ""}
            size="small"
            onChange={props.handleWeightSetRepChange}
            inputProps={{ maxLength: 15 }}
          />
        </Grid>

        <Grid item xs={4} sm={3}>
          <TextField
            id={props.parent + "-" + props.id + "-s"}
            label="Sets"
            variant="outlined"
            value={props.values.sets || ""}
            placeholder={props.placeholders.sets || ""}
            size="small"
            onChange={props.handleWeightSetRepChange}
            inputProps={{ maxLength: 15 }}
          />
        </Grid>

        <Grid item xs={4} sm={3}>
          <TextField
            id={props.parent + "-" + props.id + "-r"}
            label="Reps"
            variant="outlined"
            value={props.values.reps || ""}
            placeholder={props.placeholders.reps || ""}
            size="small"
            onChange={props.handleWeightSetRepChange}
            inputProps={{ maxLength: 15 }}
          />
        </Grid>

        <Grid item>
          <RemoveCircleIcon
            color="secondary"
            fontSize="large"
            style={{ cursor: "pointer" }}
            onClick={() => props.removeSet(props.parent, props.id)}
          />

          <AddCircleIcon
            color="secondary"
            fontSize="large"
            style={{ cursor: "pointer" }}
            onClick={() => props.addSet(props.parent, props.id)}
          />
        </Grid>
      </Grid>
    );
  } else {
    return (
      <Grid container justify="flex-start" spacing={2}>
        <Grid item xs={4} sm={3}>
          <TextField
            id={props.parent + "-" + props.id + "-w"}
            label="Weight"
            variant="outlined"
            value={props.values.weight || ""}
            placeholder={props.placeholders.weight || ""}
            size="small"
            fullWidth
            onChange={props.handleWeightSetRepChange}
            type="number"
            inputProps={{ min: 1, max: 2000 }}
          />
        </Grid>

        <Grid item xs={4} sm={3}>
          <TextField
            id={props.parent + "-" + props.id + "-s"}
            label="Sets"
            variant="outlined"
            value={props.values.sets || ""}
            placeholder={props.placeholders.sets || ""}
            size="small"
            fullWidth
            onChange={props.handleWeightSetRepChange}
            type="number"
            inputProps={{ min: 1, max: 20 }}
          />
        </Grid>

        <Grid item xs={4} sm={3}>
          <TextField
            id={props.parent + "-" + props.id + "-r"}
            label="Reps"
            variant="outlined"
            value={props.values.reps || ""}
            placeholder={props.placeholders.reps || ""}
            size="small"
            fullWidth
            onChange={props.handleWeightSetRepChange}
            type="number"
            inputProps={{ min: 1, max: 100 }}
          />
        </Grid>

        <Grid item>
          <RemoveCircleIcon
            color="secondary"
            fontSize="large"
            style={{ cursor: "pointer" }}
            onClick={() => props.removeSet(props.parent, props.id)}
          />

          <AddCircleIcon
            color="secondary"
            fontSize="large"
            style={{ cursor: "pointer" }}
            onClick={() => props.addSet(props.parent, props.id)}
          />
        </Grid>
      </Grid>
    );
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

export default memo(MaterialWeightSetReps, arePropsEqual);
