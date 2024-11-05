import React from "react";

const Card = () => {
  return (
    <div className="min-w-[200px] max-w-[300px] min-h-[150px] p-4 bg-white rounded-2xl shadow-md border border-gray-200 flex flex-col">
      <h2 className="text-xl font-semibold mb-2">Task</h2>
      <p className="text-gray-500 mb-2">Task description</p>
      <div className="text-sm font-medium text-gray-700">Person Name</div>
      <div className="mt-auto text-sm font-medium text-green-600">Done</div>
    </div>
  );
};

export default Card;
