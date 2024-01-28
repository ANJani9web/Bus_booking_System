import React, { useEffect, useState } from "react";
import axios from "axios";

const UttarPradeshCityDistances = () => {
  const [distanceMatrix, setDistanceMatrix] = useState([]);
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

  useEffect(() => {
    async function fetchDistances() {
      try {
        const matrix = [];
        for (let i = 0; i < cities.length; i++) {
          const row = new Array(cities.length).fill(0); // Initialize row with 0s
          for (let j = 0; j < cities.length; j++) {
            if (i !== j) {
              const distance = await getDistance(cities[i], cities[j]);
              row[j] = distance;
            }
          }
          matrix.push(row);
        }
        setDistanceMatrix(matrix);
      } catch (error) {
        console.error("Error fetching distances:", error);
      }
    }

    fetchDistances();
  }, []);


  useEffect(()=>{
    console.log(distanceMatrix)
  }, [])

  async function getDistance(fromCity, toCity) {
    try {
      const response = await axios.get(
        `/v1/geo/places/${fromCity}/distance?toPlaceId=${toCity}`
      );
      return response.data.distance; // Assuming the API returns distance in the response
    } catch (error) {
      console.error(
        `Error fetching distance from ${fromCity} to ${toCity}:`,
        error
      );
      return null; // Return null or handle errors as per your requirements
    }
  }

  return (
    <div>
      <h2>Distance Matrix for Cities in Uttar Pradesh, India</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            {cities && cities.map((city, index) => (
              <th key={index}>{city}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {distanceMatrix && cities && cities.map((city1, index1) => (
            <tr key={index1}>
              <td>{city1}</td>
              {distanceMatrix[index1] && distanceMatrix[index1].map((distance, index2) => (
                <td key={index2}>{distance}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UttarPradeshCityDistances;
