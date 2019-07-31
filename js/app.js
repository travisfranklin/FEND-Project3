// Create the Enemy class
let Enemy = function(x, y, s) {
    this.sprites = ["images/enemy-bug.png", "images/bats.png", "images/slime.png", "images/spiders.png"]
  this.sprite = this.sprites[Math.floor(Math.random() * this.sprites.length)];
  this.x = x;
  this.y = y;
  this.speed = s;
};

// update() method handles Enemy screen movement and location.
// Input: dt, a time delta between ticks
// Output: randomized enemy speed amount
// Caveat: when an enemy reaches the right side of the canvas, or the game is reset, they must begin with a randomized speed
const randomSpeed = function(x) {
  return Math.floor(Math.random() * 2 + x + 1) * 30;
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
    player.resetGame();
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
  this.queryScore = document.getElementById("score");
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

// youLose() method
// Input: triggered by removeHeart() method
// Output: Lose modal appears.
Player.prototype.youLose = function() {
    const queryModalContainer = document.getElementById('modal-container');
    queryModalContainer.classList.remove('out');
      queryModalContainer.classList.remove('six');


  queryModalContainer.classList.add('six');

  document.body.classList.add('modal-active');

  queryModalContainer.onclick = function () {

    player.addHeart(2);

    player.score = 0;

    player.queryScore.textContent = player.score;

    queryModalContainer.classList.add('out');

    document.body.classList.toggle('modal-active');

  }
}

// addHeart() method
// Input: game restart, or extra life.
// Output: Restores one heart icon.
Player.prototype.addHeart = function(x) {
    this.lives += x + 1;
    for (i = 0; i < x; i++) {
        let queryEmptyHeart = document.querySelectorAll(".fa-heart-o");
        queryEmptyHeart = Array.from(queryEmptyHeart).slice(0)[0];
        queryEmptyHeart.classList.toggle("fa-heart-o");
        queryEmptyHeart.classList.toggle("fa-heart");
    }
}

// removeHeart() method
// Input: Touching enemy triggers method.
// Output: player.lives is lowered by 1, player heart gui is updated to reflect this. If player.lives is 0, youLose(); is triggered.
Player.prototype.removeHeart = function() {
  this.lives -= 1;
  if (this.lives == 0 || document.querySelectorAll(".fa-heart") == null) {
    return this.youLose();
  } else {
  let queryHeart = document.querySelectorAll(".fa-heart");
  queryHeart = Array.from(queryHeart).slice(-1)[0];
  queryHeart.classList.toggle("fa-heart");
  queryHeart.classList.toggle("fa-heart-o");
  }
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
        this.score += 5;
        this.queryScore.textContent = this.score;
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
let randomRow = x => Math.floor(Math.random() * 3);
let randomStart = x => Math.floor(Math.random() * -800);

let randomEnemy = x => new Enemy(randomStart(), 60 + 80 * randomRow(), randomSpeed(player.score));

// let enemy0 = new Enemy(-80, 60 + 80 * 0, randomSpeed(player.score));
// let enemy1 = new Enemy(-80, 60 + 80 * 1, randomSpeed(player.score));
// let enemy2 = new Enemy(-80, 60 + 80 * 2, randomSpeed(player.score));
// let enemy3 = new Enemy(-80, 60 + 80 * 2, randomSpeed(player.score));
// let enemy4 = new Enemy(-80, 60 + 80 * 1, randomSpeed(player.score));
// let enemy5 = new Enemy(-80, 60 + 80 * 2, randomSpeed(player.score));
window.allEnemies = [randomEnemy(), randomEnemy(), randomEnemy(), randomEnemy(), randomEnemy(), randomEnemy()];

// Player.handleInput() method
// Input: Arrow key presses.
// Output: key names that can be attached to other methods.
document.addEventListener("keyup", function(e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
