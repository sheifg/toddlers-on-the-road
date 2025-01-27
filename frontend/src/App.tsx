import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import Layout from "./components/Layout";

const App = () => {
  return (
    <Layout>
      <AppRoutes />
    </Layout>
  );
};

export default App;
