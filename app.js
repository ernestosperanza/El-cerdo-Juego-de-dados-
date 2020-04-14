//Definir las variables
var scores, roundScore, activePlayer, gamePlaying, lastDice, winninScore;

iniciate();

document.querySelector('.btn-roll').addEventListener('click', function() {
  if (gamePlaying) {
    // Número aleatorio
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;

    // Mostrar el resultado
    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';
    document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
    document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

    // Actualizar el puntaje si el número no fue 1
    if (dice1 !== 1 && dice2 !== 1) {
      roundScore += dice1 + dice2;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      nextPlayer();
    };
  };
});

document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gamePlaying) {
    // Agregar el puntaje actual al puntaje global
    scores[activePlayer] += roundScore;
    // Actualizar UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    var input = document.querySelector('.final-score').value;
    if (input) {
      winninScore = input;
    } else {
      winninScore = 100;
    }
    
    // Chekear si el jugador gano la partida
    if (scores[activePlayer] >= winninScore) {
      document.querySelector('#name-' + activePlayer).textContent = 'Ganador!';
      document.getElementById('dice-1').style.display = 'none';
      document.getElementById('dice-2').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;

    } else {
      nextPlayer();
    }
  }
});

document.querySelector('.btn-new').addEventListener('click', iniciate);


function iniciate() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  // Set up del juego
  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';
  document.getElementById('score-0').textContent = 0;
  document.getElementById('score-1').textContent = 0;
  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;
  document.getElementById('name-0').textContent = 'Jugador 1';
  document.getElementById('name-1').textContent = 'Jugador 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');

};

function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  lastDice = 0;
  roundScore = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

};
