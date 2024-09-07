const canvas = document.querySelector("canvas");
const width= 600 ;
const height =550 ;
const score = document.getElementById("score");
const resetBtn = document.querySelector("button");
const deathScreen = document.getElementById("resetScreen")
let xMovment = 25 ;
let yMovment = 0 ;
let foodX ;
let foodY;
canvas.width = width;
canvas.height = height;
let cntx = canvas.getContext("2d");
let running = true ;
const unitSize = 25  ;  
const snakeCoulor = "green";
const foodCoulor = "red";
let snake = [
            {x:unitSize* 3 , y:0},
            {x:unitSize* 2 , y:0},
            {x:unitSize , y:0},
            {x:0 , y:0}
]
window.addEventListener("keydown" , changeDirection);
resetBtn.addEventListener("click" ,()=>{
    deathScreen.style.display = "none" ;
    startGame();
})



function drawSnake(){
    cntx.fillStyle = snakeCoulor; 
    cntx.strokeStyle = "rgb(1,52,32)";
    cntx.lineWidth = 2 ;
    snake.forEach(part =>{
        cntx.fillRect(part.x , part.y , unitSize , unitSize);
        cntx.strokeRect(part.x , part.y , unitSize , unitSize);
    });
}

function moveSnake(){
    let head = snake[0];
    let newHead =  {x: head.x + xMovment , y: head.y + yMovment}
    snake.unshift(newHead);
    if(head.x == foodX && head.y == foodY){
        score.innerHTML = Number(score.innerHTML) +1
        createFood()         
    }
    else{
        snake.pop();
    }
    
}

function createFood(){
    foodX = Math.floor((Math.random() * width) / 25) * 25;
    foodY = Math.floor((Math.random() * height) / 25) * 25;
    
}

function drawFood(){
    cntx.fillStyle = foodCoulor ;
    cntx.fillRect(foodX, foodY ,unitSize ,unitSize);
}

function changeDirection(e){
    let key = e.keyCode ;
    
    switch(true){
        case(key == 37 && xMovment <= 0):{ //left
            xMovment = -25 ;
            yMovment = 0 ;
            break;
        }
        case(key == 39 && xMovment >= 0):{ // right
            xMovment = 25 ;
            yMovment = 0 ;
            break ;
        }
        case(key == 38 && yMovment <= 0):{ // up
            xMovment = 0 ;
            yMovment = -25;
            break ;
        }
        case(key == 40 && yMovment >= 0):{ // down
            xMovment = 0;
            yMovment = 25 ;
            break;
        }
    }
        
}

function gameTick(){
    if(running){
        setTimeout(()=>{
           clearCanvas();
           drawFood()
            moveSnake();
            drawSnake() ;
            checkLosing()
            gameTick()
    
        },80)
    }
    else{
        deathScreen.style.display = "flex" ;
    }
}
function clearCanvas() {
    cntx.clearRect(0, 0, width, height);
}
function checkLosing(){
    let head = snake[0];
    if(head.x >= width || head.x < 0){
        running = false
    }
    else if (head.y < 0 || head.y >= height){
        running = false
    }
    for(let i =1 ; i<snake.length ; i++){
        if(head.x == snake[i].x && head.y == snake[i].y ){
            running = false
        }
    }
}
function startGame(){
    running = true ;
    snake = [
        {x:unitSize* 3 , y:0},
        {x:unitSize* 2 , y:0},
        {x:unitSize , y:0},
        {x:0 , y:0}
        ];
    xMovment = 25 ;
    yMovment = 0 ;
    score.innerHTML = "0" ;
    createFood();
    gameTick();
}