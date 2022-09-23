class DestinationsRepo {
  constructor(destinationsInfo) {
    this.destinations = destinationsInfo;
  }

  findDestinationByItsID(destinationID) {
    return this.destinations.find(
      (destination) => destination.id === destinationID
    );
  }
}

export default DestinationsRepo;
