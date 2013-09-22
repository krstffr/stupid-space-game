function Rocket(x, y, speed, angle, acceleration, maxSpeed, range, uniqueID, toKillTargets){
	this.x = x;
	this.y = y;
	this.speed = speed;
	this.angle = angle;
	this.acceleration = acceleration || 1.05;
	this.maxSpeed = maxSpeed || 25;
	this.range = range || 800;
	this.dead = false;
	this.travelled = 0;
	this.uniqueID = uniqueID;
	this.el = $('#'+uniqueID);
	this.toKillTargets = toKillTargets;
}

//update rocket independent of rendering method
Rocket.prototype.update = function() {
    // calculate the vector (vx, vy) that represents the velocity
    var angleInRadians = this.angle*(Math.PI/180);

    console.log(this.speed);
    var currentSpeed = this.speed >= this.maxSpeed ? this.speed : this.speed*= this.acceleration;
    var vx = currentSpeed * Math.cos(angleInRadians);
    var vy = currentSpeed * Math.sin(angleInRadians);

	//pythagoras to calculate travelled distance
	this.travelled += Math.sqrt(Math.pow(vx, 2) + Math.pow(vy, 2));
	
	//set dead if range is reached
	if (this.travelled >= this.range) {
		this.dead = true;
	}

    // move the bullet
    this.x += vx;
    this.y += vy;

    this.checkIfHitSomething();
};

Rocket.prototype.destroyShot = function() {
	// Remove the el I guess is enough?
	$(this.el).remove();
};

Rocket.prototype.checkIfHitSomething = function() {
	var thisRocket = this,
	thisRocketHitbox = thisRocket.hitBox();

	_(thisRocket.toKillTargets).each( function( enemy ) {
		// "Cleanish" solution found here: http://gamemath.com/2011/09/detecting-whether-two-boxes-overlap/
		if (thisRocketHitbox.max.x < enemy.hitBox().min.x) return false; // a is left of b
		if (thisRocketHitbox.min.x > enemy.hitBox().max.x) return false; // a is right of b
		if (thisRocketHitbox.max.y < enemy.hitBox().min.y) return false; // a is above b
		if (thisRocketHitbox.min.y > enemy.hitBox().max.y) return false; // a is below b
		enemy.kill();
		thisRocket.destroyShot();
	});
};

Rocket.prototype.hitBox = GLOBALhitBox;

//TODO: Separate drawing function that deals with the actual drawing
// maybe have each game object inherit from a game entity class which has update and draw methods?
Rocket.prototype.draw = function() {

};