// TODO: These methods should be attached to some mixin I guess? I guess they both apply
// to moving 
var GLOBALgetCurrPosMethod = function() {
	var topPos = $(this.rocketEl).offset().top,
	leftPos = $(this.rocketEl).offset().left;
	return { top: topPos, left: leftPos };
};
var GLOBALhitBox = function() {
	var hitBox = { pos: this.el.offset(), size: { width: this.el.width(), height: this.el.height() } };
	return hitBox;
};