"use client";

import Header from "@/page-components/auth/header";
import AuthForm from "@/page-components/auth/AuthForm";

export default function HomePage() {
  return (
    <div >
      {/* Header */}
      <div className="bg-blue-500"><Header /></div>
      

      <main className="max-w-7xl mx-auto py-10 px-6 flex justify-between">
        {/* Welcome Text */}
        <div>
          <h1 className="text-4xl font-bold mb-4">Welcome to CollabEase</h1>
          <p className="text-lg text-gray-700">
            Collaborate seamlessly with your team. Sign up or log in to get
            started!
          </p>
        </div>

        {/* Auth Form on the right */}
        <div className="w-1/3">
          <AuthForm />
        </div>
      </main>
    </div>
  );
}
