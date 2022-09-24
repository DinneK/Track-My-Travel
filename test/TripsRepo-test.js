import { expect } from "chai";
import mockDestinationsData from "../src/data/mockDestinationsData";
import mockTripsData from "../src/data/mockTripsData";
import mockTravelersData from "../src/data/mockTravelersData";
// import DestinationsRepo from "../src/classes/DestinationsRepo";
import Destination from "../src/classes/Destination";
import TripsRepo from "../src/classes/TripsRepo";
// import Trip from "../src/classes/Trip";
import Traveler from "../src/classes/Traveler";
// import dayjs from "dayjs";

describe("TripsRepo", () => {
  let trips,
    traveler1,
    traveler2,
    // traveler3,
    destinations;
  // destination1,
  // destination2;

  beforeEach(() => {
    trips = new TripsRepo(mockTripsData);
    traveler1 = new Traveler(mockTravelersData[0]);
    traveler2 = new Traveler(mockTravelersData[5]);
    // traveler3 = new Traveler(mockTravelersData[7]);
    // destinations = new DestinationsRepo(mockDestinationsData);
  });

  it("should instantiate a new instance of TripsRepo", () => {
    expect(trips).to.be.an.instanceOf(TripsRepo);
  });

  it("should have an list of travelers", () => {
    expect(trips.trips).to.deep.equal([
      {
        id: 1,
        userID: 8,
        destinationID: 10,
        travelers: 1,
        date: "2022/09/16",
        duration: 8,
        status: "approved",
        suggestedActivities: [],
      },
      {
        id: 2,
        userID: 7,
        destinationID: 8,
        travelers: 5,
        date: "2022/10/14",
        duration: 18,
        status: "approved",
        suggestedActivities: [],
      },
      {
        id: 3,
        userID: 3,
        destinationID: 2,
        travelers: 4,
        date: "2022/05/22",
        duration: 17,
        status: "approved",
        suggestedActivities: [],
      },
      {
        id: 4,
        userID: 2,
        destinationID: 6,
        travelers: 2,
        date: "2022/02/25",
        duration: 10,
        status: "pending",
        suggestedActivities: [],
      },
      {
        id: 5,
        userID: 2,
        destinationID: 3,
        travelers: 3,
        date: "2022/04/30",
        duration: 18,
        status: "approved",
        suggestedActivities: [],
      },
      {
        id: 6,
        userID: 1,
        destinationID: 5,
        travelers: 3,
        date: "2022/06/29",
        duration: 9,
        status: "approved",
        suggestedActivities: [],
      },
      {
        id: 7,
        userID: 3,
        destinationID: 1,
        travelers: 5,
        date: "2022/05/28",
        duration: 20,
        status: "approved",
        suggestedActivities: [],
      },
      {
        id: 8,
        userID: 8,
        destinationID: 6,
        travelers: 6,
        date: "2022/02/07",
        duration: 4,
        status: "approved",
        suggestedActivities: [],
      },
      {
        id: 9,
        userID: 4,
        destinationID: 8,
        travelers: 5,
        date: "2022/12/19",
        duration: 19,
        status: "approved",
        suggestedActivities: [],
      },
      {
        id: 10,
        userID: 8,
        destinationID: 5,
        travelers: 6,
        date: "2022/07/23",
        duration: 17,
        status: "approved",
        suggestedActivities: [],
      },
      {
        id: 11,
        userID: 5,
        destinationID: 5,
        travelers: 4,
        date: "2022/10/14",
        duration: 4,
        status: "pending",
        suggestedActivities: [],
      },
      {
        id: 12,
        userID: 6,
        destinationID: 4,
        travelers: 6,
        date: "2022/10/14",
        duration: 6,
        status: "pending",
        suggestedActivities: [],
      },
      {
        id: 13,
        userID: 1,
        destinationID: 9,
        travelers: 1,
        date: "2022/02/12",
        duration: 11,
        status: "approved",
        suggestedActivities: [],
      },
      {
        id: 14,
        userID: 6,
        destinationID: 3,
        travelers: 1,
        date: "2022/09/24",
        duration: 10,
        status: "approved",
        suggestedActivities: [],
      },
      {
        id: 15,
        userID: 5,
        destinationID: 10,
        travelers: 3,
        date: "2022/07/04",
        duration: 6,
        status: "pending",
        suggestedActivities: [],
      },
    ]);
  });

  it("should return a single trip by a traveler", () => {
    expect(trips.findSingleTripByTraveler(traveler1.travelerID)).to.deep.equal({
      id: 6,
      userID: 1,
      destinationID: 5,
      travelers: 3,
      date: "2022/06/29",
      duration: 9,
      status: "approved",
      suggestedActivities: [],
    });
    expect(trips.findSingleTripByTraveler(traveler2.travelerID)).to.deep.equal({
      id: 12,
      userID: 6,
      destinationID: 4,
      travelers: 6,
      date: "2022/10/14",
      duration: 6,
      status: "pending",
      suggestedActivities: [],
    });
  });

  it("should return all trips taken by a traveler", () => {
    expect(
      trips.findAllTripsTakenByTraveler(traveler1.travelerID)
    ).to.deep.equal([
      {
        id: 6,
        userID: 1,
        destinationID: 5,
        travelers: 3,
        date: "2022/06/29",
        duration: 9,
        status: "approved",
        suggestedActivities: [],
      },
      {
        id: 13,
        userID: 1,
        destinationID: 9,
        travelers: 1,
        date: "2022/02/12",
        duration: 11,
        status: "approved",
        suggestedActivities: [],
      },
    ]);
    expect(
      trips.findAllTripsTakenByTraveler(traveler2.travelerID)
    ).to.deep.equal([
      {
        id: 12,
        userID: 6,
        destinationID: 4,
        travelers: 6,
        date: "2022/10/14",
        duration: 6,
        status: "pending",
        suggestedActivities: [],
      },
      {
        id: 14,
        userID: 6,
        destinationID: 3,
        travelers: 1,
        date: "2022/09/24",
        duration: 10,
        status: "approved",
        suggestedActivities: [],
      },
    ]);
  });

  it("should return all past trips for a traveler", () => {
    expect(
      trips.returnPastTrips(traveler1.travelerID, "2022/10/14")
    ).to.deep.equal([
      {
        id: 6,
        userID: 1,
        destinationID: 5,
        travelers: 3,
        date: "2022/06/29",
        duration: 9,
        status: "approved",
        suggestedActivities: [],
      },
      {
        id: 13,
        userID: 1,
        destinationID: 9,
        travelers: 1,
        date: "2022/02/12",
        duration: 11,
        status: "approved",
        suggestedActivities: [],
      },
    ]);
    expect(
      trips.returnPastTrips(traveler2.travelerID, "2022/10/14")
    ).to.deep.equal([
      {
        id: 14,
        userID: 6,
        destinationID: 3,
        travelers: 1,
        date: "2022/09/24",
        duration: 10,
        status: "approved",
        suggestedActivities: [],
      },
    ]);
  });

  it("should return all upcoming trips for a traveler", () => {
    expect(
      trips.returnUpcomingTrips(traveler1.travelerID, "2022/10/14")
    ).to.deep.equal([]);
    expect(
      trips.returnUpcomingTrips(traveler2.travelerID, "2022/10/14")
    ).to.deep.equal([
      {
        id: 12,
        userID: 6,
        destinationID: 4,
        travelers: 6,
        date: "2022/10/14",
        duration: 6,
        status: "pending",
        suggestedActivities: [],
      },
    ]);
  });

  it("should return trips on any given day", () => {
    expect(trips.findTripsByDate("2022/10/14")).to.deep.equal([
      {
        id: 2,
        userID: 7,
        destinationID: 8,
        travelers: 5,
        date: "2022/10/14",
        duration: 18,
        status: "approved",
        suggestedActivities: [],
      },
      {
        id: 11,
        userID: 5,
        destinationID: 5,
        travelers: 4,
        date: "2022/10/14",
        duration: 4,
        status: "pending",
        suggestedActivities: [],
      },
      {
        id: 12,
        userID: 6,
        destinationID: 4,
        travelers: 6,
        date: "2022/10/14",
        duration: 6,
        status: "pending",
        suggestedActivities: [],
      },
    ]);
    expect(trips.findTripsByDate("2022/04/30")).to.deep.equal([
      {
        id: 5,
        userID: 2,
        destinationID: 3,
        travelers: 3,
        date: "2022/04/30",
        duration: 18,
        status: "approved",
        suggestedActivities: [],
      },
    ]);
  });

  it("should return the total amount spent on trips for the previous year", () => {
    destinations = mockDestinationsData.map(
      (destination) => new Destination(destination)
    );

    expect(
      trips.calculateCostsForPastYear(
        destinations,
        traveler1.travelerID,
        "2022/10/14"
      )
    ).to.equal(5885);
    expect(
      trips.calculateCostsForPastYear(
        destinations,
        traveler2.travelerID,
        "2022/10/14"
      )
    ).to.equal(2475);
  });
});
