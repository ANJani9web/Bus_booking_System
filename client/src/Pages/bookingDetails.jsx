import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import { dataContext } from "../context/dataContext";

export default function Component() {
  const { busId } = useParams();
  
  const [busDetails, setBusDetails] = useState({ seatPlan: [] });
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [message, setMessage] = useState("");
  const [numTickets, setNumTickets] = useState(0);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [userName, setUserName] = useState("");
  const [source, setSource] = useState("New York");
  const [destination, setDestination] = useState("Los Angeles");
  const {user, setUser, date, setDate} = useContext(dataContext);  
  const windowSeatCost = 50;
  const nonWindowSeatCost = 40;

  useEffect(() => {
    const fetchBusDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/bus/getBusById/${busId}`
        );
        setBusDetails(response.data);
      } catch (error) {
        console.error("Error fetching bus details:", error);
      }
    };

    fetchBusDetails();
  }, [busId]);

  const calculateOccupancyPercentage = () => {
    if (!busDetails) return 0;
    const bookedSeatsCount = busDetails.seatPlan.filter(
      (seat) => seat.isBooked
    ).length;
    const totalSeats = busDetails.seatPlan.length;
    return (bookedSeatsCount / totalSeats) * 100;
  };

  const getSeatColor = (isBooked, seatIndex) => {
    if (selectedSeats.includes(seatIndex)) return "blue";
    if (isBooked) return "red";
    return "whitesmoke";
  };

  const handleSeatClick = (index) => {
    if (selectedSeats.length >= numTickets) {
      setMessage(`You have already selected ${numTickets} tickets.`);
      return;
    }
    if (selectedSeats.includes(index)) {
      setMessage("This seat is already selected.");
      return;
    }
    if (busDetails.seatPlan[index].isBooked) {
      setMessage("This seat is already booked.");
      return;
    }
    setMessage("");
    setSelectedSeats([...selectedSeats, index]);
  };

  const renderSeats = () => {
    if (!busDetails || !busDetails.seatPlan) return null;

    const seats = [];

    for (let i = 0; i < busDetails.seatPlan.length; i++) {
      const seat = busDetails.seatPlan[i];
      const isWindowSeat = i % 4 === 0 || i % 4 === 3;

      seats.push(
        <Button
          key={i}
          variant="outlined"
          style={{
            margin: "4px",
            width: "100px",
            height: "100px",
            backgroundColor: getSeatColor(seat.isBooked, i),
            color: seat.isBooked ? "white" : "black",
          }}
          onClick={() => handleSeatSelection(i)}
        >
          {`Seat ${i + 1} ${isWindowSeat ? "(Window)" : ""}`}
        </Button>
      );

      if ((i + 1) % 4 === 0) {
        seats.push(<br key={`br-${i}`} />);
      }
    }

    return seats;
  };

  const handleSeatSelection = (seatIndex) => {
    if (!busDetails.seatPlan[seatIndex].isBooked) {
      if (selectedSeats.includes(seatIndex)) {
        setSelectedSeats(selectedSeats.filter((seat) => seat !== seatIndex));
      } else if (selectedSeats.length < numTickets) {
        setSelectedSeats([...selectedSeats, seatIndex]);
      }
    }
  };

  const handleNumTicketsChange = (event) => {
    const tickets = parseInt(event.target.value);
    setNumTickets(tickets);
    if (tickets < selectedSeats.length) {
      setSelectedSeats([]);
      setMessage("");
    }
  };

  const handleBookConfirmation = () => {
    setOpenConfirmation(true);
  };

  const handleConfirmBooking = async () => {
    try {
      const updatedSeatPlan = busDetails.seatPlan.map((seat, index) => ({
        ...seat,
        isBooked: selectedSeats.includes(index) || seat.isBooked,
      }));

      const updatedBus = {
        ...busDetails,
        seatPlan: updatedSeatPlan,
        currentOccupancy: busDetails.currentOccupancy + numTickets,
      };

      const response = await axios.post(
        `http://localhost:8000/bus/update/${busId}`,
        updatedBus
      );

      if (response.status === 200) {
        const updatedBusDetails = { ...busDetails };
        updatedBusDetails.seatPlan = updatedSeatPlan;
        updatedBusDetails.currentOccupancy += numTickets;
        console.log(user);
        setBusDetails(updatedBusDetails); // Update local state with new bus details
        if(!user.bookings) user.bookings = [];
        let bookings = user.bookings;
        bookings.push({busId: busDetails._id, seats: selectedSeats, date: date});
        user.bookings = bookings;
        console.log(user)
        const response = await axios.post(
          `http://localhost:8000/user/update/${user._id}`, user
        );
        setOpenConfirmation(false);
        setBookingConfirmed(true);
        setMessage("Booking confirmed!");
      } else {
        setMessage("Failed to confirm booking.");
      }
    } catch (error) {
      console.error("Error confirming booking:", error);
      setMessage("Failed to confirm booking.");
    }
  };


  const calculateTotalCost = () => {
    const windowSeats = selectedSeats.filter(
      (index) => index % 4 === 0 || index % 4 === 3
    ).length;
    const nonWindowSeats = numTickets - windowSeats;
    const totalCost =
      windowSeats * windowSeatCost + nonWindowSeats * nonWindowSeatCost;
    return totalCost;
  };

  if (bookingConfirmed) {
    return (
      <main style={{ padding: "16px", fontFamily: "Arial, sans-serif" }}>
        <Card
          style={{
            maxWidth: "600px",
            margin: "auto",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
          }}
        >
          <CardHeader
            title="Booking Confirmation"
            subheader="Thank you for booking with us!"
            style={{
              backgroundColor: "#1976d2",
              color: "#fff",
              textAlign: "center",
              borderRadius: "8px 8px 0 0",
              padding: "16px",
              fontSize: "24px",
            }}
          />

          <CardContent className="bg-red">
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              alignItems="start" // Align items to the start of the cross axis (top for vertical)
              justifyContent="center" // Justify content along the main axis (center horizontally)
              className="bg-red"
            >
              <Grid span xs={6}>
                <span>Seat : </span>
              </Grid>
              <Grid span xs={6}>
                {selectedSeats.map((seat, index) => (
                  <span key={index}>
                    {seat + 1}
                    {index !== selectedSeats.length - 1 && ", "}
                  </span>
                ))}
              </Grid>

              <Grid span xs={6}>
                <span>User Name:</span>
              </Grid>
              <Grid span xs={6}>
                <span>{userName}</span>
              </Grid>
              <Grid span xs={6}>
                <span>Number of Tickets:</span>
              </Grid>
              <Grid span xs={6}>
                <span>{numTickets}</span>
              </Grid>
              <Grid span xs={6}>
                <span>Total Cost:</span>
              </Grid>
              <Grid span xs={6}>
                <span>${calculateTotalCost()}</span>
              </Grid>
              <Grid span xs={6}>
                <span>Bus Name:</span>
              </Grid>
              <Grid span xs={6}>
                <span>{busDetails.busName}</span>
              </Grid>
              <Grid span xs={6}>
                <span>Bus Id:</span>
              </Grid>
              <Grid span xs={6}>
                <span>{busDetails._id}</span>
              </Grid>
              <Grid span xs={6}>
                <span>Date of Journey:</span>
              </Grid>
              <Grid span xs={6}>
                <span>{date}</span>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main style={{ padding: "16px" }}>
      <Card>
        <CardHeader
          title="Bus Booking"
          subheader="Enter your details and select your seats."
        />
        <CardContent>
          <form>
            <Grid container spacing={2}>
              <Grid span xs={4} className="py-3 px-4">
                <TextField
                  id="name"
                  label="Name"
                  placeholder="Enter your name"
                  fullWidth
                  variant="outlined"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </Grid>
              <Grid span xs={4} className="px-4 py-3">
                <TextField
                  id="contact"
                  label="Contact Information"
                  placeholder="Enter your Phone Number"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid span xs={4} className="py-3 px-3">
                <TextField
                  id="tickets"
                  label="Number of Tickets"
                  placeholder="Enter the number of tickets"
                  fullWidth
                  variant="outlined"
                  type="number"
                  value={numTickets}
                  onChange={handleNumTicketsChange}
                />
              </Grid>
              <Grid span xs={12}>
                <Typography variant="h6" gutterBottom>
                  Seat Selection
                </Typography>
                {renderSeats()}
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "16px" }}
              onClick={handleBookConfirmation}
            >
              Book
            </Button>
            <Dialog
              open={openConfirmation}
              onClose={() => setOpenConfirmation(false)}
            >
              <DialogTitle>Confirm Booking</DialogTitle>
              <DialogContent>
                Are you sure you want to book {numTickets} ticket(s)?
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenConfirmation(false)}>
                  Cancel
                </Button>
                <Button onClick={handleConfirmBooking} autoFocus>
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
          </form>
        </CardContent>
      </Card>

      
      {message && <Typography>{message}</Typography>}
    </main>
  );
}


