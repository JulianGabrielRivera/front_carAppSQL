import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export const UserDetails = () => {
  const [userName, setUserName] = useState("");
  const [tasks, setTasks] = useState(null);
  const { id } = useParams();
  console.log(id);
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

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        user:
        <h2>{userName}</h2>
      </div>
      <div style={{ width: "100vw" }}>
        tasks:
        {tasks &&
          tasks.map((task) => {
            return (
              <>
                <p>{task.task_name}</p>
              </>
            );
          })}
      </div>
    </>
  );
};
