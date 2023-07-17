import { AddUser } from "../components/AddUser";
import { useState, useEffect } from "react";
import axios from "axios";

export const Users = () => {
  const [users, setUsers] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [taskName, setTaskName] = useState("");

  const userTaskBool = (id) => {
    console.log(id);
    axios
      .post("http://localhost:4000/tasks/boolean", { id })
      .then((response) => {
        console.log(response);
        // setToggle(!false);
        setUsers([...response.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const assignTask = (e, taskName, id) => {
    console.log(id);
    e.preventDefault();
    axios
      .post("http://localhost:4000/tasks/create", { taskName, id })
      .then((response) => {
        console.log(response);
        // setToggle(!false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onChangeTask = (e) => {
    setTaskName(e.target.value);
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/users")
      .then((response) => {
        console.log(response);
        setUsers(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      Users
      <AddUser />
      {users?.map((user) => {
        return (
          <>
            <div style={{ display: "flex" }}>
              <p>
                {user.first_name}

                {user.last_name}
              </p>
              <button
                onClick={() => {
                  userTaskBool(user.id);
                }}
              >
                Task
              </button>
              {user.user_task === 1 ? (
                <form onSubmit={assignTask}>
                  <input
                    type="text"
                    placeholder="Task to assign..."
                    name="name"
                    onChange={onChangeTask}
                  ></input>
                  <button>Click to Assign</button>
                </form>
              ) : (
                ""
              )}
            </div>
          </>
        );
      })}
    </div>
  );
};
