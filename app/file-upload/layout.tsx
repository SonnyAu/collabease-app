"use client";

import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-screen h-screen flex flex-col">
      {/* Header */}
      <header className="w-full bg-gray-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">File Uploader</h1>
      </header>

      {/* Main content */}
      <div className="flex-grow flex">
        {/* Sidebar (optional) */}
        <aside className="w-64 bg-gray-200 p-4">
          <ul>
            <li className="py-2 px-4 hover:bg-gray-300">Home</li>
            <li className="py-2 px-4 hover:bg-gray-300">My Files</li>
            <li className="py-2 px-4 hover:bg-gray-300">Shared Files</li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-grow bg-gray-100 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}