// Drawing Canvas
const tetris = document.getElementById('tetris');
function createCanvas(){
    for(let i = 0; i < 200; i++){
        const square = document.createElement('div');
        square.classList.add('square', `number${200-i}`);
        tetris.appendChild(square);
    }
    for(let j = 0; j < 10; j++){
        const phantomSquare = document.createElement('div'); //Create a div that don't let the blocks to pass the canvas... they all stay inside. Before some pieces were going out of the canvas when we turned them 
        phantomSquare.classList.add('phantom');
        tetris.appendChild(phantomSquare);
    }
}
createCanvas();


// Create squares
const squares = Array.from(document.querySelectorAll('.square'));
let currentPosition = 4;


//CREATING THE SHAPES
//block -> yellow
let o = [[1,1],[1,1]];
//long -> light-blue
let i = [[1,1,1,1],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
//trapez -> purple
let t = [[0,1,0],[1,1,1],[0,0,0]];
// z to right -> red
let zRight = [[1,1,0],[0,1,1],[0,0,0]];
//z to left -> green
let zLeft = [[0,1,1],[1,1,0],[0,0,0]];
//L left -> blue
let lLeft = [[1,0,0],[1,1,1],[0,0,0]];
//L right -> orange
let lRight = [[0,0,1],[1,1,1],[0,0,0]]

//array with all shapes
let shapes = [o, i, t, zRight, zLeft, lLeft, lRight]

//create colors
const colors = ["yellow", "lightblue", "purple", "red", "green", "blue", "orange"];

//getting random shape and color
let currentShape = getShape().shape;
let currentColor = getShape().color;

function getShape(){
    let randomNumber = Math.floor(Math.random()*shapes.length)
    let shape = shapes[randomNumber];
    let color = colors[randomNumber];
    return {shape, color};
}


//MAKING THE SHAPES ON THE CANVAS
// Draw shape on the canvas
function drawShape(shape, color, position) {
    shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value === 1) {
                const index = position + y * 10 + x;
                squares[index].classList.add('occupiedBlock');
                squares[index].style.backgroundColor = color;
            }
        });
    });
}

// Undraw shape from the grid
function undrawShape(shape, position) {
    shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value === 1) {
                const index = position + y * 10 + x;
                squares[index].classList.remove('occupiedBlock');
                squares[index].style.backgroundColor = '';
            }
        });
    });
}


// MAKING THE SHAPES MOVE
// Move shape down automatically - BASIC MOVEMENT
function moveDown() {
    if (isPaused) return;
    undrawShape(currentShape, currentPosition);
    currentPosition += 10;
    if (checkCollision(currentShape, currentPosition)) {
        currentPosition -= 10;
        drawShape(currentShape, currentColor, currentPosition);
        stopBlock();
        return;
    }
    drawShape(currentShape, currentColor, currentPosition);
}

// Move shape left
function moveLeft() {
    if (isPaused) return;
    undrawShape(currentShape, currentPosition);
    currentPosition -= 1;
    if (
        checkCollision(currentShape, currentPosition) ||
        currentShape.some((row, y) => row.some((value, x) => value === 1 && (currentPosition + x) % 10 === 9))
    ) {
        currentPosition += 1;
    }
    drawShape(currentShape, currentColor, currentPosition);
}

// Move shape right
function moveRight() {
    if (isPaused) return;
    undrawShape(currentShape, currentPosition);
    currentPosition += 1;
    if (
        checkCollision(currentShape, currentPosition) ||
        currentShape.some((row, y) => row.some((value, x) => value === 1 && (currentPosition + x) % 10 === 0))
    ) {
        currentPosition -= 1;
    }
    drawShape(currentShape, currentColor, currentPosition);
}

// Move shape down fast
function moveDownFast() {
    if (isPaused) return;
    undrawShape(currentShape, currentPosition);
    currentPosition += 10;
    if (checkCollision(currentShape, currentPosition)) {
        currentPosition -= 10;
        drawShape(currentShape, currentColor, currentPosition);
        stopBlock();
        return;
    }
    drawShape(currentShape, currentColor, currentPosition);
}

