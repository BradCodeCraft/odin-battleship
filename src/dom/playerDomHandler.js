import { Player } from "../classes/Player";
import { setupPlayerBoard } from "../logic/gameLogic";
import {
  createOpponentBoard,
  createPlayerBoard,
  playRound,
} from "./boardDomHandler";

/**
 * @param {Document} doc
 * @param {Player} playerOne
 * @param {Player} playerTwo
 */
export function changePlayerName(doc, playerOne, playerTwo) {
  /** @type {HTMLDivElement} */
  const container = doc.querySelector(".player-creation-container");
  /** @type {HTMLFormElement} */
  const form = container.querySelector(".player-creation-form");
  /** @type {HTMLInputElement} */
  const input = form.querySelector("#player-name");
  /** @type {HTMLButtonElement} */
  const button = form.querySelector("button");

  button.addEventListener("click", (event) => {
    event.preventDefault();
    if (!input.validity.valid) input.reportValidity();
    if (input.validity.valid) {
      playerOne.name = input.value;
      setupPlayerBoard(playerOne);
      setupPlayerBoard(playerTwo);
      createPlayerBoard(doc, playerOne);
      createOpponentBoard(doc, playerTwo);
      playRound(doc, playerOne, playerTwo);
      container.style.display = "none";
    }
  });
}
