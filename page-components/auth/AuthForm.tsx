"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { auth, googleProvider } from "@/lib/firebase";
import { 
  signInWithPopup, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendEmailVerification 
} from "firebase/auth";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);

  const router = useRouter(); // Initialize useRouter

  // Handle email/password registration
  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Send email verification
      await sendEmailVerification(user);
      setVerificationSent(true);
      setMessage("A verification email has been sent. Please check your inbox.");
    } catch (error) {
      console.error("Error during registration:", error.message);
      setMessage(`Error: ${error.message}`);
    }
  };

  // Handle email/password login
  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await auth.currentUser.reload();

      if (!auth.currentUser.emailVerified) {
        setMessage("Please verify your email before logging in.");
        return;
      }

      console.log("User logged in:", user);
      setMessage("Login successful!");

      // Redirect to dashboard
      router.push("/homepage");
    } catch (error) {
      console.error("Error during login:", error.message);
      setMessage(`Error: ${error.message}`);
    }
  };

  // Handle Google Authentication
  const handleGoogleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      await auth.currentUser.reload();

      if (!auth.currentUser.emailVerified) {
        setMessage("Please verify your email before logging in.");
        return;
      }

      console.log("Google Auth successful:", user);
      setMessage("Google Auth successful!");

      // Redirect to dashboard
      router.push("/homepage");
    } catch (error) {
      console.error("Google Auth failed:", error.message);
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm">
      <h2 className="text-2xl font-bold mb-6">{isLogin ? "Log In" : "Register"}</h2>
      
      {message && <p className="text-red-500 mb-4">{message}</p>}

      {verificationSent ? (
        <>
          <p className="text-green-500 mb-4">
            A verification email has been sent. Please check your inbox.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-blue-500 text-white py-2 mt-4 rounded hover:bg-blue-600"
          >
            Go back to Login
          </button>
        </>
      ) : (
        <>
          {/* Email/Password Form */}
          <form onSubmit={isLogin ? handleLogin : handleRegister} className="space-y-4">
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
              {isLogin ? "Login" : "Register"}
            </button>
          </form>

          {/* Google Authentication Button */}
          <button
            onClick={handleGoogleAuth}
            className="w-full bg-red-500 text-white py-2 mt-4 rounded hover:bg-red-600"
          >
            {isLogin ? "Login with Google" : "Register with Google"}
          </button>
        </>
      )}

      {/* Toggle between login and register */}
      {!verificationSent && (
        <button
          onClick={() => {
            setIsLogin(!isLogin);
            setMessage("");
          }}
          className="w-full text-blue-500 py-2 mt-4"
        >
          {isLogin ? "Need an account? Register" : "Already have an account? Log In"}
        </button>
      )}
    </div>
  );
}

