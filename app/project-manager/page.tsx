"use client";

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";

export default function PageComponent() {
  return (
    <>
      <div className="h-[7vh] w-[100vw] bg-gray-100 text-center">
        <h1 className="text-center">Project Dashboard</h1>
        Project Manager Dashboard
      </div>
      <div className="h-[30vh] w-[100vw] bg-gray-200 flex items-center space-x-3">
        <div className="shadow-xl rounded-xl h-[20vh] w-[30vw] p-2 ml-2 bg-white">
          Proejcts
        </div>
        <div className="shadow-xl rounded-xl h-[20vh] w-[30vw] p-2 bg-white">
          Active Tasks
        </div>
        <div className="shadow-xl rounded-xl h-[20vh] w-[30vw] p-2 bg-white">
          Completion Rate
        </div>
      </div>
      <div className="opacity-40 mx-9 my-2 w-[90vw] h-[60vh] bg-blue-50">
        <div></div>
      </div>
    </>
  );
}
