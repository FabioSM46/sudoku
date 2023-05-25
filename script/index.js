class Grid {
  constructor(aspectRatio, difficultyLevel) {
    this.aspectRatio = aspectRatio;
    this.difficultyLevel = difficultyLevel;
    this.container = document.getElementById("container");
    this.tileSelected = null;
    this.previousTile = null;
    this.previousNumButton = null;
    this.tileSelectedCoordX;
    this.tileSelectedCoordY;
    this.numSelected = "";
    this.errorCounter;
    this.errors = 0;
    this.allTiles;
    this.controller;
    this.timer;
    this.gameBoardSolution;
    this.audioPlayer;
    // Compute square root of N
    const sqr = Math.sqrt(aspectRatio);
    this.sqrK = Math.floor(sqr);

    // Initialize all entries as false to indicate
    // that there are no edges initially
    this.numArr = Array.from(
      {
        length: aspectRatio,
      },
      () =>
        Array.from(
          {
            length: aspectRatio,
          },
          () => 0
        )
    );
    this.doEventListener();
    this.doTimer();
  }

  doEventListener() {
    //keydown event listener
    this.controller = new AbortController();
    document.addEventListener(
      "keydown",
      (event) => {
        switch (event.code) {
          case "Digit1":
            this.doEvent("1");
            break;
          case "Digit2":
            this.doEvent("2");
            break;
          case "Digit3":
            this.doEvent("3");
            break;
          case "Digit4":
            this.doEvent("4");
            break;
          case "Digit5":
            this.doEvent("5");
            break;
          case "Digit6":
            this.doEvent("6");
            break;
          case "Digit7":
            this.doEvent("7");
            break;
          case "Digit8":
            this.doEvent("8");
            break;
          case "Digit9":
            this.doEvent("9");
            break;
        }
      },
      { signal: this.controller.signal }
    );
    //click event listener
    document.addEventListener(
      "click",
      (event) => {
        if (event.target.className.includes("tile")) {
          this.tileSelected = event.target;
          if (this.tileSelected !== this.previousTile) {
            this.tileSelected.style.backgroundColor = "rgb(20, 104, 129)";
            if (this.previousTile === null) {
              this.previousTile = this.tileSelected;
            } else {
              this.previousTile.style.backgroundColor = "rgb(248, 239, 197)";
              this.previousTile = this.tileSelected;
            }
          }
        }
        if (event.target.className.includes("tile")) {
          this.tileSelectedCoordX = event.target.className
            .replace(/\D/g, "")
            .slice(0, 1);
          this.tileSelectedCoordY = event.target.className
            .replace(/\D/g, "")
            .slice(1);
        }
        //show solution for a brief time
        if (event.target.id == "show-button") {
          for (let i = 0; i < this.allTiles.length; i++) {
            //if tile is blank call the function to write the number
            if (this.allTiles[i].textContent === "") {
              this.tileSelectedCoordX = this.allTiles[i].className
                .replace(/\D/g, "")
                .slice(0, 1);
              this.tileSelectedCoordY = this.allTiles[i].className
                .replace(/\D/g, "")
                .slice(1);
              //add the fade in/out animation
              this.allTiles[i].classList.add("animating-text");
              this.doShowSolution(
                this.allTiles[i],
                this.tileSelectedCoordX,
                this.tileSelectedCoordY
              );
            }
          }
        }

        //num selector by click
        switch (event.target.id) {
          case "num-1":
            this.numSelected = "1";
            if (
              this.tileSelected !== null &&
              this.tileSelected.textContent === ""
            ) {
              this.doEvent("1");
            }
            this.numSelected = event.target;
            if (this.numSelected !== this.previousNumButton) {
              this.numSelected.style.backgroundColor = "rgb(20, 104, 129)";
              if (this.previousNumButton === null) {
                this.previousNumButton = this.numSelected;
              } else {
                this.previousNumButton.style.backgroundColor =
                  "rgb(248, 239, 197)";
                this.previousNumButton = this.numSelected;
              }
            }
            break;
          case "num-2":
            this.numSelected = "2";
            if (
              this.tileSelected !== null &&
              this.tileSelected.textContent === ""
            ) {
              this.doEvent("2");
            }
            this.numSelected = event.target;
            if (this.numSelected !== this.previousNumButton) {
              this.numSelected.style.backgroundColor = "rgb(20, 104, 129)";
              if (this.previousNumButton === null) {
                this.previousNumButton = this.numSelected;
              } else {
                this.previousNumButton.style.backgroundColor =
                  "rgb(248, 239, 197)";
                this.previousNumButton = this.numSelected;
              }
            }
            break;
          case "num-3":
            this.numSelected = "3";
            if (
              this.tileSelected !== null &&
              this.tileSelected.textContent === ""
            ) {
              this.doEvent("3");
            }
            this.numSelected = event.target;
            if (this.numSelected !== this.previousNumButton) {
              this.numSelected.style.backgroundColor = "rgb(20, 104, 129)";
              if (this.previousNumButton === null) {
                this.previousNumButton = this.numSelected;
              } else {
                this.previousNumButton.style.backgroundColor =
                  "rgb(248, 239, 197)";
                this.previousNumButton = this.numSelected;
              }
            }
            break;
          case "num-4":
            this.numSelected = "4";
            if (
              this.tileSelected !== null &&
              this.tileSelected.textContent === ""
            ) {
              this.doEvent("4");
            }
            this.numSelected = event.target;
            if (this.numSelected !== this.previousNumButton) {
              this.numSelected.style.backgroundColor = "rgb(20, 104, 129)";
              if (this.previousNumButton === null) {
                this.previousNumButton = this.numSelected;
              } else {
                this.previousNumButton.style.backgroundColor =
                  "rgb(248, 239, 197)";
                this.previousNumButton = this.numSelected;
              }
            }
            break;
          case "num-5":
            this.numSelected = "5";
            if (
              this.tileSelected !== null &&
              this.tileSelected.textContent === ""
            ) {
              this.doEvent("5");
            }
            this.numSelected = event.target;
            if (this.numSelected !== this.previousNumButton) {
              this.numSelected.style.backgroundColor = "rgb(20, 104, 129)";
              if (this.previousNumButton === null) {
                this.previousNumButton = this.numSelected;
              } else {
                this.previousNumButton.style.backgroundColor =
                  "rgb(248, 239, 197)";
                this.previousNumButton = this.numSelected;
              }
            }
            break;
          case "num-6":
            this.numSelected = "6";
            if (
              this.tileSelected !== null &&
              this.tileSelected.textContent === ""
            ) {
              this.doEvent("6");
            }
            this.numSelected = event.target;
            if (this.numSelected !== this.previousNumButton) {
              this.numSelected.style.backgroundColor = "rgb(20, 104, 129)";
              if (this.previousNumButton === null) {
                this.previousNumButton = this.numSelected;
              } else {
                this.previousNumButton.style.backgroundColor =
                  "rgb(248, 239, 197)";
                this.previousNumButton = this.numSelected;
              }
            }
            break;
          case "num-7":
            this.numSelected = "7";
            if (
              this.tileSelected !== null &&
              this.tileSelected.textContent === ""
            ) {
              this.doEvent("7");
            }
            this.numSelected = event.target;
            if (this.numSelected !== this.previousNumButton) {
              this.numSelected.style.backgroundColor = "rgb(20, 104, 129)";
              if (this.previousNumButton === null) {
                this.previousNumButton = this.numSelected;
              } else {
                this.previousNumButton.style.backgroundColor =
                  "rgb(248, 239, 197)";
                this.previousNumButton = this.numSelected;
              }
            }
            break;
          case "num-8":
            this.numSelected = "8";
            if (
              this.tileSelected !== null &&
              this.tileSelected.textContent === ""
            ) {
              this.doEvent("8");
            }
            this.numSelected = event.target;
            if (this.numSelected !== this.previousNumButton) {
              this.numSelected.style.backgroundColor = "rgb(20, 104, 129)";
              if (this.previousNumButton === null) {
                this.previousNumButton = this.numSelected;
              } else {
                this.previousNumButton.style.backgroundColor =
                  "rgb(248, 239, 197)";
                this.previousNumButton = this.numSelected;
              }
            }
            break;
          case "num-9":
            this.numSelected = "9";
            if (
              this.tileSelected !== null &&
              this.tileSelected.textContent === ""
            ) {
              this.doEvent("9");
            }
            this.numSelected = event.target;
            if (this.numSelected !== this.previousNumButton) {
              this.numSelected.style.backgroundColor = "rgb(20, 104, 129)";
              if (this.previousNumButton === null) {
                this.previousNumButton = this.numSelected;
              } else {
                this.previousNumButton.style.backgroundColor =
                  "rgb(248, 239, 197)";
                this.previousNumButton = this.numSelected;
              }
            }
            break;
        }

        //restart
        if (event.target.id == "restart-button") {
          location.reload();
        }
      },
      { signal: this.controller.signal }
    );
  }

  doShowSolution(tile, x, y) {
    const tileToReverse = [];
    tileToReverse.push(tile);
    tile.textContent = this.numArr[x][y];
    tile.classList.add("animating-text");
    //set tiles to blank back again in progression
    setTimeout(() => {
      tile.textContent = "";
    }, 3000);
    //remove the animations
    var animationListener = tile.addEventListener("animationend", () => {
      tile.classList.remove("animating-text");
      //this removes the listener after it runs so that it doesn't get re-added every time the button is clicked
      tile.removeEventListener("animationend", animationListener);
    });
  }

  doEvent(n) {
    //what to do when a key is pressed
    if (this.tileSelected.className.includes("tile")) {
      if (this.tileSelected.textContent === "") {
        if (
          this.numArr[this.tileSelectedCoordX][this.tileSelectedCoordY] == n
        ) {
          this.tileSelected.textContent = n;
          //if all tiles are filled then game is over
          if (this.allTiles.every((element) => element.textContent !== "")) {
            this.doDisplayGameOver();
          } else {
            return;
          }
        } else {
          this.errors++;
          this.errorCounter = document.getElementById("err");
          this.errorCounter.textContent = String(this.errors);
          //error tile animation
          this.tileSelected.classList.add("animating-background");
          //This function runs when the CSS animation is completed
          var animationListener = this.tileSelected.addEventListener(
            "animationend",
            () => {
              this.tileSelected.classList.remove("animating-background");
              //this removes the listener after it runs so that it doesn't get re-added every time the button is clicked
              this.tileSelected.removeEventListener(
                "animationend",
                animationListener
              );
            }
          );
        }
      }
    }
  }

  doGrid() {
    //generate the grid
    for (let i = 0; i < this.aspectRatio; i++) {
      for (let j = 0; j < this.aspectRatio; j++) {
        const tile = document.createElement("div");
        tile.className = "tile n" + i + j;
        this.container.appendChild(tile);
        tile.textContent = this.numArr[i][j];
      }
    }
  }

  // Random generator
  rndGen(num) {
    return Math.floor(Math.random() * num + 1);
  }

  // Returns false if given 3 x 3 block contains num.
  unUsedInBox(rowStart, colStart, num) {
    for (let i = 0; i < this.sqrK; i++) {
      for (let j = 0; j < this.sqrK; j++) {
        if (this.numArr[rowStart + i][colStart + j] === num) {
          return false;
        }
      }
    }
    return true;
  }

  // check in the row for existence
  unUsedInRow(i, num) {
    for (let j = 0; j < this.aspectRatio; j++) {
      if (this.numArr[i][j] === num) {
        return false;
      }
    }
    return true;
  }

  // check in the column for existence
  unUsedInCol(j, num) {
    for (let i = 0; i < this.aspectRatio; i++) {
      if (this.numArr[i][j] === num) {
        return false;
      }
    }
    return true;
  }

  // Check if safe to put in cell
  checkIfSafe(i, j, num) {
    return (
      this.unUsedInRow(i, num) &&
      this.unUsedInCol(j, num) &&
      this.unUsedInBox(i - (i % this.sqrK), j - (j % this.sqrK), num)
    );
  }

  // Fill the diagonal sqrK number of sqrK x sqrK matrices
  doFillDiagonal() {
    for (let i = 0; i < this.aspectRatio; i += this.sqrK) {
      // for diagonal box, start coordinates->i==j
      this.doFillBox(i, i);
    }
  }

  // Fill a 3 x 3 matrix.
  doFillBox(row, col) {
    let num = 0;
    for (let i = 0; i < this.sqrK; i++) {
      for (let j = 0; j < this.sqrK; j++) {
        while (true) {
          num = this.rndGen(this.aspectRatio);
          if (this.unUsedInBox(row, col, num)) {
            break;
          }
        }
        this.numArr[row + i][col + j] = num;
      }
    }
  }

  // A recursive function to fill remaining
  doFillRemaining(i, j) {
    // Check if we have reached the end of the matrix
    if (i === this.aspectRatio - 1 && j === this.aspectRatio) {
      return true;
    }

    // Move to the next row if we have reached the end of the current row
    if (j === this.aspectRatio) {
      i += 1;
      j = 0;
    }

    // Skip cells that are already filled
    if (this.numArr[i][j] !== 0) {
      return this.doFillRemaining(i, j + 1);
    }

    // Try filling the current cell with a valid value
    for (let num = 1; num <= this.aspectRatio; num++) {
      if (this.checkIfSafe(i, j, num)) {
        this.numArr[i][j] = num;
        if (this.doFillRemaining(i, j + 1)) {
          return true;
        }
        this.numArr[i][j] = 0;
      }
    }

    // No valid value was found, so backtrack
    return false;
  }

  // Sudoku Generator
  doFillValues() {
    // Fill the diagonal of srqK x srqK matrices
    this.doFillDiagonal();

    // Fill remaining blocks
    this.doFillRemaining(0, this.sqrK);

    //Create the grid
    this.doGrid();

    // Remove Randomly n(difficultyLevel) digits to build the puzzle
    this.doRemoveHDigits();
  }

  // Remove values to create the puzzle
  doRemoveHDigits() {
    let count = this.difficultyLevel;
    while (count !== 0) {
      // extract coordinates i and j
      let i = Math.floor(Math.random() * this.aspectRatio);
      let j = Math.floor(Math.random() * this.aspectRatio);
      var tiles = document.querySelector(`.n${i}${j}`);
      if (tiles.textContent !== "") {
        count--;
        tiles.textContent = "";
      }
    }
    return;
  }
  doTimer() {
    //Timer progression
    this.timer = document.getElementById("timer");
    let sec = 0;
    let min = 0;
    this.intervalID = setInterval(function () {
      sec++;
      if (sec == 60) {
        sec = 0;
        min++;
      }
      let formatSec = sec.toString().padStart(2, "0");
      let formatMin = min.toString().padStart(2, "0");
      this.timer.textContent = formatMin + ":" + formatSec;
    }, 1000);
  }

  doDisplayGameOver() {
    //gameover div
    const gameover = document.createElement("div");
    gameover.setAttribute("id", "gameover-display");
    document.body.appendChild(gameover);
    //gameover h2 title
    const gameoverTitle = document.createElement("h2");
    gameoverTitle.setAttribute("id", "gameover-title");
    gameover.appendChild(gameoverTitle);
    gameoverTitle.textContent = "Game Over";
    //errors
    const errorsMade = document.createElement("h3");
    errorsMade.setAttribute("id", "errors-made");
    gameover.appendChild(errorsMade);
    const errText = document.getElementById("err");
    errorsMade.textContent = `Errors: ${errText.textContent}`;
    //difficulty level
    const difficultyLvl = document.createElement("h3");
    difficultyLvl.setAttribute("id", "difficulty-lvl");
    gameover.appendChild(difficultyLvl);
    difficultyLvl.textContent = difficultyLevelText;
    //finish time
    const finishTime = document.createElement("h3");
    finishTime.setAttribute("id", "finish-time");
    gameover.appendChild(finishTime);
    finishTime.textContent = `Time: ${this.timer.textContent}`;
    //game solution
    this.gameBoardSolution = document.querySelector("#container");
    const boardClone = this.gameBoardSolution.cloneNode(true);
    boardClone.setAttribute("id", "board-clone");
    gameover.appendChild(boardClone);
    //replay button
    const replayButton = document.createElement("button");
    replayButton.setAttribute("id", "replay-button");
    gameover.appendChild(replayButton);
    replayButton.textContent = "Replay";
    replayButton.addEventListener("click", () => {
      this.doReplayGame();
    });
    //clear the interval intervalID
    clearInterval(this.intervalID);
    //abort event listener so wont keep creating gameover messages
    this.controller.abort();
  }

  doReplayGame() {
    // Reset the game state
    location.reload();
    // Hide the gameover display
    const gameoverDisplay = document.getElementById("gameover-display");
    gameoverDisplay.style.display = "none";
  }
}

