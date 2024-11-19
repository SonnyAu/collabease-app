"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-blue-500 text-gray-200 py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Left Section - Logo and Description */}
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h2 className="text-xl font-bold text-white">CollabEase</h2>
          <p className="text-sm text-white">
            Simplifying collaboration for teams worldwide.
          </p>
        </div>

        {/* Middle Section - Navigation Links */}
        <div className="flex space-x-6 gap-2">
          <Link href="/about" className="text-white hover:text-gray">
            About
          </Link>
          <Link href="/contact" className="text-white hover:text-gray">
            Contact
          </Link>
          <Link href="/privacy" className="text-white hover:text-gray">
            Privacy Policy
          </Link>
        </div>

        {/* Right Section - Social Media */}
        <div className="mt-4 md:mt-0 flex space-x-4 gap-2 py-2">
          <Link href="#" className="text-gray-400 hover:text-white">
            <span className="sr-only">Twitter</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 4.56c-.89.39-1.84.65-2.83.77a4.93 4.93 0 0 0 2.17-2.72 9.86 9.86 0 0 1-3.13 1.2 4.92 4.92 0 0 0-8.38 4.48 13.95 13.95 0 0 1-10.14-5.15 4.91 4.91 0 0 0 1.52 6.57 4.92 4.92 0 0 1-2.23-.62v.06a4.92 4.92 0 0 0 3.95 4.83 4.93 4.93 0 0 1-2.21.08 4.93 4.93 0 0 0 4.59 3.42A9.87 9.87 0 0 1 0 19.54a13.93 13.93 0 0 0 7.55 2.21c9.06 0 14.01-7.52 14.01-14.03 0-.21 0-.42-.02-.63a10.02 10.02 0 0 0 2.46-2.56z" />
            </svg>
          </Link>
          <Link href="#" className="text-gray-400 hover:text-white">
            <span className="sr-only">Facebook</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24h11.495v-9.294H9.672v-3.622h3.147V8.413c0-3.112 1.897-4.808 4.667-4.808 1.325 0 2.464.099 2.797.143v3.24h-1.92c-1.506 0-1.797.716-1.797 1.765v2.316h3.59l-.467 3.622h-3.123V24h6.127c.729 0 1.325-.593 1.325-1.325V1.325C24 .593 23.407 0 22.675 0z" />
            </svg>
          </Link>
          <Link href="#" className="text-gray-400 hover:text-white">
            <span className="sr-only">LinkedIn</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19.998 0H4.002C1.794 0 0 1.794 0 4.002v15.995C0 22.207 1.794 24 4.002 24h15.996C22.207 24 24 22.207 24 19.998V4.002C24 1.794 22.207 0 19.998 0zM7.081 20.452H3.735V8.993h3.346v11.459zm-1.669-13.2c-1.063 0-1.917-.861-1.917-1.917a1.917 1.917 0 1 1 3.834 0c0 1.055-.854 1.917-1.917 1.917zm15.039 13.2h-3.347v-5.663c0-1.348-.026-3.082-1.878-3.082-1.878 0-2.167 1.466-2.167 2.981v5.764H9.681V8.993h3.215v1.567h.045c.448-.849 1.544-1.746 3.18-1.746 3.396 0 4.023 2.236 4.023 5.144v6.494z" />
            </svg>
          </Link>
        </div>
      </div>
    </footer>
  );
}
