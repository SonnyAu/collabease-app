"use client";

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-blue-500 shadow-lg">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <Link href="/" className=" text-2xl font-bold">
          CollabEase
        </Link>

        {/* Navigation Links */}
        <nav className="flex space-x-6">
          <Link href="/auth" className=" hover:text-gray-300 transition-colors">
            Login
          </Link>
          <Link href="/about" className=" hover:text-gray-300 transition-colors">
            About
          </Link>
          <Link href="/contact" className=" hover:text-gray-300 transition-colors">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}


