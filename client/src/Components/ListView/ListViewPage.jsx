import React, { useState, useEffect } from "react";
//import axios from "axios";
import ItemList from "./ItemList";
import { Box, Grid, Typography, Button, CircularProgress } from "@material-ui/core";
import { getWorkouts, getTemplates } from "../HelperFunctions/RequestFunctions";
import auth from "../../Auth";

function ListViewPage(props) {
  const [list, setList] = useState(null);

  useEffect(() => {
    // Fetch workouts or templates depending on the page prop
    (async () => {
      if (props.page === "workouts") {
        let workouts = await getWorkouts(auth.getUser());
        if (workouts.error) console.log(workouts.error);
        else setList(workouts.workouts);
      } else if (props.page === "templates") {
        let templates = await getTemplates(auth.getUser());
        if (templates.error) console.log(templates.error);
        else setList(templates.templates);
      }
    })();
  }, [props.page]);

  const handleClick = (id) => {
    // Find item in list that has the id of the clicked card
    for (let item of list) {
      if (item._id === id) {
        // Then redirect to that page
        props.history.push(`/${auth.getUser()}/${props.page}/${id}`);
        break;
      }
    }
  };

  const title = props.page === "workouts" ? "Workout" : "Template";

  if (list) {
    return (
      <Grid container>
        <Grid
          container
          item
          direction="column"
          justify="center"
          alignItems="center"
          styles={{ backgroundColor: "blue" }}
        >
          <Box m={2}>
            <Typography variant="h2" component="h2" color="textPrimary">
              <b>{title}s</b>
            </Typography>
          </Box>
        </Grid>

        <ItemList list={list} handleClick={handleClick} templateCard={props.page === "templates"} />

        <Grid container item justify="center" spacing={2}>
          <Grid item>
            <Box m={2}>
              <Button
                variant="contained"
                size="large"
                color="secondary"
                onClick={() => {
                  props.history.push(`/${props.match.params.user}/${props.page}/new`);
                }}
              >{`Add ${title}`}</Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    );
  } else {
    return (
      <Grid container direction="column" justify="center" alignItems="center">
        <Box m={2}>
          <Typography variant="h2" component="h2" color="textPrimary">
            <b>{title}s</b>
          </Typography>
        </Box>
        <CircularProgress color="secondary" />
      </Grid>
    );
  }
}

export default ListViewPage;
