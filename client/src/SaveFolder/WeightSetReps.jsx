import React from "react";

class WeightSetReps extends React.Component {
  render() {
    return (
      <div>
        <label>
          Weight:
          <input
            type="text"
            id={this.props.parent + "-" + this.props.id + "-w"}
            placeholder={this.props.weightText}
            onChange={this.props.onWeightChange}
          />
        </label>
        <label>
          Sets:
          <input
            type="text"
            id={this.props.parent + "-" + this.props.id + "-s"}
            placeholder={this.props.setsText}
            onChange={this.props.onSetChange}
          />
        </label>
        <label>
          Reps:
          <input
            type="text"
            id={this.props.parent + "-" + this.props.id + "-r"}
            placeholder={this.props.repsText}
            onChange={this.props.onRepChange}
          />
        </label>
      </div>
    );
  }
}

export default WeightSetReps;
