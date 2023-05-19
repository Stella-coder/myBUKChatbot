import React, { useContext } from "react";
import { Navigate, Route, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthState";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useContext(AuthContext);
// const nav = useNavigate()
  return (
    <Route
      {...rest}
      render={(props) =>
        currentUser ? (
          <Component {...props} />
        ) : (
            <Navigate to ="/login" replace />
         
        )
      }
    />
  );
};

export default PrivateRoute;
