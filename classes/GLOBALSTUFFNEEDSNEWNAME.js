// Ehm this is for assigning a unique ID to every shot, there probably is a cleaner way
var globalShotCounter = 0;


// TODO: These methods should be attached to some global game-entitiy class like you wrote further down I guess?
var GLOBALshootMethod = function(targetX, targetY) {
	if (this.rockets.length < this.maxBurst) {
		// Ehm this is for assigning a unique ID to every shot, there probably is a cleaner way
		globalShotCounter++;
		var currPos = this.getCurrPos(),
		deltaY = targetY - currPos.top,
		deltaX =  targetX - currPos.left,
		uniqueID = 'shot-num-'+globalShotCounter,
		degrees = Math.atan2(deltaY, deltaX) * (180/Math.PI),
		newDiv = $('<div class="shot">').attr('id', uniqueID).css({position: 'absolute'}).text('ROCKET').css(currPos);
		
		playField.append(newDiv);

		this.rockets.push(new Rocket(currPos.left, currPos.top, this.shotSpeed, degrees, 1.05, 25, 500, uniqueID ));

	}
};
var GLOBALgetCurrPosMethod = function() {
	var topPos = $(this.rocketEl).offset().top,
	leftPos = $(this.rocketEl).offset().left;
	return { top: topPos, left: leftPos };
};
var GLOBALmoveRockets = function() {
	if (this.rockets.length) {
		for (var i = 0; i < this.rockets.length; i++) {
			this.rockets[i].update();
			$(this.rockets[i].el).css({left: this.rockets[i].x, top: this.rockets[i].y});
			if (this.rockets[i].dead) {
				this.rockets[i].destroyShot();
				this.rockets.splice(i, 1);
			}
		}
	}
};
var GLOBALhitBox = function() {
	var hitBox = { pos: this.el.offset(), size: { width: this.el.width(), height: this.el.height() } };
	return hitBox;
};