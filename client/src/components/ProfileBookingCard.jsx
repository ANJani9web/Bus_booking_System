import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@mui/material";
import { dataContext } from "../context/dataContext";
import axios from "axios";

export default function ProfileBookingCard(props) {
  const [data, setData] = useState([]);
  const [bus, setBus] = useState();
  const [id, setId] = useState();
  
  useEffect(() => {
    setData(props.booking);
    setId(props.id);
    console.log(props.booking);
    const busDetails = async () => {
        await axios
          .get(`http://localhost:8000/bus/getBusById/${props.booking.busId}`)
          .then((res) => {
            console.log(res.data);
            setBus(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      };
        busDetails();
  }, []);

  return (
    <Card className="shadow-lg mb-4">
      <CardContent className="flex flex-col items-start space-y-2 p-4">
        <h3 className="text-lg font-bold text-blue-500">Booking #{id + 1}</h3>
        {bus && (
          <>
            <p className="text-gray-500">Bus Name: {bus.busName}</p>
            <p className="text-gray-500">Bus ID: {bus._id}</p>
            <p className="text-gray-500">Source: {bus.route.origin}</p>
            <p className="text-gray-500">Destination: {bus.route.destination}</p>
          </>
        )}

        <p className="text-gray-500">{data.date}</p>
        <p className="text-gray-500">Cost: $50</p>
      </CardContent>
    </Card>
  );
}
