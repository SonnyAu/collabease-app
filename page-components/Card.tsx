import React from "react";

type CardProps = {
  title: string;
  description: string;
  person: string;
  status: string;
};

const Card: React.FC<CardProps> = ({ title, description, person, status }) => {
  return (
    <div className="w-full p-4 bg-white rounded-2xl shadow-md border border-gray-200 flex flex-col">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-500 mb-2">{description}</p>
      <div className="text-sm font-medium text-gray-700">{person}</div>
      <div className="mt-auto text-sm font-medium text-green-600">{status}</div>
    </div>
  );
};

export default Card;
