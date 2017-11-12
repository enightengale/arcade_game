"use strict";
// Enemies our player must avoid
var img;
var src;

//when player choosen close modal and use that player selected
  $("li").click(function(char){
    src = $(this).children().attr("src");
    img = ' + src + ';
    player.sprite = src;
    $("#modal-start").css("display", "none");
    $("#modal-content").css("display", "none");
  });


var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // make enemies loop to left side of canvas after reaching canvas.width
    if (this.x >= 505) {
        this.x = 0;
    }

    // Check for collision with enemies or barrier-walls
    var checkCollision = function(anEnemy) {
        // check for collision between enemy and player
        if (
            player.y + 131 >= anEnemy.y + 90 &&
            player.x + 25 <= anEnemy.x + 88 &&
            player.y + 73 <= anEnemy.y + 135 &&
            player.x + 76 >= anEnemy.x + 11) {

          restartEnemies();
            player.x = 202.5;
            player.y = 383;
        }

        // check for player reaching top of canvas and winning the game
        //if player does then add one to level also add another enemy
        if (player.y < 43) {
            player.x = 202.5;
            player.y = 383;


            level.innerHTML++;
            var newEnemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 250);
            allEnemies.push(newEnemy);

            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, 505, 171);

        }

        // check if player runs into left, bottom, or right canvas walls
        // prevent player from moving beyond canvas wall boundaries
        if (player.y > 383 ) {
            player.y = 383;
        }
        if (player.x > 402.5) {
            player.x = 402.5;
        }
        if (player.x < 2.5) {
            player.x = 2.5;
        }
    };

    checkCollision(this);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.sprite = "images/char-boy.png";

};

Player.prototype.update = function () {
  //not needed
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

Player.prototype.handleInput = function(keyPress) {
    if (keyPress == 'left') {
        player.x -= player.speed;
    }
    if (keyPress == 'up') {
        player.y -= player.speed - 10;
    }
    if (keyPress == 'right') {
        player.x += player.speed;
    }
    if (keyPress == 'down') {
        player.y += player.speed - 10;
    }
    console.log('keyPress is: ' + keyPress);
};


//creating a Level count
var level = document.querySelector("#level");

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
// Place the player object in a variable called player
var player = new Player(202.5, 383, 95);

var restartEnemies = function(){
  allEnemies = [];
  var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 250);
  allEnemies.push(enemy);
  level.innerHTML = 1;
};
restartEnemies();

//game over modal
$("#modal-over").css("display", "none");
$("#content-over").css("display", "none");



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
