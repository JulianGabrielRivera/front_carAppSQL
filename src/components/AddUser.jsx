import { useState } from "react";
import axios from "axios";

export const AddUser = ({ setUsers, users }) => {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    image: "",
  });
  const [file, setFile] = useState(null);

  const handleChange = (event) => {
    setUser((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };
  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    // setFile(selectedFile);
    const formData = new FormData();
    formData.append("file", selectedFile);
    console.log(formData);
    axios
      .post("http://localhost:4000/images/uploads", formData)
      .then((response) => {
        console.log(response);
        setUser((prev) => ({
          ...prev,
          [event.target.name]: response.data.data,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //   const imagePost = (e) => {

  //   };
  const addUser = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/users/create/user", user)
      .then((response) => {
        console.log(response);
        // console.log(users[users.length - 1]);
        const lastIndex = users[0];
        console.log(lastIndex);
        console.log(user);
        setUsers([{ id: lastIndex.id + 1, ...user, user_task: 0 }, ...users]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1 style={{ color: "white" }}>List of users</h1>

      <form
        style={{ color: "white" }}
        onSubmit={addUser}
        encType="multipart/form-data"
      >
        <div>
          <label>first name</label>
          <input type="text" name="first_name" onChange={handleChange} />
        </div>
        <div>
          <label>last name</label>

          <input type="text" name="last_name" onChange={handleChange} />
        </div>
        <div>
          <label>Profile Picture</label>
          <input type="file" name="image" onChange={handleImageChange} />
          {/* <button onClick={imagePost}>Upload File</button> */}
        </div>
        <button>Add User</button>
      </form>
    </div>
  );
};
