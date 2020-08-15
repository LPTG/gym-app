import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ProtectedRoute } from "./Components/SiteComponents/ProtectedRoute";
import Register from "./Components/Register/Register";
import ListView from "./Components/ListView/ListViewPage";
import FormHandler from "./Components/Forms/FormHandler";

function App() {
  const formTypeRegex = "(workouts|templates)";
  const creatorPath = `/:user/:formType${formTypeRegex}/new/`;
  const useTemplatePath = `/:user/:formType${formTypeRegex}/new/:id+`;
  const editorPath = `/:user/:formType${formTypeRegex}/:id`;

  return (
    <Router>
      {/* Add regex for url params */}
      <Switch>
        <Route path="/" exact component={Register} />
        <Route path="/login" component={Register} />
        <ProtectedRoute
          path={useTemplatePath}
          component={(props) => <FormHandler {...props} useTemplate />}
        />
        <ProtectedRoute path={creatorPath} component={(props) => <FormHandler {...props} />} />
        <ProtectedRoute path={editorPath} component={(props) => <FormHandler {...props} />} />
        <ProtectedRoute
          path="/:user/workouts"
          component={(props) => <ListView {...props} page="workouts" />}
        />
        <ProtectedRoute
          path="/:user/templates"
          component={(props) => <ListView {...props} page="templates" />}
        />
        <Route path="*" component={() => "404 NOT FOUND"} />
      </Switch>
    </Router>
  );
}

export default App;
