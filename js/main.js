// переменные
let rounds = 3;
let score = 0;
let isGameActive = false;

// обращение к элементам
const startButton = document.getElementById('start-button');
const cells = document.querySelectorAll('.cell');
const scoreDisplay = document.getElementById('score');
const roundsDisplay = document.getElementById('rounds');
const messageDisplay = document.getElementById('message');

const getRandomInt = (min, max) => {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

// отображение хомяка
const showHamster = () => {
  hideHamster();
  const randomIndex = getRandomInt(0, cells.length);
  cells[randomIndex].textContent = '🐹';
};

// скрытие хомяка
const hideHamster = () => {
  cells.forEach((cell) => {
    cell.textContent = '';
  });
};

const startGame = () => {
  isGameActive = true;
  startButton.disabled = true;
  messageDisplay.textContent = '';
  showHamster();
};

const endGame = (win) => {
  isGameActive = false;
  if (win) {
    alert('Вы выиграли! 🎉');
    messageDisplay.textContent = 'Вы выиграли! Нажмите кнопку "Старт", чтобы играть еще раз';
  } else {
    alert('Вы проиграли! 😢');
    messageDisplay.textContent = 'Вы проиграли! Нажмите кнопку "Старт", чтобы играть еще раз';
  }
  hideHamster();
  resetDisplays();
  startButton.disabled = false;
};

const handleCellClick = (cell) => {
  if (cell.textContent === '🐹') {
    // увеличить счет
    score++;
    // уменьшить раунды
    rounds--;
    // отобразить изменения
    // показать хомяка еще раз
    if (rounds > 0) {
      updateDisplays();
      showHamster();
    } else {
      endGame(true);
    }
  } else {
    endGame(false);
  }
}

const updateDisplays = () => {
  scoreDisplay.textContent = `Счёт: ${score}`;
  roundsDisplay.textContent = `Осталось раундов: ${rounds}`;
}

const resetDisplays = () => {
  score = 0;
  rounds = 3;
  updateDisplays();
}

// addEventListener
cells.forEach((cell) => {
  cell.addEventListener('click', () => {
    if (isGameActive) {
      handleCellClick(cell)
    }
  });
});

startButton.addEventListener('click', startGame);