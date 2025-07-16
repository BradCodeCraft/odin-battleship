import { Player } from "../../src/classes/Player";
import { Gameboard } from "../../src/classes/Gameboard";

test("Should be able to create a Player entity", () => {
  expect(() => new Player("a")).not.toThrow(Error);
});

test("Should construct a Player entity", () => {
  expect(new Player("a").name).toBe("a");
  expect(new Player("a").gameboard).toEqual(new Gameboard());
});

test("Should not construct a Player entity", () => {
  expect(() => new Player()).toThrow("Name is missing!");
});
