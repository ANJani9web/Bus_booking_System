<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->


<!-- PROJECT LOGO -->
<br />

<div align="center">
  <a href="">
    <img src="https://res.cloudinary.com/defj06zfq/image/upload/v1706442439/360_F_15537925_5qUqgBbDSQHCI5DeP7M0z88ouNIHdeKY_uucoix.jpg" alt="Logo" width="400" height="">
  </a>
  <br>
  <br>
  
  <h1 align="center">BUS BOOKING SYSTEM</h1>

  <p align="center">
  A flying bus with the safest journey.
    <br />
    <br />
    <a href="https://github.com/ANJani9web/Bus_booking_System">GITHUB REPOSITORY</a>
  </p>
</div>



<!-- ABOUT THE PROJECT -->
## About The Project

> **_NOTE:_** 
This website is currently designed for optimal viewing on laptop or desktop screens. Please avoid accessing it on mobile or tablet devices.

Welcome to the Bus Booking System, your ultimate destination for hassle-free bus travel arrangements! Our platform is dedicated to providing you with a seamless experience from booking to boarding. Here's what you can expect:
 

### Features
* Explore a wide array of buses available for your journey, complete with detailed information on routes, schedules, and amenities.
* Easily view seat availability and select your preferred seat on any bus to ensure a comfortable journey.
Intuitive Search and Filter Options: Quickly find the bus that fits your requirements by searching based on factors like departure time, destination, and bus type.
* Stay informed with real-time updates on bus availability, departure times, and route changes to plan your trip effectively.
* Rest assured that your booking is secure and protected with our advanced encryption and security measures.
User-Friendly Interface: Our user-friendly interface makes it easy to navigate through bus options, select seats, and complete your booking with just a few clicks.

Whether you're a frequent traveler or planning a one-time journey, the Bus Booking System is designed to meet all your transportation needs efficiently and reliably. Sit back, relax, and let us take care of your travel arrangements!




### Built With

