import React from "react";
import { Grid, TextField } from "@material-ui/core";
import { useForm } from "../Forms/FormContext";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import AddCircleIcon from "@material-ui/icons/AddCircle";

function WeightSetsReps(props) {
  const [state, dispatch] = useForm();
  const wsr = state.wsrById[props.id];

  return (
    <Grid container justify="flex-start" spacing={2}>
      <Grid item xs={3}>
        <TextField
          id={props.id + "-w"}
          label="Weight"
          variant="outlined"
          value={wsr.weight || ""}
          placeholder={wsr.weightPH || ""}
          size="small"
          fullWidth
          onChange={(e) => dispatch({ type: "weight_change", id: props.id, value: e.target.value })}
          type={props.formType === "workouts" ? "number" : "text"}
          inputProps={props.formType === "workouts" ? { min: 1, max: 2000 } : { maxLength: 15 }}
        />
      </Grid>

      <Grid item xs={3}>
        <TextField
          id={props.id + "-s"}
          label="Sets"
          variant="outlined"
          value={wsr.sets || ""}
          placeholder={wsr.setsPH || ""}
          size="small"
          fullWidth
          onChange={(e) => dispatch({ type: "set_change", id: props.id, value: e.target.value })}
          type={props.formType === "workouts" ? "number" : "text"}
          inputProps={props.formType === "workouts" ? { min: 1, max: 20 } : { maxLength: 15 }}
        />
      </Grid>

      <Grid item xs={3}>
        <TextField
          id={props.id + "-r"}
          label="Reps"
          variant="outlined"
          value={wsr.reps || ""}
          placeholder={wsr.repsPH || ""}
          size="small"
          fullWidth
          onChange={(e) => dispatch({ type: "rep_change", id: props.id, value: e.target.value })}
          type={props.formType === "workouts" ? "number" : "text"}
          inputProps={props.formType === "workouts" ? { min: 1, max: 100 } : { maxLength: 15 }}
        />
      </Grid>

      <Grid item margin="auto" xs={3}>
        <RemoveCircleIcon
          color="secondary"
          fontSize="default"
          style={{ cursor: "pointer" }}
          onClick={() => dispatch({ type: "remove_set", id: props.id, parent: props.parent })}
        />

        <AddCircleIcon
          color="secondary"
          fontSize="default"
          style={{ cursor: "pointer" }}
          onClick={() => dispatch({ type: "add_set", id: props.id, parent: props.parent })}
        />
      </Grid>
    </Grid>
  );
}

export default WeightSetsReps;
