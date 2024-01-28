const fs = require("fs/promises");
const axios = require("axios");

const cities = [
    "Agra, UP, IN",
    "Aligarh, UP, IN",
    "Allahabad, UP, IN",
    "Amroha, UP, IN",
    "Ayodhya, UP, IN",
    "Azamgarh, UP, IN",
    "Bagpat, UP, IN",
    "Bahraich, UP, IN",
    "Ballia, UP, IN",
    "Banda, UP, IN",
    "Barabanki, UP, IN",
    "Bareilly, UP, IN",
    "Basti, UP, IN",
    "Bijnor, UP, IN",
    "Budaun, UP, IN",
    "Bulandshahr, UP, IN",
    "Chandauli, UP, IN",
    "Chitrakoot, UP, IN",
    "Deoria, UP, IN",
    "Etah, UP, IN",
    "Etawah, UP, IN",
    "Faizabad, UP, IN",
    "Farrukhabad, UP, IN",
    "Fatehpur, UP, IN",
    "Firozabad, UP, IN",
    "Gautam Buddha Nagar, UP, IN",
    "Ghaziabad, UP, IN",
    "Ghazipur, UP, IN",
    "Gonda, UP, IN",
    "Gorakhpur, UP, IN",
    "Hamirpur, UP, IN",
    "Hapur, UP, IN",
    "Hardoi, UP, IN",
    "Hathras, UP, IN",
    "Jalaun, UP, IN",
    "Jaunpur, UP, IN",
    "Jhansi, UP, IN",
    "Kannauj, UP, IN",
    "Kanpur Dehat, UP, IN",
    "Kanpur Nagar, UP, IN",
    "Kasganj, UP, IN",
    "Kaushambi, UP, IN",
    "Kheri, UP, IN",
    "Kushinagar, UP, IN",
    "Lalitpur, UP, IN",
    "Lucknow, UP, IN",
    "Maharajganj, UP, IN",
    "Mahoba, UP, IN",
    "Mainpuri, UP, IN",
    "Mathura, UP, IN",
    "Mau, UP, IN",
    "Meerut, UP, IN",
    "Mirzapur, UP, IN",
    "Moradabad, UP, IN",
    "Muzaffarnagar, UP, IN",
    "Pilibhit, UP, IN",
    "Pratapgarh, UP, IN",
    "Rae Bareli, UP, IN",
    "Rampur, UP, IN",
    "Saharanpur, UP, IN",
    "Sambhal, UP, IN",
    "Sant Kabir Nagar, UP, IN",
    "Shahjahanpur, UP, IN",
    "Shamli, UP, IN",
    "Shrawasti, UP, IN",
    "Siddharthnagar, UP, IN",
    "Sitapur, UP, IN",
    "Sonbhadra, UP, IN",
    "Sultanpur, UP, IN",
    "Unnao, UP, IN",
    "Varanasi, UP, IN",
  ];

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const seedDB = async () => {
  let dict = {};

  for (const city of cities) {
    try {
      const response = await axios.get(`http://geodb-free-service.wirefreethought.com/v1/geo/places?limit=1&namePrefix=${city}`);
      dict[city] = response.data.data[0].id;
    } catch (error) {
      console.error(`Error fetching data for ${city}: ${error.message}`);
    }

    // Sleep for 2 seconds before the next API call
    await sleep(2000);
  }

  // Write the mapping to a file
  try {
    await fs.writeFile('cityMapping.json', JSON.stringify(dict, null, 2));
    console.log('City mapping has been written to cityMapping.json');
  } catch (error) {
    console.error(`Error writing city mapping to file: ${error.message}`);
  }
};

seedDB();
