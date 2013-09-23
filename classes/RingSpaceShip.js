var SpaceShip = ring.create([Shooter, TestMixin], {

	kills: 0,

	kill: function() {
		this.el.fadeOut(250, function() {
			$(this).remove();
			// Here something nice needs to happen.
			window.location = 'index.html';
		});		
	},
	addKill: function() {
		this.kills += 1;
		$('#kill-count').text(this.kills);
	},
	move: function() {
		xp += ((mouseX/5) - xp) / delay;
		yp += (mouseY - yp) / delay;

		newTopCosNum = newTopCosNum+0.03;
		newLeftCosNum = newLeftCosNum+0.012;

		newTopPos = yp + ( Math.cos(newTopCosNum) * 50 );
		newLeftPos = xp + ( Math.cos(newLeftCosNum) * 30 );

		$(this.el).css({ left: Math.floor(newLeftPos), top: Math.floor(newTopPos) });
	},
	getCurrPos: GLOBALgetCurrPosMethod,
	hitBox: GLOBALhitBox,

	update: function() {
		// Move spaceship
		this.move();
		// this.inheritedUpdates();
		if (this.$super !== undefined) this.$super();
	},
	create: function() {
		// DAMN THIS IS UGLY CODE
		this.el = $('#follower');
		this.rocketEl = $('#rocket-count');
	},
	init: function () {
		this.create();
	}
});