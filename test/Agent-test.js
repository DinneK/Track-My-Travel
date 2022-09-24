// import { expect } from "chai";
// import mockDestinationsData from "../src/data/mockDestinationsData";
// import mockTravelersData from "../src/data/mockTravelersData";
// import mockTripsData from "../src/data/mockTripsData";
// import Agent from "../src/classes/Agent";
// import DestinationsRepo from "../src/classes/DestinationsRepo";
// import Destination from "../src/classes/Destination";
// import TripsRepo from "../src/classes/TripsRepo";
// import Trip from "../src/classes/Trip";
// import Traveler from "../src/classes/Traveler";
// import dayjs from "dayjs";

// describe("Agent", () => {
//   let agent,
//     trips,
//     trip1,
//     trip2,
//     traveler1,
//     traveler2,
//     traveler3,
//     destinations,
//     destination1,
//     destination2;

//   beforeEach(() => {
//     agent = new Agent();
//     trips = new TripsRepo(mockTripsData);
//     traveler1 = new Traveler(mockTravelersData[0]);
//     traveler2 = new Traveler(mockTravelersData[5]);
//     traveler3 = new Traveler(mockTravelersData[7]);
//   });

//   it("should instantiate a new instance of Agent", () => {
//     expect(agent).to.be.an.instanceOf(Agent);
//   });
// });
