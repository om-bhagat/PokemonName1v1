let usedPokemon = [];
let currentPlayer = 1;

let pokemonList = [];

fetch('data/pokedex.json')
  .then(response => response.json())
  .then(data => {
    pokemonList = data.map(name => name.toLowerCase());
  });

function submitPokemon() {
    const input = document.getElementById("pokemonInput");
    const name = input.value.trim().toLowerCase();
    const result = document.getElementById("result");

    if (!name) {
        result.textContent = "Please enter a Pokemon name";
        return;
    }

    if(!pokemonList.includes(name)) {
        result.textContent = `${input.value} is not a Pokemon! Player ${currentPlayer} loses!`;
        return;
    }

    if (usedPokemon.includes(name)) {
        result.textContent = `${input.value} was already used! Player ${currentPlayer} loses!`;
        return;
    }

    usedPokemon.push(name);

    if (currentPlayer === 1) {
        player1Score++;
        document.getElementById("player1-score").textContent = `Player 1: ${player1Score}`;
    }
    else {
        player2Score++;
        document.getElementById("player2-score").textContent = `Player 2: ${player2Score}`;
    }
    document.getElementById("usedList").textContent = "Used: " + usedPokemon.join(", ");
    currentPlayer = currentPlayer == 1 ? 2 : 1;
    document.getElementById("turn").textContent = `Player ${currentPlayer}'s Turn`;
    document.getElementById("pokemonInput").disabled = false;
    document.getElementById("pokemonInput").focus();
    input.value = "";
    result.textContent = "";
    startTimer();
}

let timer;
let timeLeft = 10;

function startTimer() {
  clearInterval(timer); // stop previous timer if running
  timeLeft = 10;

  const timerBar = document.getElementById("timer-bar");
  const timerText = document.getElementById("timer-text");

  timerBar.style.width = "100%";
  timerText.textContent = `Time left: ${timeLeft}`;

  timer = setInterval(() => {
    timeLeft--;
    timerText.textContent = `Time left: ${timeLeft}`;
    
    const percent = (timeLeft / 10) * 100;
    timerBar.style.width = percent + "%";

    if (timeLeft <= 0) {
      clearInterval(timer);
      timerText.textContent = ` Time's up!`;
      document.getElementById("result").textContent = ` Time's up! Player ${currentPlayer} loses!`;
      document.getElementById("pokemonInput").disabled = true;
    }
    if (timeLeft <= 3) {
        timerBar.style.backgroundColor = "red";
    } else if (timeLeft <= 6) {
        timerBar.style.backgroundColor = "orange";
    } else {
        timerBar.style.backgroundColor = "#4caf50";
    }
  }, 1000);
}

let player1Score = 0;
let player2Score = 0;

