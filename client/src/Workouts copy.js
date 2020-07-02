import React from "react";
import axios from "axios";
import "./Workouts.css";

class SetsAndReps extends React.Component {
  render() {
    return (
      <div>
        <label>
          Sets:
          <input type="text" name="sets" />
        </label>
        <label>
          Reps:
          <input type="text" name="reps" />
        </label>
      </div>
    );
  }
}

class ExerciseForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { sets: [{ id: "set1" }] };
    this.addSet = this.addSet.bind(this);
  }

  addSet() {
    const sets = this.state.sets.slice();
    const updatedSets = sets.concat([{ id: "sets" + (this.state.sets.length + 1) }]);
    console.log(updatedSets);
    this.setState({ sets: updatedSets });
  }

  render() {
    return (
      <div className="exerciseForm">
        <label>
          Exercise:
          <input type="text" name="exercise" />
        </label>
        {this.state.sets.map((sets) => (
          <SetsAndReps key={sets.id} />
        ))}
        <input type="button" value="Add another set" onClick={this.addSet} />
      </div>
    );
  }
}

class WorkoutCreator extends React.Component {
  constructor(props) {
    super(props);

    this.state = { exercises: [{ id: "exercise1" }] };
    this.addExercise = this.addExercise.bind(this);
  }

  addExercise() {
    const exercises = this.state.exercises.slice();
    const updatedExercises = exercises.concat([
      { id: "exercise" + (this.state.exercises.length + 1) },
    ]);
    console.log(updatedExercises);
    this.setState({ exercises: updatedExercises });
  }

  render() {
    return (
      <div className="workoutCreator">
        <label>
          Workout Name:
          <input type="text" name="name" />
        </label>
        <br />
        <label>
          Description:
          <input type="text" name="desc" />
        </label>
        {this.state.exercises.map((exercise) => (
          <ExerciseForm key={exercise.id} />
        ))}
        <input type="button" value="Add another exercise" onClick={this.addExercise} />
      </div>
    );
  }
}

export default WorkoutCreator;
