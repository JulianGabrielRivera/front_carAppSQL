import { useState } from "react";
import axios from "axios";

export const AddUser = ({ setUsers, users }) => {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
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
        setUsers([user, ...users]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(users);
  console.log(user);
  return (
    <div>
      <h1>Add User</h1>

      <form onSubmit={addUser}>
        <div>
          <label>first name</label>
          <input type="text" name="first_name" onChange={handleChange} />
        </div>
        <div>
          <label>last name</label>

          <input type="text" name="last_name" onChange={handleChange} />
        </div>
        <button>Add User</button>
      </form>
    </div>
  );
};
