import dayjs from "dayjs";

class TripsRepo {
  constructor(tripsInfo) {
    this.trips = tripsInfo;
  }

  findSingleTripByTraveler(travelerID) {
    return this.trips.find((trip) => trip.userID === travelerID);
  }

  findAllTripsTakenByTraveler(travelerID) {
    return this.trips.filter((trips) => trips.userID === travelerID);
  }

  returnPastTrips(travelerID, date) {
    return this.findAllTripsTakenByTraveler(travelerID).filter(
      (trips) =>
        dayjs(trips.date).format("YYYY/MM/DD") <
        dayjs(date).format("YYYY/MM/DD")
    );
  }

  returnUpcomingTrips(travelerID, date) {
    const result = this.findAllTripsTakenByTraveler(travelerID).filter(
      (trips) =>
        dayjs(trips.date).format("YYYY/MM/DD") >=
        dayjs(date).format("YYYY/MM/DD")
    );
    if (result.length === 0) {
      return "You have no upcoming trips";
    }
    return result;
  }

  returnPendingTrips(travelerID) {
    const result = this.findAllTripsTakenByTraveler(travelerID).filter(
      (trips) => trips.status === "pending"
    );
    if (result.length === 0) {
      return "You have no pending trips";
    }
    return result;
  }

  findTripsByDate(date) {
    return this.trips.filter((trips) => trips.date === date);
  }

  calculateCostsForPastYear(destinations, travelerID, date) {
    const pastTrips = this.returnPastTrips(travelerID, date);
    const result = pastTrips.reduce((acc, curr) => {
      destinations.forEach((destination) => {
        if (destination.id === curr.destinationID) {
          acc +=
            (destination.estimatedLodgingCostPerDay * curr.duration +
              destination.estimatedFlightCostPerPerson * curr.travelers) *
            1.1;
        }
      });
      return acc;
    }, 0);
    return parseFloat(result).toFixed(2);
  }
}

export default TripsRepo;
