const { DLatch } = require("../DLatch.js");
const { describe, test, expect } = require("@jest/globals");

describe("Tests for D Type Flip Flop", () => {
   test("output does not change without enable", () => {
      const cell = new DLatch();
      const first_status = cell.evaluate();
      let last_status;

      expect(first_status[0]).toEqual(false);
      expect(first_status[1]).toEqual(true);
      last_status = cell.set_d(true);
      expect(first_status).toEqual(last_status);
      last_status = cell.set_d(false);
      expect(last_status).toEqual(first_status);
   });

   test("output adopts the value of D on enable", () => {
      const cell = new DLatch();
      const first_status = cell.evaluate();
      const triggered_status = [ first_status[1], first_status[0] ];
      let last_status;

      last_status = cell.set_d(true);
      expect(last_status).toEqual(first_status);
      last_status = cell.set_enable(true);
      expect(last_status).toEqual(triggered_status);
      last_status = cell.set_enable(false);
      expect(last_status).toEqual(triggered_status);
      last_status = cell.set_d(false);
      expect(last_status).toEqual(triggered_status);
      last_status = cell.set_enable(true);
      expect(last_status).toEqual(first_status);
      last_status = cell.set_enable(false);
      expect(last_status).toEqual(first_status);
      last_status = cell.set_d(false);
      expect(last_status).toEqual(first_status);
   })
});
