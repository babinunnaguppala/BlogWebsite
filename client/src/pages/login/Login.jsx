import { Link } from "react-router-dom";
import "./login.css";
import { useContext, useRef } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <div class="form-floating mb-3">
          <input
            type="text"
            className="form-control loginInput"
            id="floatingInput"
            placeholder="Enter your username..."
            ref={userRef}
          />
          <label for="floatingInput">Username</label>
        </div>
        <div class="form-floating">
          <input
            type="password"
            id="floatingPassword"
            className="form-control loginInput"
            placeholder="Enter your password..."
            ref={passwordRef}
          />
          <label for="floatingPassword">Password</label>
        </div>
        <button className="btn btn-warning loginButton" type="submit" disabled={isFetching}>
          Login
        </button>
      </form>
      <button className="btn btn-success loginRegisterButton">
        <Link className="link" to="/register">
          Register
        </Link>
      </button>
    </div>
  );
}
