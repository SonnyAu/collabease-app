import Card from "@/page-components/Card";
import React from "react";

export default function HomePage() {
  // Example array representing the cards
  const cards = [1, 2, 3, 4, 5, 6]; // Replace with your actual data

  return (
    <div className="min-h-screen p-6 flex items-start">
      <div className="w-[50vw] min-w-[600px] h-[50vh] bg-gray-100 p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto">
        {cards.map((_, index) => (
          <Card key={index} />
        ))}
      </div>
    </div>
  );
}
