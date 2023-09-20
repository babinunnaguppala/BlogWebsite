import "./write.css";
import k from "../../assets/k.jpeg";
import { useContext, useState } from "react";
import axios from "axios";
import { Context } from "../../context/Context";
export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name; //using Date.now() to add to filename so as if user uploads different image with same name
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.post("/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {}
  };

  return (
    <div className="write">
    {file && 
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
    }
     
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fa-solid fa-plus"></i>
          </label>
          <input type="file" id="fileInput" style={{ display: "none" }} onChange={e=> setFile(e.target.files[0] )} />
          <div class="form-floating mb-3">
          <input
            type="text"
            placeholder="Title"
            className="form-control writeInput"
            id="floatingInput"
            autoFocus={true}
            onChange={e=>setTitle(e.target.value)}
          />
          <label for="floatingInput">Title</label>
          </div>
        </div>
        <div className="form-floating mb-3 writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            type="text"
            id="floatingTextarea"
            className="form-control writeInput writeText"
            onChange={e=>setDesc(e.target.value)}
            style={{ height:"500px" }}
          ></textarea>
          <label for="floatingTextarea">Tell your story...</label>
        </div>
        <button className="btn btn-success writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
