import { Ship } from "../../src/classes/Ship";

test("Should create a Ship entity", () => {
  expect(() => new Ship(4)).not.toThrow(Error);
  expect(new Ship(4).length).toBe(4);
  expect(new Ship(4).numberOfHits).toBe(0);
  expect(new Ship(4).isAlive).toBe(true);
});

test("Should not create a Ship entity", () => {
  expect(() => new Ship()).toThrow("Length should not empty!");
  expect(() => new Ship(-1)).toThrow("Length should not be negative!");
  expect(() => new Ship(6)).toThrow("Length should not greater than five!");
});

test("Should register hit shot", () => {
  const carrier = new Ship(5);

  expect(() => carrier.hit()).not.toThrow(Error);
  expect(carrier.numberOfHits).toBe(1);
  expect(() => carrier.hit()).not.toThrow(Error);
  expect(() => carrier.hit()).not.toThrow(Error);
  expect(() => carrier.hit()).not.toThrow(Error);
  expect(carrier.numberOfHits).toBe(4);
  expect(() => carrier.hit()).not.toThrow(Error);
  expect(() => carrier.hit()).not.toThrow(Error);
  expect(carrier.numberOfHits).toBe(5);
});

test("Should handle isSunk", () => {
  const carrier = new Ship(5);

  expect(() => carrier.isSunk()).not.toThrow(Error);
  expect(carrier.isSunk()).toBe(false);
  carrier.hit();
  carrier.hit();
  carrier.hit();
  carrier.hit();
  carrier.hit();
  expect(carrier.isSunk()).toBe(true);
});
