import React from "react";
import axios from "axios";
import "./Workouts.css";
import ExerciseForm from "./ExerciseForm";
import { cloneDeep } from "lodash";
import NavBar from "./Navbar";
import { withRouter } from "react-router-dom";

class TemplateCreator extends React.Component {
  constructor(props) {
    super(props);

    this.addExercise = this.addExercise.bind(this);
    this.addSet = this.addSet.bind(this);
    this.handleDetailsChange = this.handleDetailsChange.bind(this);
    this.handleExerciseChange = this.handleExerciseChange.bind(this);
    this.handleWeightSetRepChange = this.handleWeightSetRepChange.bind(this);
    this.createWorkout = this.createWorkout.bind(this);
    this.getName = this.getName.bind(this);
    this.getWsr = this.getWsr.bind(this);

    // If we're editing then we want a blank slate to start with
    if (this.props.edit === true) {
      this.state = {
        name: "",
        desc: "",
        exercises: [],
      };
    } else {
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
  }

  componentDidUpdate(prevProps) {
    if (this.props.template !== prevProps.template) {
      this.setState({
        name: this.props.template.name,
        desc: this.props.template.desc,
        exercises: this.props.template.exercises,
      });
    }
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

    var postData = {
      userID: "5ef1388db4e22d4280fe896d",
      workout: workout,
    };

    console.log("Sending workout to server...");
    axios.post("http://localhost:3001/workout/create", postData).then((response) => {
      console.log(response);
    });
  }

  getName(index) {
    return this.props.template.exercises[index] ? this.props.template.exercises[index].name : "";
  }

  getWsr(index) {
    if (this.props.template.exercises[index]) {
      return this.props.template.exercises[index].wsr;
    } else {
      return this.state.exercises[index].wsr;
    }
  }

  render() {
    return (
      <div>
        <NavBar user={this.props.match.params.user} />

        <div className="workoutCreator">
          <label>
            Workout Name:
            <input
              type="text"
              name="name"
              placeholder={this.props.template.name}
              onChange={this.handleDetailsChange}
            />
          </label>
          <br />

          <label>
            Description:
            <input
              type="text"
              name="desc"
              placeholder={this.props.template.desc}
              onChange={this.handleDetailsChange}
            />
          </label>

          {this.state.exercises.map((exercise, index) => (
            <ExerciseForm
              key={exercise.id}
              id={exercise.id}
              wsr={exercise.wsr}
              wsrPlaceholders={this.getWsr(index)}
              exercisePlaceholder={this.getName(index)}
              handleExerciseChange={this.handleExerciseChange}
              handleWeightSetRepChange={this.handleWeightSetRepChange}
              addSet={this.addSet}
            />
          ))}

          {/* {this.props.edit && this.state.exercises.map((exercise) => (
          <ExerciseForm
            key={this.test()}
            id={exercise.id}
            wsr={exercise.wsr}
            exercise={exercise}
            handleExerciseChange={this.handleExerciseChange}
            handleWeightSetRepChange={this.handleWeightSetRepChange}
            addSet={this.addSet}
          />
        ))} */}

          <input type="button" value="Add another exercise" onClick={this.addExercise} />
          <input type="button" value="Create Workout" onClick={this.createWorkout} />
        </div>
      </div>
    );
  }
}

export default withRouter(TemplateCreator);
