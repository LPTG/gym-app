import React from "react";
import { withRouter } from "react-router-dom";
import { Grid, Button, AppBar, Toolbar } from "@material-ui/core";

class Navbar extends React.Component {
  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <Grid container justify="space-between" spacing={24}>
            <Grid item>
              <Button
                flexGrow={1}
                color="inherit"
                onClick={() => this.props.history.push(`/${this.props.user}/workouts`)}
              >
                Workouts
              </Button>

              <Button
                color="inherit"
                onClick={() => this.props.history.push(`/${this.props.user}/templates`)}
              >
                Templates
              </Button>
            </Grid>

            <Grid item>
              <Button color="inherit">Logout</Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withRouter(Navbar);
