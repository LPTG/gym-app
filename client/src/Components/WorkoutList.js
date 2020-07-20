import React from "react";
import ListItem from "./ListItem";
import WorkoutListBody from "./WorkoutListBody";
import _ from "lodash";
import axios from "axios";

class WorkoutList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      workouts: [],
    };

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  componentDidMount() {
    const { user } = this.props.match.params;
    axios.get(`/api/users/${user}/workouts`).then((res) => {
      this.setState({ workouts: res.data.workouts });
    });
  }

  handleOnClick(id) {
    const { user } = this.props.match.params;
    const workouts = _.cloneDeep(this.state.workouts);

    for (let workout of workouts) {
      if (workout._id === id) {
        // Do things with workout
        console.log(`/${user}/workouts/${id}`);
        this.props.history.push(`/${user}/workouts/${id}`);
        console.log(workout._id);
        break;
      }
    }

    this.setState({ workouts });
  }

  render() {
    const { workouts } = this.state;
    return (
      <div>
        <h1>Workout List</h1>
        <ul>
          {workouts.map((workout) => (
            <ListItem key={workout._id} id={workout._id} handleOnClick={this.handleOnClick}>
              <WorkoutListBody name={workout.name} description={workout.desc} />
            </ListItem>
          ))}
        </ul>
      </div>
    );
  }
}

export default WorkoutList;
