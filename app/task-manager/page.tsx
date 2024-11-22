"use client";

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import ChatFeature from "@/page-components/ChatFeature";


interface Task {
  text: string;
  completed: boolean;
}

export default function TaskManager() {
  const [taskText, setTaskText] = useState("");
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // Sync tasks when localStorage changes
  useEffect(() => {
    const syncTasks = (event: StorageEvent) => {
      if (event.key === "tasks") {
        setTasks(event.newValue ? JSON.parse(event.newValue) : []);
      }
    };

    window.addEventListener("storage", syncTasks);
    return () => window.removeEventListener("storage", syncTasks);
  }, []);

  // Update localStorage when tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (taskText.trim() === "") return;
    const newTask = { text: taskText, completed: false };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setTaskText("");
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
      <div className="jumbotron jumbotron-fluid ">
        <div className="container">
          <h1 className="display-4">Task Manager Dashboard</h1>
          <p className="lead">
            Your list of pending tasks, currently managed tasks, and completed
            tasks.
          </p>
        </div>
      </div>

      <ChatFeature />

      <div className="flex-none w-[100vw] h-screen bg-gradient-to-r from-gray-200 to-gray-300 p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto">
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
              className="hover:bg-blue-400 p-2 px-4 rounded-3xl bg-blue-500 text-white border-none outline-none cursor-pointer"
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
                  className="p-1 px-2 text-xs bg-blue-500 text-white rounded-full hover:bg-blue-400"
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
