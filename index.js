class Grid {
  constructor(K, H) {
    this.K = K;
    this.H = H;
    this.container = document.getElementById("container");
    this.tileSelected;
    this.tileSelectedCoordX;
    this.tileSelectedCoordY;
    this.errorCounter;
    this.errors = 0;
    this.allTiles;
    this.controller;
    // Compute square root of N
    const sqr = Math.sqrt(K);
    this.sqrK = Math.floor(sqr);

    // Initialize all entries as false to indicate
    // that there are no edges initially
    this.numArr = Array.from(
      {
        length: K,
      },
      () =>
        Array.from(
          {
            length: K,
          },
          () => 0
        )
    );
    this.doEventListener();
    this.doTimer();
  }
  doEventListener() {
    this.controller = new AbortController();
    document.addEventListener(
      "keydown",
      (event) => {
        switch (event.code) {
          case "Digit1":
            grid.doEvent("1");
            break;
          case "Digit2":
            grid.doEvent("2");
            break;
          case "Digit3":
            grid.doEvent("3");
            break;
          case "Digit4":
            grid.doEvent("4");
            break;
          case "Digit5":
            grid.doEvent("5");
            break;
          case "Digit6":
            grid.doEvent("6");
            break;
          case "Digit7":
            grid.doEvent("7");
            break;
          case "Digit8":
            grid.doEvent("8");
            break;
          case "Digit9":
            grid.doEvent("9");
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

    document.addEventListener("click", (event) => {
      this.allTiles = document.getElementsByClassName("tile");
      for (let i = 0; i < this.allTiles.length; i++) {
        if (event.target.className.includes("tile")) {
          if (this.allTiles[i].style.backgroundColor === "aquamarine") {
            this.allTiles[i].style.backgroundColor = "whitesmoke";
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
        this.tileSelected.style.backgroundColor = "aquamarine";
      }
    });
  }
  doEvent(n) {
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
          this.tileSelected.classList.add("animating");
          //This function runs when the CSS animation is completed
          var animationListener = this.tileSelected.addEventListener(
            "animationend",
            () => {
              this.tileSelected.classList.remove("animating");
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
    this.doGameOver();
  }

  doGrid() {
    for (let i = 0; i < this.K; i++) {
      for (let j = 0; j < this.K; j++) {
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
    for (let j = 0; j < this.K; j++) {
      if (this.numArr[i][j] === num) {
        return false;
      }
    }
    return true;
  }

  // check in the row for existence
  unUsedInCol(j, num) {
    for (let i = 0; i < this.K; i++) {
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
    for (let i = 0; i < this.K; i += this.sqrK) {
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
          num = this.rndGen(this.K);
          if (this.unUsedInBox(row, col, num)) {
            break;
          }
        }
        this.numArr[row + i][col + j] = num;
      }
    }
  }

  // A recursive function to fill remaining
  // matrix
  doFillRemaining(i, j) {
    // Check if we have reached the end of the matrix
    if (i === this.K - 1 && j === this.K) {
      return true;
    }

    // Move to the next row if we have reached the end of the current row
    if (j === this.K) {
      i += 1;
      j = 0;
    }

    // Skip cells that are already filled
    if (this.numArr[i][j] !== 0) {
      return this.doFillRemaining(i, j + 1);
    }

    // Try filling the current cell with a valid value
    for (let num = 1; num <= this.K; num++) {
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

    // Remove Randomly K digits to build the puzzle

    this.doRemoveHDigits();
  }

  // Remove values to create the puzzle
  doRemoveHDigits() {
    let count = this.H;
    while (count !== 0) {
      // extract coordinates i and j
      let i = Math.floor(Math.random() * this.K);
      let j = Math.floor(Math.random() * this.K);
      var tiles = document.querySelector(`.n${i}${j}`);
      if (tiles.textContent !== "") {
        count--;
        tiles.textContent = "";
      }
    }
    return;
  }
  doTimer() {
    const timer = document.getElementById("timer");
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
      timer.textContent = formatMin + ":" + formatSec;
    }, 1000);
  }
  doGameOver() {
    //refactor line 269
    if (
      Array.from(this.allTiles).every((element) => element.textContent !== "")
    ) {
      this.doDisplayGameOver();
    } else {
      return;
    }
  }

  doDisplayGameOver() {
    const gameover = document.createElement("div");
    gameover.setAttribute("id", "gameover-display");
    document.body.appendChild(gameover);
    const gameoverTitle = document.createElement("h2");
    gameoverTitle.setAttribute("id", "gameover-title");
    gameover.appendChild(gameoverTitle);
    gameoverTitle.textContent = "Game Over";
    const replayButton = document.createElement("button");
    replayButton.setAttribute("id", "replay-button");
    gameover.appendChild(replayButton);
    replayButton.textContent = "Replay";
    replayButton.addEventListener("click", (event) => {
      this.doReplayGame();
    });

    clearInterval(this.intervalID);
    //abort event listener so wont keep creating gameover messages
    this.controller.abort();
  }

  doReplayGame() {
    // Reset the game state
    location.reload(); //refactor, avoid using location.reload() to reset the game
    // Hide the gameover display
    const gameoverDisplay = document.getElementById("gameover-display");
    gameoverDisplay.style.display = "none";
  }
}

let K = 9;
let H = 40; //hardness
let grid = new Grid(K, H);
grid.doFillValues();
