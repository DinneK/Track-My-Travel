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

  // returnAllOfLastYearsTrips(travelerID, date) {
  //   // let now = dayjs();
  //   // console.log({ now });
  //   // console.log("nowDate", now.format(date));
  //   console.log("year", dayjs(date).$y);
  //   console.log("month", dayjs(date).$M + 1);
  //   console.log("day", dayjs(date).$D);
  // }

  //return all of a users trips
  //select a date
  //if the dates of trips in the users array of trips are before the chosen date
  //return past trips
  //if the dates of trips are after a the date
  //return upcoming
  //if trips are pending return to pending

  findTripsByDate(date) {
    return this.trips.filter((trips) => trips.date === date);
  }
}

export default TripsRepo;

// const calculateTravelCostThisYear = () => {
//   let sum = 0;
//   usersTrips.trips.forEach((trip) => {
//     if(dayjs(trip.date).year() === dayjs().year()) {
//       let lodging = ((trip.travelers)*(trip.destination.lodgingCost))*trip.duration;
//       let flights = (trip.travelers*trip.destination.flightCost);
//       sum += (lodging+flights)+((lodging+flights)*.10);
//     }
//   })
//   showTotalCost(sum);
// }
