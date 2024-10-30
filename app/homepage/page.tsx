"use client"; // Keep this directive to ensure client-side rendering

import Card from "@/page-components/Card";
import React, { useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import FullCalendar for client-side rendering
const FullCalendar = dynamic(() => import("@fullcalendar/react"), {
  ssr: false,
});
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // Enables event interaction

export default function HomePage() {
  // Example array representing the cards
  const cards = [1, 2, 3, 4, 5, 6]; // Replace with your actual data

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
      {/* Left container for cards */}
      <div className="flex-none w-[40vw] h-screen bg-gray-100 p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto">
        {cards.map((_, index) => (
          <Card key={index} />
        ))}
      </div>

      {/* Right container with FullCalendar */}
      <div className="flex-grow ml-4 mr-4 h-[50vh] bg-gray-100 p-4 overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">Top Right Container</h2>

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
