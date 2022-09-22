import { expect } from "chai";
import mockTravelersData from "../src/data/mockTravelersData";
import TravelersRepo from "../src/classes/TravelersRepo";
import Traveler from "../src/classes/Traveler";

describe("TravelersRepo", () => {
  let travelers, traveler1, traveler2, traveler3;

  beforeEach(() => {
    travelers = new TravelersRepo(mockTravelersData);
    traveler1 = new Traveler(mockTravelersData[0]);
    traveler2 = new Traveler(mockTravelersData[5]);
    traveler3;
  });

  it("should instantiate a new instance of TraverlersRepo", () => {
    expect(travelers).to.be.an.instanceOf(TravelersRepo);
  });

  it("should have an array of travelers", () => {
    expect(travelers.travelers).to.deep.equal([
      { id: 1, name: "Ham Leadbeater", travelerType: "relaxer" },
      { id: 2, name: "Rachael Vaughten", travelerType: "thrill-seeker" },
      { id: 3, name: "Sibby Dawidowitsch", travelerType: "shopper" },
      { id: 4, name: "Leila Thebeaud", travelerType: "photographer" },
      { id: 5, name: "Tiffy Grout", travelerType: "thrill-seeker" },
      { id: 6, name: "Laverna Flawith", travelerType: "shopper" },
      { id: 7, name: "Emmet Sandham", travelerType: "relaxer" },
      { id: 8, name: "Carlin O'Reilly", travelerType: "history buff" },
    ]);
  });

  it("should return a single traveler object", () => {
    expect(travelers.findAsingleTraveler(traveler1.travelerID)).to.deep.equal({
      id: 1,
      name: "Ham Leadbeater",
      travelerType: "relaxer",
    });
    expect(travelers.findAsingleTraveler(traveler2.travelerID)).to.deep.equal({
      id: 6,
      name: "Laverna Flawith",
      travelerType: "shopper",
    });
  });
});
