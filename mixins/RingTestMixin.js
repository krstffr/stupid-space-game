var TestMixin = ring.create({
	
	update: function() {
		if (this.$super !== undefined) this.$super();
		console.log('Im an update function from the class TestMxin!!');
	}

});