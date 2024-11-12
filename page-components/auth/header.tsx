"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-blue-500 w-full h-20 flex items-center px-6">
      <div className="flex w-full items-center justify-between">
        {/* Left-aligned Logo */}
        <Link href="/" className="text-2xl font-bold text-white">
          CollabEase
        </Link>

        {/* Spacer to push the navigation to the right */}
        <div className="flex-grow"></div>

        {/* Right-aligned Navigation Links */}
        <nav className="flex items-center space-x-8 gap-2">
          <Link
            href="/auth"
            className="text-white hover:text-gray-300 transition-colors"
          >
            Login
          </Link>
          <Link
            href="/about"
            className="text-white hover:text-gray-300 transition-colors"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-white hover:text-gray-300 transition-colors"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
