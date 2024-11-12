"use client";

import { useState } from "react";
import { auth, googleProvider } from "../../lib/firebase";
import { signInWithPopup } from "firebase/auth";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
    // Add your email/password login logic here if needed
  };

  const handleGoogleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("Google Auth successful:", user);
    } catch (error) {
      console.error("Google Auth failed:", error);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm">
      <h2 className="text-2xl font-bold mb-6">Log In</h2>
      {/* Email/Password Form */}
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter your password"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>

      {/* Google Authentication Button */}
      <button
        onClick={handleGoogleAuth}
        className="w-full bg-red-500 text-white py-2 mt-4 rounded hover:bg-red-600"
      >
        Login with Google
      </button>
    </div>
  );
}
