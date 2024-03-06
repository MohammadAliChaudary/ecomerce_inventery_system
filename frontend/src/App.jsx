import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "./components/Loader";
import RequireAuth from "./components/requireAuth";
const Login = lazy(() => import("./pages/login"));
const SignUp = lazy(() => import("./pages/signup"));
const Home = lazy(() => import("./pages/homePage/home"));
const Dashboard = lazy(() => import("./pages/dashboard/dashboard"));
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import PresistLogin from "./components/presistLogin";
import CheckLoggedIn from "./components/checkedLoggedIn";
import CheckUserRole from "./components/checkUserRole";
import Cart from "./pages/homePage/components/cart";
function App() {
  return (
    <>
      <Suspense fallback={<SuspenseLoader />}>
        <Routes>
          <Route element={<CheckLoggedIn />}>
            <Route exact path="/auth" element={<Login />} />
          </Route>
          <Route exact path="/register" element={<SignUp />} />
          <Route element={<PresistLogin />}>
            <Route element={<RequireAuth />}>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/cart" element={<Cart />} />
              <Route element={<CheckUserRole />}>
                <Route exact path="/admin/*" element={<Dashboard />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export function SuspenseLoader() {
  return (
    <div
      style={{
        zIndex: 99,
        position: "absolute",
        backgroundColor: "rgba(0,0,0,0.3) ",
        width: "100%",
        height: "100%",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Loader size={80} />
    </div>
  );
}

export default App;
