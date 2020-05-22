'use strict';

const randomNumber = generateRandomNumber();
let attempts = 5;

console.log(randomNumber);

document.querySelector('.form').onsubmit = function() {
  const enteredNumber = this.querySelector('input').value;
  const result = bullsAndCows(randomNumber, enteredNumber);

  attempts--;

  if (attempts < 1 || (result && result.bulls === 4)) {
    return gameOver(result);
  }

  fillUpOutput(enteredNumber, result);

  return false;
};

function gameOver(result) {
  outputElement.querySelector('.output__list').remove('output--active');

  const gameOverElement = outputElement.querySelector('.output__gameover');

  gameOverElement.classList.add('output__gameover--active');

  gameOverElement.innerHTML = (result && result.bulls === 4)
    ? 'You won!' : 'You lose!';

  const message = document.createElement('span');

  message.innerHTML = `The number was ${randomNumber}`;
  outputElement.append(message);
}

const outputElement = document.querySelector('.output');

function fillUpOutput(enteredNumber, result) {
  outputElement.querySelector('.output__entered').innerHTML = enteredNumber;

  outputElement.querySelector('.output__result').innerHTML
    = result ? `Bulls: ${result.bulls}, Cows: ${result.cows}` : 'Wrong input!';

  outputElement.querySelector('.output__attempts')
    .innerHTML = attempts;

  outputElement.querySelector('.output__list')
    .classList.add('output__list--active');
}

function generateRandomNumber() {
  let output = '';
  const getRandom = () => Math.floor(Math.random() * 10);

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
  const set = enteredNumber ? new Set(enteredNumber.split('')) : '';

  if (Array.from(set).length !== generatedNumber.length) {
    return;
  }

  const output = {
    bulls: 0,
    cows: 0,
  };

  for (let i = 0; i < generatedNumber.length; i++) {
    if (enteredNumber[i] === generatedNumber[i]) {
      output.bulls++;
      continue;
    }

    generatedNumber.includes(enteredNumber[i]) && output.cows++;
  }

  return output;
}
