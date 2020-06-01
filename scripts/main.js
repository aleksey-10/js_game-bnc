'use strict';

const randomNumber = generateRandomNumber();
let attempts = 10;

document.querySelector('.form').addEventListener('submit', function(e) {
  e.preventDefault();

  const enteredNumber = this.querySelector('input').value;
  const result = bullsAndCows(randomNumber, enteredNumber);

  if (result) {
    attempts--;
  }

  if (attempts < 1 || (result && result.bulls === 4)) {
    setGameOver(result);
  } else {
    fillUpOutput(enteredNumber, result);
  }
});

const outputElement = document.querySelector('.output');

function setGameOver(result) {
  outputElement.querySelector('.output__list').remove('output--active');

  const gameOverElement = outputElement.querySelector('.output__gameover');

  gameOverElement.classList.add('output__gameover--active');

  gameOverElement.innerHTML = result.bulls === 4
    ? 'You won!' : 'You lose!';

  const message = document.createElement('span');

  message.innerHTML = `The number was ${randomNumber}`;
  outputElement.append(message);
}

function fillUpOutput(enteredNumber, result) {
  const enteredNumberElement = document.createElement('div');

  enteredNumberElement.className = 'output__user-number';
  enteredNumberElement.innerHTML = enteredNumber;

  if (!result || (!document.querySelector('.output__entered').children.length && !result)) {
    enteredNumberElement.classList.add('output__user-number--wrong');
  }

  outputElement.querySelector('.output__entered').append(enteredNumberElement);

  outputElement.querySelector('.output__result').innerHTML = result
    ? `Bulls: ${result.bulls}, Cows: ${result.cows}`
    : 'Wrong input!';

  outputElement.querySelector('.output__attempts')
    .innerHTML = attempts;

  outputElement.querySelector('.output__list')
    .classList.add('output__list--active');
}

function getRandom() {
  return Math.floor(Math.random() * 10);
}

function generateRandomNumber() {
  let output = '';

  for (let i = 0; i < 4; i++) {
    let item = getRandom();

    while (output.includes(item) || item === 0) {
      item = getRandom();
    }

    output += item;
  }

  return output;
};

function bullsAndCows(generatedNumber, enteredNumber) {
  const userNumbersSet = enteredNumber ? new Set(enteredNumber.split('')) : '';

  if (userNumbersSet.size !== generatedNumber.length) {
    return;
  }

  const hits = {
    bulls: 0,
    cows: 0,
  };

  for (let i = 0; i < generatedNumber.length; i++) {
    if (enteredNumber[i] === generatedNumber[i]) {
      hits.bulls++;
    } else {
      generatedNumber.includes(enteredNumber[i]) && hits.cows++;
    }
  }

  return hits;
}
