//game constants and variables
let inputDir = {x: 0 , y:0};
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('Game_Over.mp3');
const moveSound= new Audio('move.mp3');
const musicSound = new Audio('background_sound.mp3');
let speed =6;
let score=0;
let lastPaintTime = 0;
let snakeArr=[
    {x: 14, y:16}
]
food = {x: 4, y:8};

//functions of game //ctime=currenttime

function main(ctime) {
        window.requestAnimationFrame(main);
        //console.log(ctime)
        if ((ctime - lastPaintTime)/1000 < 1/speed)
         {
            return;
        }
        lastPaintTime = ctime;
        gameEngine();
}
    function isCollide(snake) {
        //if snake bump into itself
        for (let i = 1; i < snakeArr.length; i++) {
         if (snake[i].x=== snake[0].x && snake[i].y=== snake[0].y)
          return true;  
        }
        //if you bump into wall.
        if (snake[0].x>=20 || snake[0].x<=0 || snake[0].y>=20 || snake[0].y<=0){
            
            return true;
        }
    }
    function gameEngine() {
        //update the snake array and Food

        if (isCollide(snakeArr)) {
            gameOverSound.play();
            moveSound.pause();
            musicSound.pause();
            inputDir={x:0 , y:0};
            alert("GameOver. Press Enter key to play again");
            snakeArr=[{x: 14, y:16}];
            musicSound.play();       
            score=0;     
        }
        //if snake have eaten the food ,increement the food and generate the food again.
            if (snakeArr[0].y=== food.y && snakeArr[0].x=== food.x) {
                foodSound.play();
                score+=1;
                if (score>=highScoreval) {
                    highScoreval= score;
                    localStorage.setItem("highScore", JSON.stringify(highScoreval))
                    HighScoreBox.innerHTML="HighScore: " + highScoreval;
                }
                scoreBox.innerHTML=" Score: " + score;
                snakeArr.unshift({x: snakeArr[0].x + inputDir.x , y: snakeArr[0].y+inputDir.y})
               let a= 2;
                let b=18;
                food= {x: Math.round(a+(b-a)*Math.random()),y: Math.round(a+(b-a)*Math.random())}
            }

        //moving the snake

        for (let i= snakeArr.length-2; i>=0; i--) {
            snakeArr[i+1] = {...snakeArr[i]};
            
        }
        snakeArr[0].x += inputDir.x;
        snakeArr[0].y +=inputDir.y;

        //display the snake 
        board.innerHTML = "";
        snakeArr.forEach((element ,index)=> {
            snakeElement = document.createElement('div');
            snakeElement.style.gridRowStart= element.y;
            snakeElement.style.gridColumnStart= element.x;
            if(index==0){
                snakeElement.classList.add('head');
            }
            else{
                snakeElement.classList.add('snake');
            }
            
            board.appendChild(snakeElement);
        });

        //display the food
        foodElement = document.createElement('div')
        foodElement.style.gridRowStart= food.y;
        foodElement.style.gridColumnStart= food.x;
        foodElement.classList.add('food');
         board.appendChild(foodElement);
    }
 //Main LOgic
 
let highScore = localStorage.getItem("highScore");
if (highScore=== null) {
    highScoreval = 0;
    localStorage.setItem("highScore", JSON.stringify(highScoreval))
    
}
else{
   highScoreval = JSON.parse(highScore);
    HighScoreBox.innerHTML="HighScore: " + highScoreval;
}
    
window.requestAnimationFrame(main);
window.addEventListener('keydown', element =>{
    inputDir = {x:0 , y:1} //start the game
    musicSound.play();
    moveSound.play();
    switch (element.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
    
        default:
            break;
    }
})