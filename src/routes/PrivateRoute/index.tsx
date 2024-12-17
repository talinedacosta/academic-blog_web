import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

interface PrivateRouteProps {
  children: React.ReactElement;
  role?: number;
}

const PrivateRoute = ({ children, role }: PrivateRouteProps) => {
  const location = useLocation();
  const userContext = useUser();
  const isAllowed = userContext?.user && (!role || userContext?.user?.role_id === role);

  return isAllowed ? (
    children
  ) : userContext?.user ? (
    <Navigate to="/not-authorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
