let playerScore = 0;
let computerScore = 0;
let roundWinner = "";

const scoreInfo = document.getElementById("scoreInfo");
const scoreMessage = document.getElementById("scoreMessage");
const playerSign = document.getElementById("playerSign");
const computerSign = document.getElementById("computerSign");
const playerScorePara = document.getElementById("playerScore");
const computerScorePara = document.getElementById("computerScore");
const rockBtn = document.getElementById("rockBtn");
const paperBtn = document.getElementById("paperBtn");
const scissorsBtn = document.getElementById("scissorsBtn");
const overlay = document.getElementById('overlay');
const restartBtn = document.getElementById('restartBtn');
const endgameModal = document.getElementById('endgameModal');
const endgameMsg = document.getElementById('endgameMsg');

function isGameOver(){
    return playerScore === 5 || computerScore === 5;
}

function getRandomChoice(){
    const props = ["ROCK","PAPER","SCISSORS"];
    const rand = Math.floor(Math.random() * 3);
    return props[rand];
}

function getFinalMessage(){
    return playerScore > computerScore ? endgameMsg.textContent = "You Won!" : endgameMsg.textContent = "You lost...";
}

function capitalizeFirstLetter(str){
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function updateScoreMessage(roundWinner,playerSelection,computerSelection){
    if(roundWinner === "tie"){
        scoreInfo.textContent = "It's a tie!";
        scoreMessage.textContent = `${capitalizeFirstLetter(playerSelection)} ties with ${computerSelection.toLowerCase()}`;
    }
    else if(roundWinner === "player"){
        scoreInfo.textContent = "You won!";
        scoreMessage.textContent = `${capitalizeFirstLetter(playerSelection)} beats ${computerSelection.toLowerCase()}`;
    }
    else{
        scoreInfo.textContent = "You lost!";
        scoreMessage.textContent = `${capitalizeFirstLetter(playerSelection)} is beaten by ${computerSelection.toLowerCase()}`;
    }
}

function updateScore(playerSelection,computerSelection){
    switch(playerSelection){
        case "ROCK":{
            playerSign.textContent = "✊";
            break;
        }
        case "PAPER":{
            playerSign.textContent = "✋";
            break;
        }
        case "SCISSORS":{
            playerSign.textContent = "✌";
            break;
        }
    }
    switch(computerSelection){
        case "ROCK":{
            computerSign.textContent = "✊";
            break;
        }
        case "PAPER":{
            computerSign.textContent = "✋";
            break;
        }
        case "SCISSORS":{
            computerSign.textContent = "✌";
            break;
        }
    }
    playerScorePara.textContent = `Player: ${playerScore}`;
    computerScorePara.textContent = `Computer: ${computerScore}`
}

function playRound(roundWinner,playerSelection,computerSelection){
    const lookUp = {
        ROCK:"SCISSORS",
        PAPER:"ROCK",
        SCISSORS:"PAPER"
    }
    if(computerSelection === playerSelection) roundWinner = "tie";
    else if(lookUp[playerSelection] === computerSelection){
        roundWinner = 'player';
        playerScore++;
    }
    else{
        roundWinner = 'computer';
        computerScore++;
    }
    updateScoreMessage(roundWinner,playerSelection,computerSelection);
}

function openModal(){
    endgameModal.classList.add("active");
    overlay.classList.add("active");
}

function closeModal(){
    endgameModal.classList.remove('active');
    overlay.classList.remove('active');
}

function handleClick(playerSelection){
    if(isGameOver()){
        getFinalMessage();
        openModal();
        return;
    }
    let computerSelection = getRandomChoice();
    playRound(roundWinner,playerSelection,computerSelection);
    updateScore(playerSelection,computerSelection);
    if(isGameOver()){
        getFinalMessage();
        openModal();
        return;
    }
}

function restartGame(){
    playerScore = 0;
    computerScore = 0;
    playerScorePara.textContent = "Player: 0";
    computerScorePara.textContent = "Computer: 0";
    scoreInfo.textContent = "Choose your weapon";
    scoreMessage.textContent = "First to score 5 points wins the game";
    overlay.classList.remove('active');
    endgameModal.classList.remove('active');
    playerSign.textContent = "❔";
    computerSign.textContent = "❔";
}

rockBtn.addEventListener('click',() => handleClick("ROCK"));
paperBtn.addEventListener('click',() => handleClick("PAPER"));
scissorsBtn.addEventListener('click',() => handleClick("SCISSORS"));
restartBtn.addEventListener('click',() => restartGame());
overlay.addEventListener('click',()=>closeModal());