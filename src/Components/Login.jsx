import React, { useState } from "react";
import { login } from "../HelperFn/https";
import Register from "./Register.jsx";
import { useTravelAuth } from "../Hooks/useTravelAuth.jsx";

const Login = ({ close }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login: authLogin } = useTravelAuth();
  const [loginMode, setLoginMode] = useState("login");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login({ email, password });
      authLogin();
      close();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRegisterClick = () => {
    setLoginMode("register");
  };

  const handleLoginClick = () => {
    setLoginMode("login");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-40 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={close}
        >
          &times;
        </button>
        <h2 className="text-4xl font-sans font-semibold mb-9 text-center">
          {loginMode === "login" ? "Login" : "Register"}
        </h2>

        {loginMode === "login" && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}

            <div className="flex space-x-4 pt-2">
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-2xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Login
              </button>
            </div>
          </form>
        )}

        {loginMode === "register" && (
          <Register close={close} switchToLogin={handleLoginClick} />
        )}

        {/* Toggle between Login and Register */}
        <div className="mt-4 text-center">
          {loginMode === "login" ? (
            <p className="text-gray-600">
              Don't have an account?{" "}
              <button
                className="text-indigo-600 hover:underline focus:outline-none"
                onClick={handleRegisterClick}
              >
                Register
              </button>
            </p>
          ) : (
            <p className="text-gray-600">
              Already have an account?{" "}
              <button
                className="text-indigo-600 hover:underline focus:outline-none"
                onClick={handleLoginClick}
              >
                Login
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
