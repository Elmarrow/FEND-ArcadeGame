/*.....................................
               Enemies                 
.....................................*/

// Enemies our player must avoid
var Enemy = function (x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = "images/enemy-bug.png";
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // Enemy sprite canvas limit checking and initialization with random speed
    const speedArray = [50, 100, 250, 400];
    if (this.x > 510) {
        this.x = -100;
        this.speed = speedArray[Math.floor(Math.random() * speedArray.length)];
    }
    checkCollision(this);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*.....................................
               Player                  
.....................................*/

// Now write your own player class
var Player = function (x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-horn-girl.png';
    this.lives = 3;
};

// This class requires an update(), render() and
// a handleInput() method.

Player.prototype.update = function () {
    // Keep player inside the canvas
    if (this.y > 380) {
        this.y = 380;
    }

    if (this.x > 400) {
        this.x = 400;
    }

    if (this.x < 0) {
        this.x = 0;
    }

    // When the water is reached, player goes back to the bottom
    // and earns 500 points
    if (this.y < 0) {
        resetPlayer();
        counter = counter + 500;
        showPoints.innerHTML = counter;
    }
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (keyPress) {
    switch (keyPress) {
        case 'up':
            this.y -= this.speed + 30;
            break;
        case 'down':
            this.y += this.speed + 30;
            break;
        case 'left':
            this.x -= this.speed + 50;
            break;
        case 'right':
            this.x += this.speed + 50;
            break;
    }
};

/*.....................................
               Interactions            
.....................................*/

// When collision happens, player returns at starting point and
// player looses a life
let checkCollision = function () {
    for (var i = 0; i < allEnemies.length; i++) {
        if (player.x < allEnemies[i].x + 68 &&
            player.x + 38 > allEnemies[i].x &&
            player.y < allEnemies[i].y + 38 &&
            30 + player.y > allEnemies[i].y) {
            resetPlayer();
            loseLife();
        }
    }
};

//resets the Player to the starting point
function resetPlayer() {
    player.x = 210;
    player.y = 380;
};

// Loosing life and checking for Game Over
function loseLife() {
    // Only decrement when greater than zero
    if (player.lives > 0) {
        player.lives--; // decrement lives
        const lives = document.querySelectorAll('.lifebar img'); // Get the life meter
        lives[player.lives].classList.toggle('hide'); // Remove one life on screen
    }
    if (player.lives === 0) {
        gameOver();
    }
}

//alert that game is over 
let gameOver = function () {
    alert("Game Over! Please close the alert to start again.");
    document.location.reload();
};

//Show points on the page
let showPoints = document.getElementById('points');
let counter = 0;

//Show lives on the page

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player(210, 380, 50);

const bugOne = new Enemy(-100, 229, 50);
const bugTwo = new Enemy(-500, 229, 50);
const bugThree = new Enemy(-150, 145, 50);
const bugFour = new Enemy(-400, 145, 50);
const bugFive = new Enemy(-200, 61, 50);
const bugSix = new Enemy(-350, 61, 50);
let allEnemies = [];
allEnemies.push(bugOne, bugTwo, bugThree, bugFour, bugFive, bugSix);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

function setLives() {
    const lives = document.querySelectorAll('.lifebar img');

    lives.forEach((life) => {
        life.src = `./${player.sprite}`;
    });
}