import { expect } from "chai";
import sinon from "sinon";
import LocationController from "../../src/controllers/Location.controller.js";

describe("Testing LocationController", () => {
  let locationServices;
  let locationController;
  let successObject;
  let location;
  let req;
  let res;

  beforeEach(() => {
    locationServices = {
      addLocation: sinon.stub(),
    };
    locationController = new LocationController(locationServices);
    location = {
      name: "Forrest Moon Endor",
      id: 1,
      coord: { lat: 1, lon: 1 },
    };
    req = {
      body: {
        email: "test@example.com",
        ...location,
      },
    };
    res = {
      set: sinon.stub().returnsThis(),
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
      header: sinon.stub().returnsThis(),
    };
    successObject = {
      _id: "666f0c0182ef75dd43802052",
      email: "paper@scissors.com",
      password: "$2b$10$PiJZOmYdPkvSjRAQuMp4XuiMNJYbIXYd0/hzaKRiR3phIEiKwte66",
      savedLocations: [
        {
          coord: {
            lat: 37.7021,
            lon: -121.9358,
          },
          name: "Dublin",
          id: 5344157,
        },
      ],
    };
  });

  describe("addLocation tests", () => {
    it.skip("should respond with a 200 status code", async () => {
      locationServices.addLocation.resolves(successObject);

      await locationController.addLocation(req, res);
      expect(res.status.calledWith(200)).to.be.true;
    });
  });
});
