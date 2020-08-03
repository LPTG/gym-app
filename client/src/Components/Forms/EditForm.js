import React from "react";
import axios from "axios";
import { cloneDeep } from "lodash";
import ExerciseForm from "../FormComponents/ExerciseForm";
import NavBar from "../SiteComponents/Navbar";
import "./formStyle.css";

class EditForm extends React.Component {
  constructor(props) {
    super(props);

    this.addExercise = this.addExercise.bind(this);
    this.addSet = this.addSet.bind(this);
    this.handleDetailsChange = this.handleDetailsChange.bind(this);
    this.handleExerciseChange = this.handleExerciseChange.bind(this);
    this.handleWeightSetRepChange = this.handleWeightSetRepChange.bind(this);
    this.updateWorkout = this.updateWorkout.bind(this);

    // Assumes that we are passed these props, only called from ItemView
    this.state = {
      name: props.values.name,
      desc: props.values.desc,
      exercises: props.values.exercises,
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

  // Try having a seperate event handler for weight/sets/reps
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
  updateWorkout() {
    // Framework for our workout object
    // var workout = {
    //   name: this.state.name,
    //   desc: this.state.desc,
    //   exercises: [],
    // };
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

    //workout.exercises = exercises;

    var update = {
      name: this.state.name,
      desc: this.state.desc,
      exercises: exercises,
    };

    console.log(`/api/users/${this.props.page}/${id}`);
    console.log(update);

    axios
      .put(`/api/users/${this.props.match.params.user}/${this.props.page}/${id}`, { update })
      .then((response) => {
        console.log(response);
      });
  }

  render() {
    return (
      <div>
        <NavBar {...this.props} />

        <div className="workoutCreator">
          <label>
            Workout Name:
            {this.state.name && (
              <input
                type="text"
                name="name"
                value={this.state.name || ""}
                onChange={this.handleDetailsChange}
              />
            )}
          </label>
          <br />

          <label>
            Description:
            {this.state.desc && (
              <input
                type="text"
                name="desc"
                value={this.state.desc || ""}
                onChange={this.handleDetailsChange}
              />
            )}
          </label>

          {this.state.exercises.map((exercise, index) => (
            <ExerciseForm
              key={exercise.id}
              id={exercise.id}
              wsr={exercise.wsr}
              wsrValues={this.state.exercises[index].wsr}
              exerciseValue={this.state.exercises[index].name}
              handleExerciseChange={this.handleExerciseChange}
              handleWeightSetRepChange={this.handleWeightSetRepChange}
              addSet={this.addSet}
            />
          ))}

          <input type="button" value="Add another exercise" onClick={this.addExercise} />
          <input type="button" value={`Update ${this.props.page}`} onClick={this.updateWorkout} />
        </div>
      </div>
    );
  }
}

export default EditForm;
