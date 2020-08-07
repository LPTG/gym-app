import React from "react";
import axios from "axios";
import auth from "../../Auth";
import MaterialExerciseForm from "../FormComponents/MaterialExerciseForm";
import { Box, Paper, Grid, Button } from "@material-ui/core";
import WorkoutName from "../FormComponents/WorkoutName";
import WorkoutDesc from "../FormComponents/WorkoutDesc";
import {
  addExerciseFunc,
  removeExerciseFunc,
  addSetFunc,
  removeSetFunc,
  handleDetailsChangeFunc,
  handleExerciseChangeFunc,
  handleWSRChangeFunc,
} from "./FormFunctions";

class NewWorkout extends React.Component {
  constructor(props) {
    super(props);

    this.addExercise = this.addExercise.bind(this);
    this.removeExercise = this.removeExercise.bind(this);
    this.addSet = this.addSet.bind(this);
    this.removeSet = this.removeSet.bind(this);
    this.handleDetailsChange = this.handleDetailsChange.bind(this);
    this.handleExerciseChange = this.handleExerciseChange.bind(this);
    this.handleWeightSetRepChange = this.handleWeightSetRepChange.bind(this);
    this.createWorkout = this.createWorkout.bind(this);

    // Set initial state of workout: 1 exercise with 1 set
    this.state = {
      name: "",
      desc: "",
      exercises: [
        {
          id: "exercise1",
          name: "",
          wsr: [{ id: "wsr1", weight: "", sets: "", reps: "" }],
        },
      ],
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
  addSet(exerciseID) {
    this.setState({ exercises: addSetFunc(this.state.exercises, exerciseID) });
  }

  // Removes the last set from the exercise specified by the given exercise id
  removeSet(exerciseID) {
    this.setState({ exercises: removeSetFunc(this.state.exercises, exerciseID) });
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
  createWorkout() {
    // Framework for our workout object
    var workout = {
      name: this.state.name,
      desc: this.state.desc,
      exercises: [],
    };

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

    workout.exercises = exercises;

    this.props.newTemplate
      ? axios
          .post(`/api/users/${auth.getUser().username}/templates`, { template: workout })
          .then((response) => {
            // Pop up an error if workout could not be created
            console.log(response);
            if (response.data === "Template added successfully!") {
              this.props.history.push(`/${auth.getUser().username}/templates`);
            }
          })
      : axios
          .post(`/api/users/${auth.getUser().username}/workouts`, { workout })
          .then((response) => {
            // Pop up an error if workout could not be created
            console.log(response);
            if (response.data === "Workout added successfully!") {
              this.props.history.push(`/${auth.getUser().username}/workouts`);
            }
          });
  }

  render() {
    return (
      <div>
        <Grid container justify="center">
          <Grid item xs={12} md={6}>
            <Paper variant="outlined">
              <Box m="1rem">
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <WorkoutName
                      handleDetailsChange={this.handleDetailsChange}
                      length={this.state.name.length}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <WorkoutDesc
                      handleDetailsChange={this.handleDetailsChange}
                      length={this.state.desc.length}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    {this.state.exercises.map((exercise) => (
                      <Box key={exercise.id} my="1rem">
                        <Paper variant="outlined">
                          <Box m="1rem">
                            <MaterialExerciseForm
                              key={exercise.id}
                              id={exercise.id}
                              exerciseValue={exercise.name}
                              wsrValues={exercise.wsr}
                              handleExerciseChange={this.handleExerciseChange}
                              handleWeightSetRepChange={this.handleWeightSetRepChange}
                              addSet={this.addSet}
                              removeSet={this.removeSet}
                              removeExercise={this.removeExercise}
                              newTemplate={this.props.newTemplate}
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

                      <Grid item>
                        <Button variant="contained" color="secondary" onClick={this.removeExercise}>
                          Remove Exercise
                        </Button>
                      </Grid>
                    </Grid>

                    <Grid item>
                      <Button variant="contained" color="primary" onClick={this.createWorkout}>
                        Create {this.props.newTemplate ? "Template" : "Workout"}
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default NewWorkout;
