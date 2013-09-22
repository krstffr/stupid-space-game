// TODO: These methods should be attached to some mixin I guess? I guess they both apply
// to moving 
var GLOBALgetCurrPosMethod = function() {
	var topPos = $(this.rocketEl).offset().top,
	leftPos = $(this.rocketEl).offset().left;
	return { top: topPos, left: leftPos };
};
var GLOBALhitBox = function() {
	// Returns an object with a min and a max object.
	// The min and max contains the "min" and "max" x and y coordinates of the el.
	var offset = this.el.offset(),
		hitBox = {
			min: { x: offset.left, y: offset.top },
			max: { x: offset.left + this.el.width(), y: offset.top + this.el.height() }
		};
	return hitBox;
};