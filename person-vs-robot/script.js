let usedPokemon = [];
let pokemonList = [];
let currentPlayer = 1; // 1 = person, 2 = robot

let player1Score = 0;
let player2Score = 0;
let timer;
let timeLeft = 10;

fetch("pokedex.json")
  .then(res => res.json())
  .then(data => {
    pokemonList = data.map(name => name.toLowerCase());
    startTimer();
  });

function submitPokemon() {
  const input = document.getElementById("pokemonInput");
  const name = input.value.trim().toLowerCase();
  const result = document.getElementById("result");

  if (!name) {
    result.textContent = "Please enter a Pokémon name.";
    return;
  }

  if (!pokemonList.includes(name)) {
    result.textContent = `${input.value} is not a valid Pokémon! You lose!`;
    disableInput();
    return;
  }

  if (usedPokemon.includes(name)) {
    result.textContent = `${input.value} was already used! You lose!`;
    disableInput();
    return;
  }

  usedPokemon.push(name);
  player1Score++;
  document.getElementById("player1-score").textContent = `Player: ${player1Score}`;
  document.getElementById("usedList").textContent = "Used: " + usedPokemon.join(", ");

  currentPlayer = 2;
  document.getElementById("turn").textContent = "Robot's turn";
  document.getElementById("pokemonInput").value = "";
  result.textContent = "";
  startTimer();

  setTimeout(robotTurn, 1000);
}

function robotTurn() {
  const available = pokemonList.filter(p => !usedPokemon.includes(p));

  if (available.length === 0) {
    document.getElementById("result").textContent = "No Pokémon left. It's a tie!";
    disableInput();
    return;
  }

  const robotChoice = available[Math.floor(Math.random() * available.length)];

  usedPokemon.push(robotChoice);
  player2Score++;
  document.getElementById("player2-score").textContent = `Robot: ${player2Score}`;
  document.getElementById("usedList").textContent = "Used: " + usedPokemon.join(", ");
  document.getElementById("result").textContent = `🤖 Robot chose: ${capitalize(robotChoice)}`;

  currentPlayer = 1;
  document.getElementById("turn").textContent = "Your Turn";
  startTimer();
}

function disableInput() {
  document.getElementById("pokemonInput").disabled = true;
  document.querySelector("button").disabled = true;
}

function capitalize(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function startTimer() {
  clearInterval(timer);
  timeLeft = 10;

  const timerBar = document.getElementById("timer-bar");
  const timerText = document.getElementById("timer-text");

  if (timerBar) timerBar.style.width = "100%";
  if (timerText) timerText.textContent = `Time left: ${timeLeft}`;

  timer = setInterval(() => {
    timeLeft--;
    if (timerText) timerText.textContent = `Time left: ${timeLeft}`;

    const percent = (timeLeft / 10) * 100;
    if (timerBar) timerBar.style.width = percent + "%";

    if (timerBar) {
      if (timeLeft <= 3) {
        timerBar.style.backgroundColor = "red";
      } else if (timeLeft <= 6) {
        timerBar.style.backgroundColor = "orange";
      } else {
        timerBar.style.backgroundColor = "#4caf50";
      }
    }

    if (timeLeft <= 0) {
      clearInterval(timer);
      if (timerText) timerText.textContent = "Time's up!";
      document.getElementById("result").textContent = `Time's up! Player ${currentPlayer === 1 ? "You" : "Robot"} loses!`;
      disableInput();
    }
  }, 1000);
}
