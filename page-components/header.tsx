// components/Header.tsx
"use client";

import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md fixed w-full z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-blue-600 hover:text-blue-800"
        >
          CollabEase
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 items-center">
          <Link href="/" className="text-gray-600 hover:text-blue-500">
            Home
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-blue-500">
            About
          </Link>
          <Link href="/features" className="text-gray-600 hover:text-blue-500">
            Features
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-blue-500">
            Contact
          </Link>
          <Link
            href="/login"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Login
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-600"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-4">
          <nav className="flex flex-col items-center space-y-4">
            <Link href="/" className="text-gray-600 hover:text-blue-500">
              Home
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-blue-500">
              About
            </Link>
            <Link
              href="/features"
              className="text-gray-600 hover:text-blue-500"
            >
              Features
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-blue-500">
              Contact
            </Link>
            <Link
              href="/login"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Login
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
