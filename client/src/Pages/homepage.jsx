import React, { useEffect, useContext } from "react";
import { Button, Card, CardContent, Link, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { dataContext } from "../context/dataContext";


export default function Component() {
    const navigate = useNavigate(); // Initialize useNavigate hook
    const {loginStatus} = useContext(dataContext);

    const handleButton = () => {
      console.log("Button clicked");
      navigate("/buses");
    };
    
    useEffect(() => {
      loginStatus && navigate("/profile");
    }, [loginStatus]);
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-green-400 to-blue-500 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      
      <header className="px-4 lg:px-6 h-16 flex items-center bg-white dark:bg-gray-800 shadow-md">
        <Link href="#" className="flex items-center justify-center">
          <BusIcon className="h-6 w-6 text-blue-500" />
          <Typography variant="h6" className="ml-2 font-semibold text-blue-500" >
            Bus Booking
          </Typography>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Home
          </Link>
          <Link
            href="/login"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Signup
          </Link>

          <Link
            onClick={handleButton}
            className="text-sm font-medium hover:underline underline-offset-4 cursor-pointer"

          >
            Admin Login
          </Link>
        </nav>
      </header>

      <main className="flex-1 bg-gray-100 dark:bg-gray-800">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <Typography
                  variant="h3"
                  className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-blue-500"
                >
                  Welcome to Bus Booking
                </Typography>
                <Typography
                  variant="body1"
                  className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400"
                >
                  Your journey starts here.
                </Typography>
              </div>
              <div className="flex flex-col gap-2 min-[400px] md:flex-row justify-center">
                <Button
                  className="w-full md:w-auto bg-blue-500 text-white"
                  href="/login"
                >
                  Login
                </Button>
                <Button
                  className="w-full md:w-auto bg-blue-500 text-white"
                  href="/signup"
                >
                  Signup
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <Typography
              variant="h2"
              className="text-3xl font-bold tracking-tighter sm:text-5xl text-center text-blue-500"
            >
              Did You Know?
            </Typography>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <Card className="shadow-lg">
                <CardContent className="flex flex-col items-start space-y-4 p-4">
                  <Typography
                    variant="h3"
                    className="text-lg font-bold text-blue-500"
                  >
                    Bus Fact 1
                  </Typography>
                  <Typography variant="body2" className="text-gray-500">
                    The longest bus route in the world is from Kolkata, India to
                    London, England.
                  </Typography>
                </CardContent>
              </Card>
              <Card className="shadow-lg">
                <CardContent className="flex flex-col items-start space-y-4 p-4">
                  <Typography
                    variant="h3"
                    className="text-lg font-bold text-blue-500"
                  >
                    Bus Fact 2
                  </Typography>
                  <Typography variant="body2" className="text-gray-500">
                    The largest bus station in the world is the Millennium Park
                    Bus Depot in Delhi, India.
                  </Typography>
                </CardContent>
              </Card>
              <Card className="shadow-lg">
                <CardContent className="flex flex-col items-start space-y-4 p-4">
                  <Typography
                    variant="h3"
                    className="text-lg font-bold text-blue-500"
                  >
                    Bus Fact 3
                  </Typography>
                  <Typography variant="body2" className="text-gray-500">
                    The first motorized bus, dating back to 1895, was a Benz.
                  </Typography>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-white dark:bg-gray-800 shadow-md">
        <Typography
          variant="body2"
          className="text-xs text-gray-500 dark:text-gray-400"
        >
          © 2024 Bus Booking. All rights reserved.
        </Typography>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Privacy
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Contact
          </Link>
        </nav>
      </footer>
    </div>
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


