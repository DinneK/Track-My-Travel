class Traveler {
  constructor(travelerInfo) {
    this.travelerID = travelerInfo.id;
    this.name = travelerInfo.name;
    this.travelerType = travelerInfo.travelerType;
  }

  returnATravelerFirstName() {
    return this.name.split(" ")[0];
  }
}

export default Traveler;
