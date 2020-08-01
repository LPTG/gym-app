import React from "react";
import "./Register.css";
import { Box, Paper, TextField, Grid } from "@material-ui/core";
import { Button } from "@material-ui/core";
import auth from "../../Auth";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = { registerView: false };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
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
    this.setState({ registerView: !this.state.registerView });
  }

  render() {
    return (
      <div className="loginOrRegister">
        <Grid container direction="column" alignItems="center" spacing={3}>
          <Paper variant="outlined">
            <Box m={3}>
              <form onSubmit={this.handleSubmit}>
                <Box mt={2}>
                  <TextField
                    name="username"
                    label="Username"
                    autoComplete="username"
                    size="small"
                    variant="outlined"
                    onChange={this.handleChange}
                    required={true}
                  ></TextField>
                </Box>

                {this.state.registerView && (
                  <div>
                    <Box mt={2}>
                      <TextField
                        name="email"
                        label="Email"
                        autoComplete="email"
                        size="small"
                        variant="outlined"
                        onChange={this.handleChange}
                        required={true}
                      ></TextField>
                    </Box>

                    <Box mt={2}>
                      <TextField
                        type="password"
                        name="password"
                        label="Password"
                        autoComplete="password"
                        size="small"
                        variant="outlined"
                        onChange={this.handleChange}
                        required={true}
                      ></TextField>
                    </Box>
                  </div>
                )}

                {!this.state.registerView && (
                  <div>
                    <Box mt={2}>
                      <TextField
                        type="password"
                        name="password"
                        label="Password"
                        autoComplete="password"
                        size="small"
                        variant="outlined"
                        onChange={this.handleChange}
                        required={true}
                      ></TextField>
                    </Box>
                  </div>
                )}
                <Box mt={1}>
                  <Button onClick={this.handleClick} color="secondary">
                    {this.state.registerView ? "Already Registered?" : "Need to Register?"}
                  </Button>
                </Box>
                <Box mt={2}>
                  <Button type="submit" variant="contained" color="primary">
                    {this.state.registerView ? "Register" : "Login"}
                  </Button>
                </Box>
              </form>
            </Box>
          </Paper>
        </Grid>
      </div>
    );
  }
}

export default Register;
