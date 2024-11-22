import React from "react";

interface ProjectCardProps {
  project: {
    name: string;
    description: string;
    teamName: string;
    status: boolean;
    tasks: number;
  };
  onDelete: () => void;
  onEdit: () => void;
}

const ProjectCard = ({ project, onDelete, onEdit }: ProjectCardProps) => {
  return (
    <div className="relative p-4 bg-white rounded-2xl shadow-md border border-gray-200 flex flex-col">
      {/* Project Details */}
      <h2 className="text-xl font-semibold mb-2">{project.name}</h2>
      <p className="text-gray-500 mb-2">Description: {project.description}</p>
      <div className="text-sm font-medium text-gray-700">Team: {project.teamName}</div>
      <div className="text-sm font-medium text-gray-700">Active Tasks: {project.tasks}</div>
      <div className={`text-sm font-medium mt-2 ${project.status ? "text-green-600" : "text-yellow-600"}`}>
        Status: {project.status ? "Completed" : "In Process"}
      </div>

      {/* Top-right Buttons (Edit and Delete) */}
      <div className="absolute top-2 right-2 flex space-x-2">
        <button
          onClick={onEdit}
          className="bg-blue-500 hover:bg-blue-400 text-white px-2 py-1 rounded-md text-xs"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500 hover:bg-red-400 text-white px-2 py-1 rounded-md text-xs"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
