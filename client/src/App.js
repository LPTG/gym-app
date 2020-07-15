import React from "react";
import Register from "./Components/Register.js";
import WorkoutForm from "./Components/WorkoutForm.js";
import WorkoutList from "./Components/WorkoutList.js";
import WorkoutView from "./Components/WorkoutView";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import TemplateList from "./Components/TemplateList.js";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Register} />
        <Route path="/login" component={Register} />
        <Route path="/workout-form" component={WorkoutForm} />
        <Route path="/workout-list" component={WorkoutList} />
        <Route path="/template-list" component={TemplateList} />
        <Route path="/view-workout" component={WorkoutView} />
      </Switch>
    </Router>
  );
}

export default App;
