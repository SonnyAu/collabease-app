"use client";

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";

interface Task {
  text: string;
  completed: boolean;
}

export default function TaskManager() {
  const [taskText, setTaskText] = useState(""); // State for input text
  const [tasks, setTasks] = useState<Task[]>([]); // State for task list

  // Load tasks from localStorage when the component mounts
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

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

  const deleteTask = (index: number) => {
    setTasks((prevTasks) => [
      ...prevTasks.slice(0, index), // Elements before the index
      ...prevTasks.slice(index + 1), // Elements after the index
    ]);
  };

  return (
    <>
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-4">Task Manager Dashboard</h1>
          <p className="lead">
            Your list of pending tasks, currently managed tasks, and completed
            tasks.
          </p>
        </div>
      </div>

      <div className="flex-none w-[100vw] h-screen bg-gray-100 p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto">
        <div className="bg-white w-[60vw] mx-auto mt-25 mb-auto pt-10 px-8 pb-10 rounded-xl flex-col">
          <h2 className="text-gray-400 mb-4 text-left">To-Do List</h2>
          <div className="w-[40vw] rounded-3xl bg-slate-200 text-left pl-4 justify-between items-center flex">
            <input
              type="text"
              value={taskText} // Bind input value to state
              onChange={(e) => setTaskText(e.target.value)} // Update state on change
              placeholder="Add your task"
              className="bg-transparent border-none flex-1 p-2"
            />
            <button
              onClick={addTask} // Call addTask directly
              className="hover:bg-red-700 p-2 px-4 rounded-3xl bg-red-400 text-white border-none outline-none cursor-pointer"
            >
              Add
            </button>
          </div>
          <ul className="py-2 pl-5 cursor-pointer list-disc">
            {tasks.map((task, index) => (
              <li
                key={index}
                className="pl-2 flex justify-between items-center hover:bg-gray-300 rounded-full"
              >
                <span
                  onClick={() => toggleTaskCompletion(index)} // Toggle completion on click
                  className={task.completed ? "line-through " : ""}
                >
                  {task.text}
                </span>
                <button
                  onClick={() => deleteTask(index)} // Delete task on click
                  className="p-1 px-2 text-xs bg-red-400 text-white rounded-full hover:bg-red-700"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
// flex justify-between items-center hover:bg-gray-30
