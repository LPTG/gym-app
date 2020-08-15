import React, { useState, useEffect } from "react";
import axios from "axios";
import auth from "../../Auth";
import EditForm from "../Forms/EditForm";
import WorkoutFromTemplate from "../Forms/WorkoutFromTemplate";

function ItemView(props) {
  // workout is used to fill out edit workout form
  const [workout, setWorkout] = useState([]);
  // template is used to fill out edit template form
  const [template, setTemplate] = useState([]);
  // frame is used to set placeholders for edit workout forms
  const [frame, setFrame] = useState([]);

  useEffect(() => {
    const user = auth.getUser();
    const page = props.page === "templated" ? "templates" : props.page;
    const id = page === "workouts" ? props.match.params.workoutID : props.match.params.templateID;

    if (props.page !== "templated") {
      // Fetch the workout with workoutID
      axios.get(`/api/users/${user}/${page}/${id}`).then((res) => {
        let formattedWorkout = res.data;
        let exercises = formattedWorkout.exercises;

        // Format the workout to send to edit form
        exercises.forEach((exercise, index) => {
          let id = "exercise" + (index + 1);
          exercise.id = id;

          exercise.wsr.forEach((wsr, index) => {
            let currentWsrID = "wsr" + (index + 1);
            wsr.id = currentWsrID;
          });
        });

        setWorkout(formattedWorkout);
      });
    } else {
      axios.get(`/api/users/${user}/${page}/${id}`).then((res) => {
        let formattedTemplate = res.data;
        let exercises = formattedTemplate.exercises;

        // Base framework for our templated workout
        let emptyWorkout = {
          name: "",
          desc: "",
          exercises: [],
        };

        // For each exercise in our template
        exercises.forEach((exercise, exerciseIndex) => {
          // Add an empty exercise to our base frame
          emptyWorkout.exercises.push({ name: "", id: "exercise" + (exerciseIndex + 1), wsr: [] });

          // And for every wsr that exercise has
          exercise.wsr.forEach((wsr, wsrIndex) => {
            // Add an empty wsr with a correct id
            emptyWorkout.exercises[exerciseIndex].wsr.push({
              weight: "",
              sets: "",
              reps: "",
              id: "wsr" + (wsrIndex + 1),
            });
          });
        });

        setTemplate(formattedTemplate);
        setFrame(emptyWorkout);
      });
    }
  }, [props.match.params.workoutID, props.match.params.templateID, props.page]);

  if (frame && frame.exercises) {
    return <WorkoutFromTemplate {...props} template={template} frame={frame} />;
  } else if (workout && workout.exercises) {
    return <EditForm {...props} values={workout} />;
  } else {
    return (
      <div>
        <h3>Loading...</h3>
      </div>
    );
  }
}

export default ItemView;
