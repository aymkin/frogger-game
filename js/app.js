let scoreCount = 0;

const playerCoordinate = {
	x: 202,
	y: 405,
};

const enemyCoordinate = {
	x: 0,
	y: [63, 146, 229],
};

const FIELD = {
	column: 101,
	row: 83,
	leftBorder: 101,
	rightBorder: 303,
	topBorder: 0,
	bottomBorder: 322,
};

const Creature = function(x, y) {
	this.x = x;
	this.y = y;
};

Creature.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const Enemy = function(x, y, gamer) {
	Creature.call(this, x, y);
	this.speed = this.getRandSpeed();
	this.gamer = gamer;
	this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype = Object.create(Creature.prototype);

Enemy.prototype.getRandSpeed = function(min = 75, max = 200) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

Enemy.prototype.update = function(dt) {
	this.x = this.x + this.speed * dt;
	if (this.x >= FIELD.rightBorder + FIELD.column * 2) {
		this.x = -101;
		this.speed = this.getRandSpeed();
	}
	if (this.isCollision()) {
		alert(`You lost! The score is demotioned to ${(scoreCount -= 1)}`);
		this.gamer.beginAgain();
	}
};

Enemy.prototype.isCollision = function() {
	if (
		this.x + FIELD.column >= this.gamer.x &&
		this.x <= this.gamer.x + FIELD.column &&
		this.y + 10 == this.gamer.y
	) {
		return true;
	}
};

const Player = function(x, y) {
	Creature.call(this, x, y);
	this.sprite = 'images/char-boy.png';
};

Player.prototype = Object.create(Creature.prototype);

Player.prototype.update = function() {};

Player.prototype.beginAgain = function() {
	this.x = playerCoordinate.x;
	this.y = playerCoordinate.y;
};

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

			if (this.y < 0) {
				scoreCount++;
				if (scoreCount < 5) {
					alert(`You win ${scoreCount} times!`);
				} else {
					alert(`You are absolute winner with score ${scoreCount} !`);
					scoreCount = 0;
					alert('The new game is started');
				}
				this.beginAgain();
			}
			break;
		case 'down':
			if (this.y <= FIELD.bottomBorder) this.y += FIELD.row;
			break;
	}
};

const player = new Player(playerCoordinate.x, playerCoordinate.y);
const enemy1 = new Enemy(enemyCoordinate.x, enemyCoordinate.y[0], player);
const enemy2 = new Enemy(enemyCoordinate.x, enemyCoordinate.y[1], player);
const enemy3 = new Enemy(enemyCoordinate.x, enemyCoordinate.y[2], player);

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
