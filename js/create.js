blocks.game.prototype.create = function() {

    this.game.time.advancedTiming = true;

	this.cursor = this.input.keyboard.createCursorKeys();
	this.spaceBar = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	this.input.keyboard.addKeyCapture([Phaser.Keyboard.UP,
                                       Phaser.Keyboard.DOWN,
									   Phaser.Keyboard.LEFT,
                                       Phaser.Keyboard.RIGHT,
									   Phaser.Keyboard.SPACEBAR]);
    this.controlsUp = {
        up: true,
        right: true,
        down: true,
        left: true
    };                                       
                                       
    this.cursor.up.onUp.add(this.onKeyUp, this);
    this.cursor.right.onUp.add(this.onKeyUp, this);
    this.cursor.down.onUp.add(this.onKeyUp, this);
    this.cursor.left.onUp.add(this.onKeyUp, this);

//    blocks.gameMode = 'tetris';
//    blocks.size = '15x15';
//    blocks.difficulty = 'normal';
//        blocks.gameMode = 'tetris';
//         // custom game settings
//        this.rows = 15;
//        this.columns = 15;
//        this.blockSize = Math.floor(this.game.width / (this.rows + 4));
//        this.populated = 0;  // 0.1
//        this.centerBlocksCount = 0;
//        this.chainLengthMin = 3;
//        this.blockRestrictions = 36;
//        this.parity = false;
//        this.turnTimerActive = true;
//        this.timeDecreaseActive = true;
//        this.turnTime = 2 * 1000;  // 10 * 1000
//        this.turnTimeDt = 1 * 1000;
//        this.turnTimeRedTime = 40 * 1000;
//        this.turnTimeMin = 2.5 * 1000;
        this.quit = false;
        this.longestChain = 0;
        this.lastChain = 0;
        this.pushingBlocks = false;
        this.spaceBarReleased = true;
        
    if (blocks.ngCustom)
    {
        // custom game settings
        blocks.gameMode = blocks.ngcMode;  // normal / tetris
        this.rows = parseFloat(blocks.size);
        this.columns = parseFloat(blocks.size);
        this.blockSize = (blocks.gameMode === 'tetris') ? Math.floor((this.game.width - 2) / (this.rows + 4)) : Math.floor((this.game.width - 2) / (this.rows + 2));
        
        var k = Math.floor((this.game.width - this.rows * this.blockSize) / 2); // k = paddingX
        // adjust blockSize by substracting one pixel in case of there is a remainder left after dividing game width (i.e. if not adjusted there are two extra pixel lines - hor + ver - which are untouched).
        if (((this.game.width - 2 * k) / this.blockSize) % 1 !== 0)
        {
            this.blockSize--;
        }
        
        this.populated = Number(blocks.populated);
        this.centerBlocksCount = Number(blocks.centerBlocksCount);
        this.chainLengthMin = Number(blocks.chainLengthMin);
        this.blockRestrictions = Number(blocks.blockRestrictions);
        this.parity = (blocks.ngcParity === 'no') ? false : true;
        this.turnTimerActive = (blocks.ngcTurnTimer === 'off') ? false : true;
        this.timeDecreaseActive = (blocks.ngctimeDecreaseActive === 'off') ? false : true;
        this.turnTime = Number(blocks.ngcTurnTime) * 1000;
        this.turnTimeDt = Number(blocks.ngcTurnTimeDt) * 1000;
        this.turnTimeRedTime = Number(blocks.ngcTimeStep) * 1000;
        this.turnTimeMin = Number(blocks.ngcTimeMin) * 1000;
    }
    else if (blocks.gameMode === 'normal')
    {
        this.chainLengthMin = 3;  // min length for chain
        this.parity = false;  // true = only odd numbers on blocks
        this.turnTimerActive = true;  // false = unlimited time per turn
        this.timeDecreaseActive = true;  // false = no time is substracted from turnTime
        this.turnTimeMin = 4000;  // min time per turn [ms]
        this.turnTimeRedTimeDt = 0;
        
        if (blocks.difficulty === 'easy')
        {
            this.populated = 0; // how much is field populated by random blocks  <0; 1>
            this.blockRestrictions = 9;  // max number on blocks
            this.centerBlocksCount = 1; // number of centerblock blocks in the field
            this.turnTime = 10000;  // how much time per one turn (becfore one block is forced into the field) [ms]
            this.turnTimeRedTime = 60000;  // how long until turnTime is lowered [ms]
            this.turnTimeDt = 1000;  // how much to lower turnTime [ms]
        }
        else if (blocks.difficulty === 'normal')
        {
            this.populated = 0.2;
            this.blockRestrictions = 18;
            this.centerBlocksCount = 5;
            this.turnTime = 10000;
            this.turnTimeRedTime = 60000;
            this.turnTimeDt = 1500;
            this.turnTimeRedTimeDt = 2000;
        }
        else if (blocks.difficulty === 'challenge')
        {
            this.populated = 0.4;
            this.blockRestrictions = 36;
            this.centerBlocksCount = 10;
            this.turnTime = 10000;
            this.turnTimeMin = 2500;
            this.turnTimeRedTime = 60000;
            this.turnTimeDt = 2000;
            this.parity = true;
            this.chainLengthMin = 4;
            this.turnTimeRedTimeDt = 5000;
        }
        
        if (blocks.size === '9x9')
        {
            this.rows = 9;
            this.columns = 9;
            this.blockSize = Math.floor(this.game.width / (this.rows + 2));
        }
        else if (blocks.size === '15x15')
        {
            this.rows = 15;
            this.columns = 15;
            this.blockSize = Math.floor(this.game.width / (this.rows + 2));
        }
        else if (blocks.size === '21x21')
        {
            this.rows = 21;
            this.columns = 21;
            this.blockSize = 30;
        }
    }
    else if (blocks.gameMode === 'tetris')
    {
//            this.chainLengthMin = 3;  // min length for chain
//            this.parity = false;  // true = only odd numbers on blocks
//            this.turnTimerActive = true;  // false = unlimited time per turn
//            this.timeDecreaseActive = true;  // false = no time is substracted from turnTime
//            this.turnTimeMin = 2500;
//            this.populated = 0.4;
//            this.blockRestrictions = 18;
//            this.centerBlocksCount = 5;
//            this.turnTime = 10000;
//            this.turnTimeRedTime = 20000;
//            this.turnTimeDt = 1500;
//            this.rows = 19;
//            this.columns = 19;
//            this.blockSize = 30;
        this.chainLengthMin = 3;  // min length for chain
        this.parity = false;  // true = only odd numbers on blocks
        this.turnTimerActive = true;  // false = unlimited time per turn
        this.timeDecreaseActive = true;  // false = no time is substracted from turnTime
        this.turnTimeMin = 4000;
        this.turnTimeRedTimeDt = 0;
        
        if (blocks.difficulty === 'easy')
        {
            this.populated = 0; // how much is field populated by random blocks  <0; 1>
            this.turnTime = 15000;  // how much time per one turn (becfore one block is forced into the field)
            this.turnTimeDt = 1000;  // how much to lower turnTime
            this.turnTimeRedTime = 60000;  // how long until turnTime is lowered [ms]
        }
        else if (blocks.difficulty === 'normal')
        {
            this.populated = 0.2;
            this.turnTime = 15000;
            this.turnTimeDt = 1500;
            this.turnTimeRedTime = 60000;
            this.turnTimeRedTimeDt = 2000;
        }
        else if (blocks.difficulty === 'challenge')
        {
            this.populated = 0.4;
            this.turnTime = 10000;
            this.turnTimeDt = 2000;
            this.turnTimeRedTime = 60000;
            this.turnTimeRedTimeDt = 5000;
            this.turnTimeMin = 2500;
            this.chainLengthMin = 4;
        }
        
        if (blocks.size === '9x9')
        {
            this.blockRestrictions = 6;  // max number on blocks
            this.centerBlocksCount = 1; // number of centerblock blocks in the field
            this.rows = 9;
            this.columns = 9;
            this.blockSize = Math.floor((this.game.width - 2) / (this.rows + 4));  // ADDED -2
        }
        else if (blocks.size === '15x15')
        {
            this.blockRestrictions = 9;
            this.centerBlocksCount = 3;
            this.rows = 15;
            this.columns = 15;
            this.blockSize = Math.floor((this.game.width - 2) / (this.rows + 4));
        }
        else if (blocks.size === '21x21')
        {
            this.blockRestrictions = 12;
            this.centerBlocksCount = 5;
            this.rows = 21;
            this.columns = 21;
            this.blockSize = Math.floor((this.game.width - 2) / (this.rows + 4)) - 1; // ADDED -1 TO ADJUST FOR ODD NUMBER AFTER DIVISTION OF GAME.WIDTH (ONE PIXEL IS EXTRA FOR WIDTH AND HEIGHT, SO -1 CHANGES THE DIMENSIONS OF BLOCKS A BIT - see comments around 'k' in custom game mode above
        }
    }

    this.forceTurn = false;
    this.gameover = false;
    this.blockDestroyScale = 0;  // how much to scale down the block when being destroyed (animation)
    this.blockDestroyTweenTime = 500;

    // positions of blocks in the game
    this.field = {};
    this.blockImageWidth = 30;
    this.scaleFactor = this.blockSize / this.blockImageWidth;
    this.gameSize = this.rows * this.columns;

    this.controlsVelocity = this.blockSize;
    this.controlsTweenTime = Math.floor(120 * this.scaleFactor * 0.8);
    this.blockVelocity = Math.floor(1500 * this.rows / 15);  // normalized to 15x15 grid size

    this.moveTimer = 0;
    this.controlsActivate = false;
    this.controlsTweenTimeFactor = this.rows > 15 ? 1.6 : this.rows < 15 ? 1.2 : 1.35;

    this.topBarHeight = 40;
    
    // border for blocks which are not yet in the field
    this.paddingX = Math.floor((this.game.width - this.rows * this.blockSize) / 2);
    this.paddingY = Math.floor((this.game.height - this.topBarHeight - this.columns * this.blockSize) / 2);

    // information at the top of the screen, score, menu, pause.
    //this.topBarBMD = this.game.add.bitmapData(this.game.width, this.topBarHeight);
    //this.topBarBMD.ctx.fillStyle = 'rgb(228, 147, 188)';//'rgb(253, 218, 239)'; // rgb(255, 2, 128) a19da7
    //this.topBarBMD.ctx.fillRect(0, 0, this.game.width, this.topBarHeight);
    //this.topBarBMD.addToWorld(0, 0);

    var style = {font: '28px Times New Roman', fill: 'rgb(199, 0, 100)'};//'#ffffff'};
    this.menuText = this.game.add.text(this.game.width - 10, Math.floor(this.topBarHeight / 2), 'MENU', style);
    this.menuText.anchor.y = 0.4;
    this.menuText.anchor.x = 1;
    this.menuText.inputEnabled = true;
    this.menuText.events.onInputDown.add(this.menu, this);

    var style = {font: '28px Times New Roman', fill: 'rgb(199, 0, 100)'};//'#ffffff'};
    this.pauseText = this.game.add.text(this.game.width - this.menuText.width - 20, Math.floor(this.topBarHeight / 2), 'PAUSE |', style);
    this.pauseText.anchor.y = 0.4;
    this.pauseText.anchor.x = 1;
    this.pauseText.inputEnabled = true;
    this.pauseText.events.onInputDown.add(this.pause, this);

    this.game.input.onDown.add(this.onKeyDown, this);
    this.game.input.keyboard.onDownCallback = this.onKeyDown.bind(this);

    // grid - border (1px) around, then grid inside, that's why gridBMD width and height are 2 pixels larger then the field itself because of the surrounding border
    this.bgGridBMD = this.game.add.bitmapData(this.game.width - this.paddingX * 2 + 2, this.game.height - this.topBarHeight - this.paddingY * 2 + 2);
    this.bgGridBMD.ctx.fillStyle = '#ffffff';
    this.bgGridBMD.ctx.fillRect(0, 0, this.game.width - this.paddingX * 2 + 2, this.game.height - this.topBarHeight - this.paddingY * 2 + 2);
    this.bgGridBMD.ctx.fillStyle = 'rgba(0, 0, 0, 0.12)';
    this.bgGridBMD.ctx.fillRect(0, 0, this.game.width - this.paddingX * 2 + 2, 1);
    this.bgGridBMD.ctx.fillRect(0, 1, 1, this.game.height - this.topBarHeight - this.paddingY * 2);
    this.bgGridBMD.ctx.fillRect(this.game.width - this.paddingX * 2 + 1, 1, 1, this.game.height - this.topBarHeight - this.paddingY * 2);
    this.bgGridBMD.ctx.fillRect(0, this.game.height - this.topBarHeight - this.paddingY * 2 + 1, this.game.width - this.paddingX * 2 + 2, 1);
    
    for (var y = 0; y < this.rows; y++)
    {
        for (var x = 0; x < this.columns; x++)
        {
            this.bgGridBMD.ctx.fillRect(x * this.blockSize + 1 + 1, y * this.blockSize + 1, this.blockSize  - 2, 1);
            this.bgGridBMD.ctx.fillRect(x * this.blockSize + 1 + 1, y * this.blockSize + this.blockSize - 1 + 1, this.blockSize  - 2, 1);
            this.bgGridBMD.ctx.fillRect(x * this.blockSize + 1, y * this.blockSize + 1, 1, this.blockSize);
            this.bgGridBMD.ctx.fillRect(x * this.blockSize + this.blockSize - 1 + 1, y * this.blockSize + 1, 1, this.blockSize);
        }
    }
    this.bgGridBMD.addToWorld(this.paddingX - 1, this.topBarHeight + this.paddingY - 1);

    // guide lines to make easier to see where the block will be dropped
    // hl - horizontal lines, vl - vertical lines
    if (blocks.gameMode === 'tetris')
    {
        this.guideWidth = 3 * this.blockSize;
        this.hlBMD = this.game.add.bitmapData(this.game.width - this.paddingX * 2, this.guideWidth);
        this.hlBMD.ctx.fillStyle = '#ff0000'; //685d7e
        this.hlBMD.ctx.fillRect(0, 0, this.game.width - this.paddingX * 2, 1);
        this.hlBMD.ctx.fillRect(0, this.guideWidth - 1, this.game.width - this.paddingX * 2, 1);
        //this.game.cache.addBitmapData('horizontallines', this.hlBMD);
        
        this.vlBMD = this.game.add.bitmapData(this.guideWidth, this.game.height - this.topBarHeight - this.paddingY * 2);
        this.vlBMD.ctx.fillStyle = '#ff0000';
        this.vlBMD.ctx.fillRect(0, 0, 1, this.game.height - this.paddingY * 2);
        this.vlBMD.ctx.fillRect(this.guideWidth - 1, 0, 1, this.game.height - this.paddingY * 2);
        //this.game.cache.addBitmapData('verticallines', this.vlBMD);
    }
    else
    {
        this.hlBMD = this.game.add.bitmapData(this.game.width - this.paddingX * 2, this.blockSize);
        this.hlBMD.ctx.fillStyle = '#ff0000'; //685d7e
        this.hlBMD.ctx.fillRect(0, 0, this.game.width - this.paddingX * 2, 1);
        this.hlBMD.ctx.fillRect(0, this.blockSize - 1, this.game.width - this.paddingX * 2, 1);
        //this.game.cache.addBitmapData('horizontallines', this.hlBMD);
        
        this.vlBMD = this.game.add.bitmapData(this.blockSize, this.game.height - this.topBarHeight - this.paddingY * 2);
        this.vlBMD.ctx.fillStyle = '#ff0000';
        this.vlBMD.ctx.fillRect(0, 0, 1, this.game.height - this.paddingY * 2);
        this.vlBMD.ctx.fillRect(this.blockSize - 1, 0, 1, this.game.height - this.paddingY * 2);
        //this.game.cache.addBitmapData('verticallines', this.vlBMD);
    }
    
    //this.hls = this.add.image(0, 0, this.game.cache.getBitmapData('horizontallines'));
    this.hls = this.hlBMD.addToWorld(0, 0);
    this.hls.renderable = false;
    //this.vls = this.add.image(0, 0, this.game.cache.getBitmapData('verticallines'));
    this.vls = this.vlBMD.addToWorld(0, 0);
    this.vls.renderable = false;

    // rectangles for sides, only one is visible depending on this.direction (which side is active), it's tweened to lose opacity, if opacity goes to zero the block is send into the field
    this.topRectBMD = this.add.bitmapData(this.game.width - 2 * this.paddingX, this.paddingY);
    this.topRectBMD.ctx.fillStyle = 'rgb(199, 0, 100)';  //rgb(199, 0, 100)
    this.topRectBMD.ctx.fillRect(0, 0, this.game.width - 2 * this.paddingX, this.paddingY);
    //this.topRectBMD.addToWorld(this.paddingX, this.topBarHeight);
    this.game.cache.addBitmapData('topRect', this.topRectBMD);
    this.topRect = this.add.image(this.paddingX, this.topBarHeight, this.game.cache.getBitmapData('topRect'));
    this.topRect.renderable = false;
    
    this.rightRectBMD = this.add.bitmapData(this.paddingX, this.game.height - this.topBarHeight - 2 * this.paddingY);
    this.rightRectBMD.ctx.fillStyle = 'rgb(199, 0, 100)';
    this.rightRectBMD.ctx.fillRect(0, 0, this.paddingX, this.game.height - this.topBarHeight - 2 * this.paddingY);
    //this.rightRectBMD.addToWorld(0, this.paddingY + this.topBarHeight);
    this.game.cache.addBitmapData('rightRect', this.rightRectBMD);
    this.rightRect = this.add.image(this.game.width - this.paddingX, this.paddingY + this.topBarHeight, this.game.cache.getBitmapData('rightRect'));
    this.rightRect.renderable = false;
    
    this.botRectBMD = this.add.bitmapData(this.game.width - 2 * this.paddingX, this.paddingY);
    this.botRectBMD.ctx.fillStyle = 'rgb(199, 0, 100)';
    this.botRectBMD.ctx.fillRect(0, 0, this.game.width - 2 * this.paddingX, this.paddingY);
    //this.botRectBMD.addToWorld(this.paddingX, this.game.height - this.paddingY);
    this.game.cache.addBitmapData('botRect', this.botRectBMD);
    this.botRect = this.add.image(this.paddingX, this.game.height - this.paddingY, this.game.cache.getBitmapData('botRect'));
    this.botRect.renderable = false;
    
    this.leftRectBMD = this.add.bitmapData(this.paddingX, this.game.height - this.topBarHeight - 2 * this.paddingY);
    this.leftRectBMD.ctx.fillStyle = 'rgb(199, 0, 100)';
    this.leftRectBMD.ctx.fillRect(0, 0, this.paddingX, this.game.height - this.topBarHeight - 2 * this.paddingY);
    //this.leftRectBMD.addToWorld(this.game.width - this.paddingX, this.paddingY + this.topBarHeight);
    this.game.cache.addBitmapData('leftRect', this.leftRectBMD);
    this.leftRect = this.add.image(0, this.paddingY + this.topBarHeight, this.game.cache.getBitmapData('leftRect'));
    this.leftRect.renderable = false;
    
    this.sideRectTween = null;
    
    // initiate field object, main object where all blocks are pushed into for chains
    for (var i = 0; i < this.rows; i++)
    {
        this.field[i] = [];
        for (var j = 0; j < this.columns; j++)
        {
            this.field[i][j] = {alive: false, value: -1, image: null, tween: null};
        }
    }
    
    this.centerBlock = {
        x: Math.floor(this.rows / 2),
        y: Math.floor(this.columns / 2)
    };

    this.centerBlock.image = this.add.image(Math.floor(this.game.width / 2 - this.blockSize / 2), Math.floor(this.topBarHeight + (this.game.height - this.topBarHeight) / 2 - this.blockSize / 2), 'centerblock');
    this.centerBlock.image.scale.setTo(this.scaleFactor);
    this.centerBlock.value = 'centerblock';
    this.centerBlock.alive = true;
    this.field[this.centerBlock.y][this.centerBlock.x] = this.centerBlock;
//    
//    this.centerBlock.image = this.add.image(Math.floor(this.paddingX + 7 * this.blockSize), Math.floor(this.topBarHeight + this.paddingY), 'centerblock');
//    this.centerBlock.image.scale.setTo(this.scaleFactor);
//    this.centerBlock.value = 'centerblock';
//    this.centerBlock.alive = true;
//    this.field[0][7] = this.centerBlock;
//    
//    this.centerBlock.image = this.add.image(Math.floor(this.paddingX), Math.floor(this.topBarHeight + this.paddingY + 7 * this.blockSize), 'centerblock');
//    this.centerBlock.image.scale.setTo(this.scaleFactor);
//    this.centerBlock.value = 'centerblock';
//    this.centerBlock.alive = true;
//    this.field[7][0] = this.centerBlock;    
//    this.centerBlock.image = this.add.image(Math.floor(this.paddingX + 8 * this.blockSize), Math.floor(this.topBarHeight + this.paddingY + 14 * this.blockSize), 'centerblock');
//    this.centerBlock.image.scale.setTo(this.scaleFactor);
//    this.centerBlock.value = 'centerblock';
//    this.centerBlock.alive = true;
//    this.field[14][8] = this.centerBlock;    
//    this.centerBlock.image = this.add.image(Math.floor(this.paddingX + 14 * this.blockSize), Math.floor(this.topBarHeight + this.paddingY + 8 * this.blockSize), 'centerblock');
//    this.centerBlock.image.scale.setTo(this.scaleFactor);
//    this.centerBlock.value = 'centerblock';
//    this.centerBlock.alive = true;
//    this.field[8][14] = this.centerBlock;    

    this.imageGroup = this.add.group();
    this.overlayImageGroup = this.add.group();
    
    //  add neutral "centerblock"s to the field
    var count = 0;
    while (count < this.centerBlocksCount - 1)
    {
        var x = this.rnd.integerInRange(1, this.columns - 2);
        var y = this.rnd.integerInRange(1, this.rows - 2);
        
        if (this.field[y][x].alive === true)
        {        
            continue;
        }
        
        count++;
        var centerBlock = {};
        centerBlock.image = this.add.image(Math.floor(this.paddingX + x * this.blockSize), Math.floor(this.topBarHeight + this.paddingY + y * this.blockSize), 'centerblock');
        centerBlock.image.scale.setTo(this.scaleFactor);
        centerBlock.value = 'centerblock';
        centerBlock.alive = true;
        this.field[y][x] = centerBlock;
    }
    
    this.startingPoints = {  // TODO
        top:
        {
            x: Math.floor(this.game.width / 2 - this.blockSize / 2),
            y: this.topBarHeight + Math.floor(this.paddingY - this.blockSize)
        },
        right:
        {
            x: Math.floor(this.game.width - this.paddingX),
            y: Math.floor(this.topBarHeight + (this.game.height - this.topBarHeight) / 2 - this.blockSize / 2)
        },
        bottom:
        {
            x: Math.floor(this.game.width / 2 - this.blockSize / 2),
            y: Math.floor(this.game.height - this.paddingY)
        },
        left:
        {
            x: Math.floor(this.paddingX - this.blockSize),
            y: Math.floor(this.topBarHeight + (this.game.height - this.topBarHeight) / 2 - this.blockSize / 2)
        }
    };


    // prepare a set of numbers which are used during a game on blocks
    this.number = [];
    
    this.blockCntMx = Object.create(null);
    this.blockCntMx.total = 0;
    this.blockCntMx.length = 0;
    
    for (var i = 1; i <= this.blockRestrictions; i++)
    {
        this.blockCntMx[i] = {cnt: 0, p: 100};
        this.blockCntMx.length++;
        
        if (this.parity)
        {
            if (i % 2 !== 0)
            {
                this.number.push(i);
                if (i <= this.blockRestrictions / 2)
                {
                    this.number.push(i);
                }
            }
        }
        else
        {
            this.number.push(i);
            if (i <= this.blockRestrictions / 2)
            {
                this.number.push(i);
            }
        }
    }

    var population = Math.floor(this.populated * (this.rows - 2) * (this.columns - 2));
    var index = 0;
    
    while(true)
    {
        if (index >= population)
        {
            break;
        }
        
        var x = blocks.gameMode === 'tetris' ? this.rnd.integerInRange(2, this.columns - 3) : this.rnd.integerInRange(1, this.columns - 2);
        var y = blocks.gameMode === 'tetris' ? this.rnd.integerInRange(2, this.rows - 3) : this.rnd.integerInRange(1, this.rows - 2);
        
        if (this.field[y][x].alive === true && this.field[y][x].value !== 'centerblock')
        {        
            continue;
        }
        
        if (this.field[y][x].value !== 'centerblock')
        {
            var number = this.number[this.rnd.integerInRange(0, this.number.length - 1)];
            
            if (blocks.gameMode === 'tetris')
            {
                this.blockCntMx[number].cnt++;
                this.blockCntMx.total++;
            }
            
            this.addBlockToField({value: number, alive: true, image: this.addBlock({x: x * this.blockSize + this.paddingX, y: y * this.blockSize + this.topBarHeight + this.paddingY}, number), tween: null}, y, x);
        }
        
        index++;
    }
    
    this.currentSets = {top: undefined, right: undefined, bottom: undefined, left: undefined};

    if (blocks.gameMode === 'tetris' && blocks.size !== '9x9')
    {
        this.tetrisBlockSets = [
            {x: [0, 0, 1], y: [0, 1, 1]},
            {x: [-1, 0, 0], y: [1, 1, 0]},
            {x: [-1, 0, 0], y: [1, 1, 0]},
            {x: [0, 0, 1], y: [1, 0, 0]},
            {x: [0, 0], y: [1, 0]},
            {x: [0, 1], y: [0, 0]},
            {x: [-1, 0, 1], y: [0, 0, 0]},
            {x: [-1, 0, 1, -1], y: [1, 1, 1, 0]},
            {x: [-1, 0, 1, 0], y: [1, 1, 1, 0]},
            {x: [-1, 0, 1, 1], y: [1, 1, 1, 0]},
            {x: [0, 1, 0, 1], y: [1, 1, 0, 0]},
            {x: [0], y: [0]},
            {x: [0, -1, 0, 1], y: [1, 0, 0, 0]},
            {x: [-1, -1, 0, 1], y: [1, 0, 0, 0]},
            {x: [1, -1, 0, 1], y: [1, 0, 0, 0]},
            {x: [0, 0, 1], y: [1, 0, 0]},
            {x: [0, -1, 0], y: [1, 0, 0]}
        ];
    }
    else
    {
        this.tetrisBlockSets = [
            {x: [0, 0, 1], y: [0, 1, 1]},
            {x: [-1, 0, 0], y: [1, 1, 0]},
            {x: [-1, 0, 0], y: [1, 1, 0]},
            {x: [0, 0, 1], y: [1, 0, 0]},
            {x: [0, 0], y: [1, 0]},
            {x: [0, 1], y: [0, 0]},
            {x: [0], y: [0]},
            {x: [0, 0, 1], y: [1, 0, 0]},
            {x: [0, -1, 0], y: [1, 0, 0]}
        ];
    }

    this.buffer = {};

    if (blocks.gameMode === 'tetris')
    {
        this.buffer.top = [];
        this.buffer.right = [];
        this.buffer.bottom = [];
        this.buffer.left = [];
    }
    
    this.updateBuffer('top');
    this.updateBuffer('right');
    this.updateBuffer('bottom');
    this.updateBuffer('left');

    this.directions = ['top', 'right', 'bottom', 'left'];
    this.direction = 'top';
    
    if (blocks.gameMode === 'tetris')
    {
        this.updateGuidesBMD();
    }
    
/*    this.controlsVelocity = this.blockSize;
    this.controlsTweenTime = Math.floor(120 * this.scaleFactor * 0.8);
    this.blockVelocity = 1500;*/

    if (blocks.gameMode === 'normal')
    {
        this.activeBlock = this.buffer.top;
        this.activeRow = Math.floor(this.rows / 2);
        this.activeColumn = Math.floor(this.columns / 2);
        this.prevRow = false;
        this.prevCol = false;
    }
    else if (blocks.gameMode === 'tetris')
    {
        this.activeBlocks = this.buffer.top;
        this.activeRow = Math.floor(this.rows / 2);
        this.activeColumn = Math.floor(this.columns / 2);
        this.prevRows = false;
        this.prevCols = false;
    }
    
    // reset vertical and/or horizontal guide lines positions and renerability
    this.resetLinesPosition();

    // true if controls are ON false if controls are OFF
    this.controlsActive = true;
    
    // max and min used to determine if the block can be still moved by the player or not (on edges before entering the field)
    this.limits = {
        horizontal: {
            min: this.paddingX,
            max: this.game.width - this.paddingX
        },
        vertical: {
            min: this.paddingY + this.topBarHeight,
            max: this.game.height - this.paddingY
        }
    };
    
    this.score = 0;
    this.time = 0;
    
    this.blockAddition = true;
    
    if (blocks.gameMode !== 'tetris')
    {
        this.sums = {
            tr: {val: 0, text: null }, // top right
            br: {val: 0, text: null }, // bottom rigt
            bl: {val: 0, text: null }, // bottom left
            tl: {val: 0, text: null }  // top left
        };
        var font = 'bold ' + 30 * this.scaleFactor + 'px Times New Roman';
        var style = {font: font, fill: 'rgb(199, 0, 100)', wordWrap: true, wordWrapWidth: this.blockSize, align: 'center'}
        this.sums.tr.text = this.add.text(Math.floor(this.game.width - this.paddingX / 2), Math.floor(this.topBarHeight + this.paddingY / 2 + 3), this.sums.tr.val, style);
        this.sums.tr.text.anchor.set(0.5);
        this.sums.tr.text.smoothed = false;

        this.sums.br.text = this.add.text(Math.floor(this.game.width - this.paddingX / 2), Math.floor(this.game.height - this.paddingY / 2 + 4), this.sums.br.val, style);
        this.sums.br.text.anchor.set(0.5);
        this.sums.br.text.smoothed = false;

        this.sums.bl.text = this.add.text(Math.floor(this.paddingX / 2), Math.floor(this.game.height - this.paddingY / 2 + 4), this.sums.bl.val, style);
        this.sums.bl.text.anchor.set(0.5);
        this.sums.bl.text.smoothed = false;

        this.sums.tl.text = this.add.text(Math.floor(this.paddingX / 2), Math.floor(this.topBarHeight + this.paddingY / 2 + 3), this.sums.tl.val, style);
        this.sums.tl.text.anchor.set(0.5);
        this.sums.tl.text.smoothed = false;

        this.updateSums();
    }
    this.createGameOverScreen();
    
    var score = 'SCORE: ' + this.score;
    this.scoreText = this.game.add.text(10, Math.floor(this.topBarHeight / 2), score, {font: '28px Times New Roman', fill: 'rgb(199, 0, 100)'});//'#ffffff'});
    this.scoreText.anchor.y = 0.4;

    // prepare pause screen
    this.pauseBMD = this.add.bitmapData(this.game.width, Math.floor(this.topBarHeight * 1.5));
    this.pauseBMD.ctx.fillStyle = '#e5308b';
    this.pauseBMD.ctx.fillRect(0, 0, this.pauseBMD.width, this.pauseBMD.height); 
    this.pauseText = {};
    this.pauseText.fl = this.game.make.text(0, 0, 'GAME PAUSED', {font: '28px Times New Roman', fill: '#ffffff'});
    this.pauseText.fl.anchor.set(0.45);
    this.pauseBMD.draw(this.pauseText.fl, Math.floor(this.game.width / 2), Math.floor(this.topBarHeight / 2));
    this.pauseText.sl = this.game.make.text(0, 0, 'click to unpause', {font: '20px Times New Roman', fill: '#ffffff'});
    this.pauseText.sl.anchor.set(0.45);
    this.pauseBMD.draw(this.pauseText.sl, Math.floor(this.game.width / 2), this.pauseBMD.height - (this.pauseBMD.height - this.pauseText.fl.height) / 2);
    this.pauseScreen = this.pauseBMD.addToWorld(Math.floor(this.game.width / 2), Math.floor(this.game.height / 2), 0.5, 0.5);
    this.pauseScreen.renderable = false;
    
    if (this.timeDecreaseActive)
    {
        this.turnTimer = this.game.time.create(false);
        this.turnTimer.loop(this.turnTimeRedTime, this.turnTimerFn, this);
        this.turnTimer.start();
    }
    
    if (this.turnTime !== false)
    {
        this.setTurnTimer();
    }
};