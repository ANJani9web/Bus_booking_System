
import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@mui/material"; // Import Card components from Material-UI
import { dataContext } from "../context/dataContext";
import ProfileBookingCard from "../components/ProfileBookingCard";

function Profile() {
  const location = useLocation();
  const [showLogoutMessage, setShowLogoutMessage] = useState(false);
  const { user, setUser, loginStatus, setLoginStatus } = useContext(dataContext);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (showLogoutMessage) {
  //     setTimeout(() => {
  //       navigate('/')
  //     }, 2000); 
  //   }
  //   console.log(user)
  // }, [user]);

  const handleLogout = () => {
    // Your logout logic here
    // For demonstration purposes, we will just show the logout message
    setLoginStatus(false);
    localStorage.removeItem("token");
    setUser(null);
    setShowLogoutMessage(true);
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  useEffect(() => {
    !loginStatus && navigate("/login");
  }, [loginStatus]);

  return loginStatus && user ? (
    <div className="flex flex-col h-screen bg-gradient-to-r from-green-400 to-blue-500 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-white dark:bg-gray-800 shadow-md py-4">
        <Link className="flex items-center justify-center" to="#">
          <BusIcon className="h-6 w-6 text-blue-500" />
          <span className="ml-2 text-lg font-semibold text-blue-500">
            Bus Booking
          </span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            to="/"
          >
            Home
          </Link>
          <button
            className="text-sm font-medium hover:underline underline-offset-4"
            onClick={handleLogout}
          >
            Logout
          </button>
        </nav>
      </header>
      <main className="flex-1 bg-gray-100 dark:bg-gray-800 h-screen">
        {showLogoutMessage && (
          <div className="bg-green-500 text-white py-2 text-center">
            You are successfully Signed Out.
          </div>
        )}
        <section className="w-full grid grid-cols-2 h-[100%]">
          <div className="container px-4 md:px-6 cols-span-1 flex items-center justify-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-blue-500 flex items-center justify-center">
              Welcome, {user.email}!
            </h1>
          </div>
          <div>
            {user.bookings && (
              <div className="container px-4 md:px-6 h-[80%]">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center text-blue-500 mb-4">
                  Your Bookings
                </h2>
                <div className="mx-auto max-w-5xl overflow-scroll h-[90%]">
                  {user.bookings.map((booking, id) => (
                    <ProfileBookingCard
                      key={id}
                      booking={booking}
                      id={id}
                    ></ProfileBookingCard>
                  ))}
                </div>
              </div>
            )}
            <div className="text-center">
              <button
                className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 text-xl"
                onClick={() => {
                  navigate("/booking");
                }}
              >
                Book Ticket
              </button>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-white dark:bg-gray-800 shadow-md sticky bottom-0 z-10">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 Bus Booking. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" to="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" to="#">
            Privacy
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" to="#">
            Contact
          </Link>
        </nav>
      </footer>
    </div>
  ) : (
    <></>
  );
}

function BusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 6v6" />
      <path d="M15 6v6" />
      <path d="M2 12h19.6" />
      <path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3" />
      <circle cx="7" cy="18" r="2" />
      <path d="M9 18h5" />
      <circle cx="16" cy="18" r="2" />
    </svg>
  );
}

export default Profile;

