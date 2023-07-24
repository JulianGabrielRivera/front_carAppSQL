import { AddUser } from "../components/AddUser";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const Users = () => {
  const [users, setUsers] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [priority, setPriority] = useState("");

  const selectPriority = (e) => {
    setPriority(e.target.value);
  };
  console.log(priority);
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
      .post("http://localhost:4000/tasks/create", { taskName, priority, id })
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
    <div
      style={{
        width: "100%",
      }}
    >
      Users
      <AddUser setUsers={setUsers} users={users} />
      {users?.map((user) => {
        return (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {user.image ? <img width={100} src={user.image} /> : ""}
              <Link to={`/users/${user.id}`}>
                <p>
                  {user.first_name}

                  {user.last_name}
                </p>
              </Link>
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
                  style={{
                    display: "flex",
                    height: "50px",
                    alignItems: "center",
                  }}
                >
                  {/* <div
                    style={{
                      display: "flex",
                      height: "100%",
                      backgroundColor: "#176db7",
                    }}
                  > */}
                  <h4
                    style={{
                      backgroundColor: "#176db7",
                      height: "100%",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    Priority
                  </h4>
                  <select
                    onChange={selectPriority}
                    style={{ backgroundColor: "#176db7", height: "100%" }}
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                  {/* </div> */}
                  <input
                    type="text"
                    placeholder="Task to assign..."
                    name="taskName"
                    onChange={onChangeTask}
                    style={{ height: "90%" }}
                  ></input>
                  <button style={{ height: "100%" }}>Click to Assign</button>
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
