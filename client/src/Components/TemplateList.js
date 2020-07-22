import React from "react";
import ListItem from "./ListItem";
import WorkoutListBody from "./WorkoutListBody";
import _ from "lodash";
import axios from "axios";
import NavBar from "./Navbar";

class TemplateList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      templates: [],
    };

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  componentDidMount() {
    axios.get("/api/users/lukas/templates").then((res) => {
      this.setState({ templates: res.data.templates });
    });
  }

  handleOnClick(id) {
    const templates = _.cloneDeep(this.state.templates);

    for (let template of templates) {
      if (template._id === id) {
        // Do things with template
        console.log(template._id);
        break;
      }
    }

    this.setState({ templates });
  }

  render() {
    const { templates } = this.state;
    return (
      <div>
        <NavBar user={this.props.match.params.user} />

        <h1>Template List</h1>
        <ul>
          {templates.map((template) => (
            <ListItem key={template._id} id={template._id} handleOnClick={this.handleOnClick}>
              <WorkoutListBody name={template.name} description={template.desc} />
            </ListItem>
          ))}
        </ul>
      </div>
    );
  }
}

export default TemplateList;
