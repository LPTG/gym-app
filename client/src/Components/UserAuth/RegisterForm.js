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
            variant="outlined"
            fullWidth={true}
            onChange={props.handleUsernameChange}
            required={true}
          ></TextField>
        </Grid>

        <Grid item xs={12}>
          <TextField
            name="email"
            label="Email"
            autoComplete="email"
            size="small"
            variant="outlined"
            fullWidth={true}
            onChange={props.handleEmailChange}
            required={true}
          ></TextField>
        </Grid>

        <Grid item xs={12}>
          <TextField
            type="password"
            name="password"
            label="Password"
            autoComplete="password"
            size="small"
            variant="outlined"
            fullWidth={true}
            onChange={props.handlePasswordChange}
            required={true}
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
