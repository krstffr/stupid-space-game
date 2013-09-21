function SpaceShip () {

	var that = this;
	this.el = $("#follower");
	this.rocketEl = $('#rocket-count');
	this.shotSpeed = shotSpeed;
	this.kills = 0;
	this.rockets = [];
	this.maxBurst = 2;

	this.kill = function() {
		this.el.fadeOut(250, function() {
			$(this).remove();
			// Here something nice needs to happen.
			window.location = 'index.html';
		});

		// Removed these cause they were really annoying
		// var test = alert('You suck! But you did kill '+this.kills+' alien enemies.');
		
	};
	this.addKill = function() {
		this.kills += 1;
		$('#kill-count').text(this.kills);
	};
	this.move = function() {
		xp += ((mouseX/5) - xp) / delay;
		yp += (mouseY - yp) / delay;

		newTopCosNum = newTopCosNum+0.03;
		newLeftCosNum = newLeftCosNum+0.012;

		newTopPos = yp + ( Math.cos(newTopCosNum) * 50 );
		newLeftPos = xp + ( Math.cos(newLeftCosNum) * 30 );

		this.el.css({ left: Math.floor(newLeftPos), top: Math.floor(newTopPos) });
	};
	this.getCurrPos = GLOBALgetCurrPosMethod;
	this.hitBox = GLOBALhitBox;

	this.update = function() {
		// Move spaceship
		this.move();
		this.inheritedUpdates();
	};
}

asShooter.call( SpaceShip.prototype );
testMixin.call( SpaceShip.prototype );