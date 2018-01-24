document.getElementById("console").style.display = 'none';
document.getElementById("display").style.display = 'none';
document.getElementById("restart").style.display = 'none';

let gridTiles = document.querySelectorAll(".tile");
let result = "";

const gameboardFactory = () => {
  let gameboardArray = [" "," "," "," "," "," "," "," "," "];

  let changeArray = (index) => gameboardArray[index] = currentPlayer.symbol;

  return {gameboardArray, changeArray};
};

let gameboard = gameboardFactory();

const PlayerFactory = (name,symbol) => {
  return {name,symbol};
}

const StartGame = () => {
  const renderGameboard = () => {
    for (i=0 ; i<gridTiles.length ; i++) {
      gridTiles[i].innerHTML = gameboard.gameboardArray[i];
    }
  }
  renderGameboard();
};

const checkGameOver = (gameArray) => {
  let winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const isThreeX = (currentValue) => {
    return currentValue === "X";
  }
  const isThreeO = (currentValue) => {
    return currentValue === "O";
  }
  const isTie = (currentValue) => {
    return currentValue != " ";
  }

  for (i = 0 ; i < winConditions.length ; i++) {
    let currentCheck = [];
    let currentWinCondition = winConditions[i];
    currentCheck.push(gameArray[currentWinCondition[0]],gameArray[currentWinCondition[1]],gameArray[currentWinCondition[2]]);
    console.log(currentCheck);
    console.log(currentCheck.every(isThreeX));
    if (currentCheck.every(isThreeX)){
      result = "X Win";
      break;
    }
    if (currentCheck.every(isThreeO)){
      result = "O Win";
      break;
    }
    if (gameArray.every(isTie)){
      result = "Tie";
      break;
    }
  }
}

let playerArr = [];
let currentPlayer = undefined;

document.getElementById("submit").addEventListener("click", function(e){
  e.preventDefault();
  document.getElementById("console").style.display = 'flex';
  document.getElementById("addPlayer").style.display = 'none';
  document.getElementById("restart").style.display = 'flex';


  const addPlayer = (() => {
    let playerArrInner = [];
    let player1 = PlayerFactory(document.querySelector("#player1").value,"X");
    if (player1.name === ""){
      player1.name = "Player 1";
    };
    let player2 = PlayerFactory(document.querySelector("#player2").value,"O");
    if (player2.name === ""){
      player2.name = "Player 2";
    };
    playerArrInner.push(player1);
    playerArrInner.push(player2);
    playerArr = playerArrInner;
    currentPlayer = playerArr[0];
  })();
  document.getElementById("display").style.display = "flex";
  document.getElementById("display").innerHTML = `It is ${currentPlayer.name}'s turn.`;
  StartGame();
});

Array.from(gridTiles).forEach(tile => {
    tile.addEventListener('click', function() {
      if(this.innerHTML === " ") {
          gameboard.changeArray(this.id);
          checkGameOver(gameboard.gameboardArray);
          this.innerHTML = currentPlayer.symbol;
          if (result === ""){
            if (currentPlayer === playerArr[0]) {
              currentPlayer = playerArr[1];
            }
            else {
              currentPlayer = playerArr[0];
            }
          document.getElementById("display").innerHTML = `It is ${currentPlayer.name}'s turn.`;
          }
          else{
            stopGame();
            //Congratulate player and restart game
          }
      }
    });
});

document.getElementById("restart").addEventListener("click", function(){
  result = "";
  document.getElementById("console").style.display = 'none';
  document.getElementById("display").style.display = 'none';
  document.getElementById("addPlayer").style.display = 'block';
  gameboard = gameboardFactory();
  document.getElementById("restart").style.display = "none";
  Array.from(gridTiles).forEach(tile => {
    tile.disabled = false;
  });
});

const stopGame = () => {
  Array.from(gridTiles).forEach(tile => {
    tile.disabled = true;
  });
  if (result === "X Win" || result === "O Win"){
    document.getElementById("display").innerHTML = `${currentPlayer.name} is the winner!`;
  }
  if (result === "Tie"){
    document.getElementById("display").innerHTML = `The game is a tie!`;
  }
};
