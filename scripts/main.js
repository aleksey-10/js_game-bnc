'use strict';

const outputElement = document.querySelector('.output');

document.querySelector('.form').onsubmit = function(e) {
  const randomNumber = generateRandomNumber();
  const enteredNumber = this.querySelector('input').value;
  const result = bullsAndCows(randomNumber, enteredNumber);

  outputElement.querySelector('.output__generated').innerHTML = randomNumber;
  outputElement.querySelector('.output__entered').innerHTML = enteredNumber;

  outputElement.querySelector('.output__result').innerHTML
    = result ? `Bulls: ${result.bulls}, Cows: ${result.cows}` : 'Wrong input!';

  outputElement.classList.add('output--active');

  return false;
};

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
