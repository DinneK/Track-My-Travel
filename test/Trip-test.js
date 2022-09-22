import { expect } from "chai";
import mockTripsData from "../src/data/mockTripsData";
import Trip from "../src/classes/Trip";

describe("Trip", () => {
  let trip1, trip2;

  beforeEach(() => {
    trip1 = new Trip(mockTripsData[0]);
    trip2 = new Trip(mockTripsData[10]);
  });

  it("should instantiate a new instance of Trip", () => {
    expect(trip1).to.be.an.instanceOf(Trip);
    expect(trip2).to.be.an.instanceOf(Trip);
  });

  it("should have an ID for each individual trip", () => {
    expect(trip1.tripID).to.equal(1);
    expect(trip2.tripID).to.equal(11);
  });

  it("should have an traveler ID equivelent to a traveler data ID", () => {
    expect(trip1.travelerID).to.equal(8);
    expect(trip2.travelerID).to.equal(5);
  });

  it("should have an destination ID equivelent to a destination data ID", () => {
    expect(trip1.destinationID).to.equal(10);
    expect(trip2.destinationID).to.equal(5);
  });

  it("should have a number of travelers", () => {
    expect(trip1.travelers).to.equal(1);
    expect(trip2.travelers).to.equal(4);
  });

  it("should have a start date for a trip", () => {
    expect(trip1.date).to.equal("2022/09/16");
    expect(trip2.date).to.equal("2022/10/14");
  });

  it("should have a number of days for each trip", () => {
    expect(trip1.duration).to.equal(8);
    expect(trip2.duration).to.equal(4);
  });

  it("should have a trip status", () => {
    expect(trip1.status).to.equal("approved");
    expect(trip2.status).to.equal("pending");
  });

  it("should start with no activities", () => {
    expect(trip1.suggestedActivities).to.deep.equal([]);
    expect(trip2.suggestedActivities).to.deep.equal([]);
  });
});
