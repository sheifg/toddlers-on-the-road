import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import About from "../pages/About";
import Contact from "../pages/Contact";
import { PrivateRoute } from "./PrivateRoute";
import Details from "../pages/Details";
import Profile from "../pages/Profile";
import ResetPassword from "../pages/ResetPassword";
import ForgotPassword from "../pages/ForgotPassword";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
      {/* <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/details/:id" element={<Details />} />
          */}
    </Routes>
  );
};

export default AppRoutes;
