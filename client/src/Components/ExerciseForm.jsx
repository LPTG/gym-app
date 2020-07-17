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
            placeholder={this.props.exercisePlaceholder}
            onChange={this.handleExerciseChange}
          />
        </label>

        {this.props.wsr.map((wsr, index) => (
          <WeightSetReps
            key={wsr.id}
            parent={this.props.id}
            id={wsr.id}
            weightText={this.props.wsrPlaceholders[index].weight}
            setsText={this.props.wsrPlaceholders[index].sets}
            repsText={this.props.wsrPlaceholders[index].reps}
            onWeightChange={this.handleWeightChange}
            onSetChange={this.handleSetChange}
            onRepChange={this.handleRepChange}
          />
        ))}

        {this.props.wsrPlaceholders[0].weight}

        <input type="button" value="Add another set" onClick={this.handleClick} />
      </div>
    );
  }
}

export default ExerciseForm;
