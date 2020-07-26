import React from "react";
import axios from "axios";
import EditForm from "../Forms/EditForm";

class ItemView extends React.Component {
  constructor(props) {
    super(props);

    this.state = { workout: [] };
  }

  componentDidMount() {
    const user = this.props.match.params.user;
    const page = this.props.page;
    const id =
      page === "workouts" ? this.props.match.params.workoutID : this.props.match.params.templateID;

    axios.get(`/api/users/${user}/${page}/${id}`).then((res) => {
      console.log(res);
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
    if (this.state.workout.exercises) {
      //console.log(this.state.workout);
      return <EditForm {...this.props} values={this.state.workout} />;
    } else {
      console.log("loading now");
      return (
        <div>
          <h3>Loading...</h3>
        </div>
      );
    }
  }
}

export default ItemView;
