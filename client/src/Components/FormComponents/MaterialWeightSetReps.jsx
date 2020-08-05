import React from "react";
import { Grid, TextField } from "@material-ui/core";

class MaterialWeightSetReps extends React.PureComponent {
  render() {
    return (
      <div>
        {this.props.fromTemplate && (
          <Grid container justify="flex-start" spacing={2}>
            <Grid item xs={4} sm={3}>
              <TextField
                id={this.props.parent + "-" + this.props.id + "-w"}
                label="Weight"
                variant="outlined"
                value={this.props.weightValue || ""}
                placeholder={this.props.weightText || ""}
                size="small"
                onChange={this.props.onWeightChange}
              />
            </Grid>

            <Grid item xs={4} sm={3}>
              <TextField
                id={this.props.parent + "-" + this.props.id + "-s"}
                label="Sets"
                variant="outlined"
                value={this.props.setsValue || ""}
                placeholder={this.props.setsText || ""}
                size="small"
                onChange={this.props.onSetChange}
              />
            </Grid>

            <Grid item xs={4} sm={3}>
              <TextField
                id={this.props.parent + "-" + this.props.id + "-r"}
                label="Reps"
                variant="outlined"
                value={this.props.repsValue || ""}
                placeholder={this.props.repsText || ""}
                size="small"
                onChange={this.props.onRepChange}
              />
            </Grid>
          </Grid>
        )}

        {/* // Might not be necessary */}
        {!this.props.fromTemplate && (
          <Grid container justify="flex-start" spacing={2}>
            <Grid item xs={4} sm={3}>
              <TextField
                id={this.props.parent + "-" + this.props.id + "-w"}
                label="Weight"
                variant="outlined"
                value={this.props.weightValue || ""}
                placeholder={this.props.weightText || ""}
                size="small"
                onChange={this.props.onWeightChange}
              />
            </Grid>

            <Grid item xs={4} sm={3}>
              <TextField
                id={this.props.parent + "-" + this.props.id + "-s"}
                label="Sets"
                variant="outlined"
                value={this.props.setsValue || ""}
                placeholder={this.props.setsText || ""}
                size="small"
                onChange={this.props.onSetChange}
              />
            </Grid>

            <Grid item xs={4} sm={3}>
              <TextField
                id={this.props.parent + "-" + this.props.id + "-r"}
                label="Reps"
                variant="outlined"
                value={this.props.repsValue || ""}
                placeholder={this.props.repsText || ""}
                size="small"
                onChange={this.props.onRepChange}
              />
            </Grid>
          </Grid>
        )}
      </div>
    );
  }
}

export default MaterialWeightSetReps;