window.onload = () => {
  //easy button
  const titleIcon = document.getElementById("title-icon");
  const muteButton = document.getElementById("mute-button");
  this.audioPlayer = document.getElementById("music-player");
  audioPlayer.volume = 0.03;
  muteButton.addEventListener("click", () => {
    if (audioPlayer.paused) {
      audioPlayer.play();
      muteButton.style.textDecoration = "line-through";
    } else if (!audioPlayer.paused) {
      audioPlayer.pause();
      muteButton.style.removeProperty("text-decoration");
    }
  });
  const easyButton = document.getElementById("easy-button");
  easyButton.addEventListener("click", () => {
    const start = document.getElementById("start-display");
    titleIcon.src = "images/easy.png";
    titleIcon.alt = "easy-title";
    this.audioPlayer.src = "sounds/easy.mp3";
    start.style.display = "none";
    difficultyLevel = 3;
    difficultyLevelText = "It's...Easy.";
    let grid = new Grid(aspectRatio, difficultyLevel);
    grid.doFillValues();
    grid.allTiles = document.getElementsByClassName("tile");
    grid.allTiles = Array.from(grid.allTiles);
  });
  //medium button
  const mediumButton = document.getElementById("medium-button");
  mediumButton.addEventListener("click", () => {
    const start = document.getElementById("start-display");
    titleIcon.src = "images/medium.png";
    titleIcon.alt = "medium-title";
    this.audioPlayer.src = "sounds/medium.mp3";
    start.style.display = "none";
    difficultyLevel = 48;
    difficultyLevelText = "That was Medium.";
    let grid = new Grid(aspectRatio, difficultyLevel);
    grid.doFillValues();
    grid.allTiles = document.getElementsByClassName("tile");
    grid.allTiles = Array.from(grid.allTiles);
  });
  //hard button
  const hardButton = document.getElementById("hard-button");
  hardButton.addEventListener("click", () => {
    const start = document.getElementById("start-display");
    titleIcon.src = "images/hard.png";
    titleIcon.alt = "hard-title";
    this.audioPlayer.src = "sounds/hard.mp3";
    start.style.display = "none";
    difficultyLevel = 53;
    difficultyLevelText = "This was Hard!";
    let grid = new Grid(aspectRatio, difficultyLevel);
    grid.doFillValues();
    grid.allTiles = document.getElementsByClassName("tile");
    grid.allTiles = Array.from(grid.allTiles);
  });
  //insane button
  const insaneButton = document.getElementById("insane-button");
  insaneButton.addEventListener("click", () => {
    const start = document.getElementById("start-display");
    titleIcon.src = "images/insane.png";
    titleIcon.alt = "insane-title";
    this.audioPlayer.src = "sounds/insane.mp3";
    start.style.display = "none";
    difficultyLevel = 59;
    difficultyLevelText = "That was INSANE!!!";
    let grid = new Grid(aspectRatio, difficultyLevel);
    grid.doFillValues();
    grid.allTiles = document.getElementsByClassName("tile");
    grid.allTiles = Array.from(grid.allTiles);
  });
};

let aspectRatio = 9; //grid dimensions (default 9x9)
let difficultyLevel = 0; //how many tiles to hide
let difficultyLevelText = "";
