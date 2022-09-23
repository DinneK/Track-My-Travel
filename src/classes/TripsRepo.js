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

  returnPastTrips(travelerID) {
    return this.findAllTripsTakenByTraveler(travelerID).filter(
      (trips) => trips.status === "approved"
    );
  }

  returnUpcomingTrips(travelerID) {
    return this.findAllTripsTakenByTraveler(travelerID).filter(
      (trips) => trips.status === "pending"
    );
  }

  // returnAllOfLastYearsTrips(travelerID, date) {
  //   console.log({ travelerID });
  //   console.log({ date });
  //   const aDate = date.split("/");
  //   let year = aDate[0];
  //   let month = aDate[1];
  //   let day = aDate[2];
  //   console.log({ aDate });
  //   console.log(parseFloat(year) - 1);
  //   console.log({ month });
  //   console.log({ day });
  // }

  findTripsByDate(date) {
    return this.trips.filter((trips) => trips.date === date);
  }
}

export default TripsRepo;
