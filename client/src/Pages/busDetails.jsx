
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function BusDetails() {
  const { id } = useParams(); // Get the bus ID from the URL params
  const [busDetails, setBusDetails] = useState(null);

  useEffect(() => {
    const fetchBusDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/bus/getBusById/${id}`
        );
        setBusDetails(response.data); // Update state with fetched bus details
      } catch (error) {
        console.error("Error fetching bus details:", error);
      }
    };

    fetchBusDetails();
  }, [id]); // Trigger effect whenever the bus ID changes

  

  return (
    <div>
      <h2>Bus Details</h2>
      {busDetails ? (
        <div>
          <p>Bus Name: {busDetails.busName}</p>
          <p>Total Seats: {busDetails.totalSeats}</p>
          <p>Current Occupancy: {busDetails.currentOccupancy}</p>
          <p>Available Days: {busDetails.availableDays.join(", ")}</p>
          {/* Add more details as needed */}
        </div>
      ) : (
        <p>Loading bus details...</p>
      )}
    </div>
  );
}
