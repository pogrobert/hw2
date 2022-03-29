const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const rewire = require("rewire");
const NotFoundError = require("../../errors/not-found.error");
const citiesService = rewire("../cities.service");

chai.use(chaiAsPromised);
chai.should();

const res = {
  data: {
    country: "United States",
    places: [{ "place name": "San Francisco", "state abbreviation": "CA" }],
  },
};

const citiesRepositoryFaker = () => ({
  getCityDataByZipCode: (zip) => {
    if (zip === "94122") return res;
    else throw new NotFoundError("No cities found");
  },
});

citiesService.__set__("citiesRepository", citiesRepositoryFaker());

describe("Cities Service", () => {
  it("should return the expected result for getCityByZipCode function", () => {
    return citiesService
      .getCityByZipCode("94122")
      .should.eventually.equal("San Francisco, CA, United States");
  });

  it("should throw a NotFoundError in case of a wrong zip code", () => {
    return citiesService
      .getCityByZipCode("1")
      .should.eventually.be.rejectedWith(NotFoundError);
  });
});
