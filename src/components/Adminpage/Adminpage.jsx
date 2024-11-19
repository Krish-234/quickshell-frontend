import React, { useEffect, useState } from "react";
import axios from "axios";
import { Task,Loader } from "../components";

import {
  todo,
  inprogress,
  backlog,
  done,
  cancelled,
  noPriority,
  lowPriority,
  midPriority,
  highPriority,
  urgentColour,
  threeDotMenu,
  add,
} from "../../assets/images.js";
import "./Adminpage.css";

const Adminpage = ({ selectedGroup, selectedOrder }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loader />; // Display the spinner while loading
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const statusImages = {
    Todo: todo,
    "In progress": inprogress,
    Backlog: backlog,
    Done: done,
    Cancelled: cancelled,
  };

  const priorityData = {
    0: { image: noPriority, label: "No Priority" },
    1: { image: lowPriority, label: "Low" },
    2: { image: midPriority, label: "Medium" },
    3: { image: highPriority, label: "High" },
    4: { image: urgentColour, label: "Urgent" },
  };

  const groupTasks = (tasks, groupBy) => {
    const grouped = {};
    const defaultStatuses = ["Todo", "In progress", "Backlog", "Done", "Cancelled"];

    tasks.forEach((task) => {
      let key;
      if (groupBy === "status") {
        key = task.status;
      } else if (groupBy === "user") {
        key = data.users.find((user) => user.id === task.userId)?.name;
      } else if (groupBy === "priority") {
        key = task.priority;
      }

      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(task);
    });

    defaultStatuses.forEach((status) => {
      if (selectedGroup === "status" && !grouped[status]) {
        grouped[status] = [];
      }
    });

    return grouped;
  };

  const sortTasks = (tasks, orderBy) => {
    return tasks.sort((a, b) => {
      if (orderBy === "Priority") {
        return a.priority - b.priority;
      } else if (orderBy === "Title") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  };

  const groupedTasks = groupTasks(data.tickets, selectedGroup);
  Object.keys(groupedTasks).forEach((key) => {
    groupedTasks[key] = sortTasks(groupedTasks[key], selectedOrder);
  });

  return (
    <div>
      <div className="app_dashboard-container">
        {Object.keys(groupedTasks).map((groupKey) => (
          <div key={groupKey} className="app_Task-sidebar">
            <div className="group-header">
              {selectedGroup === "status" ? (
                <div className="sort_by-user">
                  <div className="sort_by-user-profile">
                    <img
                      src={statusImages[groupKey]}
                      alt={groupKey}
                      className="margin-right"
                    />
                    <span className="margin-right">{groupKey}</span>
                    <div>{groupedTasks[groupKey].length}</div>
                  </div>
                  <div className="flex-end">
                    <img src={add} alt="" />
                    <img src={threeDotMenu} alt="" />
                  </div>
                </div>
              ) : selectedGroup === "priority" ? (
                <div className="sort_by-user">
                  <div className="sort_by-user-profile">
                    <img
                      src={priorityData[groupKey].image}
                      alt={`Priority ${groupKey}`}
                      className="margin-right"
                    />
                    <span className="margin-right">
                      {priorityData[groupKey].label}
                    </span>
                    <div>{groupedTasks[groupKey].length}</div>
                  </div>
                  <div className="flex-end">
                    <img src={add} alt="" />
                    <img src={threeDotMenu} alt="" />
                  </div>
                </div>
              ) : (
                <div className="sort_by-user">
                  <div className="sort_by-user-profile">
                    <div className="profile-img margin-right">
                      {groupKey.charAt(0).toUpperCase()}
                    </div>
                    <span className="margin-right">{groupKey}</span>
                    <div>{groupedTasks[groupKey].length}</div>
                  </div>
                  <div className="flex-end">
                    <img src={add} alt="" />
                    <img src={threeDotMenu} alt="" />
                  </div>
                </div>
              )}
            </div>
            <div className="container">
              {groupedTasks[groupKey].length > 0 ? (
                groupedTasks[groupKey].map((task) => (
                  <Task
                    key={task.id}
                    id={task.id}
                    name={
                      data.users.find((user) => user.id === task.userId)?.name
                    }
                    isStatus={selectedGroup === "status"}
                    isPriority={selectedGroup === "priority"}
                    status={task.status}
                    priority={task.priority}
                    title={task.title}
                    isAvailable={data.users.find((user) => user.id === task.userId)?.available}
                  />
                ))
              ) : (
                <div></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Adminpage;
