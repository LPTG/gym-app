import React from "react";
import { Grid, TextField } from "@material-ui/core";
import { useForm } from "../Forms/FormContext";
import { deleteWorkout, deleteTemplate } from "../HelperFunctions/RequestFunctions";
import DeleteIcon from "@material-ui/icons/Delete";
import auth from "../../Auth";

function WorkoutDetails(props) {
  const [state, dispatch] = useForm();

  const labelName = props.type === "workouts" ? "Workout" : "Template";

  const deleteForm = (user, type, id) => {
    (async () => {
      if (type === "workouts") {
        let workoutStatus = await deleteWorkout(user, id);
        if (workoutStatus.error) console.log(workoutStatus.error);
        else props.history.push(`/${user}/workouts`);
      } else {
        let templateStatus = await deleteTemplate(user, id);
        if (templateStatus.error) console.log(templateStatus.error);
        else props.history.push(`/${user}/templates`);
      }
    })();
  };

  return (
    <>
      <Grid container item justify="space-between" xs={12}>
        <Grid item xs={4}>
          {/* inputProps={{ maxLength: 40 }} */}
          <TextField
            name="name"
            label={labelName + " Name"}
            value={state.name || ""}
            variant="outlined"
            size="small"
            fullWidth
            onChange={(e) => dispatch({ type: "workout_name_change", value: e.target.value })}
            required={true}
          ></TextField>
        </Grid>

        {/* Only display the delete icon if we are not creating a new template or workout from scratch */}
        {(props.action === "update" || props.useTemplate) && (
          <Grid item>
            <DeleteIcon
              style={{ cursor: "pointer" }}
              onClick={() => {
                deleteForm(auth.getUser(), props.type, props.match.params.id);
              }}
            />
          </Grid>
        )}
      </Grid>

      <Grid item xs={12}>
        {/* inputProps={{ maxLength: 200 }}
            helperText={`${props.length}/200`} */}
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
