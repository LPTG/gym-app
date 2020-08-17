import React, { useState, useEffect } from "react";
//import axios from "axios";
import ItemList from "./ItemList";
import { Grid, Typography, Button } from "@material-ui/core";
import { getWorkouts, getTemplates } from "../HelperFunctions/RequestFunctions";
import auth from "../../Auth";

function ListViewPage(props) {
  const [list, setList] = useState(null);

  useEffect(() => {
    // Fetch workouts or templates depending on the page prop
    // axios.get(`/api/users/${auth.getUser()}/${props.page}`).then((res) => {
    //   if (props.page === "workouts") setList(res.data.workouts);
    //   else if (props.page === "templates") setList(res.data.templates);
    // });

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
      <>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          styles={{ backgroundColor: "blue" }}
        >
          <Grid item>
            <Typography variant="h2" component="h2" color="textPrimary">
              {title}s
            </Typography>
          </Grid>
        </Grid>

        {title === "Workout" && <ItemList list={list} handleClick={handleClick} />}
        {title === "Template" && (
          <ItemList list={list} handleClick={handleClick} templateCard={true} />
        )}

        <Grid container justify="center" spacing={2}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                props.history.push(`/${props.match.params.user}/${props.page}/new`);
              }}
            >{`Add ${title}`}</Button>
          </Grid>
        </Grid>
      </>
    );
  } else {
    return <>Loading...</>;
  }
}

export default ListViewPage;
