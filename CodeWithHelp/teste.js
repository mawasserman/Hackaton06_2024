const tetris = document.getElementById('tetris');
const startButton = document.getElementById('start');
const restartButton = document.getElementById('restart');
const pauseButton = document.getElementById('pause');

// Create the game canvas
function createCanvas() {
    for (let i = 0; i < 200; i++) {
        const square = document.createElement('div');
        square.classList.add('square', `number${200 - i}`);
        tetris.appendChild(square);
    }
    for (let j = 0; j < 10; j++) {
        const phantomSquare = document.createElement('div');
        phantomSquare.classList.add('phantom');
        tetris.appendChild(phantomSquare);
    }
}
createCanvas();

const squares = Array.from(document.querySelectorAll('.square'));
let currentPosition = 4;
let currentShape, currentColor;
let gameInterval;
let isPaused = false;

// Shapes and colors
const shapes = [
    [[1, 1], [1, 1]], // O shape
    [[1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]], // I shape
    [[0, 1, 0], [1, 1, 1], [0, 0, 0]], // T shape
    [[1, 1, 0], [0, 1, 1], [0, 0, 0]], // Z right shape
    [[0, 1, 1], [1, 1, 0], [0, 0, 0]], // Z left shape
    [[1, 0, 0], [1, 1, 1], [0, 0, 0]], // L left shape
    [[0, 0, 1], [1, 1, 1], [0, 0, 0]] // L right shape
];
const colors = ["yellow", "lightblue", "purple", "red", "green", "blue", "orange"];

// Function to get a random shape and color
function getShape() {
    const randomIndex = Math.floor(Math.random() * shapes.length);
    return { shape: shapes[randomIndex], color: colors[randomIndex] };
}

// Draw shape on the grid
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

// Check for collision
function checkCollision(shape, position) {
    return shape.some((row, y) =>
        row.some((value, x) => {
            if (value === 1) {
                const index = position + y * 10 + x;
                return (
                    index >= 200 || 
                    squares[index].classList.contains('phantomSquare')
                );
            }
            return false;
        })
    );
}

// Move shape down
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

// Stop block and spawn new one
function stopBlock() {
    currentShape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value === 1) {
                const index = currentPosition + y * 10 + x;
                squares[index].classList.add('phantomSquare');
            }
        });
    });
    getNewShape();
}

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

// Create rows object
let objRow = {};
function creatingRows() {
    for (let j = 0; j < 20; j++) {
        let arrRows = [];
        for (let i = 1 + (j * 10); i < 11 + (j * 10); i++) {
            const blocks = document.querySelector(`.number${i}`);
            arrRows.push(blocks);
        }
        objRow[j] = arrRows;
    }
    return objRow;
}
creatingRows();

// Event listeners
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

// Start the game
startButton.addEventListener('click', startGame);

// Restart the game
restartButton.addEventListener('click', restartGame);

// Pause the game
pauseButton.addEventListener('click', pauseGame);

function startGame() {
    startButton.style.display = 'none';
    restartButton.style.display = 'none';
    pauseButton.style.display = 'inline';
    getNewShape();
    gameInterval = setInterval(moveDown, 500);
}

function restartGame() {
    clearInterval(gameInterval);
    squares.forEach(square => {
        square.classList.remove('newBlock', 'phantomSquare');
        square.style.backgroundColor = '';
    });
    objRow = creatingRows();
    isPaused = false;
    startGame();
}

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
