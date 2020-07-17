import React from "react";
import axios from "axios";
import WorkoutForm from "./WorkoutForm";

class WorkoutView extends React.Component {
  constructor(props) {
    super(props);

    this.state = { workouts: [] };
  }

  componentDidMount() {
    axios.get("/api/users/lukas/workouts/5ef3ab5135291e460cf67688").then((res) => {
      this.setState({ workouts: res.data });
    });
  }

  render() {
    return <WorkoutForm template={this.state.workouts} edit={true} />;
  }
}

export default WorkoutView;
