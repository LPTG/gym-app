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
    return (
      <div className="exerciseForm">
        <label>
          Exercise:
          <input
            type="text"
            id={this.props.id}
            name={this.props.id}
            value={this.props.exerciseValue || ""}
            placeholder={this.props.exercisePlaceholder || ""}
            onChange={this.handleExerciseChange}
          />
        </label>

        {this.props.wsrPlaceholders &&
          this.props.wsr.map((wsr, index) => (
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

        {!this.props.wsrPlaceholders &&
          this.props.wsrValues &&
          this.props.wsr.map((wsr, index) => (
            <WeightSetReps
              key={wsr.id}
              parent={this.props.id}
              id={wsr.id}
              weightValue={this.props.wsrValues[index].weight}
              setsValue={this.props.wsrValues[index].sets}
              repsValue={this.props.wsrValues[index].reps}
              onWeightChange={this.handleWeightChange}
              onSetChange={this.handleSetChange}
              onRepChange={this.handleRepChange}
            />
          ))}

        {!this.props.wsrPlaceholders &&
          !this.props.wsrValues &&
          this.props.wsr.map((wsr) => (
            <WeightSetReps
              key={wsr.id}
              parent={this.props.id}
              id={wsr.id}
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
