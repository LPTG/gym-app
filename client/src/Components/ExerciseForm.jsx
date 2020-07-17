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

  render() {
    // TODO: Need to make placeholder always show if there is nothing in the input
    return (
      <div className="exerciseForm">
        <label>
          Exercise:
          <input
            type="text"
            id={this.props.id}
            name={this.props.id}
            placeholder={this.props.exerciseName}
            onChange={this.handleExerciseChange}
          />
        </label>

        {this.props.wsr.map((wsr) => (
          <WeightSetReps
            key={wsr.id}
            //wsr={wsr}
            parent={this.props.id}
            id={wsr.id}
            weightText={wsr.weight}
            setsText={wsr.sets}
            repsText={wsr.reps}
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
