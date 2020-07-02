import React from "react";
import axios from "axios";
import "./Workouts.css";

class SetsAndReps extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onSetOrRepChange(event);
  }

  render() {
    return (
      <div>
        <label>
          Sets:
          <input type="text" name={"set" + this.props.name} onChange={this.handleChange} />
        </label>
        <label>
          Reps:
          <input type="text" name={"rep" + this.props.name} onChange={this.handleChange} />
        </label>
      </div>
    );
  }
}

class ExerciseForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick() {
    // Add a set to the current exercise
    this.props.addSet(this.props.exercise.id);
  }

  handleChange(event) {
    this.props.handleChange(event);
  }

  render() {
    //const exerciseIndex = this.props.exercises.find(this.props.exercises.id).setsAndReps;

    return (
      <div className="exerciseForm">
        <label>
          Exercise:
          <input type="text" name={this.props.exercise.id} onChange={this.handleChange} />
        </label>

        {this.props.exercise.setsAndReps.map((sets) => (
          <SetsAndReps key={sets.id} name={sets.id} onSetOrRepChange={this.handleChange} />
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
    this.state = { exercises: [{ id: "exercise1", setsAndReps: [{ id: "1" }] }] };
    this.addExercise = this.addExercise.bind(this);
    this.addSet = this.addSet.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  addExercise() {
    // Copy the exercises array
    const exercises = this.state.exercises.slice();
    // Add a new exercise with a single set
    const updatedExercises = exercises.concat([
      { id: "exercise" + (this.state.exercises.length + 1), setsAndReps: [{ id: "1" }] },
    ]);
    console.log(updatedExercises);
    // Update the state of the exercises
    this.setState({ exercises: updatedExercises });
  }

  addSet(exerciseID) {
    console.log(exerciseID);
    // Copy the exercises array
    const exerciseCopy = this.state.exercises.slice();
    console.log(exerciseCopy);
    // Get index of current exercise
    const exerciseIndex = exerciseCopy.findIndex((x) => x.id === exerciseID);
    console.log(exerciseCopy[exerciseIndex].setsAndReps);
    // Add a new set to the current exercise
    exerciseCopy[exerciseIndex].setsAndReps = exerciseCopy[exerciseIndex].setsAndReps.concat([
      { id: exerciseCopy[exerciseIndex].setsAndReps.length + 1 },
    ]);
    console.log(exerciseCopy);
    // Update the state of the exercises
    this.setState({ exercises: exerciseCopy });
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    //const key = target.key;
    console.log(this.state.exercises);
    console.log("Change detected on " + name + ": " + value);

    // this.setState({
    //   exercises:
    // })
    // this.setState({
    //   [name]: value,
    // });
  }

  render() {
    return (
      <div className="workoutCreator">
        <label>
          Workout Name:
          <input type="text" name="name" onChange={this.handleChange} />
        </label>
        <br />

        <label>
          Description:
          <input type="text" name="desc" onChange={this.handleChange} />
        </label>

        {this.state.exercises.map((exercise) => (
          <ExerciseForm
            key={exercise.id}
            exercise={exercise}
            handleChange={this.handleChange}
            addSet={this.addSet}
          />
        ))}

        <input type="button" value="Add another exercise" onClick={this.addExercise} />
      </div>
    );
  }
}

export default WorkoutCreator;
