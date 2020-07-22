import React from "react";
import axios from "axios";
import WorkoutForm from "./WorkoutForm";

class WorkoutView extends React.Component {
  constructor(props) {
    super(props);

    this.state = { workout: [] };
  }

  componentDidMount() {
    axios
      .get(
        `/api/users/${this.props.match.params.user}/workouts/${this.props.match.params.workoutID}`
      )
      .then((res) => {
        let workout = res.data;
        let updatedExercises = workout.exercises;

        updatedExercises.forEach((exercise, index) => {
          let id = "exercise" + (index + 1);
          exercise.id = id;

          exercise.wsr.forEach((wsr, index) => {
            let currentWsrID = "wsr" + (index + 1);
            wsr.id = currentWsrID;
          });
        });

        this.setState({ workout: workout });
      });
  }

  render() {
    return <WorkoutForm template={this.state.workout} edit={true} />;
  }
}

export default WorkoutView;
