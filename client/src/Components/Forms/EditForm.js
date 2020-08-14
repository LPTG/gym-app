import React, { useState } from "react";
import axios from "axios";
import auth from "../../Auth";
import MaterialExerciseForm from "../FormComponents/MaterialExerciseForm";
import { Box, Paper, Grid, TextField, Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  addExerciseFunc,
  removeExerciseFunc,
  addSetFunc,
  removeSetFunc,
  handleExerciseChangeFunc,
  handleWSRChangeFunc,
} from "./FormFunctions";

function EditForm(props) {
  const [name, setName] = useState(props.values.name);
  const [desc, setDesc] = useState(props.values.desc);
  const [exercises, setExercises] = useState(props.values.exercises);

  // Removes the last exercise from the list of exercises
  const removeExercise = (exerciseID) => {
    removeExerciseFunc(exercises, setExercises, exerciseID);
  };

  // Adds another set to the exercise specified by the given exercise id
  const addSet = (exerciseID, wsrID) => {
    addSetFunc(exercises, setExercises, exerciseID, wsrID);
  };

  // Removes the last set from the exercise specified by the given exercise id
  const removeSet = (exerciseID, wsrID) => {
    removeSetFunc(exercises, setExercises, exerciseID, wsrID);
  };

  // Updates state when workout name is changed
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // Updates state when workout description is changed
  const handleDescChange = (e) => {
    setDesc(e.target.value);
  };

  //
  const handleExerciseChange = (e) => {
    handleExerciseChangeFunc(setExercises, exercises, e);
    //setExercises(handleExerciseChangeFunc(exercises, e));
  };

  // Try having a seperate event handler for weight/sets/reps
  const handleWeightSetRepChange = (e) => {
    handleWSRChangeFunc(setExercises, exercises, e);
    //setExercises(handleWSRChangeFunc(exercises, e));
  };

  // Format input to send to server
  const updateWorkout = (e) => {
    e.preventDefault();

    const id =
      props.page === "workouts" ? props.match.params.workoutID : props.match.params.templateID;

    var formattedExercises = [];
    // Build a json object for each exercise created
    exercises.forEach((exercise) => {
      var sets = [];
      // Build a json object for each wsr field for this exercise
      exercise.wsr.forEach((set) => {
        sets.push({ weight: set.weight, sets: set.sets, reps: set.reps });
      });

      formattedExercises.push({ name: exercise.name, wsr: sets });
    });

    // Can we just use exercises instead? Will the db even allow the ids added to be inserted?
    var update = {
      name: name,
      desc: desc,
      exercises: formattedExercises,
    };

    axios
      .put(`/api/users/${auth.getUser().username}/${props.page}/${id}`, { update })
      .then((response) => {
        // Pop up an error if workout could not be created
        if (
          response.data === "Workout updated successfully!" ||
          response.data === "Template updated successfully!"
        ) {
          props.history.push(`/${auth.getUser().username}/${props.page}`);
        }
      });
  };

  const deleteForm = () => {
    const id =
      props.page === "workouts" ? props.match.params.workoutID : props.match.params.templateID;

    axios.delete(`/api/users/${auth.getUser().username}/${props.page}/${id}`).then((response) => {
      if (
        response.data === "Workout deleted successfully!" ||
        response.data === "Template deleted successfully!"
      ) {
        props.history.push(`/${auth.getUser().username}/${props.page}`);
      }
    });
  };

  const page = props.page === "Workouts" ? "Workout" : "Template";

  return (
    <>
      <Grid container justify="center">
        <Grid item xs={12} md={6}>
          <Paper variant="outlined">
            <Box m="1rem">
              <form onSubmit={updateWorkout}>
                <Grid container spacing={2}>
                  {/* Info */}
                  <Grid container item justify="space-between" xs={12}>
                    <Grid item xs={4}>
                      <TextField
                        name="name"
                        label="Template Name"
                        value={name || ""}
                        variant="outlined"
                        size="small"
                        fullWidth
                        onChange={handleNameChange}
                        required={true}
                      ></TextField>
                    </Grid>

                    <Grid item>
                      <DeleteIcon style={{ cursor: "pointer" }} onClick={deleteForm} />
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      name="desc"
                      label="Description"
                      value={desc || ""}
                      variant="outlined"
                      size="small"
                      fullWidth
                      multiline
                      rows={3}
                      onChange={handleDescChange}
                    ></TextField>
                  </Grid>

                  <Grid item xs={12}>
                    {/* Exercise list */}
                    {exercises.map((exercise) => (
                      <Box key={exercise.id} my="1rem">
                        <Paper variant="outlined">
                          <Box m="1rem">
                            <MaterialExerciseForm
                              key={exercise.id}
                              id={exercise.id}
                              exerciseValue={exercise.name}
                              wsrValues={exercise.wsr}
                              handleExerciseChange={handleExerciseChange}
                              handleWeightSetRepChange={handleWeightSetRepChange}
                              addSet={addSet}
                              removeSet={removeSet}
                              removeExercise={removeExercise}
                              newTemplate={props.newTemplate || false}
                            />
                          </Box>
                        </Paper>
                      </Box>
                    ))}
                  </Grid>

                  <Grid container item justify="space-between" xs={12}>
                    <Grid container item spacing={1} xs={8}>
                      <Grid item>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => addExerciseFunc(exercises, setExercises)}
                        >
                          Add Exercise
                        </Button>
                      </Grid>
                    </Grid>

                    <Grid item>
                      <Button variant="contained" color="primary" onClick={updateWorkout}>
                        Update {page}
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default EditForm;
