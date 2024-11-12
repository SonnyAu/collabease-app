import React from "react";

// Define the expected structure of the 'project' prop
interface ProjectCardProps {
  project: {
    name: string;
    description: string;
    teamName: string;
    status: boolean;
    tasks: number;
  };
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="min-w-[150px] max-w-[300px] min-h-[150px] p-4 bg-white rounded-2xl shadow-md border border-gray-200 flex flex-col">
      <h2 className="text-xl font-semibold mb-2">{project.name}</h2>
      <p className="text-gray-500 mb-2 font-sans">Description: {project.description}</p>
      <div className="text-sm font-medium text-gray-700">Team: {project.teamName}</div>
      <div className="mt-auto text-sm font-medium text-green-600">Status: {project.status ? "Completed" : "In Process"}</div>
      <div className="mt-auto text-sm font-medium text-green-600">Active Tasks: {project.tasks}</div>
    </div>
  );
};

export default ProjectCard;
