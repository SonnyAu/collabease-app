"use client";

import Header from "@/page-components/auth/header";
import AuthForm from "@/page-components/auth/AuthForm";
import Footer from "@/page-components/auth/footer";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-blue-500">
        <Header />
      </div>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto py-10 px-6 flex justify-between items-center">
        {/* Left Section with Welcome Text and Image */}
        <div className="w-2/3 space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-4">Welcome to CollabEase</h1>
            <p className="text-lg text-gray-700">
              Collaborate seamlessly with your team. Sign up or log in to get started!
            </p>
          </div>
          <div className="relative">
            <Image
              src="/collab1.png"
              alt="CollabEase illustration"
              width={750}
              height={300}
              className="rounded-lg"
            />
          </div>
        </div>

        {/* Auth Form on the right */}
        <div className="w-1/3 px-10">
          <AuthForm />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
