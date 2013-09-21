var testMixin = function (options) {
	var oldInheritedUpdates = this.inheritedUpdates;
	this.inheritedUpdates = function() {
		oldInheritedUpdates.apply(this);
		console.log('im also running!!');
	};
	return this;
};