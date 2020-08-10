import React from "react";
import { Button, TextField, Grid } from "@material-ui/core";

function LoginForm(props) {
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
            Need to Register?
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default LoginForm;
