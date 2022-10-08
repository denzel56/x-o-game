'use strict'

//1. Получаем ячейки и вешаем обработчик события "клик"
//2. По клику записываем в ячейку "х", увеличиваем счетчик ходов и удаляем слушатель события
//3. Сохраняем предыдущее значение "х" или "о"
//4. По клику записываем в ячейку "о", увеличиваем счетчик ходов
//5. После 5 хода проверяем кто выиграл, если победителя нет продолжаем

// Есть понимание, откуда начать и как должно работать. Не сразу сообразил, как проверить результат. Посмотрев следущее задание, сталло понятнее. Основную сложность вызвала фунция, которая сама делает ход за компьютер.


const allCells = document.querySelectorAll('.cell');
const restartButton = document.querySelector('.game--restart');
const gameStatus = document.querySelector('.game--status');

let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';

const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const handlePlayerChange = () => {
  currentPlayer === 'X' ? currentPlayer = 'O' : currentPlayer = 'X';
  gameStatus.textContent = `It's ${currentPlayer}'s turn`;
}

const checkWinner = () => {

  for (let i = 0; i < winningLines.length; i++) {
    let result = [];

    winningLines[i].forEach(item => result.push(gameState[item]));

    if (gameState.every(item => item !== '') && result.every(item => item !== currentPlayer)) {

      gameActive = false;
      gameStatus.textContent = 'Game ended in a draw!';

      return;

    } else if (result.every(item => item === currentPlayer)) {
      gameActive = false;
      gameStatus.textContent = `Player ${currentPlayer} has won!`;

      return;
    }
  }

  handlePlayerChange();
}


function cellClick(e) {
  let cellNum = e.target.dataset.cellIndex;

  if (gameActive === false || gameState[cellNum] !== '') {
    return;
  } else {
    gameState[cellNum] = currentPlayer;
    e.target.innerHTML = currentPlayer;

    checkWinner();
  }
}


allCells.forEach(item => {
  item.addEventListener('click', cellClick);
})

restartButton.addEventListener('click', (e) => {
  console.log('restart');

  currentPlayer = 'X';
  gameActive = true;

  gameStatus.textContent = `It's ${currentPlayer}'s turn`;

  allCells.forEach(item => {
    item.innerHTML = "";
  })

  for (let i = 0; i < gameState.length; i++) {
    gameState[i] = '';
  }
})
