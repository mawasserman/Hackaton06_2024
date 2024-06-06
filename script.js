// draw canvas  - marcella

// draw blocks - debi 

// give colors to the blocks - debi

// randowmly select a block

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
//const colors = ["yellow", "light-blue", "purple", "red", "green", "blue", "orange"];

//assign each shape a color:
//get random shape:
//we have 6 shapes. Create random number 0-6 (to choose shape index)
let randomNumber = Math.floor(Math.random()*shapes.length)
console.log(randomNumber)
//get new shape

function getShape(){

}








