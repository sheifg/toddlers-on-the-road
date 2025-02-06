import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.tsx";
import { ToastContainer } from "react-toastify";
import { CountryProvider } from "./context/CountryContext.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <CountryProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </CountryProvider>
    <ToastContainer />
  </BrowserRouter>
);
