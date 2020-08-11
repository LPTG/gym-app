import React from "react";
import MaterialWeightSetReps from "./MaterialWeightSetReps";
import { Grid, TextField } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

function MaterialExerciseForm(props) {
  // constructor(props) {
  //   super(props);

  //   this.handleClick = this.handleClick.bind(this);
  //   this.handleExerciseChange = this.handleExerciseChange.bind(this);
  //   this.handleWeightChange = this.handleWeightChange.bind(this);
  //   this.handleSetChange = this.handleSetChange.bind(this);
  //   this.handleRepChange = this.handleRepChange.bind(this);
  //   this.getWsrValues = this.getWsrValues.bind(this);
  //   this.getWsrPlaceholders = this.getWsrPlaceholders.bind(this);
  // }

  const handleClick = () => {
    // Add a set to the current exercise
    props.addSet(this.props.id);
  };

  const handleExerciseChange = (e) => {
    props.handleExerciseChange(e);
  };

  const handleWeightChange = (e) => {
    props.handleWeightSetRepChange(e);
  };

  const handleSetChange = (e) => {
    props.handleWeightSetRepChange(e);
  };

  const handleRepChange = (e) => {
    props.handleWeightSetRepChange(e);
  };

  const getWsrValues = (index) => {
    if (props.wsrValues && props.wsrValues[index]) return props.wsrValues[index];
    else return false;
  };

  const getWsrPlaceholders = (index) => {
    if (props.wsrPlaceholders && props.wsrPlaceholders[index]) return props.wsrPlaceholders[index];
    else return false;
  };

  return (
    <Grid container spacing={2}>
      <Grid container item justify="space-between" xs={12}>
        <Grid item xs={4}>
          <TextField
            id={props.id}
            name={props.id}
            label="Exercise Name"
            variant="outlined"
            value={props.exerciseValue || ""}
            placeholder={props.exercisePlaceholder || ""}
            size="small"
            fullWidth
            onChange={handleExerciseChange}
            inputProps={{ maxLength: 40 }}
            required
          ></TextField>
        </Grid>

        <Grid item>
          <CloseIcon
            style={{ cursor: "pointer" }}
            onClick={() => {
              props.removeExercise(props.id);
            }}
          />
        </Grid>
      </Grid>

      <Grid item xs={12}>
        {props.wsrValues.map((wsr, index) => (
          <MaterialWeightSetReps
            key={wsr.id}
            id={wsr.id}
            parent={props.id}
            placeholders={getWsrPlaceholders(index)}
            values={getWsrValues(index)}
            handleWeightSetRepChange={props.handleWeightSetRepChange}
            newTemplate={props.newTemplate || false}
            addSet={props.addSet}
            removeSet={props.removeSet}
          />
        ))}
      </Grid>
    </Grid>
  );
}

MaterialWeightSetReps.defaultProps = {
  exerciseValue: "",
  exercisePlaceholder: "",
};

export default MaterialExerciseForm;
