import React from "react";
import { Grid, TextField } from "@material-ui/core";
import { useForm } from "../Forms/FormContext";
import DeleteIcon from "@material-ui/icons/Delete";

function WorkoutDetails(props) {
  const [state, dispatch] = useForm();

  return (
    <>
      <Grid container item justify="space-between" xs={12}>
        <Grid item xs={4}>
          <TextField
            name="name"
            label="Workout Name"
            value={state.name || ""}
            variant="outlined"
            size="small"
            fullWidth
            onChange={(e) => dispatch({ type: "workout_name_change", value: e.target.value })}
            required={true}
          ></TextField>
        </Grid>

        <Grid item>
          <DeleteIcon style={{ cursor: "pointer" }} onClick={null} />
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <TextField
          name="desc"
          label="Description"
          value={state.desc || ""}
          variant="outlined"
          size="small"
          fullWidth
          multiline
          rows={3}
          onChange={(e) => dispatch({ type: "desc_change", value: e.target.value })}
        ></TextField>
      </Grid>
    </>
  );
}

export default WorkoutDetails;
