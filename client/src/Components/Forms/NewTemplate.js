import React from "react";
import axios from "axios";
import { cloneDeep } from "lodash";
import { withRouter } from "react-router-dom";
import MaterialExerciseForm from "../FormComponents/MaterialExerciseForm";
import NavBar from "../SiteComponents/Navbar";
import { Box, Paper, Grid, TextField, Button } from "@material-ui/core";

class NewTemplate extends React.Component {
  constructor(props) {
    super(props);

    this.addExercise = this.addExercise.bind(this);
    this.addSet = this.addSet.bind(this);
    this.handleDetailsChange = this.handleDetailsChange.bind(this);
    this.handleExerciseChange = this.handleExerciseChange.bind(this);
    this.handleWeightSetRepChange = this.handleWeightSetRepChange.bind(this);
    this.createTemplate = this.createTemplate.bind(this);

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

  addExercise() {
    // Copy the exercises array
    const exercises = this.state.exercises.slice();

    const id = "exercise" + (this.state.exercises.length + 1);

    // Add a new exercise with a single set
    const updatedExercises = exercises.concat([
      {
        id: id,
        wsr: [{ id: "wsr1", weight: "", sets: "", reps: "" }],
      },
    ]);

    this.setState({ exercises: updatedExercises });

    return id;
  }

  addSet(exerciseID) {
    // Copy the exercises array
    const exerciseCopy = this.state.exercises.slice();

    // Get index of current exercise
    const exerciseIndex = exerciseCopy.findIndex((x) => x.id === exerciseID);

    // Add a new set to the current exercise
    exerciseCopy[exerciseIndex].wsr = exerciseCopy[exerciseIndex].wsr.concat([
      { id: "wsr" + (exerciseCopy[exerciseIndex].wsr.length + 1) },
    ]);

    this.setState({ exercises: exerciseCopy });
  }

  handleDetailsChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }

  handleExerciseChange(event) {
    const target = event.target;

    // Find the index of the modified exercise name
    var exerciseIndex = this.state.exercises.findIndex((ex) => ex.id === target.id);
    // Create a copy of that exercise
    var exerciseCopy = { ...this.state.exercises[exerciseIndex] };
    // Update the value of the exercise name
    exerciseCopy.name = target.value;

    // Create a copy of the current exercises
    var exerciseListCopy = [...this.state.exercises];
    // Replace the modified exercise index with our new exercise
    exerciseListCopy[exerciseIndex] = exerciseCopy;

    // Create a copy of the current state
    var stateCopy = { ...this.state };
    // Replace the current state's exercises with our updated version
    stateCopy.exercises = exerciseListCopy;

    this.setState(stateCopy);
  }

  // For a template, weight/sets/reps will all be strings so we can probably create one event handler
  // for inputs with the same max/min length
  handleWeightSetRepChange(event) {
    const target = event.target;

    const targetSplit = target.id.split("-");
    const exerciseID = targetSplit[0];
    const wsrID = targetSplit[1];

    // Find the index of the modified exercise name
    var exerciseIndex = this.state.exercises.findIndex((ex) => ex.id === exerciseID);
    // Find the index of the modified weight, set, or rep
    var wsrIndex = this.state.exercises[exerciseIndex].wsr.findIndex((wsr) => wsr.id === wsrID);
    // Create a copy of that wsr
    var wsrCopy = { ...this.state.exercises[exerciseIndex].wsr[wsrIndex] };
    // Update the value of the weight, set, or rep
    if (targetSplit[2] === "w") wsrCopy.weight = target.value;
    if (targetSplit[2] === "s") wsrCopy.sets = target.value;
    if (targetSplit[2] === "r") wsrCopy.reps = target.value;

    // Create a copy of the current state
    var stateCopy = cloneDeep(this.state);

    // Replace the current state's wsr with our updated version
    stateCopy.exercises[exerciseIndex].wsr[wsrIndex] = wsrCopy;

    this.setState(stateCopy);
  }

  // Format input to send to server
  createTemplate() {
    // Framework for our workout object
    var template = {
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

    template.exercises = exercises;

    axios
      .post(`/api/users/${this.props.match.params.user}/templates`, { template })
      .then((response) => {
        console.log(response);
      });
  }

  render() {
    return (
      <div>
        <NavBar {...this.props} />
        <Grid container justify="center">
          <Grid item xs={12} sm={6}>
            <Paper variant="outlined">
              <Box m="1rem">
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      name="name"
                      label="Workout Name"
                      variant="outlined"
                      size="small"
                      onChange={this.handleDetailsChange}
                      required={true}
                    ></TextField>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      name="desc"
                      label="Description"
                      variant="outlined"
                      size="small"
                      fullWidth
                      multiline
                      rows={3}
                      onChange={this.handleDetailsChange}
                    ></TextField>
                  </Grid>

                  <Grid item xs={12}>
                    {this.state.exercises.map((exercise) => (
                      <Box my="1rem">
                        <Paper variant="outlined">
                          <Box m="1rem">
                            <MaterialExerciseForm
                              key={exercise.id}
                              id={exercise.id}
                              wsr={exercise.wsr}
                              exercise={exercise}
                              exerciseValue={exercise.name}
                              wsrValues={exercise.wsr}
                              handleExerciseChange={this.handleExerciseChange}
                              handleWeightSetRepChange={this.handleWeightSetRepChange}
                              addSet={this.addSet}
                            />
                          </Box>
                        </Paper>
                      </Box>
                    ))}
                  </Grid>
                  <Grid container item justify="space-between" xs={12}>
                    <Button variant="contained" color="secondary" onClick={this.addExercise}>
                      Add Exercise
                    </Button>
                    <Button variant="contained" color="primary" onClick={this.createWorkout}>
                      Create Workout
                    </Button>
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

export default withRouter(NewTemplate);
