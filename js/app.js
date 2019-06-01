const START = {
	x: 202,
	y: 405,
};

const FIELD = {
	column: 101,
	row: 83,
	leftBorder: 101,
	rightBorder: 303,
	topBorder: 0,
	bottomBorder: 322,
};

// Enemies our player must avoid
var Enemy = function() {
	// Variables applied to each of our instances go here,
	// we've provided one for you to get started

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
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
let Player = function(x, y) {
	this.x = x;
	this.y = y;
	this.sprite = 'images/char-boy.png';
};

// This class requires an update(), render() and
Player.prototype.update = function() {};

Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// a handleInput() method
Player.prototype.handleInput = function(key) {
	switch (key) {
		case 'left':
			if (this.x >= FIELD.leftBorder) this.x -= FIELD.column;
			break;
		case 'right':
			if (this.x <= FIELD.rightBorder) this.x += FIELD.column;
			break;
		case 'up':
			if (this.y >= FIELD.topBorder) this.y -= FIELD.row;
			break;
		case 'down':
			if (this.y <= FIELD.bottomBorder) this.y += FIELD.row;
			break;
	}
};

// Now instantiate your objects.
let enemy1 = new Enemy();

// Place all enemy objects in an array called allEnemies
const allEnemies = [enemy1];

// Place the player object in a variable called player
let player = new Player(START.x, START.y);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down',
	};

	player.handleInput(allowedKeys[e.keyCode]);
});
