import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import ListGroup from "@/components/ListGroup";

export default function Dashboard() {
  return (
    <>
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-4">Task Management Dashboard</h1>
          <p className="lead">
            Your list of pending tasks, currently managed tasks, and completed
            tasks.
          </p>
        </div>
      </div>
    </>
  );
}
