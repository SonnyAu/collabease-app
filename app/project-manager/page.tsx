"use client";

import React, { useState, useEffect } from "react";
import { FiHome, FiBriefcase, FiList, FiFolder, FiLogOut } from "react-icons/fi";
import { useTasks } from "@/page-components/homepage/TaskContext";
import ChatFeature from "@/page-components/task-manager/ChatFeature";

export default function PageComponent() {
  const { projects, tasks, addProject, updateProject, deleteProject } = useTasks();
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editProjectIndex, setEditProjectIndex] = useState<number | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);

  const [newProject, setNewProject] = useState<{
    name: string;
    description: string;
    teamName: string;
    status: boolean;
  }>({
    name: "",
    description: "",
    teamName: "",
    status: false,
  });

  useEffect(() => {
    if (selectedProjectId === null && projects.length > 0) {
      setSelectedProjectId(projects[0].id);
    }
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
      const updatedProject = { ...projects[editProjectIndex], ...newProject };
      updateProject(updatedProject);
    } else {
      const newProjectData = { ...newProject, id: Date.now() };
      addProject(newProjectData);
    }
    handleCloseModal();
  };

  const handleDeleteProject = (projectId: number) => {
    deleteProject(projectId);
    if (selectedProjectId === projectId) {
      setSelectedProjectId(null);
    }
  };

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const tasksForSelectedProject = tasks.filter(
    (task) => task.projectId === selectedProjectId
  );

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

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-4 px-4 py-6 bg-gradient-to-r from-sky-500 to-indigo-500">
          <div className="shadow-xl rounded-xl h-[20vh] p-4 bg-white text-center">
            <h2 className="text-xl font-bold">Projects</h2>
            <p className="text-4xl mt-4">{projects.length}</p>
          </div>
          <div className="shadow-xl rounded-xl h-[20vh] p-4 bg-white text-center">
            <h2 className="text-xl font-bold">Tasks</h2>
            <p className="text-4xl mt-4">{tasksForSelectedProject.length}</p>
          </div>
          <div className="shadow-xl rounded-xl h-[20vh] p-4 bg-white text-center">
            <h2 className="text-xl font-bold">Completion</h2>
            <p className="text-4xl mt-4">
              {
                tasksForSelectedProject.filter((task) => task.status === "Done")
                  .length
              }
            </p>
          </div>
        </div>

        {/* Projects Section */}
        <div className="w-full px-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Projects</h2>
            <button
              className="bg-blue-500 px-4 py-2 text-white rounded hover:bg-blue-400"
              onClick={() => handleOpenModal()}
            >
              Add Project
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className={`cursor-pointer shadow-md p-4 rounded-md ${
                  selectedProjectId === project.id ? "bg-blue-100" : "bg-white"
                } border hover:shadow-lg`}
                onClick={() => setSelectedProjectId(project.id)}
              >
                <h3 className="text-lg font-semibold">{project.name}</h3>
                <p className="text-sm">{project.description}</p>
                <p className="text-xs text-gray-500">Team: {project.teamName}</p>
                <p className="text-xs text-gray-500">
                  Status: {project.status ? "Completed" : "In Progress"}
                </p>
                <div className="mt-2 flex gap-2">
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenModal(index);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteProject(project.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tasks Section */}
        {selectedProjectId && (
          <div className="w-full px-4 mt-6">
            <h2 className="text-2xl font-bold mb-4">
              Tasks for Selected Project
            </h2>
            <ul className="list-group">
              {tasksForSelectedProject.map((task) => (
                <li
                  key={task.id}
                  className="list-group-item p-4 mb-2 border rounded shadow-md hover:shadow-lg"
                >
                  <h4 className="font-semibold text-lg">{task.title}</h4>
                  <p className="text-sm text-gray-600">{task.description}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Status: {task.status} | Due: {task.dueDate || "N/A"}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-md">
            <h3 className="text-xl text-center">
              {editProjectIndex !== null ? "Edit Project" : "Add New Project"}
            </h3>
            <form onSubmit={handleAddOrEditProject}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Project Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={newProject.name}
                  onChange={handleInputChange}
                  className="w-full px-2 py-1 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Project Description
                </label>
                <input
                  type="text"
                  name="description"
                  value={newProject.description}
                  onChange={handleInputChange}
                  className="w-full px-2 py-1 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Team Name
                </label>
                <input
                  type="text"
                  name="teamName"
                  value={newProject.teamName}
                  onChange={handleInputChange}
                  className="w-full px-2 py-1 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <div>
                  <input
                    type="checkbox"
                    checked={newProject.status}
                    onChange={handleCheckboxChange}
                  />
                  <span className="ml-2">
                    {newProject.status ? "Completed" : "In Progress"}
                  </span>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400"
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
