import React from "react";
import axios from "axios";
import auth from "../../Auth";
import MaterialExerciseForm from "../FormComponents/MaterialExerciseForm";
import { Box, Paper, Grid, TextField, Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  addExerciseFunc,
  removeExerciseFunc,
  addSetFunc,
  removeSetFunc,
  handleDetailsChangeFunc,
  handleExerciseChangeFunc,
  handleWSRChangeFunc,
} from "./FormFunctions";

class EditForm extends React.Component {
  constructor(props) {
    super(props);

    this.addExercise = this.addExercise.bind(this);
    this.removeExercise = this.removeExercise.bind(this);
    this.addSet = this.addSet.bind(this);
    this.removeSet = this.removeSet.bind(this);
    this.handleDetailsChange = this.handleDetailsChange.bind(this);
    this.handleExerciseChange = this.handleExerciseChange.bind(this);
    this.handleWeightSetRepChange = this.handleWeightSetRepChange.bind(this);
    this.updateWorkout = this.updateWorkout.bind(this);
    this.deleteForm = this.deleteForm.bind(this);

    // Assumes that we are passed these props, only called from ItemView
    this.state = {
      name: props.values.name,
      desc: props.values.desc,
      exercises: props.values.exercises,
    };
  }

  // Adds another exercise to the end of the list of exercises
  addExercise() {
    this.setState({ exercises: addExerciseFunc(this.state.exercises) });
  }

  // Removes the last exercise from the list of exercises
  removeExercise(exerciseID) {
    this.setState({ exercises: removeExerciseFunc(this.state.exercises, exerciseID) });
  }

  // Adds another set to the exercise specified by the given exercise id
  addSet(exerciseID, wsrID) {
    this.setState({ exercises: addSetFunc(this.state.exercises, exerciseID, wsrID) });
  }

  // Removes the last set from the exercise specified by the given exercise id
  removeSet(exerciseID, wsrID) {
    this.setState({ exercises: removeSetFunc(this.state.exercises, exerciseID, wsrID) });
  }

  // Updates state when workout name or description are changed
  handleDetailsChange(event) {
    this.setState(handleDetailsChangeFunc(event));
  }

  handleExerciseChange(event) {
    this.setState(handleExerciseChangeFunc(this.state, event));
  }

  // Try having a seperate event handler for weight/sets/reps
  handleWeightSetRepChange(event) {
    this.setState(handleWSRChangeFunc(this.state, event));
  }

  // Format input to send to server
  updateWorkout(event) {
    event.preventDefault();

    const id =
      this.props.page === "workouts"
        ? this.props.match.params.workoutID
        : this.props.match.params.templateID;

    var exercises = [];
    // Build a json object for each exercise created
    this.state.exercises.forEach((exercise) => {
      var sets = [];
      // Build a json object for each wsr field for this exercise
      exercise.wsr.forEach((set) => {
        sets.push({ weight: set.weight, sets: set.sets, reps: set.reps });
      });

      exercises.push({ name: exercise.name, wsr: sets });
    });

    var update = {
      name: this.state.name,
      desc: this.state.desc,
      exercises: exercises,
    };

    axios
      .put(`/api/users/${auth.getUser().username}/${this.props.page}/${id}`, { update })
      .then((response) => {
        // Pop up an error if workout could not be created
        console.log(response);
        if (
          response.data === "Workout updated successfully!" ||
          response.data === "Template updated successfully!"
        ) {
          this.props.history.push(`/${auth.getUser().username}/${this.props.page}`);
        }
      });
  }

  deleteForm() {
    const id =
      this.props.page === "workouts"
        ? this.props.match.params.workoutID
        : this.props.match.params.templateID;

    axios
      .delete(`/api/users/${auth.getUser().username}/${this.props.page}/${id}`)
      .then((response) => {
        console.log(response);
        if (
          response.data === "Workout deleted successfully!" ||
          response.data === "Template deleted successfully!"
        ) {
          this.props.history.push(`/${auth.getUser().username}/${this.props.page}`);
        }
      });
  }

  render() {
    const page = this.props.page === "Workouts" ? "Workout" : "Template";

    return (
      <div>
        <Grid container justify="center">
          <Grid item xs={12} md={6}>
            <Paper variant="outlined">
              <Box m="1rem">
                <form onSubmit={this.updateWorkout}>
                  <Grid container spacing={2}>
                    <Grid container item justify="space-between" xs={12}>
                      <Grid item xs={4}>
                        <TextField
                          name="name"
                          label="Template Name"
                          value={this.state.name || ""}
                          variant="outlined"
                          size="small"
                          fullWidth
                          onChange={this.handleDetailsChange}
                          required={true}
                        ></TextField>
                      </Grid>

                      <Grid item>
                        <DeleteIcon style={{ cursor: "pointer" }} onClick={this.deleteForm} />
                      </Grid>
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        name="desc"
                        label="Description"
                        value={this.state.desc || ""}
                        variant="outlined"
                        size="small"
                        fullWidth
                        multiline
                        rows={3}
                        onChange={this.handleDetailsChange}
                      ></TextField>
                    </Grid>

                    <Grid item xs={12}>
                      {this.state.exercises.map((exercise, index) => (
                        <Box key={exercise.id} my="1rem">
                          <Paper variant="outlined">
                            <Box m="1rem">
                              <MaterialExerciseForm
                                key={exercise.id}
                                id={exercise.id}
                                wsr={exercise.wsr}
                                exerciseValue={exercise.name}
                                wsrValues={exercise.wsr}
                                handleExerciseChange={this.handleExerciseChange}
                                handleWeightSetRepChange={this.handleWeightSetRepChange}
                                addSet={this.addSet}
                                removeSet={this.removeSet}
                                removeExercise={this.removeExercise}
                                newTemplate={this.props.newTemplate || false}
                              />
                            </Box>
                          </Paper>
                        </Box>
                      ))}
                    </Grid>

                    <Grid container item justify="space-between" xs={12}>
                      <Grid container item spacing={1} xs={8}>
                        <Grid item>
                          <Button variant="contained" color="secondary" onClick={this.addExercise}>
                            Add Exercise
                          </Button>
                        </Grid>
                      </Grid>

                      <Grid item>
                        <Button variant="contained" color="primary" onClick={this.updateWorkout}>
                          Update {page}
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </form>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default EditForm;
