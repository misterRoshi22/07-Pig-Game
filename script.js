'use strict';

//Selecting Elements
const playerOne = document.querySelector('.player--0');
const playerTwo = document.querySelector('.player--1');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const playerOneScore = document.querySelector('#score--0'); //hash 3shan a3ml select bta3t el id
const playerTwoScore = document.querySelector('#score--1');
const diceElement = document.querySelector('.dice');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

//initializing Game
playerOneScore.textContent = 0;
playerTwoScore.textContent = 0;
diceElement.classList.add('hidden');

//Function for Switching Control
const switchPlayer = function () {
  currentScore = 0;
  document.querySelector('#current--' + activePlayer).textContent = 0; //Reset Current Score
  playerOne.classList.toggle('player--active');
  playerTwo.classList.toggle('player--active');
  activePlayer = Number(!activePlayer);
};

//Function to hide Buttons
const stopPlaying = function () {
  btnHold.classList.add('hidden');
  btnRoll.classList.add('hidden');
  diceElement.classList.add('hidden');
};

//Rolling Dice Functionality
const diceRoll = function () {
  let rollNum = Math.trunc(Math.random() * 6) + 1;
  diceElement.classList.remove('hidden');
  diceElement.src = 'dice-' + rollNum + '.png';

  if (rollNum - 1) {
    currentScore += rollNum;
    document.querySelector('#current--' + activePlayer).textContent = currentScore;
  } else {
    switchPlayer();
  }
};
btnRoll.addEventListener('click', diceRoll);

const holdScore = function () {
  const scoreToAdd = `#score--${activePlayer}`;

  scores[activePlayer] += currentScore;
  document.querySelector(scoreToAdd).textContent = scores[activePlayer];

  if (scores[activePlayer] >= 10) {
    const winner = document.querySelector(`.player--${activePlayer}`);
    winner.classList.remove('.player--active');
    winner.classList.add('player--winner');
    stopPlaying();
  } else {
    switchPlayer();
  }
};
btnHold.addEventListener('click', holdScore);

const StartNewGame = function () {
  scores[0] = 0;
  scores[1] = 0;
  currentScore = 0;
  activePlayer = 0;

  playerOneScore.textContent = 0;
  playerTwoScore.textContent = 0;
  diceElement.classList.add('hidden');

  btnHold.classList.remove('hidden');
  btnRoll.classList.remove('hidden');

  if (playerTwo.classList.contains('player--active')) switchPlayer();

  playerOne.classList.remove('player--winner');
  playerTwo.classList.remove('player--winner');
};
btnNew.addEventListener('click', StartNewGame);
