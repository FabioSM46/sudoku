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
  }
  doEventListener() {
    document.addEventListener("keydown", (event) => {
      if (event.code === "Digit1") {
        this.doEvent("1");
      } else if (event.code === "Digit2") {
        this.doEvent("2");
      } else if (event.code === "Digit3") {
        this.doEvent("3");
      } else if (event.code === "Digit4") {
        this.doEvent("4");
      } else if (event.code === "Digit5") {
        this.doEvent("5");
      } else if (event.code === "Digit6") {
        this.doEvent("6");
      } else if (event.code === "Digit7") {
        this.doEvent("7");
      } else if (event.code === "Digit8") {
        this.doEvent("8");
      } else if (event.code === "Digit9") {
        this.doEvent("9");
      } else if (event.code === "ArrowUp") {
        //insert code here
      } else if (event.code === "ArrowDown") {
        //insert code here
      } else if (event.code === "ArrowLeft") {
        //insert code here
      } else if (event.code === "ArrowRight") {
        //insert code here
      }
    });
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
          this.errorCounter = document.getElementById("score");
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
  doGameOver() {
    for (let i = 0; i < this.allTiles.length; i++) {
      if (this.allTiles[i].textContent === "") {
        break;
      } else {
        //console.log("game over");
      }
    }
  }
}

let K = 9;
let H = 1;
let grid = new Grid(K, H);
grid.doFillValues();
