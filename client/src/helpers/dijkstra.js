// const fs = require("fs/promises");


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
        // console.log(dis[dest][k - 1])
        // console.log(dest)
        // Sort the distances and predecessors after updating
        dis[dest].sort((a, b) => a.cost - b.cost);

        // Push the new cost and destination to the priority queue
        pq.push({ cost: newCost, node: dest });

        // Sort the priority queue based on cost
        pq.sort((a, b) => a.cost - b.cost);
      } 
    }
    // console.log(dis)
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

// Example: find top 3 shortest paths from "Agra" to "Varanasi"
// findKShortestPaths(cities, distanceMatrix, "Varanasi", "Lucknow", 50);
