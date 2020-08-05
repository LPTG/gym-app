import React from "react";
import { Route, Redirect } from "react-router-dom";
import NavBar from "../SiteComponents/Navbar";
import auth from "../../Auth";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.getAuth()) {
          return (
            <div>
              <NavBar {...props} />
              <Component {...rest} {...props} />
            </div>
          );
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};
