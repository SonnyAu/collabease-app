"use client";

import Card from "@/page-components/Card";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { FiHome, FiBriefcase, FiList, FiFolder, FiLogOut } from "react-icons/fi";

// Dynamically import FullCalendar for client-side rendering
const FullCalendar = dynamic(() => import("@fullcalendar/react"), {
  ssr: false,
});
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // Enables event interaction

export default function HomePage() {
  // Example task data
  const tasks = [
    { title: "Task 1", description: "Description 1", person: "Alice", status: "Done" },
    { title: "Task 2", description: "Description 2", person: "Bob", status: "In Progress" },
    { title: "Task 3", description: "Description 3", person: "Charlie", status: "Pending" },
    { title: "Task 4", description: "Description 4", person: "Dana", status: "Done" },
  ];

  // State to manage events
  const [events, setEvents] = useState([
    { title: "Event 1", start: new Date(), allDay: true },
    { title: "Event 2", start: new Date(), end: new Date(), allDay: false },
  ]);

  // Handle adding events on date selection
  const handleDateSelect = (selectionInfo: {
    view: { calendar: any };
    startStr: any;
    endStr: any;
    allDay: any;
  }) => {
    const calendarApi = selectionInfo.view.calendar;
    calendarApi.unselect(); // Clear the current selection

    // Prompt the user to enter an event title
    const title = prompt("Enter a title for the event:");

    if (title) {
      const newEvent = {
        title,
        start: selectionInfo.startStr,
        end: selectionInfo.endStr,
        allDay: selectionInfo.allDay,
      };

      // Update the events state
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    }
  };

  return (
    <div className="w-screen min-h-screen flex">
      {/* Sidebar */}
      <div className="flex-none w-64 h-screen bg-white border-r border-gray-200 shadow-lg flex flex-col py-6 px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-blue-500">CollabEase</h1>
          <p className="text-sm text-gray-400">Streamline your workflow</p>
        </div>
        <nav className="space-y-4 w-full">
          <a
            href="/home-page"
            className="flex items-center gap-3 text-gray-700 hover:text-blue-500 py-2 px-4 rounded-lg hover:bg-blue-50"
          >
            <FiHome className="text-xl" />
            <span>Home</span>
          </a>
          <a
            href="/project-manager"
            className="flex items-center gap-3 text-gray-700 hover:text-blue-500 py-2 px-4 rounded-lg hover:bg-blue-50"
          >
            <FiBriefcase className="text-xl" />
            <span>Project Manager</span>
          </a>
          <a
            href="/task-manager"
            className="flex items-center gap-3 text-gray-700 hover:text-blue-500 py-2 px-4 rounded-lg hover:bg-blue-50"
          >
            <FiList className="text-xl" />
            <span>Task Manager</span>
          </a>
          <a
            href="/file-upload"
            className="flex items-center gap-3 text-gray-700 hover:text-blue-500 py-2 px-4 rounded-lg hover:bg-blue-50"
          >
            <FiFolder className="text-xl" />
            <span>Project Files</span>
          </a>
        </nav>
        <div className="mt-auto w-full">
          <a
            href="/logout"
            className="flex items-center gap-3 text-gray-700 hover:text-red-500 py-2 px-4 rounded-lg hover:bg-red-50"
          >
            <FiLogOut className="text-xl" />
            <span>Logout</span>
          </a>
        </div>
      </div>

      {/* Left container for tasks */}
      <div className="flex-none w-[40vw] h-screen bg-gray-100 p-6 overflow-y-auto">
        {/* Header for the tasks section */}
        <div className="sticky top-0 bg-gray-100 z-10 pb-2">
          <h2 className="text-xl font-bold text-gray-700">Current Tasks</h2>
        </div>

        {/* Task Cards */}
        <div className="space-y-4">
          {tasks.map((task, index) => (
            <Card
              key={index}
              title={task.title}
              description={task.description}
              person={task.person}
              status={task.status}
            />
          ))}
        </div>
      </div>

      {/* Right container with FullCalendar */}
      <div className="flex-grow ml-4 mr-4 h-[50vh] bg-gray-100 p-4 overflow-y-auto">
        {/* FullCalendar Component with event addition */}
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          selectable={true} // Enables date selection
          select={handleDateSelect} // Handles event addition
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          height="100%"
        />
      </div>
    </div>
  );
}
