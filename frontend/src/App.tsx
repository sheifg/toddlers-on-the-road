import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
const App = () => {
  return (
    <Layout>
      <ScrollToTop />
      <AppRoutes />
    </Layout>
  );
};

export default App;
