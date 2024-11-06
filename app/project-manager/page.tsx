"use client";

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import ProjectCard from "@/page-components/ProjectCard";
import { Interface } from "readline";

export default function PageComponent() {

  const [searchQuery, setSearchQuery] = useState("");

  interface Project {
    name: string;
    description: string;
    teamName: string;
    status: boolean;
    tasks: number;
  }


  const projects: Project[] = [
    { name: "Project A", description: "Description", teamName: "Team A", status: true, tasks:0},
    { name: "Project B", description: "Description", teamName: "Team B", status: true, tasks:0},
  ];

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalTasks = projects.reduce((sum, project) => sum + project.tasks, 0)

  return (
    <>
      <div className="h-[7vh] w-[100vw] bg-gray-100 text-center flex justify-between">
        <h1 className="text-left pl-4 py-2">Project Overview Dashboard</h1>
        <input type="text"
         placeholder="Search"
         className="my-3 mx-4 p-1 rounded-sm bg-white"
          />
      </div>
      <div className="shadow-xl h-[30vh] w-[100vw] bg-blue-600 flex items-center space-x-3 overflow-x-auto">
        <div className="shadow-xl rounded-xl h-[20vh] w-[30vw] p-2 ml-2 bg-white">
          Projects
          <div className="text-center text-7xl py-3">
            {projects.length}
            </div>
        </div>
        <div className="shadow-xl rounded-xl h-[20vh] w-[30vw] p-2 bg-white">
          Active Tasks
          <div className="text-center text-7xl py-3">
            {totalTasks}
          </div>
          <div>
            
          </div>
        </div>
        <div className="shadow-xl rounded-xl h-[20vh] w-[30vw] p-2 bg-white">
          Completion
        </div>
      </div>
      <div className="w-full flex justify-end px-2 m-2">
      <button className="bg-blue-500 text-white p-[4px] rounded-xl hover:bg-blue-300">Create Project</button>
      </div>
      <div className="shadow-xl border-solid border-2 mx-9 my-2 w-[90vw] h-full bg-blue-50">
        <div className="mx-3 shadow-xl w-full h-full bg-gray-100 p-6 flex-row gap-4 overflow-x-auto">
          {filteredProjects.map((project, index) => (
            <ProjectCard 
            key={index}
            name={project.name}
            description={project.description}
            teamName={project.teamName}
            status={project.status}
            tasks={0}
            />
          ))}
          </div>
      </div>
    </>
  );
}
