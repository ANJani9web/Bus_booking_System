import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import findKShortestPaths from "../helpers/dijkstra";
import { dataContext } from "../context/dataContext";
const cityMapping = require("../helpers/cityMapping.json");
const cities = Object.keys(require("../helpers/cityMapping.json"));
const distanceMatrix = require("../helpers/matrix.json");


const Component = () => {
  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();

    if (month < 10) {
      month = `0${month}`;
    }

    if (day < 10) {
      day = `0${day}`;
    }

    return `${year}-${month}-${day}`;
  };

  const cities = Object.keys(cityMapping);

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [availableBuses, setAvailableBuses] = useState([]);
  const [error, setError] = useState("");
  const { user, setUser, date, setDate, loginStatus } = useContext(dataContext);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (from === to) {
      setError("Source and destination cannot be the same.");
      return;
    }
    const paths = await findKShortestPaths(
      cities,
      distanceMatrix,
      from,
      to,
      10
    );
    let routeDetails = []
    for (const path of paths) {
      const parsedPath = JSON.parse(path);
      let buses = [];

      for (const pair of parsedPath.paths) {
        const [source, destination] = pair.split(",");

        try {
          const response = await axios.post(`http://localhost:8000/bus/availableBuses`, {
            source: source,
            destination: destination,
          });

          buses.push(...response.data);
        } catch (error) {
          console.log(error);
        }
      }

      parsedPath.buses = buses;
      routeDetails.push(parsedPath)
    }
    setAvailableBuses(routeDetails);
  };

  const handleFromChange = (e) => {
    setFrom(e.target.value);
    setTo("");
  };

  const handleBook = (busId, totalSeats, occupiedSeats) => {
    navigate(
      `/bookingdetails/${busId}?totalSeats=${totalSeats}&occupiedSeats=${occupiedSeats}`
    );
  };

  useEffect(() => {
    console.log(user)
  }, [user])


  return (
    <div className="bg-[#121826] h-screen flex justify-center items-center grid grid-cols-2">
      <div className="w-[100%] flex justify-center items-center ">
      <div className="flex flex-col w-[90%] bg-[#212936] text-white rounded-lg">
        <header className="flex items-center justify-between px-4 py-2 border-b">
          <div className="flex items-center gap-2">
            <BusIcon className="w-6 h-6" />
            <span className="text-lg font-semibold">Bus Booking</span>
          </div>

          
          {/* I do not want this div to be dispersed in whole page */}

          <div className="grid gap-4">
            
            <div className="grid gap-2">
              
          <nav className="flex gap-4">
            <a className="text-sm font-medium hover:underline" href="/">
              Home
            </a>
            <a className="text-sm font-medium hover:underline" href="#">
              About
            </a>
            <a className="text-sm font-medium hover:underline" href="#">
              Contact
            </a>
          </nav>
          </div>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter">
                Book Your Bus Tickets Here
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                Enter your travel details and we'll find you the best bus.
              </p>

            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <label htmlFor="from">From</label>
                <select
                  id="from"
                  value={from}
                  onChange={handleFromChange}
                  className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-400 text-black"
                >
                  <option value="">Select Source</option>
                  {cities.map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid gap-2">
                <label htmlFor="to">To</label>
                <select
                  id="to"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-400 text-black"
                >
                  <option value="">Select Destination</option>
                  {cities
                    .filter((city) => city !== from) // Filter out the selected source
                    .map((city, index) => (
                      <option key={index} value={city}>
                        {city}
                      </option>
                    ))}
                </select>
              </div>
              <div className="grid gap-2">
                <label htmlFor="date">Date</label>
                <input
                  id="date"
                  type="date"
                  min={getCurrentDate()} // Set the minimum date to the current date
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-400 text-black"
                />
              </div>
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
                onClick={handleSearch}
              >
                Search
              </button>
              {error && <p className="text-red-500">{error}</p>}
            </div>

          </div>
        </main>
      </div>
      </div>
      
      <div className="h-screen p-8 rounded-2xl">
        {availableBuses && availableBuses.length > 0 && (
          <div className="h-[100%] overflow-scroll">
            <h2 className="text-xl text-white font-semibold mt-4">Available Buses:</h2>
            <div className="flex justify-center items-center">
            <ul className="mt-2 overflow-scroll w-[60%]">
              {availableBuses.map((bus) => (
                <> {
                  bus.buses.map((b) => (
                    <li key={b._id} className="border-b py-2 h-[100%] bg-white w-[100%]">
                      <div className="flex flex-col bg-white">
                        <span className="text-lg font-semibold bg-white">
                          {b.busName}
                        </span>
                        <span>Total Seats: {b.totalSeats}</span>
                        <span>Current Occupancy: {b.currentOccupancy}</span>
                        <span>Available Days: {b.availableDays}</span>
                        <span>Source: {b.route.origin}</span>
                        <span>Destination: {b.route.destination}</span>
                      </div>
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200 mt-2"
                        // onClick={() => handleBook(bus._id)}
                        // in this also pass the date of journey

                        onClick={() =>
                          handleBook(
                            b._id,
                            b.totalSeats,
                            b.currentOccupancy,
                            date
                          )
                        }
                      >
                        Book
                      </button>
                    </li>
                  ))

                }

                  <div className="mb-8"></div>
                </>
              ))}
            </ul>
            </div>
            
          </div>
        )}
        {
          !availableBuses.length && (
            <div className="text-white text-2xl">No available buses!!</div>
          )
        }
      </div>
    </div>

  );
};

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

export default Component;
