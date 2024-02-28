import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "./components/Loader";
const Login = lazy(() => import("./pages/login"));
const SignUp = lazy(() => import("./pages/signup"));
const Home = lazy(() => import("./pages/homePage/home"));
const Dashboard = lazy(() => import("./pages/dashboard/dashboard"));
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <>
      <Suspense fallback={<SuspenceLoader />}>
        <Routes>
          <Route exact path="/auth" element={<Login />} />
          <Route exact path="/register" element={<SignUp />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </>
  );
}

function SuspenceLoader() {
  <div
    style={{
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
      background: "rgba(0,0,0,0.3)",
      zIndex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Loader size={80} />
  </div>;
}

export default App;
