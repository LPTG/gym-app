import React from "react";
import { Button, TextField, Grid } from "@material-ui/core";

function RegisterForm(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <Grid container {...props.containerProps}>
        <Grid item xs={12}>
          <TextField
            name="username"
            label="Username"
            autoComplete="username"
            size="small"
            variant="filled"
            color="secondary"
            fullWidth={true}
            onChange={props.handleUsernameChange}
            required={true}
            error={props.usernameError !== ""}
            helperText={props.usernameError}
          ></TextField>
        </Grid>

        <Grid item xs={12}>
          <TextField
            name="email"
            label="Email"
            autoComplete="email"
            size="small"
            variant="filled"
            color="secondary"
            fullWidth={true}
            onChange={props.handleEmailChange}
            required={true}
            error={props.emailError !== ""}
            helperText={props.emailError}
          ></TextField>
        </Grid>

        <Grid item xs={12}>
          <TextField
            type="password"
            name="password"
            label="Password"
            autoComplete="password"
            size="small"
            variant="filled"
            color="secondary"
            fullWidth={true}
            onChange={props.handlePasswordChange}
            required={true}
            error={props.passwordError !== ""}
            helperText={props.passwordError}
          ></TextField>
        </Grid>

        <Grid item xs={12}>
          <Button onClick={props.handleClick} color="secondary">
            Already Registered?
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="secondary">
            Register
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default RegisterForm;
