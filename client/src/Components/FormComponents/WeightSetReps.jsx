import React from "react";

class WeightSetReps extends React.Component {
  render() {
    return (
      <div>
        {this.props.fromTemplate && (
          <div>
            <label>
              Weight:
              <input
                type="text"
                id={this.props.parent + "-" + this.props.id + "-w"}
                placeholder={this.props.weightText || ""}
                value={this.props.weightValue || ""}
                onChange={this.props.onWeightChange}
              />
            </label>
            <label>
              Sets:
              <input
                type="text"
                id={this.props.parent + "-" + this.props.id + "-s"}
                placeholder={this.props.setsText || ""}
                value={this.props.setsValue || ""}
                onChange={this.props.onSetChange}
              />
            </label>
            <label>
              Reps:
              <input
                type="text"
                id={this.props.parent + "-" + this.props.id + "-r"}
                placeholder={this.props.repsText || ""}
                value={this.props.repsValue || ""}
                onChange={this.props.onRepChange}
              />
            </label>
          </div>
        )}

        {!this.props.fromTemplate && (
          <div>
            <label>
              Weight:
              <input
                type="text"
                id={this.props.parent + "-" + this.props.id + "-w"}
                value={this.props.weightValue || ""}
                placeholder={this.props.weightText || ""}
                onChange={this.props.onWeightChange}
              />
            </label>
            <label>
              Sets:
              <input
                type="text"
                id={this.props.parent + "-" + this.props.id + "-s"}
                value={this.props.setsValue || ""}
                placeholder={this.props.setsText || ""}
                onChange={this.props.onSetChange}
              />
            </label>
            <label>
              Reps:
              <input
                type="text"
                id={this.props.parent + "-" + this.props.id + "-r"}
                value={this.props.repsValue || ""}
                placeholder={this.props.repsText || ""}
                onChange={this.props.onRepChange}
              />
            </label>
          </div>
        )}
      </div>
    );
  }
}

export default WeightSetReps;
