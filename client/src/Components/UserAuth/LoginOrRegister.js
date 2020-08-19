import React, { useState } from "react";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import auth from "../../Auth";
import { useTheme } from "@material-ui/core/styles";
import { Paper, Grid, Typography } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import Collapse from "@material-ui/core/Collapse";

function Register(props) {
  let theme = useTheme();
  const containerProps = {
    justify: "flex-end",
    spacing: 1,
  };

  const emailRegex = /^(\D)+(\w)*((\.(\w)+)?)+@(\D)+(\w)*((\.(\D)+(\w)*)+)?(\.)[a-z]{2,}$/;

  const [register, setRegister] = useState(false);

  const [alertMessage, setAlertMessage] = useState("");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (register) {
      const postData = {
        username,
        email,
        pwd: password,
      };

      auth.register(postData, () => {
        setRegister(false);
      });
    } else {
      const postData = {
        username,
        password,
      };

      auth.login(postData, (res) => {
        if (res.error) setAlertMessage(res.error);

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

  const handleRegisterUsernameChange = (e) => {
    if (e.target.value.length < 3 || e.target.value.length > 15) {
      setUsernameError("Username must be between 3-15 characters long.");
    } else if (usernameError !== "") {
      setUsernameError("");
    }

    setUsername(e.target.value);
  };

  const handleRegisterEmailChange = (e) => {
    if (e.target.value.length > 320) {
      setEmailError("Email must be less than 320 characters long.");
    } else if (!emailRegex.test(e.target.value)) {
      setEmailError("Please enter a valid email address.");
    } else if (emailError !== "") {
      setEmailError("");
    }

    setEmail(e.target.value);
  };

  const handleRegisterPasswordChange = (e) => {
    if (e.target.value.length < 6 || e.target.value.length > 20) {
      setPasswordError("Password must be between 6-20 characters long.");
    } else if (passwordError !== "") {
      setPasswordError("");
    }

    setPassword(e.target.value);
  };

  const handleLoginUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleLoginPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="space-evenly"
      style={{ minHeight: "100vh", backgroundColor: theme.palette.background.default }}
    >
      <Collapse in={alertMessage !== ""}>
        <Alert
          severity="error"
          onClose={() => {
            setAlertMessage("");
          }}
        >
          {alertMessage}
        </Alert>
      </Collapse>
      <Grid item />

      <Grid item xs={12} md={12}>
        <Typography
          align="center"
          variant="h1"
          component="h1"
          style={{ color: theme.palette.text.white }}
        >
          <b> Workout Creator </b>{" "}
          <span role="img" aria-label="weightlifter">
            🏋
          </span>
        </Typography>
      </Grid>

      <Grid item xs={12} sm={5} md={3}>
        <Paper
          elevation={10}
          style={{
            background: theme.palette.primary.main,
            padding: theme.spacing(2),
            maxWidth: 500,
            minWidth: 250,
          }}
        >
          {register ? (
            <RegisterForm
              containerProps={containerProps}
              handleSubmit={handleSubmit}
              handleUsernameChange={handleRegisterUsernameChange}
              usernameError={usernameError}
              handleEmailChange={handleRegisterEmailChange}
              emailError={emailError}
              handlePasswordChange={handleRegisterPasswordChange}
              passwordError={passwordError}
              handleClick={handleClick}
            />
          ) : (
            <LoginForm
              containerProps={containerProps}
              handleSubmit={handleSubmit}
              handleUsernameChange={handleLoginUsernameChange}
              handlePasswordChange={handleLoginPasswordChange}
              handleClick={handleClick}
            />
          )}
        </Paper>
      </Grid>
      <Grid item />
    </Grid>
  );
}

export default Register;
