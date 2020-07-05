import React from "react";
import logo from "./logo.svg";
import Register from "./Register.js";
import Workouts from "./Workouts.js";
import WorkoutList from "./WorkoutList.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Register} />
        <Route path="/login" component={Register} />
        <Route path="/workouts" component={Workouts} />
        <Route path="/workoutlist" component={WorkoutList} />
      </Switch>
    </Router>
  );
}

export default App;
