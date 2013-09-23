// Ehm this is for assigning a unique ID to every shot, there probably is a cleaner way
var globalShotCounter = 0;

// This will be a shooter-mixin for use of all objects which shoot in the game.
var Shooter = ring.create({

	shotSpeed: 1,
	rockets: [],
	maxBurst: 1,

	// options are:
	// x = where the rocket will head x
	// y = where the rocket will head y
	// toKillTargets = array of targets to kill
	shoot: function(options) {
		if (this.rockets.length < this.maxBurst) {
			// Ehm this is for assigning a unique ID to every shot, there probably is a cleaner way
			globalShotCounter++;
			var currPos = this.getCurrPos(),
			deltaY = options.y - currPos.top,
			deltaX =  options.x - currPos.left,
			uniqueID = 'shot-num-'+globalShotCounter,
			degrees = Math.atan2(deltaY, deltaX) * (180/Math.PI),
			newDiv = $('<div class="shot">').attr('id', uniqueID).css({position: 'absolute'}).text('ROCKET').css(currPos);
			
			playField.append(newDiv);

			this.rockets.push(new Rocket( currPos.left, currPos.top, this.shotSpeed, degrees, 1.05, 25, 1500, uniqueID, options.toKillTargets ));

		}
	},
	shotExists: function() {
		return this.rockets.length > 0;
	},
	moveRockets: function() {
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
	},
	update: function() {
		// Move rockets if exists
		if (this.$super !== undefined) this.$super();
		this.moveRockets();
	}
});