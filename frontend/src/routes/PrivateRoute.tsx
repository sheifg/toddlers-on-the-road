import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getStorageItem } from "../utils/storage";
import { useEffect, useState } from "react";
const PrivateRoute = () => {
  const firebaseToken = getStorageItem("firebaseToken");
  const { userInfo } = useAuth();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication state on mount
  useEffect(() => {
    // Check if user info exists in session storage
    const storedUser = getStorageItem("user");

    // Set authentication state based on stored data
    if (storedUser || firebaseToken) {
      setIsAuthenticated(true);
    }

    // Mark loading as complete
    setIsLoading(false);
  }, []);

  // Show loading indicator while checking authentication
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Proceed with routing based on authentication state
  if (isAuthenticated || userInfo) {
    return <Outlet />;
  } else {
    return <Navigate to={"/login"} replace state={{ redirectTo: location }} />;
  }
};

export default PrivateRoute;
