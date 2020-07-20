import React from "react";
import Register from "./Components/Register.js";
import WorkoutForm from "./Components/WorkoutForm.js";
import WorkoutList from "./Components/WorkoutList.js";
import WorkoutView from "./Components/WorkoutView";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import TemplateList from "./Components/TemplateList.js";
import { ProtectedRoute } from "./Components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Register} />
        <Route path="/login" component={Register} />
        <ProtectedRoute path="/:user/workout-form" component={WorkoutForm} />
        <ProtectedRoute path="/:user/workouts/:workoutID" component={WorkoutView} />
        <ProtectedRoute path="/:user/workouts" component={WorkoutList} />
        <ProtectedRoute path="/:user/templates" component={TemplateList} />
        <Route path="*" component={() => "404 NOT FOUND"} />
      </Switch>
    </Router>
  );
}

export default App;
