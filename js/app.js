// Create the Enemy class
const Enemy = function(x, y, s) {
  this.sprite = "images/enemy-bug.png";
  this.x = x;
  this.y = y;
  this.speed = s;
};

// update() method handles Enemy screen movement and location.
// Input: dt, a time delta between ticks
// Output: randomized enemy speed amount
// Caveat: when an enemy reaches the right side of the canvas, or the game is reset, they must begin with a randomized speed
const randomSpeed = function(x) {
  console.log(`what is ${x}?`)
  return Math.floor(Math.random() * 4 + x + 1) * 120;
};

Enemy.prototype.update = function(dt) {
  this.x += this.speed * dt;

  if (this.x > 707) {
    this.x = -100;
    this.speed = randomSpeed(player.score);
  }

  // Player/Enemy interaction
  // Input: player x & y positions, and the space enemys are inhabiting.
  // Output: if player/enemy positions overlap, run resetGame();
  const enemyXLeft = this.x - 70,
    enemyXRight = this.x + 70,
    enemyYTop = this.y - 60,
    enemyYBottom = this.y + 60;

  if (
    player.x >= enemyXLeft &&
    player.x <= enemyXRight &&
    player.y >= enemyYTop &&
    player.y <= enemyYBottom
  ) {
    player.removeHeart();
  }
};

// render() method displays enemy sprite
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Create the player class
const Player = function(x, y) {
  this.sprite = "images/char-horn-girl.png";
  this.x = 303;
  this.y = 404;
  this.x_mov = 101;
  this.y_mov = 83;
  this.score = 0;
  this.lives = 3;
};

// render() method displays player sprite
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// update() method
Player.prototype.update = function(dt) {};

// reset() method
// Input: Goal reached, or enemy touched.
// Output: Player sprite moves back to the start.
Player.prototype.resetGame = function() {
  this.x = 303;
  this.y = 404;
};

// removeHeart() method
// Input: Touching enemy triggers method.
// Output: player.lives is lowered by 1, player heart gui is updated to reflect this. If player.lives is 0, a lose state is triggered.
Player.prototype.removeHeart = function() {
  this.lives -= 1;
  if (this.lives == 0) {
    return youLose();
  }
  let queryHeart = document.querySelectorAll(".fa-heart");
  queryHeart = Array.from(queryHeart).slice(-1)[0];
  queryHeart.classList.toggle("fa-heart");
  queryHeart.classList.toggle("fa-heart-o");
  this.resetGame();
}

// handleInput() method
// Input: key presses from the EventListener.
// Output: Player sprite moves in each key's cardinal direction.
// Caveat: Player sprite can't move out of bounds.
// When a star is removed, grab the last solid star icon class from the ul and change it to the outlined version

Player.prototype.handleInput = function(direction) {
  switch (direction) {
    case "left":
      this.x >= this.x_mov ? (this.x -= this.x_mov) : (this.x -= 0);
      break;
    case "right":
      this.x <= this.x_mov * 5 ? (this.x += this.x_mov) : (this.x += 0);
      break;
    case "up":
      this.y + 20 >= this.y_mov ? (this.y -= this.y_mov) : (this.y += 0);
      if (this.y <= 71) {
        this.score += 2;
        this.resetGame();
      }
      break;
    case "down":
      this.y <= this.y_mov * 4 ? (this.y += this.y_mov) : (this.y += 0);
      break;
  }
};

// Object Instatiation
// Place the player object in a variable called player
let player = new Player();
window.player = player;

// Place all enemy objects in an array called allEnemies
let enemy0 = new Enemy(-80, 60 + 80 * 0, randomSpeed(player.score));
let enemy1 = new Enemy(-80, 60 + 80 * 1, randomSpeed(player.score));
let enemy2 = new Enemy(-80, 60 + 80 * 2, randomSpeed(player.score));
window.allEnemies = [enemy0, enemy1, enemy2];

// Player.handleInput() method
// Input: Arrow key presses.
// Output: key names that can be attached to other methods.
document.addEventListener("keydown", function(e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
