import React from "react";
import auth from "../../Auth";
import { Grid, Button, AppBar, Toolbar } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const useStyles = (theme) => ({
  navButton: {
    minHeight: 60,
  },
});

function Navbar(props) {
  const logout = () => {
    auth.logout(() => {
      auth.checkSession(() => {
        if (!auth.getAuth()) {
          props.history.push(`/`);
        }
      });
    });
  };

  const { classes } = props;

  return (
    <Grid container>
      <Grid item xs={12}>
        <AppBar position="static" variant="outlined" color="primary">
          <Toolbar variant="dense">
            <Grid container direction="row" justify="space-between">
              <Grid item>
                <Button
                  className={classes.navButton}
                  size="large"
                  color="inherit"
                  onClick={() => props.history.push(`/${auth.getUser()}/workouts`)}
                >
                  Workouts
                </Button>

                <Button
                  className={classes.navButton}
                  size="large"
                  color="inherit"
                  onClick={() => props.history.push(`/${auth.getUser()}/templates`)}
                >
                  Templates
                </Button>
              </Grid>

              <Grid item>
                <Button
                  className={classes.navButton}
                  size="large"
                  color="inherit"
                  onClick={() => {
                    logout();
                  }}
                >
                  Logout
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Grid>
    </Grid>
  );
}

export default withStyles(useStyles)(Navbar);
