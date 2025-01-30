import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const PrivateRoute = () => {
  const { userInfo } = useAuth();
  const location = useLocation();

  if (!userInfo) {
    toast.error("Please you must login first");
    return userInfo ? (
      <Outlet />
    ) : (
      <Navigate to={"/login"} replace state={{ redirectTo: location }} />
    );
  }
};

export default PrivateRoute;
