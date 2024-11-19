import React from "react";
import "./Task.css";
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
  urgentGrey,
} from "../../assets/images.js";

const Task = ({ id, name, isStatus, isPriority, status, priority, title, isAvailable }) => {
  const statusImages = {
    Todo: todo,
    "In progress": inprogress,
    Completed: backlog,
    Backlog: done,
    Canceled: cancelled,
  };

  const priorityImages = {
    0: noPriority,
    1: lowPriority,
    2: midPriority,
    3: highPriority,
    4: urgentGrey,
  };

  return (
    <div className="app_task-container">
      <div className="task_profile">
        <div className="task_profile-id">{id}</div>
        <div className="profile-img">
          {name.charAt(0).toUpperCase()}
          <div
            className={`status-dot ${isAvailable ? "online" : "offline"}`}
          ></div>
        </div>
      </div>
      <div className="task_profile-title">
        {!isStatus && (
          <div className="icons">
            <img src={statusImages[status]} alt={status} />
          </div>
        )}
        <span>{title}</span>
      </div>
      <div className="task_profile-title">
        {!isPriority && (
          <div className="icons">
            <img src={priorityImages[priority]} alt="priority" />
          </div>
        )}
        <div className="dot"></div>
        <button>Feature Request</button>
      </div>
    </div>
  );
};

export default Task;
