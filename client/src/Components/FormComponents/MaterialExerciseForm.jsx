import React from "react";
import MaterialWeightSetReps from "./MaterialWeightSetReps";
import { Button, Grid, TextField } from "@material-ui/core";

class MaterialExerciseForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleExerciseChange = this.handleExerciseChange.bind(this);
    this.handleWeightChange = this.handleWeightChange.bind(this);
    this.handleSetChange = this.handleSetChange.bind(this);
    this.handleRepChange = this.handleRepChange.bind(this);
  }

  handleClick() {
    // Add a set to the current exercise
    this.props.addSet(this.props.id);
  }

  handleExerciseChange(event) {
    this.props.handleExerciseChange(event);
  }

  handleWeightChange(event) {
    this.props.handleWeightSetRepChange(event);
  }

  handleSetChange(event) {
    this.props.handleWeightSetRepChange(event);
  }

  handleRepChange(event) {
    this.props.handleWeightSetRepChange(event);
  }

  render() {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {this.props.fromTemplate && (
            <TextField
              id={this.props.id}
              name={this.props.id}
              label="Exercise Name"
              variant="outlined"
              placeholder={this.props.exercisePlaceholder || ""}
              size="small"
              onChange={this.handleExerciseChange}
            ></TextField>
          )}

          {!this.props.fromTemplate && (
            <TextField
              id={this.props.id}
              name={this.props.id}
              label="Exercise Name"
              variant="outlined"
              value={this.props.exerciseValue || ""}
              placeholder={this.props.exercisePlaceholder || ""}
              size="small"
              onChange={this.handleExerciseChange}
            ></TextField>
          )}
        </Grid>

        <Grid item xs={12}>
          {this.props.wsrPlaceholders &&
            this.props.wsrValues &&
            this.props.wsr.map((wsr, index) => (
              <MaterialWeightSetReps
                key={wsr.id}
                parent={this.props.id}
                id={wsr.id}
                weightText={
                  // Is checking for this.props.wsrPlaceholders necessary?
                  this.props.wsrPlaceholders
                    ? this.props.wsrPlaceholders[index]
                      ? this.props.wsrPlaceholders[index].weight
                      : ""
                    : ""
                }
                setsText={
                  this.props.wsrPlaceholders
                    ? this.props.wsrPlaceholders[index]
                      ? this.props.wsrPlaceholders[index].sets
                      : ""
                    : ""
                }
                repsText={
                  this.props.wsrPlaceholders
                    ? this.props.wsrPlaceholders[index]
                      ? this.props.wsrPlaceholders[index].reps
                      : ""
                    : ""
                }
                weightValue={this.props.wsrValues[index].weight}
                setsValue={this.props.wsrValues[index].sets}
                repsValue={this.props.wsrValues[index].reps}
                onWeightChange={this.handleWeightChange}
                onSetChange={this.handleSetChange}
                onRepChange={this.handleRepChange}
                fromTemplate={true}
              />
            ))}

          {!this.props.wsrPlaceholders &&
            this.props.wsrValues &&
            this.props.wsr.map((wsr, index) => (
              <MaterialWeightSetReps
                key={wsr.id}
                parent={this.props.id}
                id={wsr.id}
                weightValue={this.props.wsrValues[index].weight}
                setsValue={this.props.wsrValues[index].sets}
                repsValue={this.props.wsrValues[index].reps}
                onWeightChange={this.handleWeightChange}
                onSetChange={this.handleSetChange}
                onRepChange={this.handleRepChange}
              />
            ))}

          {!this.props.wsrPlaceholders &&
            !this.props.wsrValues &&
            this.props.wsr.map((wsr) => (
              <MaterialWeightSetReps
                key={wsr.id}
                parent={this.props.id}
                id={wsr.id}
                onWeightChange={this.handleWeightChange}
                onSetChange={this.handleSetChange}
                onRepChange={this.handleRepChange}
              />
            ))}
        </Grid>

        <Grid item>
          <Button variant="contained" color="secondary" onClick={this.handleClick}>
            Add Set
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default MaterialExerciseForm;
