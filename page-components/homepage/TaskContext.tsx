"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface Task {
  id: number;
  title: string;
  description: string;
  status: "To-Do" | "In-Process" | "Done";
  assignedTo: string;
  dueDate: string;
  projectId: number | null; // Link tasks to projects
}

interface Project {
  id: number;
  name: string;
  description: string;
  teamName: string;
  status: boolean;
}

interface TaskContextProps {
  tasks: Task[];
  projects: Project[];
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: number) => void;
  addProject: (project: Project) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: number) => void;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const savedProjects = localStorage.getItem("projects");
    return savedProjects ? JSON.parse(savedProjects) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const addTask = (task: Task) => setTasks((prev) => [...prev, task]);

  const updateTask = (updatedTask: Task) =>
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );

  const deleteTask = (id: number) =>
    setTasks((prev) => prev.filter((task) => task.id !== id));

  const addProject = (project: Project) =>
    setProjects((prev) => [...prev, project]);

  const updateProject = (updatedProject: Project) =>
    setProjects((prev) =>
      prev.map((project) =>
        project.id === updatedProject.id ? updatedProject : project
      )
    );

  const deleteProject = (id: number) => {
    setProjects((prev) => prev.filter((project) => project.id !== id));
    setTasks((prev) => prev.filter((task) => task.projectId !== id)); // Remove tasks linked to deleted project
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        projects,
        addTask,
        updateTask,
        deleteTask,
        addProject,
        updateProject,
        deleteProject,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};
