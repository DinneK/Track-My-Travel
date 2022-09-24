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
      (trips) => dayjs(trips.date).$d < dayjs(date).$d
    );
  }

  returnUpcomingTrips(travelerID, date) {
    return this.findAllTripsTakenByTraveler(travelerID).filter(
      (trips) => dayjs(trips.date).$d >= dayjs(date).$d
    );
  }

  findTripsByDate(date) {
    return this.trips.filter((trips) => trips.date === date);
  }

  calculateCostsForPastYear(destinations, travelerID, date) {
    const pastTrips = this.returnPastTrips(travelerID, date);
    return pastTrips.reduce((acc, curr) => {
      destinations.forEach((destination) => {
        if (destination.destinationID === curr.destinationID) {
          acc +=
            (destination.estimatedLodgingCostPerDay * curr.duration +
              destination.estimatedFlightCostPerPerson * curr.travelers) *
            1.1;
        }
      });
      return acc;
    }, 0);
  }
}

export default TripsRepo;
