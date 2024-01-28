const axios = require("axios");
const fs = require("fs/promises");

const cityMapping = require("./cityMapping.json");

const cityKeysArray = Object.keys(cityMapping);

const len = cityKeysArray.length;

let dict = {};

const matrixDB = async () => {
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      try {
        const response = await axios.get(
          `http://geodb-free-service.wirefreethought.com/v1/geo/places/${
            cityMapping[cityKeysArray[i]]
          }/distance?toPlaceId=${cityMapping[cityKeysArray[j]]}`
        );

        const data = response.data;
        console.log(data);
        console.log(`${cityKeysArray[i]} and ${cityKeysArray[j]} = ${data.data}`);
        dict[`${cityKeysArray[i]}-${cityKeysArray[j]}`] = data.data;

        // Write to matrix.json after every request
        await fs.writeFile("./matrix.json", JSON.stringify(dict, null, 2));
        console.log(`Data for ${cityKeysArray[i]} and ${cityKeysArray[j]} written to matrix.json`);
      } catch (error) {
        console.log(error);
      }
    }
  }
  console.log("City mapping has been written to matrix.json");
};

matrixDB();
