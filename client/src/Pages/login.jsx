import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { dataContext } from "../context/dataContext";

function Component() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLogoutMessage, setShowLogoutMessage] = useState(false);
  const { user, setUser, loginStatus, setLoginStatus } = useContext(dataContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(loginStatus);
    loginStatus && navigate("/profile");
  }, [loginStatus]);

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/users/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        setShowLogoutMessage(true);
        setUser(res.data.user);
        setLoginStatus(true);
        localStorage.setItem("token", res.data.token)
        navigate("/profile", { state: { email: email } });
      })
      .catch((err) => {
        console.log(err);
        setLoginStatus(false);
      });
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-900 dark:bg-gray-900">
      <div className="w-full max-w-md px-8 py-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200">
          Bus Booking System
        </h2>
        <p className="mt-1 mb-4 text-center text-gray-600 dark:text-gray-400">
          Login to your account
        </p>
        <form onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label
                className="text-sm font-medium text-gray-700 dark:text-gray-200"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
                id="email"
                placeholder="example@domain.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                className="text-sm font-medium text-gray-700 dark:text-gray-200"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
                id="password"
                placeholder="********"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-6">
            <button
              className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
        {showLogoutMessage && (
          <div className="mt-4 text-center text-base text-body-color dark:text-dark-6">
            You are successfully Signed In.
          </div>
        )}
        <p className="mt-4 text-center text-base text-body-color dark:text-dark-6">
          <span className="pr-0.5">Not a member yet?</span>
          <a href="/signup" className="text-primary hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Component;