* [React](https://legacy.reactjs.org/)
* [Tailwind](https://tailwindcss.com/)
* [NodeJS](https://nodejs.org/docs/latest/api/)
* [Express](http://expressjs.com)
* [MongoDB](https://www.mongodb.com/)






<!-- GETTING STARTED -->
## Getting Started

Follow these steps to set up and run Pokemania on your local machine:

#### Pre Requisites

* Install [Node >=20](https://nodejs.org/en/download) on your system.

#### Setup Steps

* Clone this repository
    ```sh
    git clone https://github.com/ANJani9web/Bus_booking_System
    ```
#### For Client Side (Frontend):
* Navigate to the `client` directory

    ```sh
    cd client
    ```

* Install all client dependencies.
  ```sh
  npm install
  ```

  * If any error occurs, try running above with root permissions.

* Spin up the developmental client side.

  ```sh
  npm run start
  ```

* Client side is now running on ```http://localhost:3000```.

* Visit http://localhost:3000.

#### For Server Side (Backend):
* Open new terminal(cmd)/tab or shift + cmd+ tab.

* Navigate to the `server` directory.
  ```sh
  cd server
  ```

* Install server dependencies.
  ```sh
  npm install
  ```
  *  Make sure you have installed NodeJS and MongoDB before running this command.

* Start the server by running below command
  ```sh
  npm run start
  ```
* Client side is now running on ```http://localhost:8000```.




<!-- USAGE EXAMPLES -->
<!-- ## Usage

For usage and Project Demo, please checkout the [Demo Video](https://res.cloudinary.com/defj06zfq/video/upload/v1703702825/g2ja7rclvzhzu1xp1szn.mp4) provided. -->

## Walkthrough of the Platform

This is a guide to Bus Booking website, featuring an initial Homepage  
<!-- * Dashboard Overview: The platform's dashboard presents users with a comprehensive display of available buses, depicted in a user-friendly card format. Users can quickly scan through the list of buses and access detailed information about each one. 
* Abilities refer to unique attributes or skills possessed by Pokémon, while types denote elemental characteristics. 
* Each card on the dashboard showcases the Pokémon number, name, base experience points, and types. Upon selecting a card, users are redirected to a dedicated webpage providing in-depth information on the selected Pokémon. 
* This information encompasses types, attributes of double damage from (vulnerabilities), attributes of double damage to (strengths), a concise two-line description, height, weight, base experience points, abilities, and the Pokémon's evolution chain. 
-->
* Login and Signup: Users must first create an account through the signup page. Upon successful registration or login, they gain access to their profile.
* In the Profile page, users can view their past booked buses and make new bookings for upcoming journeys.
* When a user initiates a new bus booking, they are directed to the Booking page. Here, they must select the source, destination, and date for their upcoming journey. Buses are displayed based on Dijkstra's algorithm, which calculates the shortest distance between the source and destination. Users can then proceed to book tickets by selecting their desired number of seats.Following seat selection, users are prompted to choose seats from the bus seat matrix. Upon successful booking, users are presented with final booking information for confirmation.
* Following seat selection, users are prompted to choose seats from the bus seat matrix. Upon successful booking, users are presented with final booking information for confirmation.
* For administrative tasks, the admin must log in on the homepage. Upon logging in, they are redirected to the dashboard, where all registered users are listed along with their details.
* The admin has the capability to create a new bus, specifying details such as the bus name, source, destination, total number of seats available, and the days on which the bus will operate between the specified source and destination.
* Additionally, the admin has the authority to delete or update any bus information as needed.


## Code Samples
<details>
  <summary>Click to expand Dijkstra's Logic</summary>

  ```javascript
  export default async function findKShortestPaths(cities, distanceMatrix, src, dest, k) {
  const n = cities.length;

  // Initialize graph
  const g = new Array(n + 1).fill(null).map(() => []);
  for (const [edge, distance] of Object.entries(distanceMatrix)) {
    const [city1, city2] = edge.split("-");
    const city1Index = cities.indexOf(city1) + 1;
    const city2Index = cities.indexOf(city2) + 1;
    if(city1Index <= n && city2Index <= n) g[city1Index].push({ dest: city2Index, cost: distance });
  }

  // Vector to store distances
  const dis = new Array(n + 1).fill(null).map(() => Array(k).fill({cost: Infinity, pred: null}));
  const pred = new Array(n + 1).fill(null).map(() => Array(k).fill(Infinity));
  // Priority queue for Dijkstra's algorithm
  const pq = [{ cost: 0, node: cities.indexOf(src) + 1 }];
  let vis = []
  for(let i = 1; i <= n; i++) vis[i] = false;
  while (pq.length > 0) {
    const { node: u, cost: d } = pq.shift();
    // Check if the distance is less than the kth shortest distance to the destination
    if (dis[u][k - 1] < d) continue;
    if (u === cities.indexOf(dest) + 1) continue;
    if (vis[u]) continue;
    vis[u] = true;
    const v = g[u];

    // Traverse the adjacency list
    for (const { dest, cost } of v) {
      const newCost = d + cost;

      // Check if the new cost is less than the kth shortest distance to the destination
      if (newCost < dis[dest][k - 1].cost) {
        // Clear predecessors and add the new predecessor
        dis[dest][k - 1] = {cost: newCost, pred: u};
        
        // Sort the distances and predecessors after updating
        dis[dest].sort((a, b) => a.cost - b.cost);

        // Push the new cost and destination to the priority queue
        pq.push({ cost: newCost, node: dest });

        // Sort the priority queue based on cost
        pq.sort((a, b) => a.cost - b.cost);
      } 
    }
    
  }

  // Printing K shortest paths
  const result = dis[cities.indexOf(dest) + 1].slice(0, k);
  console.log(`Top ${k} Shortest Paths from ${src} to ${dest}:`);
  let res = new Set();
  for (let i = 0; i < k; i++) {
    const paths = await getPaths(dis, cities, src, dest, result[i].cost);

      res.add(JSON.stringify({distance: result[i].cost, paths: paths}))

    console.log(`Path ${i + 1}: ${result[i].cost} (Distance) - ${paths.join(" | ")}`);
    }
    return res;
   }

    async function getPaths(result, cities, src, dest, distance) {
    const paths = [];
    const path = [cities.indexOf(dest) + 1];
    let current = cities.indexOf(dest) + 1;
    while (current !== cities.indexOf(src) + 1) {
        const pred = result[current].find((x) => x.cost.toFixed(1) === distance.toFixed(1)).pred;
        path.push(pred);
        distance -= getDistance(cities[current - 1], cities[pred - 1]);
        current = pred;
    }
    path.reverse();
    for (let i = 0; i < path.length - 1; i++) {
        const city1 = cities[path[i] - 1];
        const city2 = cities[path[i + 1] - 1];
        paths.push(`${city1},${city2}`);
    }
    return paths;
  }

  function getDistance(city1, city2) {
  const key = `${city1}-${city2}`;
  return distanceMatrix[key];
  }

 // Load city data and distance matrix
 const cities = Object.keys(require("./cityMapping.json"));
 const distanceMatrix = require("./matrix.json");
  
  ```
</details>

<!-- <details>
<summary>Click to expand the evolution chain fetching logic</summary>

```javascript

useEffect(() => {
        const fetchAllEvolutionChains = async () => {
            try {
                const response = await axios.get('https://pokeapi.co/api/v2/evolution-chain?limit=541');
                const evolutionChainURLs = response.data.results.map((result) => result.url);
                const chainMap = {};

                // Fetch and process each evolution chain
                await Promise.all(evolutionChainURLs.map(async (url) => {
                    const chainResponse = await axios.get(url);
                    const evolutionData = chainResponse.data.chain;
                    const evolutionArray = buildEvolutionArray(evolutionData);

                    // Update the chainMap for each Pokémon in the evolution chain
                    evolutionArray.forEach((pokemon) => {
                        chainMap[pokemon] = evolutionArray;
                    });
                }));

                setEvolutionChains(chainMap);
            } catch (error) {
                console.error('Error fetching evolution chains:', error);
            }
        };

        // Recursive function to build the evolution array
        const buildEvolutionArray = (evolutionData) => {
            const evolvesTo = evolutionData.evolves_to.flatMap((evolution) => {
                return buildEvolutionArray(evolution);
            });

            return [evolutionData.species.name, ...evolvesTo];
        };

        fetchAllEvolutionChains();
    }, []);
```
</details>

<details>
<summary>Click to expand the sorting and fetch all pokemon logic</summary>

```javascript

const getAllPokemon = () => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=1302")
      .then((response) => response.json())
      .then((data) => {
        // setAllPokemons(data.results);
        // setFullPokemons(data.results);
        console.log(sort)
        console.log("anbfhjksdbvfhkwevfeghkjvdf wjehd")
        switch (sort) {
          case "1":
            setAllPokemons([...data.results].sort((a, b) => parseInt(a.url.split("/")[6]) - parseInt(b.url.split("/")[6])));
            break;
          case "2":
            setAllPokemons([...data.results].sort((a, b) => parseInt(b.url.split("/")[6]) - parseInt(a.url.split("/")[6])));
            break;
          case "3":
            setAllPokemons([...data.results].sort((a, b) => a.name.localeCompare(b.name)));
            break;
          case "4":
            setAllPokemons([...data.results].sort((a, b) => b.name.localeCompare(a.name)));
            break;
          default:
            setAllPokemons([...data.results]);
        }
      });
  };
```
</details> --> 


<!-- ROADMAP -->
## Roadmap

- [x] User/Admin Authentication
- [x] Add new bus by Admin
- [x] Delete and Edit bus by Admin
- [x] Seat Booking by User
- [x] Option to choose seat from seat Matrix


## Platform's users' perspective
* Enthusiasts of travel and commuters, whether occasional travelers or frequent bus users, would utilize the Bus Booking System to streamline their journey planning and booking process. The system's user-friendly interface, comprehensive features, and efficient functionality make it an essential tool for individuals seeking convenient and reliable bus travel solutions.

* The Bus Booking System functions as a centralized platform providing extensive information on various bus services, routes, and schedules. This centralized hub caters to diverse users, including commuters seeking convenient transportation options, travelers planning their journeys, and administrators managing bus operations.

* This platform serves as a valuable resource for travelers looking to optimize their travel experience, commuters planning their daily routes, and administrators overseeing bus operations. Whether users require information on available buses, seat availability, or booking options, the Bus Booking System offers a seamless and efficient solution for all their travel needs.


<!-- CONTACT -->
## Contact

Mail: [cse210001004@iiti.ac.in](cse210001004@iiti.ac.in)

Project Link: [https://github.com/ANJani9web/Bus_booking_System](https://github.com/ANJani9web/Bus_booking_System)


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
