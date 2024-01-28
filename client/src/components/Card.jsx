import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const Card = ({
  BusId,
  Button,
  CardDescription,
  CardTitle,
  titleHref,
  btnHref,
  busDetails,
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleEdit = () => {
    handleOpen();
  };

  const [bus, setbus] = useState(busDetails);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setbus((prevBus) => ({
      ...prevBus,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:8000/bus/addBus", bus);
      setOpen(false);
    } catch (error) {
      console.error("Error adding new bus:", error);
    }
  };

  const handleDelete = () => {
    console.log("Delete");
    alert(`Deleting bus with ID: ${BusId}`);
    // Implement delete functionality here
    axios
      .delete(`http://localhost:8000/bus/delete/${BusId}`)
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(BusId);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault()
    console.log("edit");
    alert(`editing bus with ID: ${BusId}`);
    // Implement delete functionality here
    axios
      .post(`http://localhost:8000/bus/update/${BusId}`, bus)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(BusId);
  };

  const handleAvailableDays = (e) => {
    const options = e.target.options;
    const value = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setbus((prevBus) => ({
      ...prevBus,
      availableDays: value,
    }));
  };

  useEffect(() => {
    console.log(bus)
  }, []);

  return (
    <>
      <div className="mb-10 overflow-hidden rounded-lg bg-white shadow-1 duration-300 hover:shadow-3 dark:bg-dark-2 dark:shadow-card dark:hover:shadow-3">
        <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
          <h3>
            <a
              href={titleHref ? titleHref : "/#"}
              className="mb-4 block text-xl font-semibold text-dark hover:text-primary dark:text-white sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]"
            >
              {CardTitle}
            </a>
          </h3>
          <p className="mb-7 text-base leading-relaxed text-body-color dark:text-dark-6">
            {CardDescription}
          </p>

          {Button && (
            <a
              href={btnHref ? btnHref : "#"}
              className="inline-block rounded-full border border-gray-3 px-7 py-2 text-base font-medium text-body-color transition hover:border-blue-500 hover:bg-blue-500 hover:text-white dark:border-dark-3 dark:text-dark-6 mr-2"
            >
              {Button}
            </a>
          )}

          <span
            className="inline-block rounded-full border border-gray-3 px-7 py-2 text-base font-medium text-body-color transition hover:border-yellow-500 hover:bg-yellow-500 hover:text-white dark:border-dark-3 dark:text-dark-6 mr-2 cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </span>
          <span
            className="inline-block rounded-full border border-gray-3 px-7 py-2 text-base font-medium text-body-color transition hover:border-red-500 hover:bg-red-500 hover:text-white dark:border-dark-3 dark:text-dark-6 cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </span>
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
                    value={bus.busName}
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
                    value={bus.totalSeats}
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
                    value={bus.currentOccupancy}
                    onChange={handleInputChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                  />
                </div>
              </div>
              <div className="flex flex-wrap mb-4">
                <div className="w-full px-4">
                  <label
                    for="countries_multiple"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select an option
                  </label>
                  <select
                    onChange={handleAvailableDays}
                    multiple
                    id="countries_multiple"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option selected>Choose countries</option>
                    <option value="Sunday">Sunday</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-wrap mb-4">
                <div className="w-full px-4">
                  <label
                    className="block text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="route"
                  >
                    Route:
                  </label>
                  <input
                    type="text"
                    id="route"
                    name="route"
                    value={bus.route}
                    onChange={handleInputChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                  />
                </div>
              </div>
              <button onClick={handleEditSubmit}>
                <span className="inline-block rounded-full border border-gray-3 px-7 py-2 text-base font-medium text-body-color transition hover:border-blue-500 hover:bg-blue-500 hover:text-white dark:border-dark-3 dark:text-dark-6 mr-2 cursor-pointer">
                  Submit
                </span>
              </button>
            </form>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default Card;
