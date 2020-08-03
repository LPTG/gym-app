import React from "react";
import _ from "lodash";
import axios from "axios";
import NavBar from "../SiteComponents/Navbar";
import ItemCard from "./ItemCard";
import { Grid, Typography, Paper, Button } from "@material-ui/core";
import auth from "../../Auth";

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

    console.log(id);

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
        <NavBar {...this.props} />
        <Grid container justify="center" spacing={2}>
          <Typography variant="h2" component="h2" color="textPrimary">
            {title} List
          </Typography>
        </Grid>
        <Grid container justify="center" spacing={2}>
          {list.map((item) => (
            <Grid item xs={8}>
              <Paper onClick={() => this.handleClick(item._id)}>
                {/* {title === "Template" && (
                  <Link to={`/${this.props.match.params.user}/new-workout/${item._id}`}>
                    <input type="button" value="Use This Template" />
                  </Link>
                )} */}
                <ItemCard
                  raised
                  width="100%"
                  key={item._id}
                  name={item.name}
                  description={item.desc}
                />
              </Paper>
            </Grid>
          ))}
        </Grid>
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
              xs={8}
            >{`Add ${title}`}</Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default ListView;
