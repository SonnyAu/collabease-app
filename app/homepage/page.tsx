"use client";

import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link"; // Import Link for navigation
import { useTasks } from "@/page-components/homepage/TaskContext";
import {
  FiHome,
  FiBriefcase,
  FiList,
  FiFolder,
  FiLogOut,
} from "react-icons/fi";

// Dynamically import FullCalendar
const FullCalendar = dynamic(() => import("@fullcalendar/react"), {
  ssr: false,
});
import dayGridPlugin from "@fullcalendar/daygrid";

export default function HomePage() {
  const { tasks } = useTasks();

  // Ensure valid events for FullCalendar
  const events = tasks
    .filter((task) => task.dueDate) // Include tasks with dueDate only
    .map((task) => ({
      title: task.title,
      start: task.dueDate, // Ensure valid date format
    }));

  return (
    <div className="flex w-screen min-h-screen">
      {/* Sidebar */}
      <div className="flex-none w-64 bg-white border-r border-gray-200 shadow-lg flex flex-col">
        <div className="flex-grow py-6 px-4 overflow-y-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-blue-500">CollabEase</h1>
            <p className="text-sm text-gray-400">Streamline your workflow</p>
          </div>
          <nav className="space-y-4">
            <Link
              href="/homepage"
              className="flex items-center gap-3 text-gray-700 hover:text-blue-500 py-2 px-4 rounded-lg hover:bg-blue-50"
            >
              <FiHome className="text-xl" />
              <span>Home</span>
            </Link>
            <Link
              href="/project-manager"
              className="flex items-center gap-3 text-gray-700 hover:text-blue-500 py-2 px-4 rounded-lg hover:bg-blue-50"
            >
              <FiBriefcase className="text-xl" />
              <span>Project Manager</span>
            </Link>
            <Link
              href="/task-manager"
              className="flex items-center gap-3 text-gray-700 hover:text-blue-500 py-2 px-4 rounded-lg hover:bg-blue-50"
            >
              <FiList className="text-xl" />
              <span>Task Manager</span>
            </Link>
            <Link
              href="/file-upload"
              className="flex items-center gap-3 text-gray-700 hover:text-blue-500 py-2 px-4 rounded-lg hover:bg-blue-50"
            >
              <FiFolder className="text-xl" />
              <span>Project Files</span>
            </Link>
          </nav>
          <div className="mt-6 border-t border-gray-200 pt-4">
            <Link
              href="/"
              className="flex items-center gap-3 text-gray-700 hover:text-red-500 py-2 px-4 rounded-lg hover:bg-red-50"
            >
              <FiLogOut className="text-xl" />
              <span>Logout</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-6">
        {/* Current Tasks */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Current Tasks</h2>
          <div className="space-y-4">
            {tasks.map((task) => (
              <div key={task.id} className="p-4 bg-white rounded shadow">
                <h3 className="text-lg font-bold">{task.title}</h3>
                <p className="text-sm text-gray-600">{task.description}</p>
                <p className="text-sm text-gray-500">
                  Assigned to: {task.assignedTo}
                </p>
                <p className="text-sm text-gray-500">Status: {task.status}</p>
                <p className="text-sm text-gray-500">Due: {task.dueDate}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FullCalendar */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Task Calendar</h2>
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={events}
          />
        </div>
      </div>
    </div>
  );
}
