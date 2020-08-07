import React from "react";
import MaterialWeightSetReps from "./MaterialWeightSetReps";
import { Grid, TextField } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

class MaterialExerciseForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleExerciseChange = this.handleExerciseChange.bind(this);
    this.handleWeightChange = this.handleWeightChange.bind(this);
    this.handleSetChange = this.handleSetChange.bind(this);
    this.handleRepChange = this.handleRepChange.bind(this);
    this.getWsrValues = this.getWsrValues.bind(this);
    this.getWsrPlaceholders = this.getWsrPlaceholders.bind(this);
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

  getWsrValues(index) {
    if (this.props.wsrValues && this.props.wsrValues[index]) return this.props.wsrValues[index];
    else return false;
  }

  getWsrPlaceholders(index) {
    if (this.props.wsrPlaceholders && this.props.wsrPlaceholders[index])
      return this.props.wsrPlaceholders[index];
    else return false;
  }

  render() {
    return (
      <Grid container spacing={2}>
        <Grid container item justify="space-between" xs={12}>
          <Grid item xs={4}>
            <TextField
              id={this.props.id}
              name={this.props.id}
              label="Exercise Name"
              variant="outlined"
              value={this.props.exerciseValue || ""}
              placeholder={this.props.exercisePlaceholder || ""}
              size="small"
              fullWidth
              onChange={this.handleExerciseChange}
              inputProps={{ maxLength: 40 }}
              required
            ></TextField>
          </Grid>

          <Grid item>
            <CloseIcon
              style={{ cursor: "pointer" }}
              onClick={() => {
                this.props.removeExercise(this.props.id);
              }}
            />
          </Grid>
        </Grid>

        <Grid item xs={12}>
          {this.props.wsrValues.map((wsr, index) => (
            <MaterialWeightSetReps
              key={wsr.id}
              id={wsr.id}
              parent={this.props.id}
              placeholders={this.getWsrPlaceholders(index)}
              values={this.getWsrValues(index)}
              handleWeightSetRepChange={this.props.handleWeightSetRepChange}
              newTemplate={this.props.newTemplate || false}
              addSet={this.props.addSet}
              removeSet={this.props.removeSet}
            />
          ))}
        </Grid>
      </Grid>
    );
  }
}

MaterialWeightSetReps.defaultProps = {
  exerciseValue: "",
  exercisePlaceholder: "",
};

export default MaterialExerciseForm;
