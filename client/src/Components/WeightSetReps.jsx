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

export default WeightSetReps;
