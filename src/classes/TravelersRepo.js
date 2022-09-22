class TravelersRepo {
  constructor(travelersInfo) {
    this.travelers = travelersInfo;
  }

  findAsingleTraveler(travelerID) {
    return this.travelers.find((traveler) => traveler.id === travelerID);
  }
}

export default TravelersRepo;
