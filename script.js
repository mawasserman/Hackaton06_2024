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
// let currentShape, currentColor =  // they will always be the same value, so the same shape will always have the same color
let gameInterval;
let isPaused = false;


//create shapes
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
function getShape(){
    let randomNumber = Math.floor(Math.random()*shapes.length)
    let shape = shapes[randomNumber];
    let color = colors[randomNumber];
    return {shape, color};
}

// Draw shape on the grid
// // Draw shape on the grid
// function drawShape(shape, color, position) {
//     shape.forEach((row, y) => {
//         row.forEach((value, x) => {
//             if (value === 1) {
//                 const index = position + y * 10 + x;
//                 squares[index].classList.add('newBlock');
//                 squares[index].style.backgroundColor = color;
//             }
//         });
//     });
// }

// Undraw shape from the grid

// // Undraw shape from the grid
// function undrawShape(shape, position) {
//     shape.forEach((row, y) => {
//         row.forEach((value, x) => {
//             if (value === 1) {
//                 const index = position + y * 10 + x;
//                 squares[index].classList.remove('newBlock');
//                 squares[index].style.backgroundColor = '';
//             }
//         });
//     });
// }



//Getting the next shape and color.
//let nextColor = getShape().color;
function getNewShape(){
    ({shape: currentShape, color: currentColor} = getShape());
    currentPosition = 4;
    drawShape(currentShape, currentColor, currentPosition);
    undrawShape(currentShape, currentPosition);
    id = setInterval(moveDown, 500);
}
// // Get and draw a new shape
// function getNewShape() {
//     ({ shape: currentShape, color: currentColor } = getShape());
//     currentPosition = 4;
//     if (checkCollision(currentShape, currentPosition)) {
//         alert('Game Over');
//         clearInterval(gameInterval);
//         restartButton.style.display = 'inline';
//         return;
//     }
//     drawShape(currentShape, currentColor, currentPosition);
// }



// // Function to check for collisions and stop the block if necessary
// // Stop block and spawn new one
// function stopBlock() {
//     currentShape.forEach((row, y) => {
//         row.forEach((value, x) => {
//             if (value === 1) {
//                 const index = currentPosition + y * 10 + x;
//                 squares[index].classList.add('phantomSquare');
//             }
//         });
//     });
//     getNewShape();
// }

 
function stopBlock() {
     if (currentPosition.some(index => squares[currentPosition[index] + 10].classList.contains('phantomSquare'))) {
        // Add 'phantomSquare' class to the current position squares
        currentPosition.forEach(index => squares[currentPosition[index]].classList.add('phantomSquare'));
        // Call drawShape to draw a new shape
        drawShape();
    }
}



// Call the function to test
stopBlock();


// collision detection
// function checkCollision() {
//     const nextPosition = currentPosition + 10; // Calculate the position of the block one row below the current position
//     const nextRow = Math.floor(nextPosition / 10); // Calculate the row index of the next position

// // Check for collision
// function checkCollision(shape, position) {
//     return shape.some((row, y) =>
//         row.some((value, x) => {
//             if (value === 1) {
//                 const index = position + y * 10 + x;
//                 return (
//                     index >= 200 || 
//                     squares[index].classList.contains('phantomSquare')
//                 );
//             }
//             return false;
//         })
//     );
// }

//     // Check if any of the squares in the next row are already occupied
//     const collision = currentShape.some((row, y) => {
//         return row.some((value, x) => {
//             if (value === 1) {
//                 const index = nextPosition + y * 10 + x;
//                 const square = squares[index];
//                 return square.classList.contains('newBlock');
//             }
//         });
//     });

//     return collision;
// }


// clear the row - marcella

// function clearRow(){
//     for(let j=0; j<20; j++){
//         let objRow = {};
//         for(let i = (0+j); i <(10+(j*10)); i++){
//             const blocks = document.querySelector(`.number${i}`);
//             const arrRows = arrRows.push(blocks);
//         }
//         objRow[j] = arrRows; //Does it exist??????? how do i make an object with the rows?
    
//     }
// }
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
console.log(objRow);

if (objRow[i].every(block => block.classList.contains('phantomSquare'))) {
    objRow[i].forEach(block => {
        block.classList.remove('newBlock', 'phantomSquare');
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
        block.classList.remove('newBlock', 'phantomSquare');
        block.style.backgroundColor = '';
    });
}


// classList.add('newBlock')

// function clearRow(){
//     for(let i=0; i<20; i++){
//         if(objRow[i].every(square){
//              square(value ===1))}{


//             row.forEach(square => {
//                 square.classList.remove('taken');
//                 square.classList.remove('block');
//                 square.style.backgroundColor = '';
//             })
//             const squaresRemoved = tetris.removeChild(tetris.children[i]);
//             tetris.prepend(squaresRemoved);
//         }
//     } -----> from copilot...I saved but want to try something myself
// }

// game over

// start

// restart

// pause












// Buttons

const restartButton = document.getElementById('restart');
const pauseButton = document.getElementById('pause');

 
 
