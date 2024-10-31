"use client"; // Add this line at the top

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import ListGroup from "@/components/ListGroup";

export default function TaskManager() {
  const [taskText, setTaskText] = useState(""); // State for input text
  const [tasks, setTasks] = useState<Task[]>([]); // State for task list

  const addTask = () => {
    if (taskText.trim() === "") {
      alert("Empty task cannot be added!");
    } else {
      // Add new task to the list
      setTasks([...tasks, { text: taskText, completed: false }]);
      setTaskText(""); // Clear the input after adding
    }
  };

  const toggleTaskCompletion = (index: number) => {
    // Toggle the completed status of the task at the specified index
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

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
