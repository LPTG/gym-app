import React from "react";
import "./Register.css";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import auth from "../../Auth";
import { withStyles } from "@material-ui/core/styles";
import { Paper, Grid, Typography } from "@material-ui/core";

const useStyles = (theme) => ({
  title: {
    textAlign: "center",
  },
  paper: {
    padding: theme.spacing(2),
    maxWidth: 500,
  },
});

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = { registerView: false };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    auth.checkSession(() => {
      if (auth.getAuth()) {
        const user = auth.getUser().username;
        this.props.history.push(`/${user}/workouts`);
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const username = this.state.username;
    const email = this.state.email;
    const password = this.state.password;

    if (this.state.registerView) {
      const postData = {
        username,
        email,
        password,
      };

      // username must be at least 3 characters long
      // password must be at least 8 characters long and contain a special char, regex check?
      // regex check email

      auth.register(postData);
    } else {
      const postData = {
        username,
        password,
      };

      // username must be at least 3 characters long
      // password must be at least 8 characters long and contain a special char, regex check?

      auth.login(postData, () => {
        auth.checkSession(() => {
          if (auth.getAuth()) {
            const user = auth.getUser().username;
            this.props.history.push(`/${user}/workouts`);
          }
        });
      });
    }
  }

  handleChange(event) {
    const target = event.target;

    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleClick(event) {
    // Toggle to show email field or not
    console.log("Changing registerView");
    this.setState({ registerView: !this.state.registerView });
  }

  render() {
    const { classes } = this.props;
    const containerProps = {
      justify: "flex-end",
      spacing: 1,
    };

    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="space-evenly"
        style={{ minHeight: "100vh", backgroundColor: "#90DDF0" }}
      >
        <Grid item />
        <Grid item xs={12} md={8}>
          <Typography className={classes.title} variant="h1" component="h1" color="textPrimary">
            Workout Creator
          </Typography>
        </Grid>

        <Grid item xs={6} md={2}>
          <Paper className={classes.paper} elevation={10} style={{ backgroundColor: "#F0EDEE" }}>
            {this.state.registerView ? (
              <RegisterForm
                containerProps={containerProps}
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
                handleClick={this.handleClick}
              />
            ) : (
              <LoginForm
                containerProps={containerProps}
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
                handleClick={this.handleClick}
              />
            )}
          </Paper>
        </Grid>
        <Grid item />
      </Grid>
    );
  }
}

export default withStyles(useStyles)(Register);
