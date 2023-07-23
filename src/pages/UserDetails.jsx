import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export const UserDetails = () => {
  const [userName, setUserName] = useState("");
  const [tasks, setTasks] = useState(null);
  const [priority, setPriority] = useState("");

  const selectPriority = (e) => {
    setPriority(e.target.value);
  };
  const { id } = useParams();
  console.log(id);

  const updatePriority = (priority, id) => {
    axios
      .post("http://localhost:4000/users/user/update", { priority, id })
      .then((response) => {
        console.log(response);
        const newTasks = tasks.map((task) => {
          if (task.id === id) {
            return { ...task, priority: priority };
          }
          return task;
        });
        setTasks(newTasks);
        console.log(newTasks);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDetails = () => {
    axios
      .get(`http://localhost:4000/users/user/${id}`)
      .then((response) => {
        console.log(response);
        setUserName(
          response.data.queryTwo[0].first_name.concat(
            " ",
            response.data.queryTwo[0].last_name
          )
        );
        setTasks(response.data.queryOne);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getDetails();
  }, []);
  console.log(userName);
  console.log(priority);
  return (
    <>
      <div style={{ display: "flex", alignItems: "center", color: "white" }}>
        user:
        <h2>{userName}</h2>
      </div>
      <div style={{ width: "90vw", display: "flex", justifyContent: "center" }}>
        tasks:
        <table style={{ color: "white" }}>
          <tr
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "50vw",
            }}
          >
            <td>Task ID</td>
            <td>Task Name</td>
            <td>Priority</td>
          </tr>
          {tasks &&
            tasks.map((task) => {
              return (
                <>
                  <tr
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "50vw",
                    }}
                  >
                    <td>{task.id}</td>
                    <td>{task.task_name}</td>
                    <select
                      onChange={(e) => {
                        updatePriority(e.target.value, task.id);
                      }}
                      style={{ backgroundColor: "#176db7", height: "100%" }}
                      value={task.priority}
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </tr>

                  {/* <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-evenly",
                      width: "100vw",
                    }}
                  >
                    <p style={{ color: "white" }}>{task.task_name}</p>

                    <select
                      // onChange={selectPriority}
                      style={{ backgroundColor: "#176db7", height: "100%" }}
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div> */}
                </>
              );
            })}
        </table>
      </div>
    </>
  );
};
