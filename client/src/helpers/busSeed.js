const axios = require("axios");
const fs = require("fs/promises");

const cityMapping = require("./cityMapping.json");
const distanceMatrix = require("./matrix.json");
const busNames = require("./busNames.json");

const cityKeysArray = Object.keys(cityMapping);

const busSeed = async () => {
  let curr = 0;
  for (const [edge, distance] of Object.entries(distanceMatrix)) {
    const [city1, city2] = edge.split("-");
    let bus = {};
    bus.busName = busNames[curr];
    bus.totalSeats = 40;
    bus.currentOccupancy = 0;
    bus.availableDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    bus.route = {
      origin: city1,
      destination: city2,
    };
    bus.seatPlan = [];
    for (let i = 0; i < bus.totalSeats; i++) {
      bus.seatPlan.push({
        seatNumber: i + 1,
        design: "",
        isBooked: false,
      });
    }
    curr++;
    // console.log(bus);
    console.log(curr);
    await axios
      .post("http://localhost:8000/bus/addBus", bus)
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

busSeed();
