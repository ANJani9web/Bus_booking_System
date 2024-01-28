import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { dataContext } from "../context/dataContext";
import { useNavigate } from "react-router-dom";

export default function Buses() {
  const {buses, setBuses, loginStatus} = useContext(dataContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [newBus, setNewBus] = useState({
    busName: "",
    totalSeats: 0,
    currentOccupancy: 0,
    availableDays: [],
    route: [],
  });

  const fetchBuses = async () => {
    try {
      const response = await axios.get("http://localhost:8000/bus/getAllBus");
      const reversedArray = response.data.reverse();
      setBuses(reversedArray);
    } catch (error) {
      console.error("Error fetching buses:", error);
    }
  };

  useEffect(() => {
    fetchBuses();
  }, [buses]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBus((prevBus) => ({
      ...prevBus,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
   e.preventDefault();
    try {
      await axios.post("http://localhost:8000/bus/addBus", newBus);
      alert("Successfully added a new Bus!");
      console.log(newBus);
      fetchBuses();
      setOpen(false);
    } catch (error) {
      console.error("Error adding new bus:", error);
    }
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="contained"
        color="primary"
        style={{ marginBottom: "20px" }}
      >
        Add New Bus
      </Button>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {buses.map((bus) => (
          <Card
            key={bus._id}
            CardTitle={bus.busName}
            CardDescription={`Total Seats: ${bus.totalSeats}, Current Occupancy: ${bus.currentOccupancy}`}
            Button={<Link to={`/viewdetails/${bus._id}`}>View Details</Link>}
            BusId={bus._id}
            busDetails={bus}
          />
        ))}
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2 id="modal-title">Add New Bus</h2>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap mb-4">
              <div className="w-full px-4">
                <label
                  className="block text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="busName"
                >
                  Bus Name:
                </label>
                <input
                  type="text"
                  id="busName"
                  name="busName"
                  value={newBus.busName}
                  onChange={handleInputChange}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                />
              </div>
            </div>
            <div className="flex flex-wrap mb-4">
              <div className="w-full px-4">
                <label
                  className="block text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="totalSeats"
                >
                  Total Seats:
                </label>
                <input
                  type="number"
                  id="totalSeats"
                  name="totalSeats"
                  value={newBus.totalSeats}
                  onChange={handleInputChange}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                />
              </div>
            </div>
            <div className="flex flex-wrap mb-4">
              <div className="w-full px-4">
                <label
                  className="block text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="currentOccupancy"
                >
                  Current Occupancy:
                </label>
                <input
                  type="number"
                  id="currentOccupancy"
                  name="currentOccupancy"
                  value={newBus.currentOccupancy}
                  onChange={handleInputChange}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                />
              </div>
            </div>
            <div className="flex flex-wrap mb-4">
              <div className="w-full px-4">
                <label
                  className="block text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="availableDays"
                >
                  Available Days:
                </label>
                <input
                  type="text"
                  id="availableDays"
                  name="availableDays"
                  value={newBus.availableDays}
                  onChange={handleInputChange}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                />
              </div>
            </div>

            <div className="flex flex-wrap mb-4">
              <div className="w-full px-4">
                <label
                  className="block text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="route"
                >
                  Source:
                </label>
                <input
                  type="text"
                  id="route"
                  name="route"
                  value={newBus.route.origin}
                  onChange={handleInputChange}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                />
              </div>
            </div>

            <div className="flex flex-wrap mb-4">
              <div className="w-full px-4">
                <label
                  className="block text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="route"
                >
                  Destination: 
                </label>
                <input
                  type="text"
                  id="route"
                  name="route"
                  value={newBus.route.destination}
                  onChange={handleInputChange}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                />
              </div>
            </div>

            {/* Add additional form fields for seatPlan if required */}
            <Button
              variant="contained"
              color="primary"
              className="py-2 px-4 bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs rounded shadow hover:shadow-md focus:outline-none"
              type="submit"
              onClick={handleSubmit}
            >
              Add Bus
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}



