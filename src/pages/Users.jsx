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
        let newArray = [...response.data];
        newArray = newArray.reverse();

        setUsers(newArray);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const assignTask = (taskName, id) => {
    console.log(id);
    // e.preventDefault();
    axios
      .post("http://localhost:4000/tasks/create", { taskName, id })
      .then((response) => {
        console.log(response);
        // setToggle(!false);
        let newArray = [...response.data];
        newArray = newArray.reverse();

        setUsers(newArray);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onChangeTask = (e) => {
    setTaskName(e.target.value);
  };
  console.log(taskName);

  useEffect(() => {
    axios
      .get("http://localhost:4000/users")
      .then((response) => {
        console.log(response);
        let newArray = [...response.data];
        newArray = newArray.reverse();

        setUsers(newArray);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      Users
      <AddUser setUsers={setUsers} users={users} />
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
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    assignTask(taskName, user.id);
                  }}
                >
                  <input
                    type="text"
                    placeholder="Task to assign..."
                    name="taskName"
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
