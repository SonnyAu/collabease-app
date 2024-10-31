import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import { Weekday, Date } from "@/types";
import { Weekdays } from "@/configs/Weekdays";
import { CalendarPage } from "@/page-components/CalendarPage";

export default function Calendar () {
  return (
    <div>
      <h1>Calendar Page</h1>
      <CalendarPage />
    </div>
  );
};