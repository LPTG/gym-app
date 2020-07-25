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
    const { user } = this.props.match.params;
    axios.get(`/api/${user}/lukas/templates`).then((res) => {
      this.setState({ templates: res.data.templates });
    });
  }

  handleOnClick(id) {
    const { user } = this.props.match.params;
    const templates = _.cloneDeep(this.state.templates);

    for (let template of templates) {
      if (template._id === id) {
        console.log(`/${user}/templates/${id}`);
        this.props.history.push(`/${user}/templates/${id}`);
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
        <input
          type="button"
          value="Add Template"
          onClick={() => {
            this.props.history.push(`/${this.props.match.params.user}/workout-form`);
          }}
        />
      </div>
    );
  }
}

export default TemplateList;
