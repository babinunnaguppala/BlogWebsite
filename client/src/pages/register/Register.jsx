import { Link } from "react-router-dom";
import "./register.css";
import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // to prevent page from refreshing by default after clicking the register button
    setError(false);
    try {
      const res = await axios.post("/auth/register", {
        username,
        email,
        password,
      });
      res.data && window.location.replace("/login");
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <div class="form-floating mb-3">
          <input
            type="text"
            className="form-control registerInput"
            id="floatingInput"
            placeholder="Enter your username..."
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Username</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            className="form-control registerInput"
            id="floatingInput"
            placeholder="Enter your email..."
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Email</label>
        </div>
        <div class="form-floating">
          <input
            type="password"
            className="form-control registerInput"
            placeholder="Enter your password..."
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Password</label>
        </div>
        <button className="btn btn-success registerButton" type="submit">
          Register
        </button>
      </form>
      <button className="btn btn-warning registerLoginButton">
        <Link className="link" to="/login">
          Login
        </Link>
      </button>
      {error && (
        <span style={{ color: "red", marginTop: "10px" }}>
          Something went wrong!
        </span>
      )}
    </div>
  );
}
