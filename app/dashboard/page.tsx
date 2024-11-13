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
      <div className="btn-group" role="group" aria-label="Basic example">
        <button type="button" className="btn btn-secondary">
          To-Do
          <ul className="list-group">
            <li className="list-group-item">item1</li>
            <li className="list-group-item">item2</li>
            <li className="list-group-item">item3</li>
            <li className="list-group-item">item4</li>
            <li className="list-group-item">item5</li>
          </ul>
        </button>
        <button type="button" className="btn btn-secondary">
          In-Process
          <ul className="list-group">
            <li className="list-group-item">item1</li>
            <li className="list-group-item">item2</li>
            <li className="list-group-item">item3</li>
            <li className="list-group-item">item4</li>
            <li className="list-group-item">item5</li>
          </ul>
        </button>
        <button type="button" className="btn btn-secondary">
          Done
          <ul className="list-group">
            <li className="list-group-item">item1</li>
            <li className="list-group-item">item2</li>
            <li className="list-group-item">item3</li>
            <li className="list-group-item">item4</li>
            <li className="list-group-item">item5</li>
          </ul>
        </button>
      </div>
    </>
  );
}
