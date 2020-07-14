import React from "react";
import Register from "./Register.js";
import Workouts from "./Workouts.js";
import WorkoutList from "./WorkoutList.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import TemplateList from "./TemplateList.js";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Register} />
        <Route path="/login" component={Register} />
        <Route path="/workouts" component={Workouts} />
        <Route path="/workout-list" component={WorkoutList} />
        <Route path="/template-list" component={TemplateList} />
      </Switch>
    </Router>
  );
}

export default App;
