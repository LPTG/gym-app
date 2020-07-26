import React from "react";
import ListBody from "./ListBody";
import ListItem from "./ListItem";
import _ from "lodash";
import axios from "axios";
import NavBar from "../SiteComponents/Navbar";

class ListView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { user } = this.props.match.params;
    const page = this.props.page;

    axios.get(`/api/users/${user}/${page}`).then((res) => {
      if (page === "workouts") this.setState({ list: res.data.workouts });
      else if (page === "templates") this.setState({ list: res.data.templates });
    });
  }

  handleClick(id) {
    const { user } = this.props.match.params;
    const page = this.props.page;
    let list = [];

    if (page === "workouts") list = _.cloneDeep(this.state.list);
    else list = _.cloneDeep(this.state.list);

    for (let item of list) {
      if (item._id === id) {
        this.props.history.push(`/${user}/${page}/${id}`);
        break;
      }
    }
  }

  render() {
    const { list } = this.state;
    const title = this.props.page === "workouts" ? "Workout" : "Template";

    return (
      <div>
        <NavBar user={this.props.match.params.user} />

        <h1>{title} List</h1>
        <ul>
          {list.map((item) => (
            <ListItem key={item._id} id={item._id} handleClick={this.handleClick}>
              <ListBody name={item.name} description={item.desc} />
            </ListItem>
          ))}
        </ul>
        <input
          type="button"
          value={`Add ${title}`}
          onClick={() => {
            if (title === "Workout") {
              this.props.history.push(`/${this.props.match.params.user}/new-workout`);
            } else {
              this.props.history.push(`/${this.props.match.params.user}/new-template`);
            }
          }}
        />
      </div>
    );
  }
}

export default ListView;
