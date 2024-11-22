"use client";

import React, { useState, useEffect } from "react";
import { FiHome, FiBriefcase, FiList, FiFolder, FiLogOut } from "react-icons/fi";
import ProjectCard from "@/page-components/task-manager/ProjectCard";
import ChatFeature from "@/page-components/task-manager/ChatFeature";

// Define the Project interface
interface Project {
  name: string;
  description: string;
  teamName: string;
  status: boolean; // false = in progress, true = completed
  tasks: number;
}

export default function PageComponent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editProjectIndex, setEditProjectIndex] = useState<number | null>(null);
  const [newProject, setNewProject] = useState<{ name: string; description: string; teamName: string; status: boolean }>({
    name: "",
    description: "",
    teamName: "",
    status: false,
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const savedProjects = localStorage.getItem("projects");
      return savedProjects ? JSON.parse(savedProjects) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const handleOpenModal = (index: number | null = null) => {
    if (index !== null) {
      const projectToEdit = projects[index];
      setNewProject({
        name: projectToEdit.name,
        description: projectToEdit.description,
        teamName: projectToEdit.teamName,
        status: projectToEdit.status,
      });
      setEditProjectIndex(index);
    } else {
      setNewProject({ name: "", description: "", teamName: "", status: false });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditProjectIndex(null);
    setNewProject({ name: "", description: "", teamName: "", status: false });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setNewProject((prev) => ({ ...prev, status: checked }));
  };

  const handleAddOrEditProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (editProjectIndex !== null) {
      setProjects((prevProjects) => {
        const updatedProjects = [...prevProjects];
        updatedProjects[editProjectIndex] = { ...updatedProjects[editProjectIndex], ...newProject };
        return updatedProjects;
      });
    } else {
      const newProjectData: Project = { ...newProject, tasks: 0 };
      setProjects((prevProjects) => [...prevProjects, newProjectData]);
    }
    handleCloseModal();
  };

  const handleDeleteProject = (index: number) => {
    setProjects((prevProjects) => prevProjects.filter((_, i) => i !== index));
  };

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalTasks = projects.reduce((sum, project) => sum + project.tasks, 0);

  return (
    <div className="w-screen min-h-screen flex">
      {/* Sidebar */}
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

      {/* Main Content */}
      <div className="flex-grow flex flex-col">
        {/* Header */}
        <div className="h-[7vh] w-full bg-gray-100 text-center flex justify-between">
          <h1 className="text-left pl-4 py-2">Project Overview Dashboard</h1>
          <input
            type="text"
            placeholder="Search"
            className="my-3 mx-4 p-1 rounded-sm bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Chat Feature */}
        <ChatFeature />

        {/* Statistics Section */}
        <div className="grid grid-cols-3 gap-4 px-4 py-6 bg-gradient-to-r from-sky-500 to-indigo-500">
          <div className="shadow-xl rounded-xl h-[20vh] p-4 bg-white text-center">
            <h2 className="text-xl font-bold">Projects</h2>
            <p className="text-4xl mt-4">{projects.length}</p>
          </div>
          <div className="shadow-xl rounded-xl h-[20vh] p-4 bg-white text-center">
            <h2 className="text-xl font-bold">Active Tasks</h2>
            <p className="text-4xl mt-4">{totalTasks}</p>
          </div>
          <div className="shadow-xl rounded-xl h-[20vh] p-4 bg-white text-center">
            <h2 className="text-xl font-bold">Completion</h2>
            <p className="text-4xl mt-4">{projects.filter((p) => p.status).length}</p>
          </div>
        </div>

        {/* Create Project Button */}
        <div className="w-full flex justify-end px-2 m-2">
          <button
            onClick={() => handleOpenModal()}
            className="bg-blue-500 px-2 text-white p-[4px] rounded-xl hover:bg-blue-400"
          >
            Create Project
          </button>
        </div>

        {/* Projects Display */}
        <div className="mx-6 my-4 p-4 bg-blue-50 rounded-lg shadow-md grid grid-cols-1 gap-4">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              onDelete={() => handleDeleteProject(index)}
              onEdit={() => handleOpenModal(index)}
            />
          ))}
        </div>
      </div>

      {/* Modal for Adding/Editing Projects */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-md">
            <h3 className="text-xl text-center">
              {editProjectIndex !== null ? "Edit Project" : "Add New Project"}
            </h3>
            <form onSubmit={handleAddOrEditProject}>
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
                  className="border rounded-lg px-2 w-full py-2 text-slate-900 bg-slate-200 mb-4"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <h4 className="text-lg">Project Status</h4>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newProject.status}
                    onChange={handleCheckboxChange}
                  />
                  <span>{newProject.status ? "Completed" : "In Progress"}</span>
                </label>
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
                  {editProjectIndex !== null ? "Save Changes" : "Add Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
