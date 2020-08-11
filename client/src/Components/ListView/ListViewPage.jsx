import React from "react";
import _ from "lodash";
import axios from "axios";
import ItemList from "./ItemList";
import { Grid, Typography, Button } from "@material-ui/core";
import auth from "../../Auth";

class ListViewPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const page = this.props.page;

    axios.get(`/api/users/${auth.getUser().username}/${page}`).then((res) => {
      if (page === "workouts") this.setState({ list: res.data.workouts });
      else if (page === "templates") this.setState({ list: res.data.templates });
    });
  }

  handleClick(id) {
    const page = this.props.page;
    let list = [];

    if (page === "workouts") list = _.cloneDeep(this.state.list);
    else list = _.cloneDeep(this.state.list);

    for (let item of list) {
      if (item._id === id) {
        this.props.history.push(`/${auth.getUser().username}/${page}/${id}`);
        break;
      }
    }
  }

  render() {
    const { list } = this.state;
    const title = this.props.page === "workouts" ? "Workout" : "Template";

    return (
      <div>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          styles={{ backgroundColor: "blue" }}
        >
          <Grid item>
            <Typography variant="h2" component="h2" color="textPrimary">
              {title}s
            </Typography>
          </Grid>
        </Grid>

        {title === "Workout" && <ItemList list={list} handleClick={this.handleClick} />}
        {title === "Template" && (
          <ItemList list={list} handleClick={this.handleClick} templateCard={true} />
        )}

        <Grid container justify="center" spacing={2}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                if (title === "Workout") {
                  this.props.history.push(`/${this.props.match.params.user}/new-workout`);
                } else {
                  this.props.history.push(`/${this.props.match.params.user}/new-template`);
                }
              }}
            >{`Add ${title}`}</Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default ListViewPage;
