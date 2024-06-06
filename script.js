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


// draw blocks - debi 

// give colors to the blocks - debi

// randowmly select a block - debi

// movement of the block
//     automatic down
//     side by side
//     fast down

// rotation of the block

// collision detection

// clear the row - marcella

function clearRow(){
    for(let j=0; j<20; j++){
        let objRow = {};
        for(let i = (0+j); i <(10+(j*10); i++){
            const blocks = document.querySelector(`.number${i}`);
            const arrRows = arrRows.push(blocks);
        }
        objRow[j] = arrRows; //Does it exist??????? how do i make an object with the rows?
    
    }
}

//     const row = document.querySelector(`number${i}`);
    //     const row = Array.from(tetris.children).slice(i, i + 10);
    //     if(row.every(square => square.classList.contains('taken'))){
    //         row.forEach(square => {
    //             square.classList.remove('taken');
    //             square.classList.remove('block');
    //             square.style.backgroundColor = '';
    //         })
    //         const squaresRemoved = tetris.removeChild(tetris.children[i]);
    //         tetris.prepend(squaresRemoved);
    //     }
    // } -----> from copilot...I saved but want to try something myself
// }

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
//const colors = ["yellow", "light-blue", "purple", "red", "green", "blue", "orange"];

//assign each shape a color:
//get random shape:
//we have 6 shapes. Create random number 0-6 (to choose shape index)
let randomNumber = Math.floor(Math.random()*shapes.length)
console.log(randomNumber)
//get new shape

function getShape(){

}








