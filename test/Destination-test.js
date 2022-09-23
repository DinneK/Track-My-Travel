import { expect } from "chai";
import mockDestinationsData from "../src/data/mockDestinationsData";
import Destination from "../src/classes/Destination";

describe("Destination", () => {
  let destination1, destination2;

  beforeEach(() => {
    destination1 = new Destination(mockDestinationsData[0]);
    destination2 = new Destination(mockDestinationsData[4]);
  });

  it("should instantiate a new instance of Destination", () => {
    expect(destination1).to.be.an.instanceOf(Destination);
    expect(destination2).to.be.an.instanceOf(Destination);
  });

  it("should have an ID for each destination", () => {
    expect(destination1.destinationID).to.equal(1);
    expect(destination2.destinationID).to.equal(5);
  });

  it("should have a name for each destination", () => {
    expect(destination1.destination).to.equal("Lima, Peru");
    expect(destination2.destination).to.equal("Madrid, Spain");
  });

  it("should have a price for lodging", () => {
    expect(destination1.estimatedLodgingCostPerDay).to.equal(70);
    expect(destination2.estimatedLodgingCostPerDay).to.equal(150);
  });

  it("should have a price for flight", () => {
    expect(destination1.estimatedFlightCostPerPerson).to.equal(400);
    expect(destination2.estimatedFlightCostPerPerson).to.equal(650);
  });

  it("should have an image associated", () => {
    expect(destination1.image).to.equal(
      "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80"
    );
    expect(destination2.image).to.equal(
      "https://images.unsplash.com/photo-1543785734-4b6e564642f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
    );
  });

  it("should have an alt description for image", () => {
    expect(destination1.alt).to.equal(
      "overview of city buildings with a clear sky"
    );
    expect(destination2.alt).to.equal(
      "city with clear skys and a road in the day time"
    );
  });
});