//add function to Start button
document.getElementById("start").addEventListener('click', startGame);
function startGame() {
    startButton.style.display = 'none';
    restartButton.style.display = 'none';
    pauseButton.style.display = 'inline';
    getNewShape();
    gameInterval = setInterval(moveDown, 500);
}

//let squares = document.querySelectorAll(".square");
//let currentShape, currentColor, currentPosition;
//let id;
let currentShape = getShape().shape;
console.log(currentShape);
let currentColor = getShape().color;
//console.log(currentColor);
//define starting position on grid (5th square from top left):
// let currentPosition = 4;
// let squares = document.querySelectorAll(".square");

//function startGame(){
//let randomNumber = Math.floor(Math.random()*shapes.length)
//get random shape and assign corresponding color:


//assign variable to shape and color chosen randomly:


//let squares = Array.from(document.querySelectorAll(".square"));


 
// function that draws shape on the grid. takes the shape, the color and the position on the grid as parameters.
function drawShape(shape, color, position) {
    //iterate through each row of the shape array, with y as row index:
    shape.forEach((row, y) => {
        //iterate over each value in current row, with x as column index:
        row.forEach((value, x) => {
            //when the array value is 1, it needs to draw the square:
            if (value === 1) {
                const index = position + y * 10 + x;//start at position in grid + row of the shape array*10 (10 is length of one row in grid, this gives the current row of the grid) + x
                squares[index].classList.add('newBlock');
                squares[index].style.backgroundColor = color;
            }
        });
    });
}
//drawShape(currentShape, currentColor, currentPosition);


// function that colors the grid back to original color:
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
 //undrawShape(currentShape, currentPosition);

// this function moves the block down automatically, as it adds to the current position 10 (which is length of grid)
function moveDown() {
    if (currentPosition < 180){//when position is 180 it should stop, since it arrived at the bottom
    undrawShape(currentShape, currentPosition);
    currentPosition += 10;
    drawShape(currentShape, currentColor, currentPosition);
    }
    else {
        clearInterval(id);
        getNewShape();
    }
}
var id = setInterval(moveDown, 500);
/*function getNewShape(){
const {shape, color} = randomNumber;
currentShape = shape;
currentColor = color;
currentPosition = 4;
drawShape(currentShape, currentColor, currentPosition);

}*/
//it moves down with 1 milisecond speed


//create next shape
//let nextShape = getShape().shape;
//console.log(nextShape);
// //let nextColor = getShape().color;
// //
// function getNewShape(){
//     ({shape: currentShape, color: currentColor} = getShape());
//     currentPosition = 4;
//     drawShape(currentShape, currentColor, currentPosition);
//     undrawShape(currentShape, currentPosition);
//     id = setInterval(moveDown, 500);
// }
//move left:

function moveLeft() {
    undrawShape(currentShape, currentPosition);
    if (currentPosition % 10 !== 0){
    currentPosition -= 1;
    }
    drawShape(currentShape, currentColor, currentPosition);
 }
 
 //add eventhandler:
 
 document.addEventListener('keydown', (event) =>{
     if (event.key === 'ArrowLeft'){
         moveLeft();
     }
 });
 //move right:

function moveRight() {
    undrawShape(currentShape, currentPosition);
    if ((currentPosition + currentShape[0].length) % 10 !== 0){
    currentPosition += 1;
    }
    drawShape(currentShape, currentColor, currentPosition);
    console.log(currentShape[0].length)
 }
 
 //add eventhandler:
 
 document.addEventListener('keydown', (event) =>{
     if (event.key === 'ArrowRight'){
         moveRight();
     }
 });

 //move fast down
 function moveDownFast() {
    undrawShape(currentShape, currentPosition);
    currentPosition += 10;
    drawShape(currentShape, currentColor, currentPosition);
 }
 
 //add eventhandler:
 
 document.addEventListener('keydown', (event) =>{
     if (event.key === 'ArrowDown'){
        if (currentPosition < 180){
         moveDownFast();
        }
     }
 });

 //rotate:
 function rotate() {
    const rotatedShape = currentShape[0].map((_, index) => currentShape.map(row => row[index])).reverse();
    undrawShape(currentShape, currentPosition);
    currentShape = rotatedShape;
    drawShape(currentShape, currentColor, currentPosition);
}
//add eventhandler:
 
document.addEventListener('keydown', (event) =>{
    if (event.key === 'ArrowUp'){
       rotate();
    }
});

 //let squares = document.querySelectorAll(".square");
//let currentShape, currentColor, currentPosition;
//let id;
let currentShape = getShape().shape;
console.log(currentShape);
let currentColor = getShape().color;

-----------------------
// Making the buttons work

// Buttons
let gameInterval;
let isPaused = false;

// Start button
document.getElementById("start").addEventListener('click', startGame);
function startGame() {
    startButton.style.display = 'none';
    restartButton.style.display = 'none';
    pauseButton.style.display = 'inline';
    getNewShape();
    gameInterval = setInterval(moveDown, 500);
}

// Restart button
document.getElementById('restart').addEventListener('click', restartGame);
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

// Pause buton
document.getElementById('pause').addEventListener('click', pauseGame);
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
