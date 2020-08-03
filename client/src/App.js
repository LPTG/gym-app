import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./Components/Register/Register";
import NewWorkout from "./Components/Forms/NewWorkout";
import NewTemplate from "./Components/Forms/NewTemplate";
import ListView from "./Components/ListView/ListViewPage";
import ItemView from "./Components/ListView/ItemView";
import { ProtectedRoute } from "./Components/SiteComponents/ProtectedRoute";
import auth from "./Auth";

import "./App.css";

function App() {
  let authObj = auth;

  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Register} />
        <Route path="/login" component={Register} />
        <ProtectedRoute
          path="/:user/new-workout/:templateID"
          userAuth={authObj}
          component={(props) => <ItemView {...props} page="templated" />}
        />
        <ProtectedRoute path="/:user/new-workout" userAuth={authObj} component={NewWorkout} />
        <ProtectedRoute path="/:user/new-template" userAuth={authObj} component={NewTemplate} />
        <ProtectedRoute
          path="/:user/workouts/:workoutID"
          userAuth={authObj}
          component={(props) => <ItemView {...props} page="workouts" />}
        />
        <ProtectedRoute
          path="/:user/templates/:templateID"
          userAuth={authObj}
          component={(props) => <ItemView {...props} page="templates" />}
        />
        <ProtectedRoute
          path="/:user/workouts"
          component={(props) => <ListView {...props} page="workouts" />}
        />
        <ProtectedRoute
          path="/:user/templates"
          userAuth={authObj}
          component={(props) => <ListView {...props} page="templates" />}
        />
        <Route path="*" component={() => "404 NOT FOUND"} />
      </Switch>
    </Router>
  );
}

export default App;
