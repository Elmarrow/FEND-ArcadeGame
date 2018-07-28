// Enemies our player must avoid
const speedArray = [50, 100, 250, 400];
const Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.coordinates = (x, y);
    this.sprite = 'images/enemy-bug.png';
    this.speed = speedArray[Math.floor(Math.random() * speedArray.length)];
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x >= 505) {
        this.x = 0;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let playerX;
let playerY;
const Player = function (x, y){
    this.x = x;
    this.y=y;
    this.sprite = 'images/char-horn-girl.png';
};

Player.prototype.update = function(){
    playerX = this.x;
    playerY = this.y;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.reset = function(){
    this.x = 200;
    this.y = 380;
}

Player.prototype.handleInput = function(pressedKeys){
    if (pressedKeys === 'up'&& this.y > 18){
        this.y -= 80;
    }
    else if (ppressedKeys === "right" && this.x < 400){
        this.x += 100;
    }
    else if (pressedKeys === 'down' && this.y < 380){
        this.y += 80;
    }
    else if (pressedKeys === 'left' && this.x > 33){
        this.x -= 100;
    }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
var allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy(), new Enemy()];

var checkCollisions = function() {
    for (var i = 0; i < allEnemies.length; i++) {
        if (player.x < allEnemies[i].x + enemyWidth &&
            player.x + playerWidth > allEnemies[i].x &&
            player.y < allEnemies[i].y + enemyHeight &&
            player.y + playerHeight > allEnemies[i].y
        ) {
            player.reset();
        }

    }
};


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
