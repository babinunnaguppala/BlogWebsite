import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Babi1 from "../../assets/Babi1.jpg";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
export default function Settings() {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name; //using Date.now() to add to filename so as if user uploads different image with same name
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.put("/users/" + user._id, updatedUser);
      // window.location.replace("/post/" + res.data._id);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <div className="settingsUpdateTitle">Update Your Account</div>
          <div className="settingsDeleteTitle">Delete Account</div>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={file ? URL.createObjectURL(file) : PF + user.profilePic}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon fa-regular fa-user"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          <div class="form-floating">
            <input
              type="text"
              id="floatingInput"
              className="form-control"
              placeholder={user.username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label for="floatingInput">
              {user.username} (current username)
            </label>
          </div>

          <div class="form-floating">
            <input
              type="email"
              id="floatingInput"
              className="form-control"
              placeholder={user.email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label for="floatingInput">{user.email} (email)</label>
          </div>
          <div class="form-floating">
            <input
              type="password"
              id="floatingPassword"
              className="form-control"
              placeholder="Enter your password..."
              onChange={(e) => setPassword(e.target.value)}
            />
            <label for="floatingPassword">Password</label>
          </div>

          <button className="btn btn-success settingsSubmit" type="submit">
            Update
          </button>
          {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Profile has been Updated...
            </span>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
