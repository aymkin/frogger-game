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

let SPEED = (min = 100, max = 200) => Math.floor(Math.random() * (max - min + 1)) + min;

// Enemies our player must avoid
const Enemy = function(x, y, speed, gamer) {
	this.x = x;
	this.y = y;
	this.speed = speed;
	this.gamer = gamer;
	this.sprite = 'images/enemy-bug.png';
	console.log(this.gamer.x, this.gamer.y);
};

Enemy.prototype.update = function(dt) {
	this.x = this.x + this.speed * dt;
	if (this.x >= FIELD.rightBorder + FIELD.column * 2) {
		this.x = -101;
		this.speed = SPEED();
	}
	console.log(this.gamer.x, this.gamer.y, this.x, this.y);
};

Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.isCollision = function() {};

let Player = function(x, y) {
	this.x = x;
	this.y = y;
	this.sprite = 'images/char-boy.png';
};

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

let player = new Player(START.x, START.y);
const enemy1 = new Enemy(0, FIELD.row - 20, SPEED(), player);
const enemy2 = new Enemy(0, FIELD.row * 2 - 20, SPEED(), player);
const enemy3 = new Enemy(0, FIELD.row * 3 - 20, SPEED(), player);

const allEnemies = [enemy1, enemy2, enemy3];

document.addEventListener('keyup', function(e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down',
	};

	player.handleInput(allowedKeys[e.keyCode]);
});
