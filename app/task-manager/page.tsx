import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import ListGroup from "@/components/ListGroup";
import { Tasks } from "@/configs/Tasks";
import { Task } from "@/types";

export default function TaskManager() {
  return (
    <>
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-4">Task Management</h1>
          <p className="lead">
            Your list of pending tasks, currently managed tasks, and completed
            tasks.
          </p>
        </div>
      </div>
      <div className="task-manager-container">
        <div className="task-colloum-container">
          {Tasks.map((task, index, Tasks) => (
            <div className="task">{task}</div>
          ))}
        </div>
      </div>
    </>
  );
}
