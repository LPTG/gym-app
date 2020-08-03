import React from "react";
import auth from "../../Auth";
import { Grid, Button, AppBar, Toolbar } from "@material-ui/core";

class Navbar extends React.Component {
  logout() {
    auth.logout(() => {
      auth.checkSession(() => {
        if (!auth.getAuth()) {
          this.props.history.push(`/`);
        }
      });
    });
  }

  render() {
    return (
      <AppBar position="static" variant="outlined">
        <Toolbar>
          <Grid container justify="space-between" spacing={2}>
            <Grid item>
              <Button
                color="inherit"
                onClick={() => this.props.history.push(`/${auth.user.username}/workouts`)}
              >
                Workouts
              </Button>

              <Button
                color="inherit"
                onClick={() => this.props.history.push(`/${auth.user.username}/templates`)}
              >
                Templates
              </Button>
            </Grid>

            <Grid item>
              <Button
                color="inherit"
                onClick={() => {
                  this.logout();
                }}
              >
                Logout
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Navbar;
