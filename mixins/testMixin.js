var testMixin = function (options) {
	var oldInheritedUpdates = this.inheritedUpdates;
	this.inheritedUpdates = function() {
		oldInheritedUpdates.apply(this);
		// Removed this as it's only for testing...
		// console.log('im also running!!');
	};
	return this;
};