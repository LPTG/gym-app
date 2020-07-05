import React from "react";
import axios from "axios";
import "./Workouts.css";

class SetsAndReps extends React.Component {
  render() {
    return (
      <div>
        <label>
          Weight:
          <input
            type="text"
            id={this.props.parent + "-" + this.props.id + "-w"}
            onChange={this.props.onWeightChange}
          />
        </label>
        <label>
          Sets:
          <input
            type="text"
            id={this.props.parent + "-" + this.props.id + "-s"}
            onChange={this.props.onSetChange}
          />
        </label>
        <label>
          Reps:
          <input
            type="text"
            id={this.props.parent + "-" + this.props.id + "-r"}
            onChange={this.props.onRepChange}
          />
        </label>
      </div>
    );
  }
}

class ExerciseForm extends React.Component {
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
    this.props.addSet(this.props.exercise.id);
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
      <div className="exerciseForm">
        <label>
          Exercise:
          <input
            type="text"
            id={this.props.exercise.id}
            name={this.props.exercise.id}
            onChange={this.handleExerciseChange}
          />
        </label>

        {this.props.exercise.setsAndReps.map((sets) => (
          <SetsAndReps
            key={sets.id}
            wsr={sets}
            parent={this.props.id}
            id={sets.id}
            onWeightChange={this.handleWeightChange}
            onSetChange={this.handleSetChange}
            onRepChange={this.handleRepChange}
          />
        ))}

        <input type="button" value="Add another set" onClick={this.handleClick} />
      </div>
    );
  }
}

class WorkoutCreator extends React.Component {
  constructor(props) {
    super(props);
    // Set initial state of workout: 1 exercise with 1 set
    this.state = {
      name: "",
      desc: "",
      exercises: [
        {
          id: "exercise1",
          name: "",
          setsAndReps: [{ id: "wsr1", weight: "", sets: "", reps: "" }],
        },
      ],
    };

    this.addExercise = this.addExercise.bind(this);
    this.addSet = this.addSet.bind(this);
    this.handleDetailsChange = this.handleDetailsChange.bind(this);
    this.handleExerciseChange = this.handleExerciseChange.bind(this);
    this.handleWeightSetRepChange = this.handleWeightSetRepChange.bind(this);
    this.createWorkout = this.createWorkout.bind(this);
  }

  addExercise() {
    // Copy the exercises array
    const exercises = this.state.exercises.slice();

    // Add a new exercise with a single set
    const updatedExercises = exercises.concat([
      {
        id: "exercise" + (this.state.exercises.length + 1),
        setsAndReps: [{ id: "wsr1", weight: "", sets: "", reps: "" }],
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
    exerciseCopy[exerciseIndex].setsAndReps = exerciseCopy[exerciseIndex].setsAndReps.concat([
      { id: "wsr" + (exerciseCopy[exerciseIndex].setsAndReps.length + 1) },
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

  handleWeightSetRepChange(event) {
    const target = event.target;

    const targetSplit = target.id.split("-");
    const exerciseID = targetSplit[0];
    const wsrID = targetSplit[1];

    // Find the index of the modified exercise name
    var exerciseIndex = this.state.exercises.findIndex((ex) => ex.id === exerciseID);
    // Find the index of the modified weight, set, or rep
    var wsrIndex = this.state.exercises[exerciseIndex].setsAndReps.findIndex(
      (wsr) => wsr.id === wsrID
    );
    // Create a copy of that wsr
    var wsrCopy = { ...this.state.exercises[exerciseIndex].setsAndReps[wsrIndex] };
    // Update the value of the weight, set, or rep
    if (targetSplit[2] === "w") wsrCopy.weight = target.value;
    if (targetSplit[2] === "s") wsrCopy.sets = target.value;
    if (targetSplit[2] === "r") wsrCopy.reps = target.value;

    // Create a copy of the current state
    var stateCopy = { ...this.state };
    // Replace the current state's wsr with our updated version
    stateCopy.exercises[exerciseIndex].setsAndReps[wsrIndex] = wsrCopy;

    this.setState(stateCopy);
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
      exercise.setsAndReps.forEach((set) => {
        sets.push({ weight: set.weight, sets: set.sets, reps: set.reps });
      });

      exercises.push({ name: exercise.name, wsr: sets });
    });

    workout.exercises = exercises;

    var postData = {
      userID: "5ef1388db4e22d4280fe896d",
      workout: workout,
    };

    console.log("Sending workout to server...");
    axios.post("http://localhost:3001/workout/create", postData).then((response) => {
      console.log(response);
    });
  }

  render() {
    return (
      <div className="workoutCreator">
        <label>
          Workout Name:
          <input type="text" name="name" onChange={this.handleDetailsChange} />
        </label>
        <br />

        <label>
          Description:
          <input type="text" name="desc" onChange={this.handleDetailsChange} />
        </label>

        {this.state.exercises.map((exercise) => (
          <ExerciseForm
            key={exercise.id}
            id={exercise.id}
            exercise={exercise}
            handleExerciseChange={this.handleExerciseChange}
            handleWeightSetRepChange={this.handleWeightSetRepChange}
            addSet={this.addSet}
          />
        ))}

        <input type="button" value="Add another exercise" onClick={this.addExercise} />
        <input type="button" value="Create Workout" onClick={this.createWorkout} />
      </div>
    );
  }
}

export default WorkoutCreator;
