import React from "react";
import axios from "axios";
import EditForm from "../Forms/EditForm";
import WorkoutFromTemplate from "../Forms/WorkoutFromTemplate";

class ItemView extends React.Component {
  constructor(props) {
    super(props);

    this.state = { workout: [], template: [], frame: [] };
  }

  componentDidMount() {
    const user = this.props.match.params.user;
    const page = this.props.page === "templated" ? "templates" : this.props.page;
    const id =
      page === "workouts" ? this.props.match.params.workoutID : this.props.match.params.templateID;

    console.log(this.props.page);
    if (this.props.page !== "templated") {
      axios.get(`/api/users/${user}/${page}/${id}`).then((res) => {
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
    } else {
      console.log("");
      axios.get(`/api/users/${user}/${page}/${id}`).then((res) => {
        let template = res.data;
        let emptyWorkout = {
          name: "",
          desc: "",
          exercises: [],
        };

        template.exercises.forEach((exercise, exerciseIndex) => {
          emptyWorkout.exercises.push({ name: "", id: "exercise" + (exerciseIndex + 1), wsr: [] });

          exercise.wsr.forEach((wsr, wsrIndex) => {
            emptyWorkout.exercises[exerciseIndex].wsr.push({
              weight: "",
              sets: "",
              reps: "",
              id: "wsr" + (wsrIndex + 1),
            });
          });
        });

        this.setState({ template: template, frame: emptyWorkout });
      });
    }
  }

  render() {
    if (this.state.frame.exercises) {
      return (
        <WorkoutFromTemplate
          {...this.props}
          template={this.state.template}
          frame={this.state.frame}
        />
      );
    } else if (this.state.workout.exercises) {
      return <EditForm {...this.props} values={this.state.workout} />;
    } else {
      return (
        <div>
          <h3>Loading...</h3>
        </div>
      );
    }
  }
}

export default ItemView;
