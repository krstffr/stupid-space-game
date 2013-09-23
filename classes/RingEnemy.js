var Enemy = ring.create([Shooter], {

	enemyId: 0,
	newPos: { top: 0, left: 0},
	randCosNum: Math.floor(Math.random()*10) / 100,
	randCosMultiplier: Math.floor(Math.random()*2)+1,
	randLeftMoveSpeed: Math.floor( Math.random()*3 )+1,

	kill: function() {
		delete enemies[this.enemyId];
		this.el.fadeOut(250).remove();
	},

	getCurrPos: GLOBALgetCurrPosMethod,

	moveTowardsSpaceship: function() {
		this.randCosNum += 0.02;
		this.newPos.right += this.randLeftMoveSpeed;
		this.newPos.top += (parseInt(this.elItWantsToDestroy().css('top'), 10) - this.newPos.top) / delay;
		this.newPos.top = this.newPos.top + ( Math.cos(this.randCosNum) * this.randCosMultiplier );
		this.el.css({top: this.newPos.top, right: this.newPos.right + 1});
		if (this.newPos.right > leftEdge) this.kill();
	},

	hitBox: GLOBALhitBox,

	checkIfHitPlayer: function() {
		// redo this…
	},

	elItWantsToDestroy: function() {
		if (typeof spaceShip !== 'undefined')
			return spaceShip.el;
	},

	createStartPos: function() {
		var topPos = Math.floor( Math.random()*playFieldHeight );
		return { top: topPos, right: 0 };
	},

	create: function() {
		var enemyId = uniqueEnemyCounter;

		uniqueEnemyCounter++;


		this.el = $('<div>').addClass('enemy').text('enemy!');
		this.el.attr('id', 'enemy-'+enemyId);
		this.enemyId = enemyId;
		this.newPos = this.createStartPos();
		this.el.css( this.newPos );

		playField.append(this.el);

		this.rocketEl = this.el;
	},

	update: function() {
		this.moveTowardsSpaceship();
		this.checkIfHitPlayer();
		if (this.$super !== undefined) this.$super();
		// this.inheritedUpdates();
	},

	init: function() {
		this.create();
	}
	
});