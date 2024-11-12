"use client";

import Header from '@/page-components/header';

export default function HomePage() {
  return (
    <div>
      <Header />
      <main className="max-w-7xl mx-auto py-10 px-6">
        <h1 className="text-4xl font-bold mb-4">Welcome to CollabEase</h1>
        <p className="text-lg text-gray-700">
          Collaborate seamlessly with your team. Sign up or log in to get started!
        </p>
      </main>
    </div>
  );
}
