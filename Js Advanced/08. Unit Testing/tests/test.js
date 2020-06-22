const isOddOrEven = require("../index.js");

let expect = require("chai").expect;
let assert = require("chai").assert;

describe("isOddorEven function", function(){
    it("Pass number ot return undefined.", function(){
        let actual = isOddOrEven(2);
        assert.equal(actual,undefined);
    });
    it("Pass string with even length.", function(){
        let actual = isOddOrEven("toni");
        assert.equal(actual,"even");
    });
    it("Pass string with odd length.", function(){
        let actual = isOddOrEven("ton");
        assert.equal(actual,"odd");
    });
});