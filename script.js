"use strict";

let currentUser = "X"; //текущий пользователь Х или О
const cells = document.querySelectorAll(".cell"); //все ячейки
const restart = document.querySelector(".game--restart"); //кнопка сброса
let gameStatus = document.querySelector(".game--status");
let gameActive = true; // когда игра закончена, будем запрещать делать шаги
let gameState = ["", "", "", "", "", "", "", "", ""]; // 9 ячеек как на поле, здесь будет храниться состояни игры, кто в какую ячейку ходил
const winningLines = [
  //линии выигрыша
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const handlePlayerChange = function () {
  //функция,проверяющая и изменящая игрока
  currentUser === "X" ? (currentUser = "O") : (currentUser = "X"); //меняем значение игрока
  gameStatus.innerHTML = `It's ${currentUser}'s turn`; //меняем информацию в строке статуса игрока
};

const fillCell = function (event) {
  let activeIndex = event.target.dataset.cellIndex; //находим индекс активной ячейки
  let activeCell = cells[activeIndex]; //с помощью индекса находим активную ячейку
  if (!gameActive || gameState[activeIndex] !== "") {
    //если игра не закончена и ячейка уже заполнена продолжаем
    return;
  } else {
    gameState[activeIndex] = currentUser; //в массив статуса ячеек добавляем значение текущего игрока
    activeCell.textContent = currentUser; //в ячейку добавляем значение текущего игрока
  }

  validWin(); //проводим валидацию выигрыша
};

let validWin = function () {
  for (let i = 0; i <= winningLines.length - 1; i++) {
    //проходим массив линий выигрыша
    let firstIndex = winningLines[i][0]; //индексы ячеек с одинаковым значением в слечае выигрыша
    let secondIndex = winningLines[i][1]; //индексы ячеек с одинаковым значением в слечае выигрыша
    let thirdIndex = winningLines[i][2]; //индексы ячеек с одинаковым значением в слечае выигрыша

    if (
      gameState[firstIndex] === "" ||
      gameState[secondIndex] === "" ||
      gameState[thirdIndex] === ""
    ) {
      //проверяем условие,если какая-то ячейка пустая,продолжаем
      continue;
    }

    if (
      //если 3 ячейки,с выигр. индексами, из массива заполненых ячеек равны между собой
      gameState[firstIndex] === gameState[secondIndex] &&
      gameState[secondIndex] === gameState[thirdIndex]
    ) {
      gameStatus.innerHTML = `Player ${currentUser} has won!`; //выводим сообщение о выигрыше
      gameActive = false; //игра закончена
      return;
    } else {
      // иначе при условии всех заполненных ячеек ничья и игра закончена
      if (!gameState.includes("", 0)) {
        gameStatus.innerHTML = "Game ended in a draw!";
        gameActive = false;
        return;
      }
    }
  }

  handlePlayerChange(); //после проверки,вызываем функцию меняющую игрока
};

cells.forEach((cell) => {
  //добавляем событие заполнения на все ячейки
  cell.addEventListener("click", fillCell);
});

restart.addEventListener("click", function () {
  //очищение всех ячеек при нажатии на кнопку
  cells.forEach((cell) => {
    cell.textContent = "";
  });
  gameActive = true;
  currentUser = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  gameStatus.innerHTML = `It's ${currentUser}'s turn`;
});
