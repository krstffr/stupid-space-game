function Enemy () {

	var that = this;

	this.el = $('<div>').addClass('enemy').text('enemy!');
	this.rocketEl = this.el;
	this.enemyId = 0;
	this.newPos = { top: 0, left: 0};
	this.randCosNum = Math.floor(Math.random()*10) / 100;
	this.randCosMultiplier = Math.floor(Math.random()*2)+1;
	this.randLeftMoveSpeed = Math.floor( Math.random()*3 )+1;
	this.rockets = [];
	this.maxBurst = 1;
	this.shotSpeed = 1;

	this.kill = function() {
		delete enemies[this.enemyId];
		this.el.fadeOut(250).remove();
	};

	this.getCurrPos = GLOBALgetCurrPosMethod;

	this.moveTowardsSpaceship = function() {
		this.randCosNum += 0.02;
		this.newPos.right += this.randLeftMoveSpeed;
		this.newPos.top += (parseInt(this.elItWantsToDestroy().css('top'), 10) - this.newPos.top) / delay;
		this.newPos.top = this.newPos.top + ( Math.cos(this.randCosNum) * this.randCosMultiplier );
		this.el.css({top: this.newPos.top, right: this.newPos.right + 1});
		if (this.newPos.right > leftEdge) this.kill();
	};

	this.hitBox = GLOBALhitBox;

	this.checkIfHitPlayer = function() {
		if (spaceShip.hitBox().pos.left + spaceShip.hitBox().size.width > this.hitBox().pos.left && spaceShip.hitBox().pos.top + spaceShip.hitBox().size.height > this.hitBox().pos.top && spaceShip.hitBox().pos.top < this.hitBox().pos.top + this.hitBox().size.height) {
			spaceShip.kill();
			this.kill();
		}
	};

	this.elItWantsToDestroy = function() {
		if (typeof spaceShip !== 'undefined')
			return spaceShip.el;
	};

	this.createStartPos = function() {
		var topPos = Math.floor( Math.random()*playFieldHeight );
		return { top: topPos, right: 0 };
	};

	this.create = function() {
		var enemyId = uniqueEnemyCounter;

		uniqueEnemyCounter++;

		this.el.attr('id', 'enemy-'+enemyId);
		this.enemyId = enemyId;
		this.newPos = this.createStartPos();
		this.el.css( this.newPos );

		playField.append(this.el);
	};

	this.update = function() {
		this.moveTowardsSpaceship();
		this.checkIfHitPlayer();
		this.inheritedUpdates();
	};

	this.init = function() {
		this.create();
	};

	this.init();
	
}

asShooter.call( Enemy.prototype );