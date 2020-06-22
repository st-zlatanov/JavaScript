const { expect } = require("chai");
const { beforeEach } = require("mocha");
const SkiResort = require("./solution");

describe("SkiResort", function() {
  let resort;
  beforeEach(function() {
    resort = new SkiResort("Resort");
  });
  describe("constructor tests", function() {
    it("should initialize properties correctly", function() {
      expect(resort.name).to.equal("Resort");
      expect(resort.voters).to.equal(0);
      expect(resort.hotels).to.deep.equal([]);
    });
  });
  describe("getter tests", function() {
    it("should return no votes", function() {
      let expected = resort.bestHotel;
      expect(expected).to.equal("No votes yet");
    });
    it("should return best hotel", function() {
      resort.build("Sun", 10);
      resort.book("Sun", 5);
      resort.leave("Sun", 3, 2);
      let expected = `Best hotel is Sun with grade 6. Available beds: 8`;
      //  let actual =
      expect(expected).to.equal(resort.bestHotel);
    });
  });
  describe("build() tests", function() {
    it("should throw error", function() {
      const build = () => resort.build("", "2");
      expect(build).to.throw(Error, "Invalid input");
    });
    it("should throw error2", function() {
      const build = () => resort.build("Hotel", "-1");
      expect(build).to.throw(Error, "Invalid input");
    });
    it("should add correctly", function() {
      const hotel1 = {
        name: "Hotel",
        beds: 10,
        points: 0
      };
      const outputMsg = resort.build("Hotel", 10);
      expect(resort.hotels.length).to.equal(1);
      expect(outputMsg).to.equal("Successfully built new hotel - Hotel");
      expect(resort.hotels[0]).to.deep.equal(hotel1);
    });
  });
  describe("book() tests", function() {
    it("should throw error", function() {
      const book = () => resort.book("", "2");
      expect(book).to.throw(Error, "Invalid input");
    });
    it("should throw error1", function() {
      const book = () => resort.book("hot", "-1");
      expect(book).to.throw(Error, "Invalid input");
    });
    it("should throw error2", function() {
      resort.build("Hotel", 3);
      const book = () => resort.book("Hotel", "5");

      expect(book).to.throw(Error, "There is no free space");
    });
    it("should throw error3", function() {
      const book = () => resort.book("Hotel", "5");

      expect(book).to.throw(Error, "There is no such hotel");
    });

    it("should book correctly", function() {
      const hotel1 = {
        name: "Hotel",
        beds: 2,
        points: 0
      };
      resort.build("Hotel", 10);
      const outputMsg = resort.book("Hotel", 8);
      expect(outputMsg).to.equal("Successfully booked");
      expect(resort.hotels[0]).to.deep.equal(hotel1);
    });
  });
  describe("leave() tests", function() {
    it("should throw error", function() {
      const leave = () => resort.leave("", "2");
      expect(leave).to.throw(Error, "Invalid input");
    });
    it("should throw error1", function() {
      const leave = () => resort.leave("hot", "-1");
      expect(leave).to.throw(Error, "Invalid input");
    });
    it("should throw error3", function() {
      const leave = () => resort.leave("Hotel", "5");

      expect(leave).to.throw(Error, "There is no such hotel");
    });
    it("should leave correctly", function() {
      resort.build("Hotel", 10);
      resort.book("Hotel", 8);
      const outputMsg = resort.leave("Hotel", 2, 3);
      expect(outputMsg).to.equal("2 people left Hotel hotel");
    });
  });
  describe("averageGrade() tests", function() {
    it("should throw error", function() {
      resort.build("Hotel", 10);
      const outputMsg = resort.averageGrade();
      expect(outputMsg).to.equal("No votes yet");
    });
    it("should return proper msg", function() {
      resort.build("Hotel", 10);
      resort.book("Hotel", 2);
      resort.leave("Hotel", 2, 3);
      const outputMsg = resort.averageGrade();
      expect(outputMsg).to.equal("Average grade: 3.00");
    });
  });
});