// Rotate shape
function rotate() {
    if (isPaused) return;
    const rotatedShape = currentShape[0].map((_, index) => currentShape.map(row => row[index])).reverse();
    undrawShape(currentShape, currentPosition);
    if (!checkCollision(rotatedShape, currentPosition) && !rotatedShape.some((row, y) => row.some((value, x) => value === 1 && (currentPosition + x) % 10 === 0))) {
        currentShape = rotatedShape;
    }
    drawShape(currentShape, currentColor, currentPosition);
}


// CHECK IF THE SHAPES WILL COLLIDE WITH THE WALLS OR OTHER BLOCKS
// Check for collision
function checkCollision(shape, position) {
    return shape.some((row, y) =>
        row.some((value, x) => {
            if (value === 1) {
                const index = position + y * 10 + x;
                return (
                    index >= 200 || 
                    squares[index].classList.contains('occupiedBlock')
                );
            }
            return false;
        })
    );
}


// IF THE SHAPE COLLIDES WITH THE BOTTOM OR ANOTHER BLOCK, STOP IT, CHECK IF WE HAVE A COMPLETE ROW(IF YES, ERASE IT AND MOVE EVERYTHIG DOWN) AND CREAT A NEW SHAPE
function stopBlock() {
    currentShape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value === 1) {
                const index = currentPosition + y * 10 + x;
                squares[index].classList.add('occupiedBlock');
            }
        });
    });
    clearRow();
    getNewShape();
}


//GETTING THE NEXT SHAPE ANS COLOR
// Get and draw a new shape
function getNewShape() {
    ({ shape: currentShape, color: currentColor } = getShape());
    currentPosition = 4;
    if (checkCollision(currentShape, currentPosition)) {
        alert('Game Over');
        clearInterval(gameInterval);
        restartButton.style.display = 'inline';
        return;
    }
    drawShape(currentShape, currentColor, currentPosition);
}


//CLEARING THE ROWS
//creating rows to be checked
let objRow = {};
function creatingRows() { 
    for (let j = 0; j < 20; j++) {
        let arrRows = [];
        for (let i = 1 + (j*10); i < (11 + (j * 10)); i++) {
            const blocks = squares[i];;
            arrRows.push(blocks);
        }
        objRow[j] = arrRows; 
    }
    return objRow; 
}
creatingRows();
// console.log(objRow); // to check if the rows were created correctly

// Clearing the rows when they are full
if (objRow[i].every(block => block.classList.contains('occupiedBlock'))) {
    objRow[i].forEach(block => {
        block.classList.remove('occupiedBlock');
        block.style.backgroundColor = '';
    });
    // Shift all rows above down
    for (let k = i; k > 0; k--) {
        objRow[k].forEach((block, index) => {
            block.classList = objRow[k - 1][index].classList;
            block.style.backgroundColor = objRow[k - 1][index].style.backgroundColor;
        });
    }
    // Clear the top row
    objRow[0].forEach(block => {
        block.classList.remove('occupiedBlock');
        block.style.backgroundColor = '';
    });
}


//MAKE THE BUTTONS WORK
// Buttons
let gameInterval;
let isPaused = false;
const startButton = document.getElementById('start');
const restartButton = document.getElementById('restart');
const pauseButton = document.getElementById('pause');

// Start button
startButton.addEventListener('click', startGame);
function startGame() {
    startButton.style.display = 'none';
    restartButton.style.display = 'none';
    pauseButton.style.display = 'inline';
    getNewShape();
    gameInterval = setInterval(moveDown, 500);
}

// Restart button
restartButton.addEventListener('click', restartGame);
function restartGame() {
    clearInterval(gameInterval);
    squares.forEach(square => {
        square.classList.remove('occupiedBlock', 'phantomSquare');
        square.style.backgroundColor = '';
    });
    objRow = creatingRows();
    isPaused = false;
    startGame();
}

// Pause buton
pauseButton.addEventListener('click', pauseGame);
function pauseGame() {
    if (isPaused) {
        gameInterval = setInterval(moveDown, 500);
        pauseButton.textContent = 'Pause';
    } else {
        clearInterval(gameInterval);
        pauseButton.textContent = 'Resume';
    }
    isPaused = !isPaused;
}



// EXTRA FUNCTION: alert "Oh no! You kid has just picked something from the fridge!" - delete a randown block... set interval to 10 seconds?
