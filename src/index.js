import "./styles.css";
import { Player } from "./classes/Player";
import { changePlayerName } from "./dom/playerDomHandler";

(function game(doc) {
  const playerOne = new Player("One");
  const playerTwo = new Player("CPU");

  doc.addEventListener("DOMContentLoaded", () => {
    changePlayerName(doc, playerOne, playerTwo);
  });
})(document);
