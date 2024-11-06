import React from "react";

interface ProjectCardProps {
    name: string;
    description: string;
    teamName: string;
    status: boolean;
}



const ProjectCard: React.FC<ProjectCardProps> = ({ name, description, teamName, status }) => {
  return (
    <div className="min-w-[150px] max-w-[300px] min-h-[150px] p-4 bg-white rounded-2xl shadow-md border border-gray-200 flex flex-col">
      <h2 className="text-xl font-semibold mb-2">{ name }</h2>
      <p className="text-gray-500 mb-2">{ description }</p>
      <div className="text-sm font-medium text-gray-700">{ teamName }</div>
      <div className="mt-auto text-sm font-medium text-green-600">{ status }</div>
    </div>
  );
};

export default ProjectCard;
