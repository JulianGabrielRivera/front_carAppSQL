import { useState } from "react";
import axios from "axios";

export const AddUser = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
  });

  const handleChange = (event) => {
    setUser((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const addUser = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/users/create/user", user)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(user);
  return (
    <div>
      <h1>Add User</h1>

      <form onSubmit={addUser}>
        <div>
          <label>first name</label>
          <input type="text" name="firstName" onChange={handleChange} />
        </div>
        <div>
          <label>last name</label>

          <input type="text" name="lastName" onChange={handleChange} />
        </div>
        <button>Add User</button>
      </form>
    </div>
  );
};
