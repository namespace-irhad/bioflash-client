import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = ({ component: Component, ...rest }) => {
  const authenticated = useSelector((state) => state.user.authenticated);
  const role = useSelector((state) => state.user.credentials.role);

  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated && parseInt(role, 10) === 3 ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default AdminRoute;
