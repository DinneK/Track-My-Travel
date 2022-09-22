import { expect } from "chai";
import mockTravelersData from "../src/data/mockTravelersData";
import Traveler from "../src/classes/Traveler";

describe("Traveler", () => {
  let traveler1, traveler2;

  beforeEach(() => {
    traveler1 = new Traveler(mockTravelersData[0]);
    traveler2 = new Traveler(mockTravelersData[1]);
  });

  it("should instantiate a new instance of Traveler", () => {
    expect(traveler1).to.be.an.instanceOf(Traveler);
    expect(traveler2).to.be.an.instanceOf(Traveler);
  });

  it("should have an ID for each traveler", () => {
    expect(traveler1.travelerID).to.equal(1);
    expect(traveler2.travelerID).to.equal(2);
  });

  it("should have a name for each traveler", () => {
    expect(traveler1.name).to.equal("Ham Leadbeater");
    expect(traveler2.name).to.equal("Rachael Vaughten");
  });

  it("should have a type of traveler", () => {
    expect(traveler1.travelerType).to.equal("relaxer");
    expect(traveler2.travelerType).to.equal("thrill-seeker");
  });

  it("should return a traveler's first name", () => {
    expect(traveler1.returnATravelerFirstName()).to.equal("Ham");
    expect(traveler2.returnATravelerFirstName()).to.equal("Rachael");
  });
});
