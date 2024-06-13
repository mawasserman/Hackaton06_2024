// Drawing Canvas
const tetris = document.getElementById('tetris');
function createCanvas() {
    for (let i = 0; i < 200; i++) {
        const square = document.createElement('div');
        square.classList.add('square', `number${200 - i}`);
        tetris.appendChild(square);
    }
    for (let j = 0; j < 10; j++) {
        const phantomSquare = document.createElement('div');
        phantomSquare.classList.add('phantomSquare');
        tetris.appendChild(phantomSquare);
    }
}
createCanvas();

// Create squares
const squares = Array.from(document.querySelectorAll('.square'));
let currentPosition = 4;

// CREATING THE SHAPES
const o = [[1, 1], [1, 1]]; // block -> yellow
const i = [[1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]; // long -> light-blue
const t = [[0, 1, 0], [1, 1, 1], [0, 0, 0]]; // trapez -> purple
const zRight = [[1, 1, 0], [0, 1, 1], [0, 0, 0]]; // z to right -> red
const zLeft = [[0, 1, 1], [1, 1, 0], [0, 0, 0]]; // z to left -> green
const lLeft = [[1, 0, 0], [1, 1, 1], [0, 0, 0]]; // L left -> blue
const lRight = [[0, 0, 1], [1, 1, 1], [0, 0, 0]]; // L right -> orange

// Array with all shapes
const shapes = [o, i, t, zRight, zLeft, lLeft, lRight];

// Create colors
const colors = ["yellow", "lightblue", "purple", "red", "green", "blue", "orange"];

// Getting random shape and color
function getShape() {
    const randomNumber = Math.floor(Math.random() * shapes.length);
    const shape = shapes[randomNumber];
    const color = colors[randomNumber];
    return { shape, color };
}

let { shape: currentShape, color: currentColor } = getShape();

// MAKING THE SHAPES ON THE CANVAS
// Draw shape on the canvas
function drawShape(shape, color, position) {
    shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value === 1) {
                const index = position + y * 10 + x;
                squares[index].classList.add('newBlock');
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
                squares[index].classList.remove('newBlock');
                squares[index].style.backgroundColor = '';
            }
        });
    });
}

// MAKING THE SHAPES MOVE
let gameInterval;
let isPaused = false;

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

// keyboard controls
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        moveLeft();
    } else if (event.key === 'ArrowRight') {
        moveRight();
    } else if (event.key === 'ArrowDown') {
        moveDownFast();
    } else if (event.key === 'ArrowUp') {
        rotate();
    }
});

// CHECK IF THE SHAPES WILL COLLIDE WITH THE WALLS OR OTHER BLOCKS
// Check for collision
function checkCollision(shape, position) {
    return shape.some((row, y) =>
        row.some((value, x) => {
            if (value === 1) {
                const index = position + y * 10 + x;
                return (
                    index >= 200 || 
                    squares[index].classList.contains('phantomSquare') ||
                    squares[index].classList.contains('newBlock')
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
                squares[index].classList.add('phantomSquare', 'newBlock');
            }
        });
    });
    clearRow();
    getNewShape();
}

// GETTING THE NEXT SHAPE ANS COLOR
// Get and draw a new shape
function getNewShape() {
    ({ shape: currentShape, color: currentColor } = getShape());
    currentPosition = 4;
    if (checkCollision(currentShape, currentPosition)) {
        alert('Game Over! Click on Restart to play again');
        clearInterval(gameInterval);
        restartButton.style.display = 'inline';
        pauseButton.style.display = 'none';
        return;
    }
    drawShape(currentShape, currentColor, currentPosition);
}

// CLEARING THE ROWS
// creating rows to be checked
let objRow = {};
function creatingRows() { 
    for (let j = 0; j < 20; j++) {
        let arrRows = [];
        for (let i = 0 + (j * 10); i < (10 + (j * 10)); i++) {
            const blocks = squares[i];
            arrRows.push(blocks);
        }
        objRow[j] = arrRows; 
    }
    return objRow; 
}
creatingRows();

// Clearing the rows when they are full
function clearRow() {
    for (let i = 0; i < 20; i++) {
        if (objRow[i].every(block => block.classList.contains('newBlock'))) {
            objRow[i].forEach(block => {
                block.classList.remove('newBlock');
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
                block.classList.remove('newBlock');
                block.style.backgroundColor = '';
            });
        }
    }
}

// MAKE THE BUTTONS WORK
// Buttons
const startButton = document.getElementById('start');
const restartButton = document.getElementById('restart');
const pauseButton = document.getElementById('pause');
const backgroundMusic = document.getElementById('background-music');
backgroundMusic.volume = 0.1;

// Start button
startButton.addEventListener('click', startGame);
function startGame() {
    startButton.style.display = 'none';
    restartButton.style.display = 'none';
    pauseButton.style.display = 'inline';
    getNewShape();
    gameInterval = setInterval(moveDown, 500); // Set interval to move down every 500ms
    backgroundMusic.play();
}

// Restart button
restartButton.addEventListener('click', restartGame);
function restartGame() {
    clearInterval(gameInterval);
    squares.forEach(square => {
        square.classList.remove('newBlock', 'phantomSquare');
        square.style.backgroundColor = '';
    });
    objRow = creatingRows();
    isPaused = false;
    startGame();
    backgroundMusic.currentTime = 0; // Restart the music from the beginning
    backgroundMusic.play(); // Play background music
}

// Pause button
pauseButton.addEventListener('click', pauseGame);
function pauseGame() {
    if (isPaused) {
        gameInterval = setInterval(moveDown, 500);
        backgroundMusic.play(); // Resume music
        pauseButton.textContent = 'Pause';
    } else {
        clearInterval(gameInterval);
        backgroundMusic.pause(); // Pause music
        pauseButton.textContent = 'Resume';
    }
    isPaused = !isPaused;
}

