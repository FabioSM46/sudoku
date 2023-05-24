class Grid {
  constructor(aspectRatio, difficultyLevel) {
    this.aspectRatio = aspectRatio;
    this.difficultyLevel = difficultyLevel;
    this.container = document.getElementById("container");
    this.tileSelected;
    this.tileSelectedCoordX;
    this.tileSelectedCoordY;
    this.errorCounter = 0;
    this.errors = 0;
    this.allTiles;
    this.controller;
    this.timer;
    this.gameBoardSolution;
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
          case "ArrowUp":
            // insert code here
            break;
          case "ArrowDown":
            // insert code here
            break;
          case "ArrowLeft":
            // insert code here
            break;
          case "ArrowRight":
            // insert code here
            break;
        }
      },
      { signal: this.controller.signal }
    );
    //click event listener
    document.addEventListener(
      "click",
      (event) => {
        this.allTiles = document.getElementsByClassName("tile");
        this.allTiles = Array.from(this.allTiles);
        for (let i = 0; i < this.allTiles.length; i++) {
          if (event.target.className.includes("tile")) {
            if (
              getComputedStyle(this.allTiles[i]).backgroundColor ===
              "rgb(20, 104, 129)"
            ) {
              this.allTiles[i].style.backgroundColor = "#f8efc5";
            }
          }
        }
        if (event.target.className.includes("tile")) {
          this.tileSelected = event.target;
          this.tileSelectedCoordX = this.tileSelected.className
            .replace(/\D/g, "")
            .slice(0, 1);
          this.tileSelectedCoordY = this.tileSelected.className
            .replace(/\D/g, "")
            .slice(1);
          this.tileSelected.style.backgroundColor = "rgb(20, 104, 129)";
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
        } else {
          this.errors++;
          this.errorCounter = document.getElementById("err");
          this.errorCounter.textContent = this.errors;
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
    this.doGameOver(); //check if the game is over
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
  doGameOver() {
    //if all tiles are filled then game is over
    if (this.allTiles.every((element) => element.textContent !== "")) {
      this.doDisplayGameOver();
    } else {
      return;
    }
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
    //errors made
    const errorsMade = document.createElement("h3");
    errorsMade.setAttribute("id", "errors-made");
    gameover.appendChild(errorsMade);
    errorsMade.textContent = `Errors: ${this.errorCounter.textContent}`;
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
  //start menu div
  const start = document.createElement("div");
  start.setAttribute("id", "start-display");
  document.body.appendChild(start);
  //start h2 title
  const startTitle = document.createElement("h2");
  startTitle.setAttribute("id", "start-title");
  start.appendChild(startTitle);
  startTitle.textContent = "Start Sudoku";
  //set 4 different levels of difficulty
  const infoText = document.createElement("h3");
  infoText.setAttribute("id", "info-text");
  start.appendChild(infoText);
  infoText.textContent = "Select difficulty";

  //easy difficulty button
  const easyButton = document.createElement("button");
  easyButton.setAttribute("id", "easy-button");
  start.appendChild(easyButton);
  easyButton.textContent = "EASY";
  easyButton.addEventListener("click", () => {
    const start = document.getElementById("start-display");
    start.style.display = "none";
    difficultyLevel = 40;
    let grid = new Grid(aspectRatio, difficultyLevel);
    grid.doFillValues();
  });
  //medium difficulty button
  const mediumButton = document.createElement("button");
  mediumButton.setAttribute("id", "medium-button");
  start.appendChild(mediumButton);
  mediumButton.textContent = "MEDIUM";
  mediumButton.addEventListener("click", () => {
    const start = document.getElementById("start-display");
    start.style.display = "none";
    difficultyLevel = 48;
    let grid = new Grid(aspectRatio, difficultyLevel);
    grid.doFillValues();
  });
  //hard difficulty button
  const hardButton = document.createElement("button");
  hardButton.setAttribute("id", "hard-button");
  start.appendChild(hardButton);
  hardButton.textContent = "HARD";
  hardButton.addEventListener("click", () => {
    const start = document.getElementById("start-display");
    start.style.display = "none";
    difficultyLevel = 53;
    let grid = new Grid(aspectRatio, difficultyLevel);
    grid.doFillValues();
  });
  //insane difficulty button
  const insaneButton = document.createElement("button");
  insaneButton.setAttribute("id", "insane-button");
  start.appendChild(insaneButton);
  insaneButton.textContent = "INSANE";
  insaneButton.addEventListener("click", () => {
    const start = document.getElementById("start-display");
    start.style.display = "none";
    difficultyLevel = 59;
    let grid = new Grid(aspectRatio, difficultyLevel);
    grid.doFillValues();
  });
};

let aspectRatio = 9; //grid dimensions (default 9x9)
let difficultyLevel = 0; //how many tiles to hide
