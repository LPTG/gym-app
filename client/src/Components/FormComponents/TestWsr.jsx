import React from "react";
//import { PropTypes } from "prop-types";
import { Grid, TextField } from "@material-ui/core";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { useForm } from "../Forms/FormContext";

function TestWsr(props) {
  const [state, dispatch] = useForm();
  const wsr = state.wsrById[props.id];

  return (
    <Grid container justify="flex-start" spacing={2}>
      <Grid item xs={4} sm={3}>
        <TextField
          id={props.id + "-w"}
          label="Weight"
          variant="outlined"
          value={wsr.weight || ""}
          placeholder={wsr.weightPH || ""}
          size="small"
          fullWidth
          onChange={(e) => dispatch({ type: "weight_change", id: props.id, value: e.target.value })}
          type="number"
          inputProps={{ min: 1, max: 2000 }}
        />
      </Grid>

      <Grid item xs={4} sm={3}>
        <TextField
          id={props.id + "-s"}
          label="Sets"
          variant="outlined"
          value={wsr.sets || ""}
          placeholder={wsr.setsPH || ""}
          size="small"
          fullWidth
          onChange={(e) => dispatch({ type: "set_change", id: props.id, value: e.target.value })}
          type="number"
          inputProps={{ min: 1, max: 20 }}
        />
      </Grid>

      <Grid item xs={4} sm={3}>
        <TextField
          id={props.id + "-r"}
          label="Reps"
          variant="outlined"
          value={wsr.reps || ""}
          placeholder={wsr.repsPH || ""}
          size="small"
          fullWidth
          onChange={(e) => dispatch({ type: "rep_change", id: props.id, value: e.target.value })}
          type="number"
          inputProps={{ min: 1, max: 100 }}
        />
      </Grid>

      <Grid item>
        <RemoveCircleIcon
          color="secondary"
          fontSize="large"
          style={{ cursor: "pointer" }}
          onClick={() => dispatch({ type: "remove_set", id: props.id, parent: props.parent })}
        />

        <AddCircleIcon
          color="secondary"
          fontSize="large"
          style={{ cursor: "pointer" }}
          onClick={() => dispatch({ type: "add_set", id: props.id, parent: props.parent })}
        />
      </Grid>
    </Grid>
  );
}

export default TestWsr;
