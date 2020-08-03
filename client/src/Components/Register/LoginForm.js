import React from "react";
import { Button, TextField, Grid } from "@material-ui/core";

class LoginForm extends React.Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <Grid container {...this.props.containerProps}>
          <Grid item xs={12}>
            <TextField
              name="username"
              label="Username"
              autoComplete="username"
              size="small"
              variant="outlined"
              fullWidth={true}
              onChange={this.props.handleChange}
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
              onChange={this.props.handleChange}
              required={true}
            ></TextField>
          </Grid>

          <Grid item xs={12}>
            <Button onClick={this.props.handleClick} color="secondary">
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
}

export default LoginForm;
