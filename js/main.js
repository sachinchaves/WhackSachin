
const Game = function(elementId){
    const game = this;
    game.element = document.getElementById(elementId);
    game.boxes = game.element.querySelectorAll(".box");
    game.startBtn = document.getElementById("startBtn");
    game.restartBtn = document.getElementById("restartBtn");
    game.stopBtn = document.getElementById("stopBtn");
    game.score = document.getElementById("score");
    game.timeLeft = document.getElementById("timeLeft");
    game.message = document.getElementById("message");
    game.character = game.element.querySelectorAll(".character");
    game.model = document.getElementById("modalContainer");
    console.log(game);
    game.result = 0;
    game.currentTime = game.timeLeft.innerHTML;

    game.start = function(){
        game.timer = setInterval(game.countDown,1000); 
        game.moveCharacter();
    }

    game.stop =function(){
        clearInterval(game.timer);
        clearInterval(game.timerId);
        game.score.innerHTML = 0;
        game.timeLeft.innerHTML = 20;
        game.currentTime = game.timeLeft.innerHTML;
    }

    game.randomBox = function(){
        game.boxes.forEach(function(domEle){
            domEle.classList.remove("character");
        });

        game.randomPos = game.boxes[Math.floor(Math.random()*9)];
        game.randomPos.classList.add("character");

        game.hitPosition = game.randomPos;
    }

    game.boxes.forEach(function(domEle){
        domEle.addEventListener("mouseup",function(){
            if(this === game.hitPosition){
                game.result = game.result +1;
                game.score.innerHTML = game.result;
            }
            
        })
    })

    game.moveCharacter = function(){
        game.timerId = setInterval(game.randomBox, 700);

    }

    game.countDown = function(){
        game.currentTime--;
        game.timeLeft.innerHTML = game.currentTime;
        if(game.currentTime == 0){
            game.model.style.display = "block";
            game.message.innerHTML = "Game Over ! Your score is " + game.result;
            game.stop();
        }
    }
    
    game.startBtn.addEventListener("click", function(e){
        e.preventDefault();
        game.start();
    });

    game.stopBtn.addEventListener("click", function(e){
        e.preventDefault();
        game.stop();
    });

    game.restartBtn.addEventListener("click", function(e){
        e.preventDefault();
        game.stop();
        game.model.style.display = "none";
        game.start();
    });
    
}

new Game("gameArena");

