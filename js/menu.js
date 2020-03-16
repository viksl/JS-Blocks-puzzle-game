var blocks = blocks || {};

blocks.menu = function(game) {};

blocks.menu.prototype = {
	
	create: function() {
//this.state.start('game');
		this.add.image(0, 0, 'bg');
		
		this.blockSize = 30;
		this.directions = ['top', 'right', 'down', 'left'];
		
		this.chainsTitle = [[1, 0], [2, 0], [4,0], [6, 0], [9, 0], [12, 0], [14, 0], [16, 0], [18, 0], [19, 0], [20, 0],
							[0, 1], [4, 1], [6, 1], [8, 1], [10, 1], [12, 1], [14, 1], [15, 1], [16, 1], [18, 1],
							[0, 2], [4, 2], [5, 2], [6, 2], [8, 2], [9, 2], [10, 2], [12, 2], [14, 2], [16, 2], [20, 2],
							[1, 3], [2, 3], [4, 3], [6, 3], [8, 3], [10, 3], [12, 3], [14, 3], [16, 3], [18, 3], [19, 3], [20, 3]];
		
		this.alphabet = {
			A: [[1], [0, 2], [0, 1, 2], [0, 2], [0, 2]],
			B: [[0, 1], [0, 2], [0, 1], [0, 2], [0, 1]],
			C: [[1], [0, 2], [0], [0, 2], [1]],
			D: [[0, 1], [0, 2], [0, 2], [0, 2], [0, 1]],
			E: [[0, 1, 2], [0], [0, 1, 2], [0], [0, 1, 2]],
			F: [[0, 1, 2], [0], [0, 1], [0], [0]],
			G: [[1], [0, 2], [0], [0, 1, 2], [1, 2]],
			H: [[0, 2], [0, 2], [0, 1, 2], [0, 2], [0, 2]],
			I: [[1], [1], [1], [1], [1]],
			J: [[2], [2], [2], [0, 2], [1]],
			K: [[0, 2], [0, 1], [0], [0, 1], [0, 2]],
			L: [[0], [0], [0], [0], [0, 1, 2]],
			M: [[0, 2], [0, 1, 2], [0, 1, 2], [0, 2], [0, 2]],
			N: [[0, 2], [0, 1, 2], [0, 2], [0, 2], [0, 2]],
			O: [[1], [0, 2], [0, 2], [0, 2], [1]],
			P: [[0, 1], [0, 2], [0, 1], [0], [0]],
			Q: [[1], [0, 2], [0, 2], [0, 1, 2], [1, 2]],
			R: [[0, 1], [0, 2], [0, 1], [0, 1], [0, 2]],
			S: [[1, 2], [0], [1], [2], [0, 1]],
			T: [[0, 1, 2], [1], [1], [1], [1]],
			U: [[0, 2], [0, 2], [0, 2], [0, 2], [0, 1, 2]],
			V: [[0, 2], [0, 2], [0, 2], [0, 2], [1]],
			W: [[0, 4], [0, 4], [0, 2, 4], [0, 2, 4], [1, 3]],
			X: [[0, 2], [0, 2], [1], [0, 2], [0, 2]],
			Y: [[0, 2], [0, 1, 2], [1], [1], [1]],
			Z: [[0, 1, 2], [2], [1], [0], [0, 1, 2]]
		};
		
		this.alphabet['0'] = [[1], [0, 2], [0, 2], [0, 2], [1]];
		this.alphabet['1'] = [[1], [0, 1], [1], [1], [0, 1, 2]];
		this.alphabet['2'] = [[0, 1, 2], [0, 2], [2], [1], [0, 1, 2]];
		this.alphabet['3'] = [[0, 1, 2], [2], [1, 2], [2], [0, 1, 2]];
		this.alphabet['4'] = [[0, 2], [0, 2], [0, 1, 2], [2], [2]];
		this.alphabet['5'] = [[0, 1, 2], [0], [0, 1, 2], [2], [0, 1, 2]];
		this.alphabet['6'] = [[0, 1, 2], [0], [0, 1, 2], [0, 2], [0, 1, 2]];
		this.alphabet['7'] = [[0, 1, 2], [2], [1], [1], [1]];
		this.alphabet['8'] = [[0, 1, 2], [0, 2], [0, 1, 2], [0, 2], [0, 1, 2]];
		this.alphabet['9'] = [[0, 1, 2], [0, 2], [0, 1, 2], [2], [1]];
		this.alphabet['.'] = [[], [], [], [], [1]];
		this.alphabet[':'] = [[], [1], [], [1], []];
		this.alphabet[','] = [[], [], [], [], [1], [1]];
		this.alphabet['-'] = [[], [], [0, 1, 2], [], []];
		this.alphabet['!'] = [[1], [1], [1], [], [1]];
		this.alphabet['>'] = [[0], [0, 1], [0, 1, 2], [0, 1], [0]];
		this.alphabet['<'] = [[2], [1, 2], [0, 1, 2], [1, 2], [2]];
		this.alphabet['/'] = [[2], [1], [1], [1], [0]];
		this.alphabet['['] = [[0, 1], [0], [0], [0], [0, 1]];
		this.alphabet[']'] = [[1, 2], [2], [2], [2], [1, 2]];
		
		this.titlePaddingX = Math.floor(this.game.width - this.blockSize * 21) / 2;
		this.titlePaddingY = Math.floor(this.game.height / 5);
		
		this.imageBufferGroup = this.add.group();
		this.imageGroup = this.add.group();
		this.imageGroup2 = this.add.group();
		
		this.titleOverlay = this.add.bitmapData(this.game.width, 1 * this.game.height / 4);
		this.titleOverlay.ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';  // rgba(255, 255, 255, 0.71)
		this.titleOverlay.ctx.fillRect(0, 0, this.titleOverlay.width, this.titleOverlay.height);
		this.titleOverlaySprite = this.titleOverlay.addToWorld(0, this.titlePaddingY - this.titleOverlay.height / 6, 0, 0);
		this.titleOverlaySprite.alpha = 0;
		this.titleOverlaySprite.tweenAlpha = this.add.tween(this.titleOverlaySprite).to({alpha: 1}, 1200).start();
		
		this.titleGroup = this.add.group();
		
		this.imageBufferGroup.createMultiple(20, 'block01');
		this.imageGroup.createMultiple(20, 'block01');
		this.imageGroup2.createMultiple(20, 'block01');
		this.titleGroup.createMultiple(44, 'block01');
		
		this.overlay = this.add.bitmapData(this.game.width, 1 * this.game.height / 4);
		this.overlay.ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';  // rgba(255, 255, 255, 0.71)
		this.overlay.ctx.fillRect(0, 0, this.overlay.width, this.overlay.height);
		this.overlaySprite = this.overlay.addToWorld(Math.floor(this.game.width / 2), Math.floor(110 + 2 * this.game.height / 4), 0.5, 0.11);
		this.overlaySprite.alpha = 0;
		this.overlaySprite.tweenAlpha = this.add.tween(this.overlaySprite).to({alpha: 1}, 1200).start();

		var remove = [5, 6, 8, 9, 10, 16, 29]; // too bright, difficult to read colors, left for game blocks only, not for texts
		this.number = true;
		
		while (this.number === true)
		{
			this.number = this.rnd.integerInRange(1, 36);
			
			for (var i = 0; i < remove.length; i++)
			{
				if (this.number === remove[i])
				{
					this.number = true;
				}
			}
		}

		this.textGroup = this.add.group();
		
		this.blockTimer = this.game.time.create(false);
		this.blockTimer.loop(450, function()
		{
			this.addBlock(0, false);
		}, this);
		this.blockTimer.start();
		
		this.titleTimer = this.game.time.events.add(100, function()
		{
			this.addBlock(0, true);
		}, this);

		var text = 'how to play'.toUpperCase(),
			indices = [],
			scale = 0.4,
			px = Math.floor((this.game.width - (this.getTextLength(text) * this.blockSize * scale)) / 2),
			py = Math.floor(100 + 2 * this.game.height / 4);
		
		this.howtoplayLock = false;
		this.howtoplay = this.add.image(Math.floor((this.game.width - (this.getTextLength(text) * this.blockSize * scale)) / 2), Math.floor(100 + 2 * this.game.height / 4), 'dummy');
		this.howtoplay.width = this.getTextLength(text) * this.blockSize * scale;
		this.howtoplay.height = 5 * this.blockSize * scale;
		this.howtoplay.renderable = false;
		this.howtoplay.inputEnabled = false;
		this.howtoplay.events.onInputDown.add(this.howtoplayScreen, this);
		
		this.getIndices(text, indices);
		this.typeText(text, indices, px, py, scale, 'textGroup', 'howtoplay', null, 0);

		text = 'new game'.toUpperCase();
		indices = [];
		px = Math.floor((this.game.width - (this.getTextLength(text) * this.blockSize * scale)) / 2);
		py = Math.floor(200 + 2 * this.game.height / 4);
		
		this.newGameLock = false;
		this.newgame = this.add.image(Math.floor((this.game.width - (this.getTextLength(text) * this.blockSize * scale)) / 2), Math.floor(200 + 2 * this.game.height / 4), 'dummy');
		this.newgame.width = this.getTextLength(text) * this.blockSize * scale;
		this.newgame.height = 5 * this.blockSize * scale;
		this.newgame.renderable = false;
		this.newgame.inputEnabled = false;
		this.newgame.events.onInputDown.add(this.newGame, this);
		
		this.getIndices(text, indices);
		this.typeText(text, indices, px, py, scale, 'textGroup', 'newgame', null, 0);

		//  how to play, all pages in a group
		this.htpGroup = this.add.group();
		this.htpPage = 0;
		this.htpPagesTotal = 9;

		var index, image;
		for (var i = 0; i < this.htpPagesTotal; i++)
		{
			index = i + 1;
			image = this.add.image(30, 30, 'howtoplay' + blocks.padNumber(index), 0, this.htpGroup);
			image.width = image.width - 60;
			image.height = image.height - 60;
			image.renderable = false;
		}	
		
		// new game screen
		this.ngBD = this.add.bitmapData(this.game.width - 100, this.game.height - 100);
		this.ngBD.ctx.fillStyle = 'rgba(255, 255, 255, 0.73)';
		this.ngBD.ctx.fillRect(0, 0, this.ngBD.width, this.ngBD.height);
		this.ngOverlay = this.ngBD.addToWorld(50, 50);
		this.ngOverlay.renderable = false;
		
		this.ngCustomLock = false;
		
		blocks.ngCustom = false;
	},
	
	leftArrow: function(arr, prop, x, y, scale, group, side)
	{
		return function() {
			var index = this[arr].indexOf(blocks[prop]);
			index--;

			if (index < 0)
			{
				index = this[arr].length - 1;
			}

			blocks[prop] =  this[arr][index];

			if (side)
			{
				this[x] = (side === 'left') ? 
					Math.floor(this.game.width / 3 - (this.getTextLength(blocks[prop]) * this.blockSize * this[scale]) / 2) :
					Math.floor(2 * this.game.width / 3 - (this.getTextLength(blocks[prop]) * this.blockSize * this[scale]) / 2);
			}
			else
			{
				this[x] = Math.floor((this.game.width - (this.getTextLength(blocks[prop]) * this.blockSize * this[scale])) / 2);
			}

			this.changeBlockText(this[group], blocks[prop], this[scale], this[x], this[y]);
		}.bind(this);
	},	
	
	rightArrow: function(arr, prop, x, y, scale, group, side)
	{
		return function() {
			var index = this[arr].indexOf(blocks[prop]);
			index++;

			if (index >=  this[arr].length)
			{
				index = 0;
			}

			blocks[prop] =  this[arr][index];

			if (side)
			{
				this[x] = (side === 'left') ?
					Math.floor(this.game.width / 3 - (this.getTextLength(blocks[prop]) * this.blockSize * this[scale]) / 2) :
					Math.floor(2 * this.game.width / 3 - (this.getTextLength(blocks[prop]) * this.blockSize * this[scale]) / 2);
			}
			else
			{
				this[x] = Math.floor((this.game.width - (this.getTextLength(blocks[prop]) * this.blockSize * this[scale])) / 2)
			}


			this.changeBlockText(this[group], blocks[prop], this[scale], this[x], this[y]);
		}.bind(this);
	},
	
	changeBlockText: function(group, text, scale, px, py)
	{
		group.callAll('kill');
		
		var array, block, x, y;
		var dx = 0;
		
		text = text.toUpperCase();
		
		for (var i = 0; i < text.length; i++)
		{
			array = this.alphabet[text[i]];
				
			for (var yy = 0; yy < array.length; yy++)
			{
				for (var xx = 0; xx < array[yy].length; xx++)
				{
					x = px + array[yy][xx] * scale * this.blockSize + dx;
					y = py + yy * scale * this.blockSize;
					
					block = group.getFirstDead();
					
					if (block)
					{
						block.key = 'block' + blocks.padNumber(this.number);
						block.loadTexture(block.key);
						block.reset(x, y);
					}
					else
					{
						block = this.add.image(x, y, 'block' + blocks.padNumber(this.number), 0, group);
					}
					
					block.scale.set(scale);
				}
			}
			
			if (text[i] !== 'W')
			{
				dx += this.blockSize * scale * 4;
			}
			else
			{
				dx += this.blockSize * scale * 6;
			}
		}
	},
	
	howtoplayScreen: function()
	{
		if (this.howtoplayLock)
		{
			return;
		}
		
		this.howtoplay.inputEnabled = false;
		this.newgame.inputEnabled = false;
		
		// next arrow button
		this.nextButton = this.nextButton || this.add.group();
		var text = '>'.toUpperCase(),
			indices = [],
			scale = 0.3,
			px = Math.floor(this.game.width - 3 * this.blockSize * scale),
			py = Math.floor(this.game.height / 2 - 2.5 * this.blockSize * scale);
		
		this.getIndices(text, indices);
		this.typeText(text, indices, px, py, scale, 'nextButton', 'nextButton', function() {
			if (this.htpPage < this.htpPagesTotal - 1)
			{
				this.htpGroup.getChildAt(this.htpPage).renderable = false;
				this.htpGroup.getChildAt(++this.htpPage).renderable = true;
			}
			else
			{
				this.htpGroup.getChildAt(this.htpPage).renderable = false;
				this.htpGroup.getChildAt(this.htpPage = 0).renderable = true;
			}
		}.bind(this), 0);
		
		// back arrow button
		this.backButton = this.backButton || this.add.group();
		text = '<'.toUpperCase();
		indices = [];
		px = 0;
		py = Math.floor(this.game.height / 2 - 2.5 * this.blockSize * scale);
		
		this.getIndices(text, indices);
		this.typeText(text, indices, px, py, scale, 'backButton', 'backButton', function() {
			if (this.htpPage > 0)
			{
				this.htpGroup.getChildAt(this.htpPage).renderable = false;
				this.htpGroup.getChildAt(--this.htpPage).renderable = true;
			}
			else
			{
				this.htpGroup.getChildAt(this.htpPage).renderable = false;
				this.htpGroup.getChildAt(this.htpPage = this.htpPagesTotal - 1).renderable = true;
			}
		}.bind(this), 0);
		
		// cancel button
		text = 'back to menu'.toUpperCase();
		indices = [];
		scale = 0.2;
		px = Math.floor(this.game.width / 2 - this.getTextLength(text) * this.blockSize * scale / 2);
		py = Math.floor(this.game.height - 5 * this.blockSize * scale);

		this.cancelOverlay = this.cancelOverlay || this.add.bitmapData(this.getTextLength(text) * this.blockSize * scale + this.blockSize * scale, 5 * this.blockSize * scale);
		this.cancelOverlay.ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';  // 0.58 rgba(255, 255, 255, 0.71)
		this.cancelOverlay.ctx.fillRect(0, 0, this.cancelOverlay.width, this.cancelOverlay.height);
		this.cancelButtonDummy = this.cancelButtonDummy || this.cancelOverlay.addToWorld(Math.floor(this.game.width / 2 - this.getTextLength(text) * this.blockSize * scale / 2 - this.blockSize * scale), Math.floor(this.game.height - 5 * this.blockSize * scale));
		this.cancelButtonDummy.inputEnabled = false;
		this.cancelButtonDummy.events.onInputDown.add(function() {
				this.htpGroup.setAll('renderable', false);
				this.cancelButton.setAll('renderable', false);
				this.cancelButtonDummy.renderable = false;
				this.cancelButtonDummy.inputEnabled = false;
				this.backButton.setAll('renderable', false);
				this.backButton.setAll('inputEnabled', false);
				this.nextButton.setAll('renderable', false);
				this.nextButton.setAll('inputEnabled', false);
				this.howtoplay.inputEnabled = true;
				this.newgame.inputEnabled = true;
				this.htpPage = 0;
		}, this);

		this.cancelButton = this.cancelButton || this.add.group();

		this.getIndices(text, indices);
		this.typeText(text, indices, px, py, scale, 'cancelButton', 'cancelButtonDummy', null, 0);	
		this.cancelButtonDummy.renderable = true;
		
		this.htpGroup.getChildAt(0).renderable = true;
	},
	
	newGame: function()
	{
		if (this.newGameLock)
		{
			return;
		}

		this.ngOverlay.height = this.ngBD.height;
		this.ngOverlay.renderable = true;
		this.howtoplay.inputEnabled = false;
		this.newgame.inputEnabled = false;
		this.howtoplayLock = true;
		
		this.ngLabelScale = 0.24;
		this.ngTextScale = 0.2;

		var text, indices;
		
		// game mode button left
		this.ml = this.ml || this.add.group();
		// game mode button right
		this.mr = this.mr || this.add.group();
		// game mode text
		this.modeText = this.modeText || this.add.group();
		// game mode label
		this.modeLabel = this.modeLabel || this.add.group();
		
		this.modes = ['normal', 'tetris', 'custom'];
		blocks.gameMode = this.modes[0];

		text = 'game mode'.toUpperCase();
		indices = [];
		this.ngModeX = Math.floor((this.game.width - (this.getTextLength(text) * this.blockSize * this.ngLabelScale)) / 2);
		this.ngModeY = Math.floor(100);
		this.getIndices(text, indices);
		this.typeText(text, indices, this.ngModeX, this.ngModeY, this.ngLabelScale, 'modeLabel', false, null, 0);
		
		text = blocks.gameMode.toUpperCase();
		indices = [];
		this.ngModeTX = Math.floor((this.game.width - (this.getTextLength(text) * this.blockSize * this.ngTextScale)) / 2);
		this.ngModeTY = Math.floor(160);
		this.getIndices(text, indices);
		this.typeText(text, indices, this.ngModeTX, this.ngModeTY, this.ngTextScale, 'modeText', false, null, 0);
		
		text = '<'.toUpperCase();
		indices = [];
		this.ngModeLAX = Math.floor((this.game.width - (this.getTextLength(text) * this.blockSize * this.ngLabelScale)) / 2 - this.getTextLength('normal'.toUpperCase()) * this.blockSize * this.ngLabelScale);
		this.ngModeLAY = Math.floor(160);
		this.getIndices(text, indices);
		this.typeText(text, indices, this.ngModeLAX, this.ngModeLAY, this.ngLabelScale, 'ml', 'ml', this.leftArrow('modes', 'gameMode', 'ngModeTX', 'ngModeTY', 'ngTextScale', 'modeText', false), 3000);
		
		text = '>'.toUpperCase();
		indices = [];
		this.ngModeRAX = Math.floor((this.game.width - (this.getTextLength(text) * this.blockSize * this.ngLabelScale)) / 2 + this.getTextLength('normal'.toUpperCase()) * this.blockSize * this.ngLabelScale);
		this.ngModeRAY = Math.floor(160);
		this.getIndices(text, indices);
		this.typeText(text, indices, this.ngModeRAX, this.ngModeRAY, this.ngLabelScale, 'mr', 'mr', this.rightArrow('modes', 'gameMode', 'ngModeTX', 'ngModeTY', 'ngTextScale', 'modeText', false), 3000);

		// difficulty button left
		this.dl = this.dl || this.add.group();
		// difficulty button right
		this.dr = this.dr || this.add.group();
		// difficulty text
		this.diffText = this.diffText || this.add.group();
		// difficulty label
		this.diffLabel = this.diffLabel || this.add.group();
		
		this.difficulties = ['easy', 'normal', 'challenge'];
		blocks.difficulty = this.difficulties[1];

		text = 'difficulty'.toUpperCase();
		indices = [];
		this.ngDiffLX  = Math.floor((this.game.width - (this.getTextLength(text) * this.blockSize * this.ngLabelScale)) / 2);
		this.ngDiffLY = Math.floor(230);
		this.getIndices(text, indices);
		this.typeText(text, indices, this.ngDiffLX, this.ngDiffLY, this.ngLabelScale, 'diffLabel', false, null, 0);

		text = blocks.difficulty.toUpperCase();
		indices = [];
		this.ngDiffTX = Math.floor((this.game.width - (this.getTextLength(text) * this.blockSize * this.ngTextScale)) / 2);
		this.ngDiffTY = Math.floor(290);
		this.getIndices(text, indices);
		this.typeText(text, indices, this.ngDiffTX, this.ngDiffTY, this.ngTextScale, 'diffText', false, null, 0);

		text = '<'.toUpperCase();
		indices = [];
		this.ngDiffLAX = Math.floor((this.game.width - (this.getTextLength(text) * this.blockSize * this.ngLabelScale)) / 2 - this.getTextLength('normal'.toUpperCase()) * this.blockSize * this.ngLabelScale);
		this.ngDiffLAY = Math.floor(290);
		this.getIndices(text, indices);
		this.typeText(text, indices, this.ngDiffLAX, this.ngDiffLAY, this.ngLabelScale, 'dl', 'dl', this.leftArrow('difficulties', 'difficulty', 'ngDiffTX', 'ngDiffTY', 'ngTextScale', 'diffText', false), 3000);

		text = '>'.toUpperCase();
		indices = [];
		this.ngDiffRAX = Math.floor((this.game.width - (this.getTextLength(text) * this.blockSize * this.ngLabelScale)) / 2 + this.getTextLength('normal'.toUpperCase()) * this.blockSize * this.ngLabelScale);
		this.ngDiffRAY = Math.floor(290);
		this.getIndices(text, indices);
		this.typeText(text, indices, this.ngDiffRAX, this.ngDiffRAY, this.ngLabelScale, 'dr', 'dr', this.rightArrow('difficulties', 'difficulty', 'ngDiffTX', 'ngDiffTY', 'ngTextScale', 'diffText', false), 3000);

		// size button left
		this.sl = this.sl || this.add.group();
		// size button right
		this.sr = this.sr || this.add.group();
		// size text
		this.sizeText = this.sizeText || this.add.group();
		// size label
		this.sizeLabel = this.sizeLabel || this.add.group();
		
		this.sizes = ['9x9', '15x15', '21x21'];
		blocks.size = this.sizes[0];
		
		text = 'grid size'.toUpperCase();
		indices = [];
		this.ngSizeLabelX = Math.floor((this.game.width - (this.getTextLength(text) * this.blockSize * this.ngLabelScale)) / 2);
		this.ngSizeLabelY = Math.floor(360);
		this.getIndices(text, indices);
		this.typeText(text, indices, this.ngSizeLabelX, this.ngSizeLabelY, this.ngLabelScale, 'sizeLabel', false, null, 0);

		text = blocks.size.toUpperCase();
		indices = [];
		this.ngSizeTX = Math.floor((this.game.width - (this.getTextLength(text) * this.blockSize * this.ngTextScale)) / 2);
		this.ngSizeTY = Math.floor(420);
		this.getIndices(text, indices);
		this.typeText(text, indices, this.ngSizeTX, this.ngSizeTY, this.ngTextScale, 'sizeText', false, null, 0);

		text = '<'.toUpperCase();
		indices = [];
		this.ngSizeLAX = Math.floor((this.game.width - (this.getTextLength(text) * this.blockSize * this.ngLabelScale)) / 2 - this.getTextLength('normal'.toUpperCase()) * this.blockSize * this.ngLabelScale);
		this.ngSizeLAY = Math.floor(420);
		this.getIndices(text, indices);
		this.typeText(text, indices, this.ngSizeLAX, this.ngSizeLAY, this.ngLabelScale, 'sl', 'sl', this.leftArrow('sizes', 'size', 'ngSizeTX', 'ngSizeTY', 'ngTextScale', 'sizeText', false), 3000);
		
		text = '>'.toUpperCase();
		indices = [];
		this.ngSizeRAX = Math.floor((this.game.width - (this.getTextLength(text) * this.blockSize * this.ngLabelScale)) / 2 + this.getTextLength('normal'.toUpperCase()) * this.blockSize * this.ngLabelScale);
		this.ngSizeRAY = Math.floor(420);
		this.getIndices(text, indices);
		this.typeText(text, indices, this.ngSizeRAX, this.ngSizeRAY, this.ngLabelScale, 'sr', 'sr', this.rightArrow('sizes', 'size', 'ngSizeTX', 'ngSizeTY', 'ngTextScale', 'sizeText', false), 3000);

		// return button
		this.ngReturn = this.ngReturn || this.add.group();
			
		text = 'return'.toUpperCase();
		indices = [];
		this.ngReturnX = Math.floor((this.game.width - (this.getTextLength(text) * this.blockSize * this.ngLabelScale)) / 2);
		this.ngReturnY = Math.floor(590);
		
		this.ngReturnDummy = this.ngReturnDummy || this.add.image(this.ngReturnX, this.ngReturnY, 'dummy');
		this.ngReturnDummy.width = this.getTextLength(text) * this.blockSize * this.ngLabelScale;
		this.ngReturnDummy.height = 5 * this.blockSize * this.ngLabelScale;
		this.ngReturnDummy.renderable = false;
		this.ngReturnDummy.inputEnabled = false;
		this.ngReturnDummy.events.onInputDown.add(function()
		{
			blocks.gameMode = 'normal';
			blocks.difficulty = 'normal';
			blocks.size = '9x9';
			this.ngOverlay.renderable = false;
			this.ngReturnDummy.renderable = false;
			this.ngReturnDummy.inputEnabled = false;
			this.ngReturnDummy.events.onInputDown.removeAll();
			this.ngSelectDummy.renderable = false;
			this.ngSelectDummy.inputEnabled = false;
			this.ngSelectDummy.events.onInputDown.removeAll();

			for (var i = 0; i < this.ngGroups.length; i++)
			{
				this.ngGroups[i].callAll('kill');
				this.ngGroups[i].callAll('events.onInputDown.removeAll', 'events.onInputDown');
				this.ngGroups[i].setAll('inputEnabled', false);
			}

			this.howtoplay.inputEnabled = true;
			this.newgame.inputEnabled = true;
			this.howtoplayLock = false;
		}, this);
		
		this.getIndices(text, indices);
		this.typeText(text, indices, this.ngReturnX, this.ngReturnY, this.ngLabelScale, 'ngReturn', 'ngReturnDummy', null, 0);

		// select button
		this.ngSelect = this.ngSelect || this.add.group();

		text = 'select'.toUpperCase();
		indices = [];
		this.ngSelectX = Math.floor((this.game.width - (this.getTextLength(text) * this.blockSize * this.ngLabelScale)) / 2);
		this.ngSelectY = Math.floor(520);

		this.ngSelectDummy = this.ngSelectDummy || this.add.image(this.ngSelectX, this.ngSelectY, 'dummy');
		this.ngSelectDummy.width = this.getTextLength(text) * this.blockSize * this.ngLabelScale;
		this.ngSelectDummy.height = 5 * this.blockSize * this.ngLabelScale;
		this.ngSelectDummy.renderable = false;
		this.ngSelectDummy.inputEnabled = false;
		this.ngSelectDummy.events.onInputDown.add(function()
		{
			if (blocks.gameMode !== 'custom')
			{
				this.destroyNewGame();
				
				if (this.ngCustomLock)
				{
					this.destroyCustomMenu();
				}
				
				this.state.start('game');
			}
			else
			{
				this.ngSelectDummy.renderable = false;
				this.ngSelectDummy.inputEnabled = false;
				this.ngSelectDummy.events.onInputDown.removeAll();
				this.ngReturnDummy.renderable = false;
				this.ngReturnDummy.inputEnabled = false;
				this.ngReturnDummy.events.onInputDown.removeAll();

				for (var i = 0; i < this.ngGroups.length; i++)
				{
					this.ngGroups[i].callAll('kill');
					this.ngGroups[i].callAll('events.onInputDown.removeAll', 'events.onInputDown');
					this.ngGroups[i].setAll('inputEnabled', false);
				}
				
				this.ngCustomScreen();
			}
			
		}, this);
		
		this.getIndices(text, indices);

		this.typeText(text, indices, this.ngSelectX, this.ngSelectY, this.ngLabelScale, 'ngSelect', 'ngSelectDummy', null, 0);

		this.ngGroups =
		[
			this.ml,
			this.mr,
			this.modeText,
			this.modeLabel,
			this.dl,
			this.dr,
			this.diffText,
			this.diffLabel,
			this.sl,
			this.sr,
			this.sizeText,
			this.sizeLabel,
			this.ngReturn,
			this.ngSelect
		];

	},
	
	destroyNewGame: function()
	{
		this.ngSelectDummy.events.onInputDown.removeAll();
		this.ngReturnDummy.events.onInputDown.removeAll();
		this.ngSelectDummy.destroy(true);
		this.ngReturnDummy.destroy(true);
				
		this.ngSelectDummy = undefined;
		this.ngReturnDummy = undefined;
			
		for (var i = 0; i < this.ngGroups.length; i++)
		{
			this.ngGroups[i].callAll('events.onInputDown.removeAll', 'events.onInputDown');
			this.ngGroups[i].destroy(true);
			this.ngGroups[i] = undefined;
		}
		
		this.ml = undefined;
		this.mr = undefined;
		this.modeText = undefined;
		this.modeLabel = undefined;
		this.dl = undefined;
		this.dr = undefined;
		this.diffText = undefined;
		this.diffLabel = undefined;
		this.sl = undefined;
		this.sr = undefined;
		this.sizeText = undefined;
		this.sizeLabel = undefined;
		this.ngReturn = undefined;
		this.ngSelect = undefined;
	},
	
	ngCustomScreen: function()
	{
		this.ngCustomLock = true;
	
		blocks.ngCustom = true;
		this.ngOverlay.height = Math.floor(1.07 * this.ngBD.height);
		this.ngLabelScale = 0.1;
		this.ngTextScale = 0.08;

		var text, indices, options = {};

		// mode tetris or normal button left
		this.ngcML = this.ngcML || this.add.group();
		// mode tetris or normal button right
		this.ngcMR = this.ngcMR || this.add.group();
		// mode tetris or normal text
		this.ngcMText = this.ngcMText || this.add.group();
		// mode tetris or normal label
		this.ngcMLabel = this.ngcMLabel || this.add.group();

		text = 'game mode'.toUpperCase();
		indices = [];
		this.ngcMX = Math.floor(this.game.width / 3 - (this.getTextLength(text) * this.blockSize * this.ngLabelScale) / 2);
		this.ngcMY = Math.floor(70);
		this.getIndices(text, indices);
		this.typeText(text, indices, this.ngcMX, this.ngcMY, this.ngLabelScale, 'ngcMLabel', false, null, 0);
		
		this.ngcModes = ['normal', 'tetris'];
		blocks.ngcMode = 'normal';
		text = blocks.ngcMode.toUpperCase();
		indices = [];
		this.ngcMTX = Math.floor(this.game.width / 3 - (this.getTextLength(text) * this.blockSize * this.ngTextScale) / 2);
		this.ngcMTY = Math.floor(100 + (5 * this.blockSize * this.ngLabelScale - 5 * this.blockSize * this.ngTextScale) / 2);
		this.getIndices(text, indices);
		this.typeText(text, indices, this.ngcMTX, this.ngcMTY, this.ngTextScale, 'ngcMText', false, null, 0);
		
		text = '<'.toUpperCase();
		indices = [];
		this.ngcMLAX = Math.floor(this.game.width / 3 - (this.getTextLength(text) * this.blockSize * this.ngLabelScale) / 2 - this.getTextLength('normal'.toUpperCase()) * this.blockSize * this.ngLabelScale);
		this.ngcMLAY = Math.floor(100);
		this.getIndices(text, indices);
		this.typeText(text, indices, this.ngcMLAX, this.ngcMLAY, this.ngLabelScale, 'ngcML', 'ngcML', this.leftArrow('ngcModes', 'ngcMode', 'ngcMTX', 'ngcMTY', 'ngTextScale', 'ngcMText', 'left'), 2000);
		
		text = '>'.toUpperCase();
		indices = [];
		this.ngcMRAX = Math.floor(this.game.width / 3 - (this.getTextLength(text) * this.blockSize * this.ngLabelScale) / 2 + this.getTextLength('normal'.toUpperCase()) * this.blockSize * this.ngLabelScale);
		this.ngcMRAY = Math.floor(100);
		this.getIndices(text, indices);
		this.typeText(text, indices, this.ngcMRAX, this.ngcMRAY, this.ngLabelScale, 'ngcMR', 'ngcMR', this.rightArrow('ngcModes', 'ngcMode', 'ngcMTX', 'ngcMTY', 'ngTextScale', 'ngcMText', 'left'), 2000);

		// size button left
		this.ngcSL = this.ngcSL || this.add.group();
		// size button right
		this.ngcSR = this.ngcSR || this.add.group();
		// size text
		this.ngcSText = this.ngcSText || this.add.group();
		// size label
		this.ngcSLabel = this.ngcSLabel || this.add.group();
		
		text = 'size'.toUpperCase();
		indices = [];
		this.ngcSX = Math.floor(2 * this.game.width / 3 - (this.getTextLength(text) * this.blockSize * this.ngLabelScale) / 2);
		this.ngcSY = Math.floor(70);
		this.getIndices(text, indices);
		this.typeText(text, indices, this.ngcSX, this.ngcSY, this.ngLabelScale, 'ngcSLabel', false, null, 0);
		
		this.ngcSizes = ['9x9', '11x11', '13x13', '15x15', '17x17', '19x19', '21x21', '23x23', '25x25'];
		blocks.size = '15x15';
		text = blocks.size.toUpperCase();
		indices = [];
		this.ngcSTX = Math.floor(2 * this.game.width / 3 - (this.getTextLength(text) * this.blockSize * this.ngTextScale) / 2);
		this.ngcSTY = Math.floor(100 + (5 * this.blockSize * this.ngLabelScale - 5 * this.blockSize * this.ngTextScale) / 2);
		this.getIndices(text, indices);
		this.typeText(text, indices, this.ngcSTX, this.ngcSTY, this.ngTextScale, 'ngcSText', false, null, 0);
		
		text = '<'.toUpperCase();
		indices = [];
		this.ngcSLAX = Math.floor(2 * this.game.width / 3 - (this.getTextLength(text) * this.blockSize * this.ngLabelScale) / 2 - this.getTextLength('normal'.toUpperCase()) * this.blockSize * this.ngLabelScale);
		this.ngcSLAY = Math.floor(100);
		this.getIndices(text, indices);
		this.typeText(text, indices, this.ngcSLAX, this.ngcSLAY, this.ngLabelScale, 'ngcSL', 'ngcSL', this.leftArrow('ngcSizes', 'size', 'ngcSTX', 'ngcSTY', 'ngTextScale', 'ngcSText', 'right'), 2000);
		
		text = '>'.toUpperCase();
		indices = [];
		this.ngcSRAX = Math.floor(2 * this.game.width / 3 - (this.getTextLength(text) * this.blockSize * this.ngLabelScale) / 2 + this.getTextLength('normal'.toUpperCase()) * this.blockSize * this.ngLabelScale);
		this.ngcSRAY = Math.floor(100);
		this.getIndices(text, indices);
		this.typeText(text, indices, this.ngcSRAX, this.ngcSRAY, this.ngLabelScale, 'ngcSR', 'ngcSR', this.rightArrow('ngcSizes', 'size', 'ngcSTX', 'ngcSTY', 'ngTextScale', 'ngcSText', 'right'), 2000);
		
		// populated button left
		this.ngcPL = this.ngcPl || this.add.group();
		// populated button right
		this.ngcPR = this.ngcPr || this.add.group();
		// populated text
		this.ngcPopText = this.ngcPopText || this.add.group();
		// populated label
		this.ngcPopLabel = this.ngcPopLabel || this.add.group();

		text = 'grid populated'.toUpperCase();
		indices = [];
		this.ngcPLX = Math.floor(this.game.width / 3 - (this.getTextLength(text) * this.blockSize * this.ngLabelScale) / 2);
		this.ngcPLY = Math.floor(140);
		this.getIndices(text, indices);
		this.typeText(text, indices, this.ngcPLX, this.ngcPLY, this.ngLabelScale, 'ngcPopLabel', false, null, 0);
		
		this.ngcPopulations = [];
		for (var i = 0; i < 0.95; i += 0.05)
		{
			this.ngcPopulations.push((Math.round(i * 100) / 100).toFixed(2));
		}
		blocks.populated = '0.40';
		text = blocks.populated.toUpperCase();
		indices = [];
		this.ngcPTX = Math.floor(this.game.width / 3 - (this.getTextLength(text) * this.blockSize * this.ngTextScale) / 2);
		this.ngcPTY = Math.floor(170 + (5 * this.blockSize * this.ngLabelScale - 5 * this.blockSize * this.ngTextScale) / 2);
		this.getIndices(text, indices);
		this.typeText(text, indices, this.ngcPTX, this.ngcPTY, this.ngTextScale, 'ngcPopText', false, null, 0);
		
		text = '<'.toUpperCase();
		indices = [];
		this.ngcPLAX = Math.floor(this.game.width / 3 - (this.getTextLength(text) * this.blockSize * this.ngLabelScale) / 2 - this.getTextLength('normal'.toUpperCase()) * this.blockSize * this.ngLabelScale);
		this.ngcPLAY = Math.floor(170);
		this.getIndices(text, indices);
		this.typeText(text, indices, this.ngcPLAX, this.ngcPLAY, this.ngLabelScale, 'ngcPL', 'ngcPL', this.leftArrow('ngcPopulations', 'populated', 'ngcPTX', 'ngcPTY', 'ngTextScale', 'ngcPopText', 'left'), 2000);
		
		text = '>'.toUpperCase();
		indices = [];
		this.ngcPRAX = Math.floor(this.game.width / 3 - (this.getTextLength(text) * this.blockSize * this.ngLabelScale) / 2 + this.getTextLength('normal'.toUpperCase()) * this.blockSize * this.ngLabelScale);
		this.ngcPRAY = Math.floor(170);
		this.getIndices(text, indices);
		this.typeText(text, indices, this.ngcPRAX, this.ngcPRAY, this.ngLabelScale, 'ngcPR', 'ngcPR', this.rightArrow('ngcPopulations', 'populated', 'ngcPTX', 'ngcPTY', 'ngTextScale', 'ngcPopText', 'left'), 2000);


		// neutral blocks button left
		this.ngcNL = this.ngcNL || this.add.group();
		// neutral blocks button right
		this.ngcNR = this.ngcNR || this.add.group();
		// neutral blocks text
		this.ngcNeutText = this.ngcNeutText || this.add.group();
		// neutral blocks label
		this.ngcNeutLabel = this.ngcNeutLabel || this.add.group();

		text = 'neutral blocks count'.toUpperCase();
		indices = [];
		this.ngcNLX = Math.floor(2 * this.game.width / 3 - (this.getTextLength(text) * this.blockSize * this.ngLabelScale) / 2);
		this.ngcNLY = Math.floor(140);
		this.getIndices(text, indices);
		this.typeText(text, indices, this.ngcNLX, this.ngcNLY, this.ngLabelScale, 'ngcNeutLabel', false, null, 0);

		this.ngcNeutrals = [];
		for (var i = 1; i < 41; i++)
		{
			this.ngcNeutrals.push(String(i));
		}
		blocks.centerBlocksCount = '1';
		text = blocks.centerBlocksCount.toUpperCase();
		indices = [];
		this.ngcNTX = Math.floor(2 * this.game.width / 3 - (this.getTextLength(text) * this.blockSize * this.ngTextScale) / 2);
		this.ngcNTY = Math.floor(170 + (5 * this.blockSize * this.ngLabelScale - 5 * this.blockSize * this.ngTextScale) / 2);
		this.getIndices(text, indices);
		this.typeText(text, indices, this.ngcNTX, this.ngcNTY, this.ngTextScale, 'ngcNeutText', false, null, 0);
		
		text = '<'.toUpperCase();
		indices = [];
		this.ngcNLAX = Math.floor(2 * this.game.width / 3 - (this.getTextLength(text) * this.blockSize * this.ngLabelScale) / 2 - this.getTextLength('normal'.toUpperCase()) * this.blockSize * this.ngLabelScale);
		this.ngcNLAY = Math.floor(170);
		this.getIndices(text, indices);
		this.typeText(text, indices, this.ngcNLAX, this.ngcNLAY, this.ngLabelScale, 'ngcNL', 'ngcNL', this.leftArrow('ngcNeutrals', 'centerBlocksCount', 'ngcNTX', 'ngcNTY', 'ngTextScale', 'ngcNeutText', 'right'), 2000);
		
		text = '>'.toUpperCase();
		indices = [];
		this.ngcNRAX = Math.floor(2 * this.game.width / 3 - (this.getTextLength(text) * this.blockSize * this.ngLabelScale) / 2 + this.getTextLength('normal'.toUpperCase()) * this.blockSize * this.ngLabelScale);
		this.ngcNRAY = Math.floor(170);
		this.getIndices(text, indices);
		this.typeText(text, indices, this.ngcNRAX, this.ngcNRAY, this.ngLabelScale, 'ngcNR', 'ngcNR', this.rightArrow('ngcNeutrals', 'centerBlocksCount', 'ngcNTX', 'ngcNTY', 'ngTextScale', 'ngcNeutText', 'right'), 2000);

		// chain length button left
		this.ngcCL = this.ngcCL || this.add.group();
		// chain length button right
		this.ngcCR = this.ngcCR || this.add.group();
		// chain length text
		this.ngcChainText = this.ngcChainText || this.add.group();
		// chain length label
		this.ngcChainLabel = this.ngcChainLabel || this.add.group();

		text = 'chain length'.toUpperCase();
		indices = [];
		this.ngcCLX = Math.floor(this.game.width / 3 - (this.getTextLength(text) * this.blockSize * this.ngLabelScale) / 2);
		this.ngcCLY = Math.floor(210);
		this.getIndices(text, indices);
		this.typeText(text, indices, this.ngcCLX, this.ngcCLY, this.ngLabelScale, 'ngcChainLabel', false, null, 0);

		this.ngcChains = [];
		for (var i = 1; i < 37; i++)
		{
			this.ngcChains.push(String(i));
		}
		blocks.chainLengthMin = '3';
		text = blocks.chainLengthMin.toUpperCase();
		indices = [];
		this.ngcCTX = Math.floor(this.game.width / 3 - (this.getTextLength(text) * this.blockSize * this.ngTextScale) / 2);
		this.ngcCTY = Math.floor(240 + (5 * this.blockSize * this.ngLabelScale - 5 * this.blockSize * this.ngTextScale) / 2);
		this.getIndices(text, indices);
		this.typeText(text, indices, this.ngcCTX, this.ngcCTY, this.ngTextScale, 'ngcChainText', false, null, 0);
		
		text = '<'.toUpperCase();
		indices = [];
		this.ngcCLAX = Math.floor(this.game.width / 3 - (this.getTextLength(text) * this.blockSize * this.ngLabelScale) / 2 - this.getTextLength('normal'.toUpperCase()) * this.blockSize * this.ngLabelScale);
		this.ngcCLAY = Math.floor(240);
		this.getIndices(text, indices);
		this.typeText(text, indices, this.ngcCLAX, this.ngcCLAY, this.ngLabelScale, 'ngcCL', 'ngcCL', this.leftArrow('ngcChains', 'chainLengthMin', 'ngcCTX', 'ngcCTY', 'ngTextScale', 'ngcChainText', 'left'), 2000);
		
		text = '>'.toUpperCase();
		indices = [];
		this.ngcCRAX = Math.floor(this.game.width / 3 - (this.getTextLength(text) * this.blockSize * this.ngLabelScale) / 2 + this.getTextLength('normal'.toUpperCase()) * this.blockSize * this.ngLabelScale);
		this.ngcCRAY = Math.floor(240);
		this.getIndices(text, indices);
		this.typeText(text, indices, this.ngcCRAX, this.ngcCRAY, this.ngLabelScale, 'ngcCR', 'ngcCR', this.rightArrow('ngcChains', 'chainLengthMin', 'ngcCTX', 'ngcCTY', 'ngTextScale', 'ngcChainText', 'left'), 2000);

		// block restriction button left
		this.ngcRL = this.ngcBL || this.add.group();
		// block restriction button right
		this.ngcRR = this.ngcBR || this.add.group();
		// block restriction text
		this.ngcRestText = this.ngcRestText || this.add.group();
		// block restriction label
		this.ngcRestLabel = this.ngcRestLabel || this.add.group();

		text = 'max number'.toUpperCase();
		indices = [];
		this.ngcBLX = Math.floor(2 * this.game.width / 3 - (this.getTextLength(text) * this.blockSize * this.ngLabelScale) / 2);
		this.ngcBLY = Math.floor(210);
		this.getIndices(text, indices);
		this.typeText(text, indices, this.ngcBLX, this.ngcBLY, this.ngLabelScale, 'ngcRestLabel', false, null, 0);

		this.ngcNumbers = [];
		for (var i = 9; i < 37; i++)
		{
			this.ngcNumbers.push(String(i));
		}
		blocks.blockRestrictions = '9';
		text = blocks.blockRestrictions.toUpperCase();
		indices = [];
		this.ngcRTX = Math.floor(2 * this.game.width / 3 - (this.getTextLength(text) * this.blockSize * this.ngTextScale) / 2);
		this.ngcRTY = Math.floor(240 + (5 * this.blockSize * this.ngLabelScale - 5 * this.blockSize * this.ngTextScale) / 2);
		this.getIndices(text, indices);
		this.typeText(text, indices, this.ngcRTX, this.ngcRTY, this.ngTextScale, 'ngcRestText', false, null, 0);
		
		text = '<'.toUpperCase();
		indices = [];
		this.ngcRLAX = Math.floor(2 * this.game.width / 3 - (this.getTextLength(text) * this.blockSize * this.ngLabelScale) / 2 - this.getTextLength('normal'.toUpperCase()) * this.blockSize * this.ngLabelScale);
		this.ngcRLAY = Math.floor(240);
		this.getIndices(text, indices);
		this.typeText(text, indices, this.ngcRLAX, this.ngcRLAY, this.ngLabelScale, 'ngcRL', 'ngcRL', this.leftArrow('ngcNumbers', 'ngcNumbers', 'ngcRTX', 'ngcRTY', 'ngTextScale', 'ngcRestText', 'right'), 2000);
		
		text = '>'.toUpperCase();
		indices = [];
		this.ngcRRAX = Math.floor(2 * this.game.width / 3 - (this.getTextLength(text) * this.blockSize * this.ngLabelScale) / 2 + this.getTextLength('normal'.toUpperCase()) * this.blockSize * this.ngLabelScale);
		this.ngcRRAY = Math.floor(240);
		this.getIndices(text, indices);
		this.typeText(text, indices, this.ngcRRAX, this.ngcRRAY, this.ngLabelScale, 'ngcRR', 'ngcRR', this.rightArrow('ngcNumbers', 'ngcNumbers', 'ngcRTX', 'ngcRTY', 'ngTextScale', 'ngcRestText', 'right'), 2000);

		// parity button left
		this.ngcPAL = this.ngcPAL || this.add.group();
		// parity button right
		this.ngcPAR = this.ngcPAR || this.add.group();
		// parity text
		this.ngcParText = this.ngcParText || this.add.group();
		// parity label
		this.ngcParLabel = this.ngcParLabel || this.add.group();

		text = 'only odd numbers'.toUpperCase();
		indices = [];
		this.ngcPaLX = Math.floor(this.game.width / 3 - (this.getTextLength(text) * this.blockSize * this.ngLabelScale) / 2);
		this.ngcPaLY = Math.floor(280);
		this.getIndices(text, indices);
		this.typeText(text, indices, this.ngcPaLX, this.ngcPaLY, this.ngLabelScale, 'ngcParLabel', false, null, 0);

		this.ngcParities = ['no', 'yes'];
		blocks.ngcParity = 'no';
		text = blocks.ngcParity.toUpperCase();
		indices = [];
		this.ngcPaTX = Math.floor(this.game.width / 3 - (this.getTextLength(text) * this.blockSize * this.ngTextScale) / 2);
		this.ngcPaTY = Math.floor(310 + (5 * this.blockSize * this.ngLabelScale - 5 * this.blockSize * this.ngTextScale) / 2);
		this.getIndices(text, indices);
		this.typeText(text, indices, this.ngcPaTX, this.ngcPaTY, this.ngTextScale, 'ngcParText', false, null, 0);
		
		text = '<'.toUpperCase();
		indices = [];
		this.ngcPaLAX = Math.floor(this.game.width / 3 - (this.getTextLength(text) * this.blockSize * this.ngLabelScale) / 2 - this.getTextLength('normal'.toUpperCase()) * this.blockSize * this.ngLabelScale);
		this.ngcPaLAY = Math.floor(310);
		this.getIndices(text, indices);
		this.typeText(text, indices, this.ngcPaLAX, this.ngcPaLAY, this.ngLabelScale, 'ngcPAL', 'ngcPAL', this.leftArrow('ngcParities', 'ngcParity', 'ngcPaTX', 'ngcPaTY', 'ngTextScale', 'ngcParText', 'left'), 2000);
		
		text = '>'.toUpperCase();
		indices = [];
		this.ngcPaRAX = Math.floor(this.game.width / 3 - (this.getTextLength(text) * this.blockSize * this.ngLabelScale) / 2 + this.getTextLength('normal'.toUpperCase()) * this.blockSize * this.ngLabelScale);
		this.ngcPaRAY = Math.floor(310);
		this.getIndices(text, indices);
		this.typeText(text, indices, this.ngcPaRAX, this.ngcPaRAY, this.ngLabelScale, 'ngcPAR', 'ngcPAR', this.rightArrow('ngcParities', 'ngcParity', 'ngcPaTX', 'ngcPaTY', 'ngTextScale', 'ngcParText', 'left'), 2000);

		// turn timer active button left
		this.ngcTtaAL = this.ngcTtaAL || this.add.group();
		// turn timer active button right
		this.ngcTtaAR = this.ngcTtaAR || this.add.group();
		// turn timer active text
		this.ngcActTimText = this.ngcActTimText || this.add.group();
		// turn timer active label
		this.ngcActTimLabel = this.ngcActTimLabel || this.add.group();

		text = 'time per turn on/off'.toUpperCase();
		indices = [];
		this.ngcTtaLX = Math.floor(2 * this.game.width / 3 - (this.getTextLength(text) * this.blockSize * this.ngLabelScale) / 2);
		this.ngcTtaLY = Math.floor(280);
		this.getIndices(text, indices);
		this.typeText(text, indices, this.ngcTtaLX, this.ngcTtaLY, this.ngLabelScale, 'ngcActTimLabel', false, null, 0);

		this.ngcTurnTimers = ['on', 'off'];
		blocks.ngcTurnTimer = 'off';
		text = blocks.ngcTurnTimer.toUpperCase();
		indices = [];
		this.ngcTtaTX = Math.floor(2 * this.game.width / 3 - (this.getTextLength(text) * this.blockSize * this.ngTextScale) / 2);
		this.ngcTtaTY = Math.floor(310 + (5 * this.blockSize * this.ngLabelScale - 5 * this.blockSize * this.ngTextScale) / 2);
		this.getIndices(text, indices);
		this.typeText(text, indices, this.ngcTtaTX, this.ngcTtaTY, this.ngTextScale, 'ngcActTimText', false, null, 0);
		
		text = '<'.toUpperCase();
		indices = [];
		this.ngcTtaLAX = Math.floor(2 * this.game.width / 3 - (this.getTextLength(text) * this.blockSize * this.ngLabelScale) / 2 - this.getTextLength('normal'.toUpperCase()) * this.blockSize * this.ngLabelScale);
		this.ngcTtaLAY = Math.floor(310);
		this.getIndices(text, indices);
		this.typeText(text, indices, this.ngcTtaLAX, this.ngcTtaLAY, this.ngLabelScale, 'ngcTtaAL', 'ngcTtaAL', this.leftArrow('ngcTurnTimers', 'ngcTurnTimer', 'ngcTtaTX', 'ngcTtaTY', 'ngTextScale', 'ngcActTimText', 'right'), 2000);
		
		text = '>'.toUpperCase();
		indices = [];
		this.ngcTtaRAX = Math.floor(2 * this.game.width / 3 - (this.getTextLength(text) * this.blockSize * this.ngLabelScale) / 2 + this.getTextLength('normal'.toUpperCase()) * this.blockSize * this.ngLabelScale);
		this.ngcTtaRAY = Math.floor(310);
		this.getIndices(text, indices);
		this.typeText(text, indices, this.ngcTtaRAX, this.ngcTtaRAY, this.ngLabelScale, 'ngcTtaAR', 'ngcTtaAR', this.rightArrow('ngcTurnTimers', 'ngcTurnTimer', 'ngcTtaTX', 'ngcTtaTY', 'ngTextScale', 'ngcActTimText', 'right'), 2000);
	
		// turn time decrease active button left
		this.ngcTtdAL = this.ngcTtdAL || this.add.group();
		// turn time decrease active button right
		this.ngcTtdAR = this.ngcTtdAR || this.add.group();
		// turn time decrease active text
		this.ngcActDecText = this.ngcActDecText || this.add.group();
		// turn time decrease active label
		this.ngcActDecLabel = this.ngcActDecLabel || this.add.group();

		text = 'time decrease on/off'.toUpperCase();
		indices = [];
		this.ngcTtdLX = Math.floor(this.game.width / 3 - (this.getTextLength(text) * this.blockSize * this.ngLabelScale) / 2);
		this.ngcTtdLY = Math.floor(350);
		this.getIndices(text, indices);
		this.typeText(text, indices, this.ngcTtdLX, this.ngcTtdLY, this.ngLabelScale, 'ngcActDecLabel', false, null, 0);

		this.ngcTurnTimersDec = ['on', 'off'];
		blocks.ngctimeDecreaseActive = 'on';
		text = blocks.ngctimeDecreaseActive.toUpperCase();
		indices = [];
		this.ngcTtdTX = Math.floor(this.game.width / 3 - (this.getTextLength(text) * this.blockSize * this.ngTextScale) / 2);
		this.ngcTtdTY = Math.floor(380 + (5 * this.blockSize * this.ngLabelScale - 5 * this.blockSize * this.ngTextScale) / 2);
		this.getIndices(text, indices);
		this.typeText(text, indices, this.ngcTtdTX, this.ngcTtdTY, this.ngTextScale, 'ngcActDecText', false, null, 0);
		
		text = '<'.toUpperCase();
		indices = [];
		this.ngcTtdLAX = Math.floor(this.game.width / 3 - (this.getTextLength(text) * this.blockSize * this.ngLabelScale) / 2 - this.getTextLength('normal'.toUpperCase()) * this.blockSize * this.ngLabelScale);
		this.ngcTtdLAY = Math.floor(380);
		this.getIndices(text, indices);
		this.typeText(text, indices, this.ngcTtdLAX, this.ngcTtdLAY, this.ngLabelScale, 'ngcTtdAL', 'ngcTtdAL', this.leftArrow('ngcTurnTimersDec', 'ngctimeDecreaseActive', 'ngcTtdTX', 'ngcTtdTY', 'ngTextScale', 'ngcActDecText', 'left'), 2000);
		
		text = '>'.toUpperCase();
		indices = [];
		this.ngcTtdRAX = Math.floor(this.game.width / 3 - (this.getTextLength(text) * this.blockSize * this.ngLabelScale) / 2 + this.getTextLength('normal'.toUpperCase()) * this.blockSize * this.ngLabelScale);
		this.ngcTtdRAY = Math.floor(380);
		this.getIndices(text, indices);
		this.typeText(text, indices, this.ngcTtdRAX, this.ngcTtdRAY, this.ngLabelScale, 'ngcTtdAR', 'ngcTtdAR', this.rightArrow('ngcTurnTimersDec', 'ngctimeDecreaseActive', 'ngcTtdTX', 'ngcTtdTY', 'ngTextScale', 'ngcActDecText', 'left'), 2000);
			
		// turn time button left
		this.ngcTtAL = this.ngcTtAL || this.add.group();
		// turn time button right
		this.ngcTtAR = this.ngcTtAR || this.add.group();
		// turn time text
		this.ngcTurnTimeText = this.ngcTurnTimeText || this.add.group();
		// turn time label
		this.ngcTurnTimeLabel = this.ngcTurnTimeLabel || this.add.group();

		text = 'turn time [sec]'.toUpperCase();
		indices = [];
		this.ngcTtLX = Math.floor(2 * this.game.width / 3 - (this.getTextLength(text) * this.blockSize * this.ngLabelScale) / 2);
		this.ngcTtLY = Math.floor(350);
		this.getIndices(text, indices);
		this.typeText(text, indices, this.ngcTtLX, this.ngcTtLY, this.ngLabelScale, 'ngcTurnTimeLabel', false, null, 0);

		this.ngcTurnTimes = [];
		for (var i = 2; i < 21; i++)
		{
			this.ngcTurnTimes.push(String(i));
		}
		blocks.ngcTurnTime = '1';
		text = blocks.ngcTurnTime.toUpperCase();
		indices = [];
		this.ngcTtTX = Math.floor(2 * this.game.width / 3 - (this.getTextLength(text) * this.blockSize * this.ngTextScale) / 2);
		this.ngcTtTY = Math.floor(380 + (5 * this.blockSize * this.ngLabelScale - 5 * this.blockSize * this.ngTextScale) / 2);
		this.getIndices(text, indices);
		this.typeText(text, indices, this.ngcTtTX, this.ngcTtTY, this.ngTextScale, 'ngcTurnTimeText', false, null, 0);
		
		text = '<'.toUpperCase();
		indices = [];
		this.ngcTtLAX = Math.floor(2 * this.game.width / 3 - (this.getTextLength(text) * this.blockSize * this.ngLabelScale) / 2 - this.getTextLength('normal'.toUpperCase()) * this.blockSize * this.ngLabelScale);
		this.ngcTtLAY = Math.floor(380);
		this.getIndices(text, indices);
		this.typeText(text, indices, this.ngcTtLAX, this.ngcTtLAY, this.ngLabelScale, 'ngcTtAL', 'ngcTtAL', this.leftArrow('ngcTurnTimes', 'ngcTurnTime', 'ngcTtTX', 'ngcTtTY', 'ngTextScale', 'ngcTurnTimeText', 'right'), 2000);
		
		text = '>'.toUpperCase();
		indices = [];
		this.ngcTtRAX = Math.floor(2 * this.game.width / 3 - (this.getTextLength(text) * this.blockSize * this.ngLabelScale) / 2 + this.getTextLength('normal'.toUpperCase()) * this.blockSize * this.ngLabelScale);
		this.ngcTtRAY = Math.floor(380);
		this.getIndices(text, indices);
		this.typeText(text, indices, this.ngcTtRAX, this.ngcTtRAY, this.ngLabelScale, 'ngcTtAR', 'ngcTtAR', this.rightArrow('ngcTurnTimes', 'ngcTurnTime', 'ngcTtTX', 'ngcTtTY', 'ngTextScale', 'ngcTurnTimeText', 'right'), 2000);
		
		// turn time dt button left
		this.ngcTTDtAL = this.ngcTTDtAL || this.add.group();
		// turn time dt button right
		this.ngcTTDtAR = this.ngcTTDtAR || this.add.group();
		// turn time dt text
		this.ngcTurnDtText = this.ngcTurnDtText || this.add.group();
		// turn time dt label
		this.ngcTurnDtLabel = this.ngcTurnDtLabel || this.add.group();
		
		text = 'turn time decrease [sec]'.toUpperCase();
		indices = [];
		this.ngcTTDtLX = Math.floor((this.game.width - (this.getTextLength(text) * this.blockSize * this.ngLabelScale)) / 2);
		this.ngcTTDtLY = Math.floor(420);
		this.getIndices(text, indices);
		this.typeText(text, indices, this.ngcTTDtLX, this.ngcTTDtLY, this.ngLabelScale, 'ngcTurnDtLabel', false, null, 0);

		this.ngcTurnTimeDts = [];
		for (var i = 1; i < 21; i++)
		{
			this.ngcTurnTimeDts.push(String(i));
		}
		blocks.ngcTurnTimeDt = '1';
		text = blocks.ngcTurnTimeDt.toUpperCase();
		indices = [];
		this.ngcTTDtTX = Math.floor((this.game.width - (this.getTextLength(text) * this.blockSize * this.ngTextScale)) / 2);
		this.ngcTTDtTY = Math.floor(450 + (5 * this.blockSize * this.ngLabelScale - 5 * this.blockSize * this.ngTextScale) / 2);
		this.getIndices(text, indices);
		this.typeText(text, indices, this.ngcTTDtTX, this.ngcTTDtTY, this.ngTextScale, 'ngcTurnDtText', false, null, 0);
		
		text = '<'.toUpperCase();
		indices = [];
		this.ngcTTDtLAX = Math.floor((this.game.width - (this.getTextLength(text) * this.blockSize * this.ngLabelScale)) / 2 - this.getTextLength('normal'.toUpperCase()) * this.blockSize * this.ngLabelScale);
		this.ngcTTDtLAY = Math.floor(450);
		this.getIndices(text, indices);
		this.typeText(text, indices, this.ngcTTDtLAX, this.ngcTTDtLAY, this.ngLabelScale, 'ngcTTDtAL', 'ngcTTDtAL', this.leftArrow('ngcTurnTimeDts', 'ngcTurnTimeDt', 'ngcTTDtTX', 'ngcTTDtTY', 'ngTextScale', 'ngcTurnDtText', false), 2000);
		
		text = '>'.toUpperCase();
		indices = [];
		this.ngcTTDtRAX = Math.floor((this.game.width - (this.getTextLength(text) * this.blockSize * this.ngLabelScale)) / 2 + this.getTextLength('normal'.toUpperCase()) * this.blockSize * this.ngLabelScale);
		this.ngcTTDtRAY = Math.floor(450);
		this.getIndices(text, indices);
		this.typeText(text, indices, this.ngcTTDtRAX, this.ngcTTDtRAY, this.ngLabelScale, 'ngcTTDtAR', 'ngcTTDtAR', this.rightArrow('ngcTurnTimeDts', 'ngcTurnTimeDt', 'ngcTTDtTX', 'ngcTTDtTY', 'ngTextScale', 'ngcTurnDtText', false), 2000);

		// time period to decrease turn time button left
		this.ngcTpAL = this.ngcTpAL || this.add.group();
		// time period to decrease turn time  button right
		this.ngcTpAR = this.ngcTpAR || this.add.group();
		// time period to decrease turn time  text
		this.ngcTurnPText = this.ngcTurnPText || this.add.group();
		// time period to decrease turn time  label
		this.ngcTurnPLabel = this.ngcTurnPLabel || this.add.group();
		
		text = 'decrease time rate [sec]'.toUpperCase();
		indices = [];
		this.ngcTpLX = Math.floor((this.game.width - (this.getTextLength(text) * this.blockSize * this.ngLabelScale)) / 2);
		this.ngcTpLY = Math.floor(490);
		this.getIndices(text, indices);
		this.typeText(text, indices, this.ngcTpLX, this.ngcTpLY, this.ngLabelScale, 'ngcTurnPLabel', false, null, 0);

		this.ngcTimeSteps = [];
		for (var i = 1; i < 41; i++)
		{
			this.ngcTimeSteps.push(String(i));
		}
		blocks.ngcTimeStep = '30';
		text = blocks.ngcTimeStep.toUpperCase();
		indices = [];
		this.ngcTpTX = Math.floor((this.game.width - (this.getTextLength(text) * this.blockSize * this.ngTextScale)) / 2);
		this.ngcTpTY = Math.floor(520 + (5 * this.blockSize * this.ngLabelScale - 5 * this.blockSize * this.ngTextScale) / 2);
		this.getIndices(text, indices);
		this.typeText(text, indices, this.ngcTpTX, this.ngcTpTY, this.ngTextScale, 'ngcTurnPText', false, null, 0);
		
		text = '<'.toUpperCase();
		indices = [];
		this.ngcTpLAX = Math.floor((this.game.width - (this.getTextLength(text) * this.blockSize * this.ngLabelScale)) / 2 - this.getTextLength('normal'.toUpperCase()) * this.blockSize * this.ngLabelScale);
		this.ngcTpLAY = Math.floor(520);
		this.getIndices(text, indices);
		this.typeText(text, indices, this.ngcTpLAX, this.ngcTpLAY, this.ngLabelScale, 'ngcTpAL', 'ngcTpAL', this.leftArrow('ngcTimeSteps', 'ngcTimeStep', 'ngcTpTX', 'ngcTpTY', 'ngTextScale', 'ngcTurnPText', false), 2000);
		
		text = '>'.toUpperCase();
		indices = [];
		this.ngcTpRAX = Math.floor((this.game.width - (this.getTextLength(text) * this.blockSize * this.ngLabelScale)) / 2 + this.getTextLength('normal'.toUpperCase()) * this.blockSize * this.ngLabelScale);
		this.ngcTpRAY = Math.floor(520);
		this.getIndices(text, indices);
		this.typeText(text, indices, this.ngcTpRAX, this.ngcTpRAY, this.ngLabelScale, 'ngcTpAR', 'ngcTpAR', this.rightArrow('ngcTimeSteps', 'ngcTimeStep', 'ngcTpTX', 'ngcTpTY', 'ngTextScale', 'ngcTurnPText', false), 2000);

		// minimum time per turn button left
		this.ngcTmAL = this.ngcTmAL || this.add.group();
		// minimum time per turn button right
		this.ngcTmAR = this.ngcTmAR || this.add.group();
		// minimum time per turn text
		this.ngcTMText = this.ngcTMText || this.add.group();
		// minimum time per turn label
		this.ngcTMLabel = this.ngcTMLabel || this.add.group();
		
		text = 'min time per turn [sec]'.toUpperCase();
		indices = [];
		this.ngcTmLX = Math.floor((this.game.width - (this.getTextLength(text) * this.blockSize * this.ngLabelScale)) / 2);
		this.ngcTmLY = Math.floor(560);
		this.getIndices(text, indices);
		this.typeText(text, indices, this.ngcTmLX, this.ngcTmLY, this.ngLabelScale, 'ngcTMLabel', false, null, 0);

		this.ngcTimeMins = [];
		for (var i = 2; i < 10.1; i += 0.5)
		{
			this.ngcTimeMins.push((Math.round(i * 10) / 10).toFixed(1));
		}
		blocks.ngcTimeMin = '3.0';
		text = blocks.ngcTimeMin.toUpperCase();
		indices = [];
		this.ngcTmTX = Math.floor((this.game.width - (this.getTextLength(text) * this.blockSize * this.ngTextScale)) / 2);
		this.ngcTmTY = Math.floor(590 + (5 * this.blockSize * this.ngLabelScale - 5 * this.blockSize * this.ngTextScale) / 2);
		this.getIndices(text, indices);
		this.typeText(text, indices, this.ngcTmTX, this.ngcTmTY, this.ngTextScale, 'ngcTMText', false, null, 0);
		
		text = '<'.toUpperCase();
		indices = [];
		this.ngcTmLAX = Math.floor((this.game.width - (this.getTextLength(text) * this.blockSize * this.ngLabelScale)) / 2 - this.getTextLength('normal'.toUpperCase()) * this.blockSize * this.ngLabelScale);
		this.ngcTmLAY = Math.floor(590);
		this.getIndices(text, indices);
		this.typeText(text, indices, this.ngcTmLAX, this.ngcTmLAY, this.ngLabelScale, 'ngcTmAL', 'ngcTmAL', this.leftArrow('ngcTimeMins', 'ngcTimeMin', 'ngcTmTX', 'ngcTmTY', 'ngTextScale', 'ngcTMText', false), 2000);
		
		text = '>'.toUpperCase();
		indices = [];
		this.ngcTmRAX = Math.floor((this.game.width - (this.getTextLength(text) * this.blockSize * this.ngLabelScale)) / 2 + this.getTextLength('normal'.toUpperCase()) * this.blockSize * this.ngLabelScale);
		this.ngcTmRAY = Math.floor(590);
		this.getIndices(text, indices);
		this.typeText(text, indices, this.ngcTmRAX, this.ngcTmRAY, this.ngLabelScale, 'ngcTmAR', 'ngcTmAR', this.rightArrow('ngcTimeMins', 'ngcTimeMin', 'ngcTmTX', 'ngcTmTY', 'ngTextScale', 'ngcTMText', false), 2000);

		// ngc select button
		this.ngcSelect = this.ngcSelect || this.add.group();
		text = 'select'.toUpperCase();
		indices = [];
		this.ngcSelectX = Math.floor((this.game.width - this.getTextLength(text) * this.blockSize * 1.5 * this.ngLabelScale) / 2);
		this.ngcSelectY = Math.floor(650);
		
		this.ngcSelectDummy = this.ngcSelectDummy || this.add.image(this.ngcSelectX, this.ngcSelectY, 'dummy');
		this.ngcSelectDummy.width = this.getTextLength(text) * this.blockSize * 1.5 * this.ngLabelScale;
		this.ngcSelectDummy.height = 5 * this.blockSize * 1.5 * this.ngLabelScale;
		this.ngcSelectDummy.renderable = false;
		this.ngcSelectDummy.inputEnabled = false;
		this.ngcSelectDummy.events.onInputDown.add(function()
		{
			this.destroyCustomMenu();
			this.destroyNewGame();
			
			this.state.start('game');
		}, this);
		
		this.getIndices(text, indices);
		this.typeText(text, indices, this.ngcSelectX, this.ngcSelectY, 1.5 * this.ngLabelScale, 'ngcSelect', 'ngcSelectDummy', null, 0);

		// ngc return button
		this.ngcReturn = this.ngcReturn || this.add.group();
		text = 'return'.toUpperCase();
		indices = [];
		this.ngcReturnX = Math.floor((this.game.width - this.getTextLength(text) * this.blockSize * 1.5 * this.ngLabelScale) / 2);
		this.ngcReturnY = Math.floor(690);
		
		this.ngcReturnDummy = this.ngcReturnDummy || this.add.image(this.ngcReturnX, this.ngcReturnY, 'dummy');
		this.ngcReturnDummy.width = this.getTextLength(text) * this.blockSize * 1.5 * this.ngLabelScale;
		this.ngcReturnDummy.height = 5 * this.blockSize * 1.5 * this.ngLabelScale;
		this.ngcReturnDummy.renderable = false;
		this.ngcReturnDummy.inputEnabled = false;
		this.ngcReturnDummy.events.onInputDown.add(function()
		{
			blocks.ngCustom = false;
			this.ngcReturnDummy.renderable = false;
			this.ngcReturnDummy.inputEnabled = false;
			this.ngcReturnDummy.events.onInputDown.removeAll();
			this.ngcSelectDummy.renderable = false;
			this.ngcSelectDummy.inputEnabled = false;
			this.ngcSelectDummy.events.onInputDown.removeAll();
			
			for (var i = 0; i < this.ngcGroups.length; i++)
			{
				this.ngcGroups[i].callAll('kill');
				this.ngcGroups[i].callAll('events.onInputDown.removeAll', 'events.onInputDown');
				this.ngcGroups[i].setAll('inputEnabled', false);
			}

			this.newGame();
		}, this);
		
		this.getIndices(text, indices);
		this.typeText(text, indices, this.ngcReturnX, this.ngcReturnY, 1.5 * this.ngLabelScale, 'ngcReturn', 'ngcReturnDummy', null, 0);
		
		this.ngcGroups = [
			this.ngcML,
			this.ngcMR,
			this.ngcMText,
			this.ngcMLabel,
			this.ngcSL,
			this.ngcSR,
			this.ngcSText,
			this.ngcSLabel,
			this.ngcPL,
			this.ngcPR,
			this.ngcPopText,
			this.ngcPopLabel,
			this.ngcNL,
			this.ngcNR,
			this.ngcNeutText,
			this.ngcNeutLabel,
			this.ngcCL,
			this.ngcCR,
			this.ngcChainText,
			this.ngcChainLabel,
			this.ngcRL,
			this.ngcRR,
			this.ngcRestText,
			this.ngcRestLabel,
			this.ngcPAL,
			this.ngcPAR,
			this.ngcParText,
			this.ngcParLabel,
			this.ngcTtaAL,
			this.ngcTtaAR,
			this.ngcActTimText,
			this.ngcActTimLabel,
			this.ngcTtdAL,
			this.ngcTtdAR,
			this.ngcActDecText,
			this.ngcActDecLabel,
			this.ngcTtAL,
			this.ngcTtAR,
			this.ngcTurnTimeText,
			this.ngcTurnTimeLabel,
			this.ngcTTDtAL,
			this.ngcTTDtAR,
			this.ngcTurnDtText,
			this.ngcTurnDtLabel,
			this.ngcTpAL,
			this.ngcTpAR,
			this.ngcTurnPText,
			this.ngcTurnPLabel,
			this.ngcTmAL,
			this.ngcTmAR,
			this.ngcTMText,
			this.ngcTMLabel,
			this.ngcReturn,
			this.ngcSelect
		];
	},
	
	destroyCustomMenu: function()
	{
		this.ngcReturnDummy.inputEnabled = false;
		this.ngcReturnDummy.events.onInputDown.removeAll();
		this.ngcSelectDummy.inputEnabled = false;
		this.ngcSelectDummy.events.onInputDown.removeAll();
		this.ngcReturnDummy.destroy();
		this.ngcSelectDummy.destroy();
		this.ngcReturnDummy = undefined;
		this.ngcSelectDummy = undefined;
		
		for (var i = 0; i < this.ngcGroups.length; i++)
		{
			this.ngcGroups[i].callAll('events.onInputDown.removeAll', 'events.onInputDown');
			this.ngcGroups[i].setAll('inputEnabled', false);
			this.ngcGroups[i].destroy(true);
			this.ngcGroups[i] = undefined;
		}
		
		this.ngcML = undefined;
		this.ngcMR = undefined;
		this.ngcMText = undefined;
		this.ngcMLabel = undefined;
		this.ngcSL = undefined;
		this.ngcSR = undefined;
		this.ngcSText = undefined;
		this.ngcSLabel = undefined;
		this.ngcPL = undefined;
		this.ngcPR = undefined;
		this.ngcPopText = undefined;
		this.ngcPopLabel = undefined;
		this.ngcNL = undefined;
		this.ngcNR = undefined;
		this.ngcNeutText = undefined;
		this.ngcNeutLabel = undefined;
		this.ngcCL = undefined;
		this.ngcCR = undefined;
		this.ngcChainText = undefined;
		this.ngcChainLabel = undefined;
		this.ngcRL = undefined;
		this.ngcRR = undefined;
		this.ngcRestText = undefined;
		this.ngcRestLabel = undefined;
		this.ngcPAL = undefined;
		this.ngcPAR = undefined;
		this.ngcParText = undefined;
		this.ngcParLabel = undefined;
		this.ngcTtaAL = undefined;
		this.ngcTtaAR = undefined;
		this.ngcActTimText = undefined;
		this.ngcActTimLabel = undefined;
		this.ngcTtdAL = undefined;
		this.ngcTtdAR = undefined;
		this.ngcActDecText = undefined;
		this.ngcActDecLabel = undefined;
		this.ngcTtAL = undefined;
		this.ngcTtAR = undefined;
		this.ngcTurnTimeText = undefined;
		this.ngcTurnTimeLabel = undefined;
		this.ngcTTDtAL = undefined;
		this.ngcTTDtAR = undefined;
		this.ngcTurnDtText = undefined;
		this.ngcTurnDtLabel = undefined;
		this.ngcTpAL = undefined;
		this.ngcTpAR = undefined;
		this.ngcTurnPText = undefined;
		this.ngcTurnPLabel = undefined;
		this.ngcTmAL = undefined;
		this.ngcTmAR = undefined;
		this.ngcTMText = undefined;
		this.ngcTMLabel = undefined;
		this.ngcReturn = undefined;
		this.ngcSelect = undefined;
	},
	
	getTextLength: function(text)
	{
		var length = 0;
		
		for (var i = 0; i < text.length; i++)
		{
			if (text[i] !== 'W')
			{
				length += 4;
			}
			else
			{
				length += 6;
			}
		}
		
		return length;
	},
	
	getIndices: function(text, indices)
	{
		for (var i = 0; i < text.length; i++)
		{
			indices.push(i);
		}
	},
	
	typeText: function(text, indices, px, py, scale, group, menuOption, callback, time)
	{
		if (indices.length === 0)
		{
			if (group === menuOption)
			{
				this.game.time.events.add(time, function()
				{
					this[group].setAll('inputEnabled', true);
					this[group].callAll('events.onInputDown.add', 'events.onInputDown', callback);
				}, this);
			}
			else
			{
				if (menuOption !== false)
				{
					this.game.time.events.add(time, function()
					{
						this[menuOption].inputEnabled = true;
					}, this);
				}
			}
			
			return;
		}
		
		var index = indices.splice(this.rnd.integerInRange(0, indices.length - 1), 1);
			
		var letter = text[index];
		
		if (letter !== ' ')
		{
			var dx = 0;

			for (var i = 0; i < index; i++)
			{
				if (text[i] !== 'W')
				{
					dx += this.blockSize * scale * 4;
				}
				else
				{
					dx += this.blockSize * scale * 6;
				}
			}

			var blocks = [];

			for (var i = 0; i < this.alphabet[letter].length; i++)
			{
				for (var j = 0; j < this.alphabet[letter][i].length; j++)
				{
					blocks.push([this.alphabet[letter][i][j], i]);
				}
			}

			var block;

			while(true)
			{
				if (blocks.length === 0)
				{
					break;
				}

				block = blocks.splice(this.rnd.integerInRange(0, blocks.length - 1), 1);
				
				var tweenTime = this.addBlock(time, false, true, block, px + dx, py, scale, group);
				
				if (tweenTime > time)
				{
					time = tweenTime;
				}
			}
		}	
	
		this.game.time.events.add(50, function()
		{
			time -= 50;
			this.typeText(text, indices, px, py, scale, group, menuOption, callback, time);
		}, this);
	},
	
	addBlock: function(time, title, text, textBlock, px, py, scale, textGroup)
	{	
	
		var image,
			number = this.rnd.integerInRange(1, 36),
			direction = this.directions[this.rnd.integerInRange(0, 3)],
			blockSize = this.blockSize;

		if (!title && text !== true)
		{
			var group = this.imageBufferGroup;
			var images = [];
			var cap = this.rnd.integerInRange(1, 6);
			
			for (var i = 0; i < cap; i++)
			{
				image = group.getFirstDead();

				if (image)
				{
					image.alive = true;
					images.push(image);
				}
				else
				{
					images.push(false);
				}
			}
		}

		if (title)
		{
			if (this.chainsTitle.length === 0)
			{
				return time;
			}
			
			image = false;
			number = this.number;
			var block = this.chainsTitle.splice(this.rnd.integerInRange(0, this.chainsTitle.length - 1), 1);
		}

		if (text === true)
		{
			number = this.number;
			blockSize *= scale;
			image = this[textGroup].getFirstDead();
			block = textBlock;
		}

		switch(direction)
		{
			case 'top':
				var x = (text === true) ? px + blockSize * block[0][0] : this.rnd.integerInRange(0, this.game.width - blockSize),
					y = this.game.height,
					xx = false,
					yy = -6 * blockSize;
				break;
			case 'down':
				var x = (text === true) ? px + blockSize * block[0][0] : this.rnd.integerInRange(0, this.game.width - blockSize),
					y = -blockSize,
					xx = false,
					yy = this.game.height + 6 * blockSize;
				break;
			case 'right':
				var x = -blockSize,
					y = (text === true) ? py + blockSize * block[0][1] : this.rnd.integerInRange(0, this.game.height - blockSize),
					xx = this.game.width + 6 * blockSize,
					yy = false;
				break;
			case 'left':
				var x = this.game.width,
					y = (text === true) ? py + blockSize * block[0][1] : this.rnd.integerInRange(0, this.game.height - blockSize),
					xx = -6 * blockSize,
					yy = false;
				break;
		}
		
		if (title)
		{
			xx = this.titlePaddingX + blockSize * block[0][0];
			yy = this.titlePaddingY + blockSize * block[0][1];
		}
		else if (text === true)
		{
			xx = px + blockSize * block[0][0];
			yy = py + blockSize * block[0][1];
		}
		
		
        if (title && !image)
        {
			image = this.titleGroup.getFirstDead();
			image.key = 'block' + blocks.padNumber(number);
			image.loadTexture(image.key);
			image.reset(x, y);
		}
		else if (text === true && !image)
		{
			image = this.add.image(x, y, 'block' + blocks.padNumber(number), 0, this[textGroup]);
		}
		else if ((title && image) || (text === true && image))
		{
			image.key = 'block' + blocks.padNumber(number);
			image.loadTexture(image.key);
			image.reset(x, y);
		}

		if (!title && text !== true)
		{
			var newGroup = (this.rnd.integerInRange(0, 1) === 0) ? this.imageGroup : this.imageGroup2;
			
			for (var i = 0; i < images.length; i++)
			{
				number = this.rnd.integerInRange(1, 36);
				
				if (!images[i])
				{
					if (i === 0)
					{
						switch(direction)
						{
							case 'top':
								images[i] = this.add.image(x, y + i * this.blockSize, 'block' + blocks.padNumber(number), 0, newGroup);
								break;
							case 'down':
								images[i] = this.add.image(x, y - i * this.blockSize, 'block' + blocks.padNumber(number), 0, newGroup);
								break;
							case 'right':
								images[i] = this.add.image(x - i * this.blockSize, y, 'block' + blocks.padNumber(number), 0, newGroup);
								break;
							case 'left':
								images[i] = this.add.image(x + i * this.blockSize, y, 'block' + blocks.padNumber(number), 0, newGroup);
								break;
						}
					}
					else
					{
						switch(direction)
						{
							case 'top':
								images[0].addChild(this.game.add.image(0, i * this.blockSize, 'block' + blocks.padNumber(number), 0, newGroup));
								break;
							case 'down':
								images[0].addChild(this.game.add.image(0, - i * this.blockSize, 'block' + blocks.padNumber(number), 0, newGroup));
								break;
							case 'right':
								images[0].addChild(this.game.add.image(- i * this.blockSize, 0, 'block' + blocks.padNumber(number), 0, newGroup));
								break;
							case 'left':
								images[0].addChild(this.game.add.image(i * this.blockSize, 0, 'block' + blocks.padNumber(number), 0, newGroup));
								break;
						}
					}
				}
				else
				{
					group.remove(images[i]);
					newGroup.add(images[i]);
					
					if (i === 0)
					{
						switch(direction)
						{
							case 'top':
								images[i].key = 'block' + blocks.padNumber(number);
								images[i].loadTexture(images[i].key);
								images[i].reset(x, y + i * this.blockSize);
								break;
							case 'down':
								images[i].key = 'block' + blocks.padNumber(number);
								images[i].loadTexture(images[i].key);
								images[i].reset(x, y - i * this.blockSize);
								break;
							case 'right':
								images[i].key = 'block' + blocks.padNumber(number);
								images[i].loadTexture(images[i].key);
								images[i].reset(x - i * this.blockSize, y);
								break;
							case 'left':
								images[i].key = 'block' + blocks.padNumber(number);
								images[i].loadTexture(images[i].key);
								images[i].reset(x + i * this.blockSize, y);
								break;
						}
					}
					else
					{
						images[i].key = 'block' + blocks.padNumber(number);
						images[i].loadTexture(images[i].key);
						images[i].alive = true;
						images[i].exists = true;
						images[i].visible = true;
						images[i].renderable = true;
						
						switch(direction)
						{
							case 'top':
								images[i].x = 0;
								images[i].y = i * this.blockSize;
								break;
							case 'down':
								images[i].x = 0;
								images[i].y = -i * this.blockSize;
								break;
							case 'right':
								images[i].x = -i * this.blockSize;
								images[i].y = 0;
								break;
							case 'left':
								images[i].x = i * this.blockSize;
								images[i].y = 0;
								break;
						}

						images[0].addChild(images[i]);
					}
				}
				
				var font = 'bold 25px Times New Roman';
				var style = {font: font, fill: '#ffffff', wordWrap: true, wordWrapWidth: this.blockSize, align: 'center'};
				var label = this.add.text(0, 0, number, style);
				label.setScaleMinMax(0, 1);
				label.anchor.set(0.5);
				label.smoothed = false;
				label.name = 'label';
				
				switch(direction)
				{
					case 'top':
						label.x = Math.floor(images[0].width / 2);
						label.y = Math.floor(i * this.blockSize + images[0].height / 2 + 2);
						break;
					case 'down':
						label.x = Math.floor(images[0].width / 2);
						label.y = Math.floor(-i * this.blockSize + images[0].height / 2 + 2);
						break;
					case 'right':
						label.x = Math.floor(-i * this.blockSize + images[0].width / 2);
						label.y = Math.floor(images[0].height / 2 + 2);
						break;
					case 'left':
						label.x = Math.floor(i * this.blockSize + images[0].width / 2);
						label.y = Math.floor(images[0].height / 2 + 2);
						break;
				}

				images[0].addChild(label);

			}
		}
		
		if (text === true)
		{
			image.scale.set(scale);
		}
		
		var tweenTime = this.rnd.integerInRange(5000, 15000);
		
		if (title)
		{
			tweenTime = this.rnd.integerInRange(1000, 1200);
		}
		else if (text === true)
		{
			tweenTime = (scale < 0.2) ? this.rnd.integerInRange(800, 1000) : this.rnd.integerInRange(1500, 2500);
		}
		
		if (tweenTime > time)
		{
			time = tweenTime;
		}
		
		if (xx === false)
		{
			images[0].tween = this.add.tween(images[0]).to({y: yy}, tweenTime);
		}
		else if (yy === false)
		{
			images[0].tween = this.add.tween(images[0]).to({x: xx}, tweenTime);
		}
		else
		{
			image.tween = this.add.tween(image).to({x: xx, y: yy}, tweenTime);
		}
		
		if (!title && text !== true)
		{
			images[0].tween.onComplete.add(this.tweenFn, this);
		}
		else if (title)
		{
			this.titleTimer = this.game.time.events.add(100, function()
			{
				time -= 100;
				this.addBlock(time, true);
			}, this);
		}
		
		if (!title && text !== true)
		{
			images[0].tween.start();
		}
		else
		{
			image.tween.start();
		}
		
		return time;
	},
	
	tweenFn: function(image)
	{
		image.kill();

		var removed = image.removeChildren(0, image.children.length);
		
		for (var i = 0; i < removed.length; i++)
		{
			if (removed[i].name === 'label')
			{
				removed[i].destroy();
			}
			else
			{
				removed[i].kill();
				this.imageBufferGroup.add(removed[i]);
			}
		}
		
		image.parent.remove(image);
		this.imageBufferGroup.add(image);
	}
	
};