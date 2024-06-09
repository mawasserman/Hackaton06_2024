// draw canvas  - marcella
const tetris = document.getElementById('tetris');
function createCanvas(){
    for(let i = 0; i < 200; i++){
        const square = document.createElement('div');
        square.classList.add('square');
        tetris.appendChild(square);
    }
}
createCanvas();



// movement of the block
//     automatic down
//     side by side
//     fast down

// rotation of the block

// collision detection

// clear the row

// game over

// start

// IF WE HAVE TIME!!!!

// restart

// score

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
let randomNumber = Math.floor(Math.random()*shapes.length)

//add Eventhandler on Start button to start the game:
let startBtn = document.getElementById("start");
startBtn.addEventListener('click', startGame);

function startGame(){

//get random shape and assign corresponding color:
function getShape(){
    let shape = shapes[randomNumber];
    let color = colors[randomNumber];
    return {shape, color};
}

//assign variable to shape and color chosen randomly:
let currentShape = getShape().shape;
//console.log(currentShape);
let currentColor = getShape().color;
//console.log(currentColor);
//define starting position on grid (5th square from top left):
let currentPosition = 4;


//let squares = Array.from(document.querySelectorAll(".square"));
let squares = document.querySelectorAll(".square");

 
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

// this function moves the block down automatically, as it adds to the current position 10 (which is length of grid)
function moveDown() {
    if (currentPosition < 180){//when position is 180 it should stop, since it arrived at the bottom
    undrawShape(currentShape, currentPosition);
    currentPosition += 10;
    drawShape(currentShape, currentColor, currentPosition);
    }
    else {
        clearInterval(id);

    }
}

//it moves down with 1 milisecond speed
var id = setInterval(moveDown, 1000);
}
