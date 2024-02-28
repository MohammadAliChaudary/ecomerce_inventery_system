import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ErrorHandler from "../components/errorHandler";
import Loader from "../components/Loader";
import useError from "../hooks/useError";
import { axiosPrivate } from "../api/axiosApi";
import useAuth from "../hooks/useAuth";
import { useCookies } from "react-cookie";
import "../assets/loginAndSignup.css";
const Login = () => {
  const api = "auth";
  const [pwd, setPwd] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { error, setError } = useError();
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [cookies, setCookie, removeCookie] = useCookies(["user_id"]);
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosPrivate.post(api, {
        email: email,
        password: pwd,
      });
      if (res.status === 200) {
        setAuth(res.data.data);
        navigate("/");
        setCookie("user_id", res.data.data?.user[0].user_id);
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        const err =
          error.response.data?.message[0].message ||
          error.response.data?.message;
        setError(err);
      }
    } finally {
      setLoading(false);
      setEmail("");
      setPwd("");
    }
  };
  return (
    <>
      {error !== "" ? <ErrorHandler /> : null}
      <div className="login-signup-wrapper">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <form
              onSubmit={(e) => {
                handleOnSubmit(e);
              }}
            >
              <h3>Sign In</h3>
              <div className="mb-3">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  autoComplete="false"
                  value={pwd}
                  onChange={(e) => {
                    setPwd(e.target.value);
                  }}
                />
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  {loading ? <Loader size={40} /> : "Submit"}
                </button>
              </div>
              <p className="forgot-password text-right">
                Dont have account then register{" "}
                <Link to={"/register"}>here</Link>
              </p>
            </form>
          </div>{" "}
        </div>
      </div>
    </>
  );
};

export default Login;
