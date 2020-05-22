'use strict';

const randomNumber = generateRandomNumber();
let attempts = 5;

console.log(randomNumber);

document.querySelector('.form').onsubmit = function (e) {
  const enteredNumber = this.querySelector('input').value;
  const result = bullsAndCows(randomNumber, enteredNumber);

  attempts--;

  (attempts < 1 || result.bulls === 4) ? gameOver(true) : fillUpOutput(enteredNumber, result);

  return false;
};

function gameOver(isWinner) {
  outputElement.querySelector('.output__list').remove('output--active');
  
  const gameOverElement = outputElement.querySelector('.output__gameover');
  
  gameOverElement.classList.add('output__gameover--active');

  gameOverElement.innerHTML = isWinner ? 'You won!' : 'You lose!'; 
}

const outputElement = document.querySelector('.output');

function fillUpOutput(enteredNumber, result) {
  outputElement.querySelector('.output__entered').innerHTML = enteredNumber;

  outputElement.querySelector('.output__result').innerHTML
    = result ? `Bulls: ${result.bulls}, Cows: ${result.cows}` : 'Wrong input!';

  outputElement.querySelector('.output__attempts').innerHTML
    = attempts

  outputElement.querySelector('.output__list').classList.add('output__list--active');
}

function generateRandomNumber() {
  let output = '';
  const getRandom = () => Math.floor(Math.random() * 10);

  for (let i = 0; i < 4; i++) {
    let item = getRandom();

    while (output.includes(item)) {
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
