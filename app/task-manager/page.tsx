"use client";

import React, { useState } from "react";
import { useTasks } from "@/page-components/homepage/TaskContext";
import "bootstrap/dist/css/bootstrap.css";
import { FiHome, FiBriefcase, FiList, FiFolder, FiLogOut } from "react-icons/fi";

interface Task {
  id: number;
  title: string;
  description: string;
  status: "To-Do" | "In-Process" | "Done";
  assignedTo: string;
  dueDate: string;
  projectId: number | null;
}

interface Project {
  id: number;
  name: string;
}

export default function TaskManager() {
  const { tasks, addTask, updateTask, deleteTask, projects } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const openModal = (task: Task | null = null) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingTask(null);
    setIsModalOpen(false);
  };

  const handleTaskSubmit = (task: Task) => {
    if (editingTask) {
      updateTask(task);
    } else {
      addTask({ ...task, id: Date.now() });
    }
    closeModal();
  };

  return (
    <div className="d-flex">
      <div className="flex-none w-64 h-screen bg-white border-r border-gray-200 shadow-lg flex flex-col py-6 px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-blue-500">CollabEase</h1>
          <p className="text-sm text-gray-400">Streamline your workflow</p>
        </div>
        <nav className="space-y-4 w-full">
          <a href="/homepage" className="flex items-center gap-3 text-gray-700 hover:text-blue-500 py-2 px-4 rounded-lg hover:bg-blue-50">
            <FiHome className="text-xl" />
            <span>Home</span>
          </a>
          <a href="/project-manager" className="flex items-center gap-3 text-gray-700 hover:text-blue-500 py-2 px-4 rounded-lg hover:bg-blue-50">
            <FiBriefcase className="text-xl" />
            <span>Project Manager</span>
          </a>
          <a href="/task-manager" className="flex items-center gap-3 text-gray-700 hover:text-blue-500 py-2 px-4 rounded-lg hover:bg-blue-50">
            <FiList className="text-xl" />
            <span>Task Manager</span>
          </a>
          <a href="/file-upload" className="flex items-center gap-3 text-gray-700 hover:text-blue-500 py-2 px-4 rounded-lg hover:bg-blue-50">
            <FiFolder className="text-xl" />
            <span>Project Files</span>
          </a>
        </nav>
        <div className="mt-auto w-full">
          <a href="/logout" className="flex items-center gap-3 text-gray-700 hover:text-red-500 py-2 px-4 rounded-lg hover:bg-red-50">
            <FiLogOut className="text-xl" />
            <span>Logout</span>
          </a>
        </div>
      </div>

      <div className="flex-grow p-4">
        <div className="d-flex justify-content-between mb-4">
          <h2>Tasks</h2>
          <button className="btn btn-primary" onClick={() => openModal()}>
            Add Task
          </button>
        </div>
        <ul className="list-group">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <h5>{task.title}</h5>
                <p className="mb-1 text-muted">{task.description}</p>
                <small className="d-block">Assigned to: {task.assignedTo}</small>
                <small className="d-block">Due Date: {task.dueDate}</small>
                <small className="d-block">
                  Project:{" "}
                  {projects.find((project) => project.id === task.projectId)?.name || "None"}
                </small>
              </div>
              <div>
                <button
                  className="btn btn-sm btn-primary mx-1"
                  onClick={() => openModal(task)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger mx-1"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {isModalOpen && (
        <TaskModal
          task={editingTask}
          onClose={closeModal}
          onSubmit={handleTaskSubmit}
          projects={projects}
        />
      )}
    </div>
  );
}

interface TaskModalProps {
  task: Task | null;
  onClose: () => void;
  onSubmit: (task: Task) => void;
  projects: Project[];
}

function TaskModal({ task, onClose, onSubmit, projects }: TaskModalProps) {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [status, setStatus] = useState<Task["status"]>(task?.status || "To-Do");
  const [assignedTo, setAssignedTo] = useState(task?.assignedTo || "");
  const [dueDate, setDueDate] = useState(task?.dueDate || "");
  const [projectId, setProjectId] = useState<number | null>(task?.projectId || null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: Task = {
      id: task?.id || Date.now(),
      title,
      description,
      status,
      assignedTo,
      dueDate,
      projectId,
    };
    onSubmit(newTask);
  };

  return (
    <div className="modal show d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{task ? "Edit Task" : "Add Task"}</h5>
            <button className="close" onClick={onClose}>
              &times;
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Task Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Task Description</label>
                <textarea
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  className="form-control"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as Task["status"])}
                >
                  <option value="To-Do">To-Do</option>
                  <option value="In-Process">In-Process</option>
                  <option value="Done">Done</option>
                </select>
              </div>
              <div className="form-group">
                <label>Assign to</label>
                <input
                  type="text"
                  className="form-control"
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                  placeholder="Enter team member's name"
                />
              </div>
              <div className="form-group">
                <label>Due Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Project</label>
                <select
                  className="form-control"
                  value={projectId || ""}
                  onChange={(e) =>
                    setProjectId(e.target.value ? Number(e.target.value) : null)
                  }
                >
                  <option value="">None</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn btn-primary mt-3">
                Save Task
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
