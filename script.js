let gameCont = document.querySelector(".game-container");

let start = document.querySelector(".start");

let road = document.querySelector(".road");

let roadLines = document.querySelector(".roadLines");

let ans = document.querySelector(".score");

let badge = document.querySelector("span");




let speed1 = 3;
let speed2=8;
let x, y;

/********key up down******* */
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

// ******key details up down***
const keys = {
    ArrowRight: false,
    ArrowLeft: false,
    ArrowUp: false,
    ArrowDown: false
}

function keyDown(key) {
    let code = key.keyCode;
    key = key.key;
    keys[key] = true;
    carMove(code);


}

function keyUp(key) {
    keys[key] = false;
}
//  <******end key events***>

let player = true;
start.addEventListener("click", () => {
    start.classList.add("hide");
    road.innerHTML="";
    roadLines.innerHTML="";
    player = true;
    
    
    createCar();
    createEnemyCar();
    moveLines();
    moveEnemyCar();
   

})



let score=0;
// ****car create function**
function createCar() {
    let car = document.createElement("div");
    car.classList.add("car");
    road.appendChild(car);
    x = car.offsetLeft;
    y = car.offsetTop;
    createLines();

}

function createLines() {
    for (let i = 0; i < 5; i++) {
        let line = document.createElement("div");
        line.y = (i * 150);
        line.style.top = line.y + "px";
        roadLines.appendChild(line);
    }

}

function moveLines() {
    let lines = roadLines.querySelectorAll("div");
   
    lines.forEach((line) => {
        if (player) {
            if (line.y == 750) {
                line.y -= 750;
            }
            line.y += speed1;
            line.style.top = line.y + "px";
        }
    })


    window.requestAnimationFrame(moveLines, moveEnemyCar);

}
function carMove(code) {
    let car = document.querySelector(".car");
    

        switch (code) {
            case 37:
                if (x >= 0) {
                    x -= speed2;
                    car.style.left = x + "px";
                }
                break;
            case 38:
                if (y >= 100) {
                    y -= speed2;
                    car.style.top = y + "px";
                }
                break;
            case 39:
                if (x < 172) {
                    x += speed2;
                    car.style.left = x + "px";
                }
                break;
            case 40:
                if (y < 750 - 180) {
                    y += speed2;
                    car.style.top = y + "px";
                }
                break;

               
        }
    
}



// {/* <create Enemy car */}

function createEnemyCar() {
    for (let i = 0; i < 3; i++) {
        let carEnemy = document.createElement("div");
        carEnemy.y = (i * 220);
        carEnemy.classList.add("carEnemy");
        carEnemy.style.top = carEnemy.y + "px";
        carEnemy.style.left=  Math.floor(Math.random() * 196) + "px";
        carEnemy.style.backgroundColor="#"+color();
        road.appendChild(carEnemy);
    }
     


}

function moveEnemyCar() {
    let carEnemys = document.querySelectorAll(".carEnemy");
    carEnemys.forEach((enemy) => {
        if (player) {
            if (enemy.y >= 750) {
                enemy.y -= 750;
                enemy.style.left = Math.floor(Math.random() * 196) + "px";
            }
            console.log("inside")
            if (isCollide(enemy)) {
                gameOver();
            }
            enemy.y += speed1;
           
            enemy.style.top = enemy.y + "px";
            score++;
            badge.innerHTML = score;
        }
        
      
    })


        window.requestAnimationFrame(moveEnemyCar);
    
}

function isCollide(enemy) {

    let car = document.querySelector(".car");
    let cRect = car.getBoundingClientRect();
    let eRect = enemy.getBoundingClientRect();
    return !((cRect.top > eRect.bottom) || (cRect.bottom < eRect.top) || (cRect.left > eRect.right) || (eRect.left > cRect.right));



}


function gameOver() {
    player = false;
       ans.innerHTML = `Total Score is ${score}`;
      start.innerHTML = `Game Over <br>
    //  Your final score is ${score}<br>
    // press here to restart the game`;
      start.classList.remove("hide");
      start.classList.add("restart");
      start.classList.remove("start");
      let restart=document.querySelector(".restart");
      endGame(restart);
 
}

function endGame(event){
    event.addEventListener("click",()=>{
        window.location.reload();
    })
}


function color(){
    random=Math.floor(Math.random()*1000000);
    return random;
    
}