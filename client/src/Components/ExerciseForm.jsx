import React from "react";
import WeightSetReps from "./WeightSetReps";

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

        {this.props.exercise.wsr.map((sets) => (
          <WeightSetReps
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

export default ExerciseForm;
