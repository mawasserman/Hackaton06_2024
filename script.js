// draw canvas  - marcella
const tetris = document.getElementById('tetris');
function createCanvas(){
    for(let i = 0; i < 200; i++){
        const square = document.createElement('div');
        square.classList.add('square', `number${200-i}`);
        tetris.appendChild(square);
    }
}
createCanvas();



// movement of the block
//     automatic down
//     side by side
//     fast down

// rotation of the block
// 3549

// collision detection
function checkCollision() {
    const nextPosition = currentPosition + 10; // Calculate the position of the block one row below the current position
    const nextRow = Math.floor(nextPosition / 10); // Calculate the row index of the next position

    // Check if any of the squares in the next row are already occupied
    const collision = currentShape.some((row, y) => {
        return row.some((value, x) => {
            if (value === 1) {
                const index = nextPosition + y * 10 + x;
                const square = squares[index];
                return square.classList.contains('newBlock');
            }
        });
    });

    return collision;
}


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
            const blocks = document.querySelector(`.number${i}`);
            arrRows.push(blocks);
        }
        objRow[j] = arrRows; 
    }
    return objRow; 
}
creatingRows();
console.log(objRow);

function clearRow() {
    for (let i = 0; i < 20; i++) {
       
        if (objRow[i].every(block => block.classList.contains('newBlock'))) {
            const aboveBlock = objRow[i + 1][objRow[i].indexOf(block)];
            objRow[i].forEach(block => {
                if (aboveBlock.classList.contains('newBlock')) {
                    aboveBlock = block;
                } else {
                    block.classList.remove('newBlock');
                    block.style.backgroundColor = '';
                }
            });


            // Update the game state as necessary, e.g., increase score
        }
    }
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

// IF WE HAVE TIME!!!!

// restart

// score
//27:20

// level

// speed

// pause

// sound

// music    

// EXTRA FUNCTION: alert "Oh no! You kid has just picked something from the fridge!" - delete a randown block... set interval to 10 seconds?



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

//we have 6 shapes. Create random number 0-6 (to choose shape index)
//let randomNumber = Math.floor(Math.random()*shapes.length)


//let currentShape, currentColor, currentPosition, id;
function getShape(){
    let randomNumber = Math.floor(Math.random()*shapes.length)
    let shape = shapes[randomNumber];
    let color = colors[randomNumber];
    return {shape, color};
}

//add Eventhandler on Start button to start the game:
let startBtn = document.getElementById("start");
startBtn.addEventListener('click', startGame);

//let squares = document.querySelectorAll(".square");
//let currentShape, currentColor, currentPosition;
//let id;
let currentShape = getShape().shape;
console.log(currentShape);
let currentColor = getShape().color;
//console.log(currentColor);
//define starting position on grid (5th square from top left):
let currentPosition = 4;
let squares = document.querySelectorAll(".square");

function startGame(){
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
drawShape(currentShape, currentColor, currentPosition);


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
 undrawShape(currentShape, currentPosition);

// this function moves the block down automatically, as it adds to the current position 10 (which is length of grid)
function moveDown() {
    if (currentPosition < 180){//when position is 180 it should stop, since it arrived at the bottom
    undrawShape(nextShape, currentPosition);
    currentPosition += 10;
    drawShape(nextShape, nextColor, currentPosition);
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
let nextShape = getShape().shape;
console.log(nextShape);
let nextColor = getShape().color;
//
function getNewShape(){
    ({shape: nextShape, color: nextColor} = getShape());
    currentPosition = 4;
    drawShape(nextShape, nextColor, currentPosition);
    undrawShape(nextShape, currentPosition);
    id = setInterval(moveDown, 500);
}
//move left:

function moveLeft() {
    undrawShape(currentShape, currentPosition);
    currentPosition -= 1;
    drawShape(currentShape, currentColor, currentPosition);
 }
 //moveLeft();
 //add eventhandler:
 
 document.addEventListener('keydown', (event) =>{
     if (event.key === 37){
         moveLeft();
     }
 });

}



