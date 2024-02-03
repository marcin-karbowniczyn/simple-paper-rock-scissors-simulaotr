let scores;

const elements = {
  player1Result: document.querySelector('.player1-result'),
  player2Result: document.querySelector('.player2-result'),
  player1Points: document.querySelector('.player1-points'),
  player2Points: document.querySelector('.player2-points'),
  points: document.querySelectorAll('.points'),
  counter: document.querySelector('.counter'),
  btnPlay: document.querySelector('.btn-play'),
  btnNew: document.querySelector('.btn-new'),
};


// Function for displaying and hiding HTML elements
const manageElementsDisplay = function (type, ...elements) {
  type === 'hide'
    ? elements.forEach((el) => (el.style.visibility = 'hidden'))
    : elements.forEach((el) => (el.style.visibility = 'visible'));
};

init();

// Random number from 1 to 3
const rng = () => Math.floor(Math.random() * 3) + 1;

const counter = async (seconds = 3) => {
  if (seconds > 10 || seconds < 1)
    throw new Error(`Seconds can't be greater than 10 and less than 1.`);

  manageElementsDisplay('show', elements.counter);

  for (let el = seconds; el > 0; el--) {
    elements.counter.textContent = el;

    await new Promise((res, rej) => {
      setTimeout(() => {
        res();
      }, 1000);
    });
  }

  manageElementsDisplay('hide', elements.counter);
};

// Generate rock, paper or scissors
const gamePlay = async () => {
  // Hide previous result icons
  manageElementsDisplay('hide', elements.player1Result, elements.player2Result);

  // Disable play and new game button until countdown is over.
  elements.btnPlay.disabled = true;
  elements.btnNew.disabled = true;

  // Calculate result for both players
  player1Result = rng();
  player2Result = rng();

  // Display countdown for results
  await counter();

  elements.player1Result.src = `img/icon-result-${player1Result}.png`;
  elements.player2Result.src = `img/icon-result-${player2Result}.png`;

  // Display results in the UI
  manageElementsDisplay('show', elements.player1Result, elements.player2Result);

  // Calculate points for both players
  points(scores, player1Result, player2Result);

  // Display results to the UI
  Array.from(elements.points).forEach((el, i) => (el.textContent = scores[i]));

  // Make play button available again
  elements.btnPlay.disabled = false;
  elements.btnNew.disabled = false;
};

// Calculate points
const points = (scores, result1, result2) => {
  // Result 1 - paper, Result 2 - rock, Result 3 - scissors
  if (
    (result1 === 1 && result2 === 2) ||
    (result1 === 2 && result2 === 3) ||
    (result1 === 3 && result2 === 1)
  ) {
    scores[0] += 1;
  } else if (result1 === result2) {
    return;
  } else {
    scores[1] += 1;
  }
};

// Initialazing application
function init() {
  // Hide results from the UI
  manageElementsDisplay(
    'hide',
    elements.player1Result,
    elements.player2Result,
    elements.counter
  );

  // Set points to 0
  scores = [0, 0];

  // Display points
  Array.from(elements.points).forEach((el) => (el.textContent = 0));
}

// Handling play button
document.querySelector('.btn-play').addEventListener('click', () => {
  gamePlay();
});

// Handling new game button
document.querySelector('.btn-new').addEventListener('click', init);
