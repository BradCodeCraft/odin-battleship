import { Player } from "../classes/Player";
import {
  generateRandomCoordinate,
  getWinner,
  isGameOver,
  resetGame,
  setupPlayerBoard,
} from "../logic/gameLogic";

/**
 * @param {Document} doc
 *
 * @returns {HTMLDivElement}
 */
function createFirstRow(doc) {
  /** @type {HTMLDivElement} */
  const row = doc.createElement("div");
  row.setAttribute("class", "row");
  /** @type {HTMLDivElement} */
  const blank = doc.createElement("div");
  blank.setAttribute("class", "blank");
  row.append(blank);
  const columnNames = "ABCDEFGHIJ";

  for (const columnName of columnNames) {
    const column = doc.createElement("div");
    column.setAttribute("class", "column-name");
    column.textContent = columnName;
    row.append(column);
  }

  return row;
}

/**
 * @param {Document} doc
 * @param {number} row
 *
 * @returns {HTMLDivElement}
 */
function createRow(doc, row) {
  /** @type {HTMLDivElement} */
  const rowContainer = doc.createElement("div");
  rowContainer.setAttribute("class", "row");
  const rowNumber = doc.createElement("div");
  rowNumber.setAttribute("class", "row-number");
  rowNumber.textContent = row;
  rowContainer.append(rowNumber);

  for (let i = 1; i <= 10; i++) {
    const cell = doc.createElement("div");
    cell.setAttribute("class", "cell");
    rowContainer.append(cell);
  }

  return rowContainer;
}

/**
 * @param {HTMLDivElement} container
 * @param {Player} player
 */
function showShipsOnBoard(container, player) {
  /** @type {NodeListOf<HTMLDivElement>} */
  const cellNodesList = container.querySelectorAll(".cell");

  for (let i = 0; i < cellNodesList.length; i++) {
    const row = Math.floor(i / 10);
    const column = i % 10;

    if (player.gameboard.board[row][column] !== null) {
      cellNodesList[i].setAttribute("class", "cell ship");
    }
  }
}

/**
 * @param {HTMLDivElement} container
 */
function makeCellsClickable(container) {
  /** @type {NodeListOf<HTMLDivElement>} */
  const cellNodesList = container.querySelectorAll(".cell");
  for (const cell of cellNodesList) {
    cell.setAttribute("class", "cell opponent");
  }
}

/**
 * @param {HTMLDivElement} container
 * @param {Player} player
 */
function makeCellsUnclickable(container, player) {
  /** @type {NodeListOf<HTMLDivElement>} */
  const cellNodesList = container.querySelectorAll(".cell");
  for (let i = 0; i < cellNodesList.length; i++) {
    const row = Math.floor(i / 10);
    const column = i % 10;
    if (
      player.gameboard.board[row][column] === 0 ||
      player.gameboard.board[row][column] === 1
    ) {
      cellNodesList[i].removeEventListener("click", () => {});
    }
  }
}

/**
 * @param {HTMLDivElement} container
 * @param {Player} player
 */
function redrawCells(container, player) {
  /** @type {NodeListOf<HTMLDivElement>} */
  const cellNodesList = container.querySelectorAll(".cell");
  for (let i = 0; i < cellNodesList.length; i++) {
    const row = Math.floor(i / 10);
    const column = i % 10;

    player.gameboard.board[row][column] === 1
      ? cellNodesList[i].setAttribute("class", "cell hit")
      : player.gameboard.board[row][column] === 0
        ? cellNodesList[i].setAttribute("class", "cell miss")
        : null;
  }
}

/**
 * @param {HTMLDivElement} board
 * @param {Player} playerOne
 * @param {Player} playerTwo
 */
function redrawBoards(board, playerOne, playerTwo) {
  /** @type {HTMLDivElement} */
  const playerBoard = board.querySelector(".player-board");
  /** @type {HTMLDivElement} */
  const computerBoard = board.querySelector(".computer-board");

  redrawCells(playerBoard, playerOne);
  redrawCells(computerBoard, playerTwo);
}

/**
 * @param {Document} doc
 * @param {Player} playerOne
 * @param {Player} playerTwo
 */
function renderWinner(doc, playerOne, playerTwo) {
  /** @type {HTMLDivElement} */
  const container = doc.querySelector(".winner-container");
  container.innerHTML = "";
  const winner = doc.createElement("h2");
  winner.textContent = `Winner is ${getWinner(playerOne, playerTwo).name}!`;
  const button = doc.createElement("button");
  button.textContent = "Play Again?";
  button.addEventListener("click", () => {
    resetGame(playerOne, playerTwo);
    container.style.display = "none";
    createPlayerBoard(doc, playerOne);
    createOpponentBoard(doc, playerTwo);
    doc.querySelector(".boards-container").style.display = "flex";
  });

  container.append(winner, button);
}

/**
 * @param {Document} doc
 * @param {Player} playerOne
 * @param {Player} playerTwo
 */
function addLogicToClickableCells(doc, playerOne, playerTwo) {
  /** @type {HTMLDivElement} */
  const board = doc.querySelector(".boards-container");
  /** @type {HTMLDivElement} */
  const computerBoard = board.querySelector(".computer-board");
  /** @type {NodeListOf<HTMLDivElement>} */
  const cellNodesList = computerBoard.querySelectorAll(".cell");

  for (let i = 0; i < cellNodesList.length; i++) {
    const row = Math.floor(i / 10);
    const column = i % 10;

    if (
      playerTwo.gameboard.board[row][column] !== 0 &&
      playerTwo.gameboard.board[row][column] !== 1
    ) {
      cellNodesList[i].addEventListener("click", () => {
        if (typeof playerTwo.gameboard.board[row][column] === "object") {
          playerTwo.gameboard.receiveAttack([row, column]);
          let randomCoordinate = generateRandomCoordinate();
          playerOne.gameboard.board[
            (randomCoordinate[0], randomCoordinate[1])
          ] === 0 ||
          playerOne.gameboard.board[
            (randomCoordinate[0], randomCoordinate[1])
          ] === 1
            ? (randomCoordinate = generateRandomCoordinate())
            : playerOne.gameboard.receiveAttack(randomCoordinate);

          makeCellsUnclickable(computerBoard, playerTwo);
          redrawBoards(board, playerOne, playerTwo);
        }

        if (isGameOver(playerOne, playerTwo)) {
          board.style.display = "none";
          renderWinner(doc, playerOne, playerTwo);
        }
      });
    }
  }
}

/**
 * @param {Document} doc
 * @param {Player} playerOne
 * @param {Player} playerTwo
 */
export function playRound(doc, playerOne, playerTwo) {
  addLogicToClickableCells(doc, playerOne, playerTwo);
}

/**
 * @param {Document} doc
 * @param {Player} player
 */
export function createPlayerBoard(doc, player) {
  /** @type {HTMLDivElement} */
  const container = doc.querySelector(".player-board");
  container.innerHTML = "";
  container.append(createFirstRow(doc));

  for (let i = 1; i <= 10; i++) {
    container.append(createRow(doc, i));
  }

  showShipsOnBoard(container, player);
}

/**
 * @param {Document} doc
 * @param {Player} player
 */
export function createOpponentBoard(doc, player) {
  /** @type {HTMLDivElement} */
  const container = doc.querySelector(".computer-board");
  container.innerHTML = "";
  container.append(createFirstRow(doc));

  for (let i = 1; i <= 10; i++) {
    container.append(createRow(doc, i));
  }

  makeCellsClickable(container, player);
}
