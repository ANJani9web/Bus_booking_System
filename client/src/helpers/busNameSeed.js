// generateBusNames.js

const fs = require("fs");

function generateRandomBusName() {
  const adjectives = ["Swift", "City", "Horizon", "Starliner", "Metro", "Skyway", "Urban", "Tranquil", "Capital", "Elite", "Sunrise", "Eco", "Dreamliner", "Peak", "Golden", "Harmony", "Quantum", "Majestic", "Pioneer", "Celestial", "Stellar", "Serenity", "Lightning", "Destiny", "Galaxy", "Apex", "Voyager", "Solaris", "Atlas", "Liberty", "Zenith", "Phoenix", "Silver"];
  
  const nouns = ["Express", "Voyager", "Shuttle", "Transit", "Cruiser", "Express", "Navigator", "Traveler", "Mover", "Commuter", "Transport", "Tours", "Explorer", "Arrow", "Transit", "Travel", "Journey", "Coach", "Commute", "Adventures", "Vans", "Tours", "Coaches", "Liner", "Traveler", "Wheels", "Busways", "Express", "Shuttles", "Tours", "Commute", "Express", "Shuttle", "Transit", "Voyage", "Vehicles"];

  const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];

  const uniqueBusNames = new Set();
  let iteration = 0;

  while (uniqueBusNames.size < 4500) {
    const randomBusName = `${getRandomElement(adjectives)} ${getRandomElement(nouns)}`;
    uniqueBusNames.add(randomBusName);

    const jsonData = JSON.stringify(Array.from(uniqueBusNames), null, 2);
    fs.writeFileSync(`randomBusNames.json`, jsonData);

    console.log(`Random bus names for iteration ${iteration} have been written.`);
    iteration++;
  }
}

generateRandomBusName();
