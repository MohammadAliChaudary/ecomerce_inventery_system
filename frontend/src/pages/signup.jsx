import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ErrorHandler from "../components/errorHandler";
import "../assets/loginAndSignup.css";
import useError from "../hooks/useError";
import useSuccess from "../hooks/useSuccess";
import { axiosPrivate } from "../api/axiosApi";
import Loader from "../components/Loader";
import SuccessMessageHandler from "../components/succeesMessageHandler";
import CroppedImage from "../components/croppedImage";
const SignUp = () => {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState();
  const defaultDp =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx6b61Ivb6RVMCLENgN5xeFniNL1lh31-l9pveyLRO-A&s";
  const imageRef = useRef(null);
  const { error, setError } = useError();
  const { success, setSuccess } = useSuccess();
  const [name, setName] = useState("");
  const [loader, setLoader] = useState(false);
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const api = "register";

  const handleOnClick = () => {
    imageRef.current.click();
  };

  const handleOnSubmit = async (e) => {
    setLoader(true);
    e.preventDefault();
    try {
      const res = await axiosPrivate.post(api, {
        user_name: name,
        user_role: role || "User",
        email: email,
        password: pwd,
      });
      if (res.status === 200) {
        setSuccess("Account created Successfully");
      }
    } catch (error) {
      const err =
        error.response.data.message[0].message || error.response.data.message;
      setError(err);
    } finally {
      setLoader(false);
      setName("");
      setPwd("");
      setRole("");
      setEmail("");
    }
  };

  const handleOnChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    setImage(URL.createObjectURL(file));
  };

  return (
    <>
      {success !== "" ? <SuccessMessageHandler /> : null}
      {error !== "" ? <ErrorHandler /> : null}
      <div className="login-signup-wrapper">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <form
              onSubmit={(e) => {
                handleOnSubmit(e);
              }}
            >
              <h3>Sign Up</h3>
              <div
                className="mb-3"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div>
                  <img
                    src={image ? image : defaultDp}
                    alt=""
                    srcset=""
                    style={{
                      width: "150px",
                      height: "150px",
                      borderRadius: "50%",
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div
                      className="icon"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "36px ",
                        height: "36px",
                        borderRadius: "50%",
                        marginTop: "-30px",
                        color: "black",
                        fontSize: "20px",
                        backgroundColor: "rgb(228, 230, 235)",
                        border: "solid 1px grey",
                        flexShrink: 0,
                      }}
                      onClick={handleOnClick}
                    >
                      <ion-icon name="camera"></ion-icon>
                    </div>
                  </div>
                </div>
                {file !== null ? (
                  <CroppedImage
                    images={image}
                    setImage={setImage}
                    setFile={setFile}
                  />
                ) : null}
              </div>
              <div className="mb-3" style={{ display: "none" }}>
                <label>Upload Image</label>
                <input
                  type="file"
                  ref={imageRef}
                  onChange={(e) => {
                    handleOnChange(e);
                  }}
                />
              </div>
              <div className="mb-3">
                <label>Full name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="First name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="user_role">Role</label>
                <select
                  id="user_role"
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value);
                  }}
                  name="user_role"
                >
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
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
                  {loader ? <Loader size={40} /> : "Sign Up"}
                </button>
              </div>
              <p className="forgot-password text-right">
                Already registered <Link to="/auth">sign in?</Link>
              </p>
            </form>
          </div>{" "}
        </div>
      </div>
    </>
  );
};

export default SignUp;
