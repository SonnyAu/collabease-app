"use client";

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import ProjectCard from "@/page-components/ProjectCard";
import ChatFeature from "@/page-components/ChatFeature";


// Define the Project interface
interface Project {
  name: string;
  description: string;
  teamName: string;
  status: boolean;
  tasks: number;
}

export default function PageComponent() {
  const [searchQuery, setSearchQuery] = useState("");

  // State for controlling modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State for new project input
  const [newProject, setNewProject] = useState<{ name: string; description: string; teamName: string }>({
    name: "",
    description: "",
    teamName: "",
  });

  // State for storing projects, loading from localStorage initially
  const [projects, setProjects] = useState<Project[]>(() => {
    const savedProjects = localStorage.getItem("projects");
    return savedProjects ? JSON.parse(savedProjects) : [];
  });

  // Listen for changes in localStorage to sync projects across components
  useEffect(() => {
    const syncProjects = (event: StorageEvent) => {
      if (event.key === "projects") {
        setProjects(event.newValue ? JSON.parse(event.newValue) : []);
      }
    };

    window.addEventListener("storage", syncProjects);
    return () => window.removeEventListener("storage", syncProjects);
  }, []);

  // Save projects to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  // Handle modal open/close
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // Handle input changes for the form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({ ...prev, [name]: value }));
  };

  // Add a new project
  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    const newProjectData: Project = { ...newProject, tasks: 0, status: false }; // Create a new project
    setProjects((prevProjects) => [...prevProjects, newProjectData]); // Add to state
    setNewProject({ name: "", description: "", teamName: "" }); // Reset form
    handleCloseModal(); // Close modal
  };

  // Filter projects based on search query
  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate total tasks across projects
  const totalTasks = projects.reduce((sum, project) => sum + project.tasks, 0);

  return (
    <>
      <div className="h-[7vh] w-[100vw] bg-gray-100 text-center flex justify-between">
        <h1 className="text-left pl-4 py-2">Project Overview Dashboard</h1>
        <input
          type="text"
          placeholder="Search"
          className="my-3 mx-4 p-1 rounded-sm bg-white"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <ChatFeature />

      <div className="shadow-xl h-[30vh] w-[100vw] bg-gradient-to-r from-sky-500 to-indigo-500 flex items-center space-x-3 overflow-x-auto">
        <div className="shadow-xl rounded-xl h-[20vh] w-[30vw] p-2 ml-2 bg-white">
          Projects
          <div className="text-center text-7xl py-3">{projects.length}</div>
        </div>
        <div className="shadow-xl rounded-xl h-[20vh] w-[30vw] p-2 bg-white">
          Active Tasks
          <div className="text-center text-7xl py-3">{totalTasks}</div>
        </div>
        <div className="shadow-xl rounded-xl h-[20vh] w-[30vw] p-2 bg-white">Completion</div>
      </div>
      <div className="w-full flex justify-end px-2 m-2">
        <button onClick={handleOpenModal} className="bg-blue-500 px-2 text-white p-[4px] rounded-xl hover:bg-blue-400">
          Create Project
        </button>
      </div>
      <div className="shadow-xl border-solid border-2 mx-9 my-2 w-[90vw] h-full bg-blue-50">
        <div className="mx-3 shadow-xl w-full h-full bg-gray-100 p-6 flex-row gap-4 overflow-x-auto">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>       
      </div>

      

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-md">
            <h3 className="text-xl text-center">Add New Project</h3>
            <form onSubmit={handleAddProject}>
              <div>
                <h4 className="text-lg">Project Name</h4>
                <input
                  type="text"
                  placeholder="Add Project Name"
                  name="name"
                  value={newProject.name}
                  className="border rounded-lg px-2 w-full py-2 text-slate-900 bg-slate-200 mb-4"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <h4 className="text-lg">Project Description</h4>
                <input
                  type="text"
                  placeholder="Add Project Description"
                  name="description"
                  value={newProject.description}
                  className="border rounded-lg px-2 w-full py-2 text-slate-900 bg-slate-200 mb-4"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <h4 className="text-lg">Team Name</h4>
                <input
                  type="text"
                  placeholder="Add Team Name"
                  name="teamName"
                  value={newProject.teamName}
                  className="border rounded-lg px-2 w-full py-2 text-slate-900 mb-4 bg-slate-200"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="flex mt-3 space-x-2 justify-end">
                <button
                  className="border rounded-lg py-1 px-2 bg-blue-500 hover:bg-blue-400 text-white"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  className="border rounded-lg py-1 px-2 bg-blue-500 hover:bg-blue-400 text-white"
                  type="submit"
                >
                  Add Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
