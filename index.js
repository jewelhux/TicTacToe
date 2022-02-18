console.log('Самооценка: 60 из 60. Дополнительный функционал имеется в виде оповещния о том, чей сейчас ход.')

let cellElements = document.querySelectorAll('[data-cell]');
let turn = document.querySelector('.turn');
let winText = document.querySelector('.winText');
let winMessage = document.querySelector('.winning-message');
let restartButton = document.querySelector('.restartButton');
let tableCell = document.querySelectorAll('[data-td]');
let tableNumCell = document.querySelectorAll('[data-tdNum]');

let x_mark = 'x';
let o_mark = 'o';
let winCombo = [  
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let step; // Переменная которая дает понять чей ход
let holdNumber = 0; // Текущий ход
let currentNumber = 0; // Количество ходов для победы

// Работа с LocalStorage
arrWinner = localStorage.getItem('win'); // Достаем из лока-сторейджа прошлое значение, потом переводим егов массив и дальше работаем с ним же
arrWinner = JSON.parse(arrWinner);
if (arrWinner === null) {
  arrWinner = [];
}

//Функция запуска и перезапуска игры
getTableScore()
startGame()
restartButton.addEventListener('click', startGame)

function startGame() {
  step = false;
  cellElements.forEach(element => {
    element.classList.remove(x_mark);
    element.classList.remove(o_mark);
    element.removeEventListener('click', handleClick);
    turn.textContent = 'Ходят Крестики!'
    element.addEventListener('click', handleClick, {once: true}) //once отвечает за то, чтобы в ячйку можно было кликнуть лишь раз
  });
  winMessage.classList.remove('displayshow');
};

//Функция добавления элемента в ячейку
function handleClick(e) {
  let cell = e.target;
  let currentClass;
  
  if (step === true) {
    currentClass = o_mark;
    turn.textContent = 'Ходят Крестики!'
  }

  else {
    currentClass = x_mark;
    turn.textContent = 'Ходят Нолики!'
  }
  
  placeMark(cell, currentClass);
  currentNumber++ 
  //Проверка наличия победителя и ничьей
  if (checkWin(currentClass)) {
    endGame(false);
    turn.textContent = 'Конец игры!';
  }
  else if (isDraw() === true) {
    endGame(true);
    turn.textContent = 'Конец игры!';
  }
  else {
    swapTurns();
    stepNumbers();
  }
}

//Непосредственная отрисовка элемента
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}

//Функция смен ходов между участниками
function swapTurns() {
  step = !step;
}

//Функция подсчета ходов
function stepNumbers() {
  holdNumber++
  if (holdNumber === 9) {
    turn.textContent = 'Конец игры!'
    holdNumber = 0;
  }
}

//Функция определения победителя
function checkWin(currentClass) {
  return winCombo.some(combo => { //Возвращаем победителя если таковой имеется
    return combo.every(index => { //Проверяем наличием одного класса у массива выигрышных элементов среди ячеек
      return cellElements[index].classList.contains(currentClass);
    })
  })
}

//Функция вызова окна окончания игры
function endGame(draw) {
  if (draw === true) {
    winText.textContent = `Ничья!`;
    arrWinner.unshift('Ничья');
  }

  else {
    if (step) {
      winText.textContent = `Нолики победили за ${currentNumber} ходов!`;
      arrWinner.unshift('Победили Нолики');
    }
    else {
      winText.textContent = `Крестики победили за ${currentNumber} ходов!`;
      arrWinner.unshift('Победили Крестики');
    }
  }

  winMessage.classList.add('displayshow');
  currentNumber = 0;
  holdNumber = 0;
  localStorage.setItem('win', JSON.stringify(arrWinner)) //Записываем в локал-сторейдж, метод стрингифай позволяет не строку туда сувать, а массив, вот так вот
  getTableScore()
}

//Функция определения ничьей, проверяем содержит ли каждая ячейка класс Х или О, если да, то вернет true
function isDraw() {
  return [...cellElements].every(cell => { //Тут происходит деструктуризация, она нам нужна для того чтобы сделать нашу коллекцию массивом и в дальнейшем метод every работал
    return cell.classList.contains(x_mark) || cell.classList.contains(o_mark) 
  })
}

//Заполнение таблички

function getTableScore() {
  for (let i = 0; i < tableCell.length;i++) {
    tableCell[i].textContent = arrWinner[i];
  }
}