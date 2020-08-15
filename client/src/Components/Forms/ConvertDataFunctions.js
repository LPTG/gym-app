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
      exercise.wsr.push(state.wsrById[wsrId]);
    });

    workout.exercises.push(exercise);
  });

  console.log(workout);
  return workout;
};

const workoutDBToEditState = (workout) => {
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

const templateStateToDB = (state) => {
  const template = {
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
      let wsr = {
        weight: state.wsrById[wsrId].weight,
        sets: state.wsrById[wsrId].sets,
        reps: state.wsrById[wsrId].reps,
      };

      exercise.wsr.push(wsr);
    });

    template.exercises.push(exercise);
  });

  console.log(template);
  return template;
};

const templateDBToEditState = (template) => {
  const importedState = {
    name: template.name,
    desc: template.desc,
    exercises: [],
    exercisesById: {},
    wsrById: {},
    exerciseCount: 0,
  };

  template.exercises.forEach((exercise, exerciseIndex) => {
    let exerciseId = "ex" + (exerciseIndex + 1);

    importedState.exercises.push(exerciseId);
    importedState.exerciseCount++;

    importedState.exercisesById[exerciseId] = {
      name: template.name,
      namePlaceholder: "",
      wsr: [],
      wsrCount: 0,
    };

    exercise.wsr.forEach((wsr, wsrIndex) => {
      let wsrId = exerciseId + "-wsr" + (wsrIndex + 1);

      importedState.exercisesById[exerciseId].wsr.push(wsrId);
      importedState.exercisesById[exerciseId].wsrCount++;

      importedState.wsrById[wsrId] = {
        weight: wsr.weight,
        weightPH: "",
        sets: wsr.sets,
        setsPH: "",
        reps: wsr.reps,
        repsPH: "",
      };
    });
  });

  return importedState;
};

const templateDBToWorkoutState = (template) => {
  const importedState = {
    name: template.name,
    desc: template.desc,
    exercises: [],
    exercisesById: {},
    wsrById: {},
    exerciseCount: 0,
  };

  template.exercises.forEach((exercise, exerciseIndex) => {
    let exerciseId = "ex" + (exerciseIndex + 1);

    importedState.exercises.push(exerciseId);
    importedState.exerciseCount++;

    importedState.exercisesById[exerciseId] = {
      name: "",
      namePlaceholder: template.name,
      wsr: [],
      wsrCount: 0,
    };

    exercise.wsr.forEach((wsr, wsrIndex) => {
      let wsrId = exerciseId + "-wsr" + (wsrIndex + 1);

      importedState.exercisesById[exerciseId].wsr.push(wsrId);
      importedState.exercisesById[exerciseId].wsrCount++;

      importedState.wsrById[wsrId] = {
        weight: "",
        weightPH: wsr.weight,
        sets: "",
        setsPH: wsr.sets,
        reps: "",
        repsPH: wsr.reps,
      };
    });
  });

  return importedState;
};

export {
  workoutStateToDB,
  workoutDBToEditState,
  templateStateToDB,
  templateDBToEditState,
  templateDBToWorkoutState,
};
