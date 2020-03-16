var blocks = blocks || {};

blocks.boot = function(game) {};

blocks.boot.prototype = {
	
	preload: function() {
		// TODO
	},
	
	create: function() {
		
		this.stage.backgroundColor = '#f8f8f8';
		this.physics.startSystem(Phaser.Physics.ARCADE);
		
		if (!this.game.device.desktop)
		{
			this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

			this.scale.minWidth = 138;
			this.scale.minHeight = 146;
			this.scale.maxWidth = 1380;
			this.scale.maxHeight = 1460;

			this.scale.pageAlignHorizontally = true;
			this.scale.pageAlignVertically = true;
		
			this.scale.setScreenSize(true);
		}
		
		this.scale.pageAlignHorizontally = true;
		
		this.state.start('load');
		
	}
};