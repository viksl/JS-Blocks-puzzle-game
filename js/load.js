var blocks = blocks || {};

blocks.load = function(game) {};

blocks.load.prototype = {
	
	preload: function() {
		
		this.load.image('centerblock', 'assets/centerblock.png');
		this.load.image('dummy', 'assets/dummy.png');
		this.load.image('bg', 'assets/bg.png');
		
		var index;

		for (var i = 0; i < 36; i++)
		{
			index = i + 1;
			this.load.image('block' + blocks.padNumber(index), 'assets/block' + blocks.padNumber(index) + '.png');
		}

		for (var i = 0; i < 9; i++)
		{
			index = i + 1;
			this.load.image('howtoplay' + blocks.padNumber(index), 'assets/howtoplay' + blocks.padNumber(index) + '.png');
		}
	},
	
	create: function() {

		this.state.start('menu');
		
	}
};