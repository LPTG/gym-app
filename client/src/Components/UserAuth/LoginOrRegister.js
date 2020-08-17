import React, { useState } from "react";
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

function Register(props) {
  const [register, setRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // const username = this.state.username;
    // const email = this.state.email;
    // const password = this.state.password;

    if (register) {
      const postData = {
        username,
        email,
        pwd: password,
      };

      // username must be at least 3 characters long
      // password must be at least 8 characters long and contain a special char, regex check?
      // regex check email

      auth.register(postData, () => {
        setRegister(false);
      });
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
            props.history.push(`/${auth.getUser()}/workouts`);
          }
        });
      });
    }
  };

  const handleClick = (e) => {
    setRegister(!register);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const { classes } = props;
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
          {register ? (
            <RegisterForm
              containerProps={containerProps}
              handleSubmit={handleSubmit}
              handleUsernameChange={handleUsernameChange}
              handleEmailChange={handleEmailChange}
              handlePasswordChange={handlePasswordChange}
              handleClick={handleClick}
            />
          ) : (
            <LoginForm
              containerProps={containerProps}
              handleSubmit={handleSubmit}
              handleUsernameChange={handleUsernameChange}
              handlePasswordChange={handlePasswordChange}
              handleClick={handleClick}
            />
          )}
        </Paper>
      </Grid>
      <Grid item />
    </Grid>
  );
}

export default withStyles(useStyles)(Register);
