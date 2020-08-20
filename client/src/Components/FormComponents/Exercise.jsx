import React from "react";
import { Grid, TextField } from "@material-ui/core";
import { useForm } from "../Forms/FormContext";
import WeightSetsReps from "./WeightSetsReps";
import CloseIcon from "@material-ui/icons/Close";

function ExerciseList(props) {
  const [state, dispatch] = useForm();
  const exercise = state.exercisesById[props.id];

  return (
    <Grid container spacing={2}>
      <Grid container item justify="space-between" xs={12}>
        <Grid item xs={8} sm={4}>
          <TextField
            //id={props.id} // why?
            name={props.id}
            label="Exercise Name"
            variant="outlined"
            value={exercise.name || ""}
            placeholder={exercise.namePlaceholder || ""}
            size="small"
            fullWidth
            onChange={(e) =>
              dispatch({ type: "exercise_name_change", id: props.id, value: e.target.value })
            }
            inputProps={{ maxLength: 40 }}
            required
          ></TextField>
        </Grid>

        <Grid item>
          <CloseIcon
            style={{ cursor: "pointer" }}
            onClick={() => {
              console.log("remove clicked");
              dispatch({ type: "remove_exercise", id: props.id });
            }}
          />
        </Grid>
      </Grid>

      <Grid item xs={12}>
        {exercise.wsr.map((wsr) => (
          <WeightSetsReps key={wsr} id={wsr} parent={props.id} formType={props.formType} />
        ))}
      </Grid>
    </Grid>
  );
}

export default ExerciseList;
