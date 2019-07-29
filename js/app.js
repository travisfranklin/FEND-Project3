// Create the Enemy class
const Enemy = function(x, y, s) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = s;
};

// update() method handles Enemy screen movement and location.
// Input: dt, a time delta between ticks
// Output: randomized enemy speed amount 
// Caveat: when an enemy reaches the right side of the canvas, or touches the player, they must reset with a randomized speed
const randomSpeed = function () {
    return Math.floor(Math.random() * 4 + 1) * 120;
};

Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;

    if (this.x > 707) {
        this.x = -100;
        this.speed = randomSpeed();
    }

    // hit() method handles player enemy interaction.
    // Input: player x & y positions, and the space enemys are inhabiting.
    // Output: if player/enemy positions overlap, run resetGame();
    const   enemyXLeft = this.x - 70,
            enemyXRight = this.x + 70,
            enemyYTop = this.y - 60,
            enemyYBottom = this.y + 60;

    if (
    player.x >= enemyXLeft && 
    player.x <= enemyXRight &&
    player.y >= enemyYTop && 
    player.y <= enemyYBottom
    ){
    player.resetGame();
    }
};


// render() method shows enemy sprite
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Create the player class
const Player = function(x, y) {
    this.sprite = 'images/char-horn-girl.png';
    this.x = 303;
    this.y = 404;
    this.x_mov = 101;
    this.y_mov = 83;
};

// render() method shows player sprite
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// update() method
Player.prototype.update = function(dt) {


};

// reset() method
// Input: Goal reached, or enemy touched.
// Output: Player sprite moves back to the start.
Player.prototype.resetGame = function() {
    this.x = 303;
    this.y = 404;
};


// handleInput() method 
// Input: key presses from the EventListener.
// Output: Player sprite moves in each key's cardinal direction. 
// Caveat: Player sprite can't move out of bounds.
Player.prototype.handleInput = function(direction) {
    switch (direction) {
        case 'left':
            this.x >= this.x_mov ? this.x -= this.x_mov : this.x -= 0;
            break;
        case 'right':
            this.x <= (this.x_mov * 5) ? this.x += this.x_mov : this.x += 0;
            break;
        case 'up':
            if (this.y <= 50) {
                crossed++;
                this.resetGame();
            }
            this.y >= this.y_mov ? this.y -= this.y_mov : this.y += 0;
            break;
        case 'down':
            this.y <= (this.y_mov * 4) ? this.y += this.y_mov : this.y += 0;
            break;
    }
}



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let enemy0 = new Enemy(-80, 60 + 80 * 0, randomSpeed());
let enemy1 = new Enemy(-80, 60 + 80 * 1, randomSpeed());
let enemy2 = new Enemy(-80, 60 + 80 * 2, randomSpeed());
window.allEnemies = [enemy0, enemy1, enemy2];

// Place the player object in a variable called player
window.player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
