const canvas = document.querySelector("canvas");
const width= 600 ;
const height =550 ;
let xMovment = 25 ;
let yMovment = 0 ; 
canvas.width = width;
canvas.height = height;
let cntx = canvas.getContext("2d");
let running = true ;
const unitSize = 25  ;  
const snakeCoulor = "green";
const foodCoulor = "red";
let snake = [
            {x:75 , y:0},
            {x:50 , y:0},
            {x:25 , y:0},
            {x:0 , y:0}
]
window.addEventListener("keydown" , changeDirection);
gameTick();

drawSnake()

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
    snake.pop();
}

function drawFood(){
    let randomX = Math.floor((Math.random() * width) / 25);
    let randomY = Math.floor((Math.random() * height) / 25);
    randomX = randomX * 25 ;
    randomY = randomY * 25 ;
    cntx.fillStyle = foodCoulor ;
    console.log(randomX , randomY)
    cntx.fillRect(randomX , randomY ,unitSize ,unitSize);
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
            moveSnake();
            drawSnake() ;
            gameTick
            
        },75)
    }
}
function clearCanvas() {
    cntx.clearRect(0, 0, width, height);
}