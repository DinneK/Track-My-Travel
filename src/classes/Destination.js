class Destination {
  constructor(destinationInfo) {
    this.id = destinationInfo.id;
    this.destination = destinationInfo.destination;
    this.estimatedLodgingCostPerDay =
      destinationInfo.estimatedLodgingCostPerDay;
    this.estimatedFlightCostPerPerson =
      destinationInfo.estimatedFlightCostPerPerson;
    this.image = destinationInfo.image;
    this.alt = destinationInfo.alt;
  }
}

export default Destination;
