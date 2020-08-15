const workoutStateToDB = (state) => {
  const workout = {
    name: state.name,
    desc: state.desc,
    exercises: [],
  };

  state.exercises.forEach((exerciseId) => {
    let exercise = {
      name: state.exercisesById[exerciseId].name,
      wsr: [],
    };

    state.exercisesById[exerciseId].wsr.forEach((wsrId) => {
      // let exerciseWsr = {
      //   weight: state.wsrById[wsrId].weight,
      //   weightPH: state.wsrById[wsrId].weightPH,
      //   sets: state.wsrById[wsrId].sets,
      //   setsPH: state.wsrById[wsrId].setsPH,
      //   reps: state.wsrById[wsrId].reps,
      //   repsPH: state.wsrById[wsrId].repsPH,
      // };

      exercise.wsr.push(state.wsrById[wsrId]);
    });

    workout.exercises.push(exercise);
  });

  console.log(workout);
  return workout;
};

const workoutDBToState = (workout) => {
  const importedState = {
    name: workout.name,
    desc: workout.desc,
    exercises: [],
    exercisesById: {},
    wsrById: {},
    exerciseCount: 0,
  };

  workout.exercises.forEach((exercise, exerciseIndex) => {
    let exerciseId = "ex" + (exerciseIndex + 1);

    importedState.exercises.push(exerciseId);
    importedState.exerciseCount++;

    importedState.exercisesById[exerciseId] = {
      name: exercise.name,
      namePlaceholder: exercise.namePH,
      wsr: [],
      wsrCount: 0,
    };

    exercise.wsr.forEach((wsr, wsrIndex) => {
      let wsrId = exerciseId + "-wsr" + (wsrIndex + 1);

      importedState.exercisesById[exerciseId].wsr.push(wsrId);
      importedState.exercisesById[exerciseId].wsrCount++;

      importedState.wsrById[wsrId] = wsr;
    });
  });

  return importedState;
};

export { workoutStateToDB, workoutDBToState };
