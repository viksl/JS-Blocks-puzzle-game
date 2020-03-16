blocks.game.prototype = {

    moveBlock: function()
    {
        if (this.controlsActive && !this.forceTurn)
        {
            // move block only when it's in the top or bottom segments
            if (this.direction === 'top' || this.direction === 'bottom')
            {
                if ((this.cursor.left.isDown && this.controlsUp.left) || (this.cursor.right.isDown && this.controlsUp.right))
                {
                    if (this.cursor.left.isDown)
                    {
                        if (this.activeBlock.image.x - this.controlsVelocity < this.limits.horizontal.min)
                        {
                            return;
                        }
                        var constant = -1;
                        var sign = '-';
                    }
                    else if (this.cursor.right.isDown)
                    {
                        if (this.activeBlock.image.x + this.activeBlock.image.width + this.controlsVelocity > this.limits.horizontal.max)
                        {
                            return;
                        }
                        var constant = 1;
                        var sign = '+';
                    }
                    
                    this.controlsActive = false;
                    
                    this.moveTimer = Date.now();
                    
                    this.prevCol = this.activeColumn;
                    this.activeColumn += constant;
                    
                    this.vls.tween = this.add.tween(this.vls).to({x: sign + this.controlsVelocity}, this.controlsTweenTime);
                    this.vls.tween.start();
                    this.activeBlock.tween = this.add.tween(this.activeBlock.image).to({x: sign + this.controlsVelocity}, this.controlsTweenTime);
                    this.activeBlock.tween.onComplete.add(this.controlsOn, this);
                    this.activeBlock.tween.start();
                }
            }
            // move block only when it's in the left or right segments
            else if (this.direction === 'right' || this.direction === 'left')
            {
                if ((this.cursor.up.isDown && this.controlsUp.up) || (this.cursor.down.isDown && this.controlsUp.down))
                {
                    if (this.cursor.up.isDown)
                    {
                        if (this.activeBlock.image.y - this.controlsVelocity < this.limits.vertical.min)
                        {
                            return;
                        }
                        var constant = -1;
                        var sign = '-';
                    }
                    else if (this.cursor.down.isDown)
                    {
                        if (this.activeBlock.image.y + this.activeBlock.image.height + this.controlsVelocity > this.limits.vertical.max)
                        {
                            return;
                        }
                        var constant = 1;
                        var sign = '+';
                    }

                    this.controlsActive = false;
                    
                    this.moveTimer = Date.now();
                    
                    this.prevRow = this.activeRow; 
                    this.activeRow += constant; 
                    
                    this.hls.tween = this.add.tween(this.hls).to({y: sign + this.controlsVelocity}, this.controlsTweenTime);
                    this.hls.tween.start();
                    this.activeBlock.tween = this.add.tween(this.activeBlock.image).to({y: sign + this.controlsVelocity}, this.controlsTweenTime);
                    this.activeBlock.tween.onComplete.add(this.controlsOn, this);
                    this.activeBlock.tween.start();
                }
            }
        }
    },

    moveBlocksTetris: function()
    {
        if (this.controlsActive && this.spaceBarReleased && !this.forceTurn)
        {
            // move block only when it's in the top or bottom segments
            if (this.direction === 'top' || this.direction === 'bottom')
            {
                if ((this.cursor.left.isDown && this.controlsUp.left) || (this.cursor.right.isDown && this.controlsUp.right))
                {
                    if (this.cursor.left.isDown)
                    {
                        for (var i = 0; i < this.activeBlocks.length; i++)
                        {
                            if (this.activeBlocks[i].image.x - this.controlsVelocity < this.limits.horizontal.min)
                            {
                                return;
                            } 
                        }
                        
                        var constant = -1;
                        var sign = '-';
                    }
                    else if (this.cursor.right.isDown)
                    {
                        for (var i = 0; i < this.activeBlocks.length; i++)
                        {
                            if (this.activeBlocks[i].image.x + this.activeBlocks[i].image.width + this.controlsVelocity > this.limits.horizontal.max)
                            {
                                return;
                            }
                        }
                        
                        var constant = 1;
                        var sign = '+';
                    }
                 
                    this.controlsActive = false;
                    
                    this.moveTimer = Date.now();
                    
                    this.prevCol = this.activeColumn;
                    this.activeColumn += constant;
                    
                    this.vls.tween = this.add.tween(this.vls).to({x: sign + this.controlsVelocity}, this.controlsTweenTime);
                    this.vls.tween.start();

                    for (var i = 0; i < this.activeBlocks.length; i++)
                    {
                        this.activeBlocks[i].tween = this.add.tween(this.activeBlocks[i].image).to({x: sign + this.controlsVelocity}, this.controlsTweenTime);
                        this.activeBlocks[i].tween.onComplete.add(this.controlsOn, this);
                        this.activeBlocks[i].tween.start();
                    }
                }
            }
            // move block only when it's in the left or right segments
            else if (this.direction === 'right' || this.direction === 'left')
            {
                if ((this.cursor.up.isDown && this.controlsUp.up) || (this.cursor.down.isDown && this.controlsUp.down))
                {
                    if (this.cursor.up.isDown)
                    {
                        for (var i = 0; i < this.activeBlocks.length; i++)
                        {
                            if (this.activeBlocks[i].image.y - this.controlsVelocity < this.limits.vertical.min)
                            {
                                return;
                            }
                        }
                        var constant = -1;
                        var sign = '-';
                    }
                    else if (this.cursor.down.isDown)
                    {
                        for (var i = 0; i < this.activeBlocks.length; i++)
                        {
                            if (this.activeBlocks[i].image.y + this.activeBlocks[i].image.height + this.controlsVelocity > this.limits.vertical.max)
                            {
                                return;
                            }
                        }
                        var constant = 1;
                        var sign = '+';
                    }

                    this.controlsActive = false;
                    
                    this.moveTimer = Date.now();
                    
                    this.prevRow = this.activeRow; 
                    this.activeRow += constant; 
                    
                    this.hls.tween = this.add.tween(this.hls).to({y: sign + this.controlsVelocity}, this.controlsTweenTime);
                    this.hls.tween.start();

                    for (var i = 0; i < this.activeBlocks.length; i++)
                    {
                        this.activeBlocks[i].tween = this.add.tween(this.activeBlocks[i].image).to({y: sign + this.controlsVelocity}, this.controlsTweenTime);
                        this.activeBlocks[i].tween.onComplete.add(this.controlsOn, this);
                        this.activeBlocks[i].tween.start();
                    }
                }
            }
        }
    },

    pushBlockToField: function()
    {
        if (this.controlsActive)
        {
            if (this.direction === 'top' || this.direction === 'bottom')
            {
                if (this.forceTurn ||
                   (this.cursor.down.isDown && this.controlsUp.down && this.direction === 'top') ||
                   (this.cursor.up.isDown && this.controlsUp.up && this.direction === 'bottom'))
                {    
                    if (this.direction === 'top'  && this.cursor.down.isDown || (this.direction === 'top' && this.forceTurn))
                    {
                        var bol = true;
                        var index = this.checkField(false, this.activeColumn, bol);
                        
                        if (index === false && this.forceTurn)
                        {
                            var validPosition = this.findLastValidPosition(true, false, bol, this.activeColumn, this.activeRow);
                            index = validPosition[0];
                            this.activeColumn = validPosition[1];
                            this.activeRow = validPosition[2];
                        }
                        
                        var time = Math.floor(this.blockVelocity * (index + 1) / this.rows);
                        var dir = 'top';
                        var next = 'right';
                    }
                    else if (this.direction === 'bottom' && this.cursor.up.isDown || (this.direction === 'bottom' && this.forceTurn))
                    {
                        var bol = false;
                        var index = this.checkField(false, this.activeColumn, bol);
                        
                        if (index === false && this.forceTurn)
                        {
                            var validPosition = this.findLastValidPosition(true, false, bol, this.activeColumn, this.activeRow);
                            index = validPosition[0];
                            this.activeColumn = validPosition[1];
                            this.activeRow = validPosition[2];
                        }
                        
                        var time = Math.floor(this.blockVelocity * (this.rows - index) / this.rows);
                        var dir = 'bottom';
                        var next = 'left';
                    }
                       
                    var test = this.testIndexBounds(false, index);
                    
                    if (test)
                    {
                        this.activeBlock.image.alpha = 0.65;
                        this.gameOver();
                        return;
                    }
                    
                    if (index === false)
                    {
                        return;
                    }
                    
                    this.controlsActive = false;
                    this.prevCol = false;

                    if (this.turnTimerActive)
                    {
                        this.sideRectTween.stop();
                    }
                    
                    this.changeDirection();
                    this.blockControlsOnKeyDown();

                    var block = this.activeBlock;
                    var forceTurn = this.forceTurn;
                    this.forceTurn = false;

                    this.activeBlock.tween = this.add.tween(this.activeBlock.image).to({y: this.topBarHeight + this.paddingY + this.blockSize * index}, time);
                    this.activeBlock.tween.onComplete.add(function()
                    {
                        this.addBlockToField(block, index, this.activeColumn);
                           
                        var blocksToDestroy = [];

                        blocksToDestroy = this.findChains(this.field);
                        
                        this.lastChain = blocksToDestroy.length / 2;

                        if (this.lastChain > this.longestChain)
                        {
                            this.longestChain = this.lastChain;
                        }
                        
                        this.popLastChainMsg();
                        
                        var destroy = this.destroyBlocks(blocksToDestroy);
                        
                        this.updateScoreText();
                        this.resetActiveRowColum();
                        this.updateBuffer(dir);
                        this.blockAddition = true;
                        this.updateSums();
                        
                        if (forceTurn)
                        {
                            this.onKeyUp();
                        }

                        //this.controlsOn();
                        this.controlsActive = true;

                        this.setTurnTimer();
                    }, this);
                       
                    this.activeBlock.tween.start();
                    
                    this.updateActiveBlock(this.activeBlock, next);
                }
            }
            else if (this.direction === 'right' || this.direction === 'left')
            {
                if (this.forceTurn ||
                   (this.cursor.left.isDown && this.controlsUp.left && this.direction === 'right') ||
                   (this.cursor.right.isDown && this.controlsUp.right && this.direction ==='left'))
                {
                    if (this.direction === 'right' && this.cursor.left.isDown || (this.direction === 'right' && this.forceTurn))
                    {
                        var bol = false;
                        var index = this.checkField(this.activeRow, false, bol);
                        
                        if (index === false && this.forceTurn)
                        {
                            var validPosition = this.findLastValidPosition(false, true, bol, this.activeColumn, this.activeRow);
                            index = validPosition[0];
                            this.activeColumn = validPosition[1];
                            this.activeRow = validPosition[2];
                        }
                        
                        var time = Math.floor(this.blockVelocity * (this.columns - index) / this.columns);
                        var dir = 'right';
                        var next = 'bottom';
                    }
                    else if (this.direction ==='left' && this.cursor.right.isDown || (this.direction === 'left' && this.forceTurn))
                    {
                        var bol = true;
                        var index = this.checkField(this.activeRow, false, bol);
                        
                        if (index === false && this.forceTurn)
                        {
                            var validPosition = this.findLastValidPosition(false, true, bol, this.activeColumn, this.activeRow);
                            index = validPosition[0];
                            this.activeColumn = validPosition[1];
                            this.activeRow = validPosition[2];
                        }
                        
                        var time = Math.floor(this.blockVelocity * (index + 1) / this.columns);
                        var dir = 'left';
                        var next = 'top';
                    }
                       
                    // check if block is placed outside bounds -> GAME OVER
                    var test = this.testIndexBounds(true, index);
                    
                    if (test)
                    {
                        this.gameOver();
                        return;
                    }
                   
                    if (index === false)
                    {
                        return;
                    }

                    this.controlsActive = false;
                    this.prevRow = false;
                    
                    if (this.turnTimerActive)
                    {
                        this.sideRectTween.stop();
                    }
                    
                    this.changeDirection();
                    this.blockControlsOnKeyDown();

                    var block = this.activeBlock;
                    var forceTurn = this.forceTurn;
                    this.forceTurn = false;

                    this.activeBlock.tween = this.add.tween(this.activeBlock.image).to({x: this.paddingX + this.blockSize * index}, time);
                    this.activeBlock.tween.onComplete.add(function()
                    {
                        this.addBlockToField(block, this.activeRow, index);
                           
                        var blocksToDestroy = [];

                        blocksToDestroy = this.findChains(this.field);
                        
                        this.lastChain = blocksToDestroy.length / 2;

                        if (this.lastChain > this.longestChain)
                        {
                            this.longestChain = this.lastChain;
                        }
                        
                        this.popLastChainMsg();
                        
                        var destroy = this.destroyBlocks(blocksToDestroy);
                        
                        this.updateScoreText();
                        this.resetActiveRowColum();
                        this.updateBuffer(dir);
                        this.blockAddition = true;
                        this.updateSums();
                        
                        if (forceTurn)
                        {
                            this.onKeyUp();
                        }
                        
                        //this.controlsOn();
                        this.controlsActive = true;

                        this.setTurnTimer();
                    }, this);
                       
                    this.activeBlock.tween.start();

                    this.updateActiveBlock(this.activeBlock, next);
                }

            }
        }
    },
    
    updateGuidesBMD: function()
    {
        var min, max;
        
        switch(this.direction)
        {
            case 'top':
                max = Math.max.apply(null, this.tetrisBlockSets[this.currentSets.top].x);
                min = Math.min.apply(null, this.tetrisBlockSets[this.currentSets.top].x);
                this.vlBMD.clear();
                this.vlBMD.ctx.fillStyle = '#ff0000';
                this.vlBMD.ctx.fillRect((min + 1) * this.blockSize, 0, 1, this.game.height - this.paddingY * 2);
                this.vlBMD.ctx.fillRect((max + 2) * this.blockSize - 1, 0, 1, this.game.height - this.paddingY * 2);
                break;
            case 'right':
                max = Math.max.apply(null, this.tetrisBlockSets[this.currentSets.right].x);
                min = Math.min.apply(null, this.tetrisBlockSets[this.currentSets.right].x);
                this.hlBMD.clear();
                this.hlBMD.ctx.fillStyle = '#ff0000';
                this.hlBMD.ctx.fillRect(0, this.guideWidth - (min + 1) * this.blockSize - 1, this.game.width - this.paddingX * 2, 1);
                this.hlBMD.ctx.fillRect(0, this.guideWidth - (max + 2) * this.blockSize, this.game.width - this.paddingX * 2, 1);
                break;
            case 'bottom':
                max = Math.max.apply(null, this.tetrisBlockSets[this.currentSets.bottom].x);
                min = Math.min.apply(null, this.tetrisBlockSets[this.currentSets.bottom].x);
                this.vlBMD.clear();
                this.vlBMD.ctx.fillStyle = '#ff0000';
                this.vlBMD.ctx.fillRect((min + 1) * this.blockSize, 0, 1, this.game.height - this.paddingY * 2);
                this.vlBMD.ctx.fillRect((max + 2) * this.blockSize - 1, 0, 1, this.game.height - this.paddingY * 2);
                break;
            case 'left':
                max = Math.max.apply(null, this.tetrisBlockSets[this.currentSets.left].x);
                min = Math.min.apply(null, this.tetrisBlockSets[this.currentSets.left].x);
                this.hlBMD.clear();
                this.hlBMD.ctx.fillStyle = '#ff0000';
                this.hlBMD.ctx.fillRect(0, this.guideWidth - (min + 1) * this.blockSize - 1, this.game.width - this.paddingX * 2, 1);
                this.hlBMD.ctx.fillRect(0, this.guideWidth - (max + 2) * this.blockSize, this.game.width - this.paddingX * 2, 1);
                break;
        }
    },
    
    isNumeric: function(num) {
        return !isNaN(parseFloat(num)) && isFinite(num);
    },

    newPositions: function(list, xy, lanes)
    {
        // find where the active blocks are
        // list - left top corner is (0, 0) right bottom corner is (2, 1), active column has coordinates (1, 0), (1, 1)
        //  List's dimensions below
        //    0 1 2
        //  0 x y z
        //  1 X Y Z
        //  y, Y are positions of active column blocks

        var col, // column
            pos, // validPosition, position
            cor, // column or row
            sign,
            endLoop = false,
            max,  // max limit, if in Y-axis then it's this.rows, if in X-axis then it's this.columns
            uB,  // upper bound, for Y-axis search it's this.columns, for X-axis search it's this.rows
            a,
            b,
            A,
            B,
            next = true;

        switch (this.direction)
        {
            case 'top':
                pos = [this.activeColumn - 1, -1];
                break;
            case 'right':
                pos = [this.columns - 1, this.activeRow - 1];
                break;
            case 'bottom':
                pos = [this.activeColumn - 1, this.rows - 1];
                break;
            case 'left':
                pos = [-1, this.activeRow - 1];
                break;
        }

        if (this.direction === 'top' || this.direction === 'bottom')
        {
            sign = this.activeColumn > this.prevCol ? -1 : 1;
            cor = this.activeColumn;
            max = this.rows;
            uB = this.columns;
            a = 0;
            b = 1;
        }
        else
        {
            sign = this.activeRow > this.prevRow ? -1 : 1;
            cor = this.activeRow;
            max = this.columns;
            uB = this.rows;
            a = 1;
            b = 0;
        }

        while (endLoop === false)
        {    
            next = true;
            
            // check if there is free space for active blocks in the column
            if (this.direction === 'top' || this.direction === 'left')
            {    
                outerLoop: for (var i = -1; i < max; i++)
                {
                    for (var j = 0; j < list.length; j++)
                    { 
                        A = i + list[j][b];
                        B = cor - 1 + list[j][a];

                        // check if it's not looking for blocks out of the field (block matrix), shouldn't happen so this check is here just to be sure
                        if (B < 0 || B >= uB)
                        {
                            break outerLoop;
                        }

                        if (A < 0)
                        {
                            pos = (this.direction === 'top') ? [cor - 1, A] : [A, cor - 1];

                            continue outerLoop;
                        }

                        if (A > max - 1)
                        {
                            pos = 'out';
                            
                            break outerLoop;
                        }

                        if (this.direction === 'top' && this.field[A][B].alive || this.direction === 'left' && this.field[B][A].alive)
                        {
                            next = false;
                            break outerLoop;
                        }
                    }
                    
                    pos = (this.direction === 'top') ? [cor - 1, i] : [i, cor - 1];
                }
            }
            else
            {
                outerLoop: for (var i = max - 1; i >= -1; i--)
                {
                    for (var j = 0; j < list.length; j++)
                    {
                        A = i + list[j][b];
                        B = cor - 1 + list[j][a];

                        // check if it's not looking for blocks out of the field (block matrix), shouldn't happen so this check is here just to be sure
                        if (B < 0 || B >= uB)
                        {
                            break outerLoop;
                        }

                        if (A > max - 1)
                        {
                            pos = (this.direction === 'bottom') ? [cor - 1, A] : [A, cor - 1];

                            continue outerLoop;
                        }

                        if (A < 0)
                        {
                            pos = 'out';
                            
                            break outerLoop;
                        }

                        if (this.direction === 'bottom' && this.field[A][B].alive || this.direction === 'right' && this.field[B][A].alive)
                        {
                            next = false;
                            break outerLoop; 
                        }
                    }

                    pos = (this.direction === 'bottom') ? [cor - 1, i] : [i, cor - 1];
                }
            }

            if (!this.forceTurn)
            {
                break;
            }

            if (!next)
            {
                if (this.direction === 'top' || this.direction === 'bottom')
                {
                    this.activeColumn = cor;   
                    this.vls.x = (this.activeColumn - 1) * this.blockSize + this.paddingX;
                }
                else
                {
                    this.activeRow = cor;   
                    this.hls.y = (this.activeRow - 1) * this.blockSize + this.paddingY + this.topBarHeight;
                }
                endLoop = true;
            }

            cor += sign;

            if (cor < 0 || cor >= uB)
            {
                sign *= -1;
                cor = (this.direction === 'top' || this.direction === 'bottom') ? this.activeColumn : this.activeRow;
            }
        }
        
        return pos;
    },
    
    popLastChainMsg: function()
    {
        if (this.lastChain === 0)
        {
            return;
        }
        var style = {font: '70px Times New Roman', fill: 'rgb(199, 0, 100)'};
        var textLastChainLength = this.game.add.text(this.game.width / 2, this.topBarHeight + (this.game.height - this.topBarHeight) / 2, this.lastChain + 'x', style);
        textLastChainLength.anchor.y = 0.5;
        textLastChainLength.anchor.x = 0.5;
        var tween = this.add.tween(textLastChainLength.scale).to({x: 1.5, y: 1.5}, 350);
        tween.onComplete.add(function() {
            textLastChainLength.destroy();
        }, this);
        tween.start();
    },
    
    pushBlocksToFieldTetris: function()
    {
        if (this.controlsActive && this.spaceBarReleased)
        {
            if (this.direction === 'top' || this.direction === 'bottom')
            {
                if (this.forceTurn ||
                   (this.cursor.down.isDown && this.controlsUp.down && this.direction === 'top') ||
                   (this.cursor.up.isDown && this.controlsUp.up && this.direction === 'bottom'))
                {
                    this.pushingBlocks = true;

                    if (this.direction === 'top' && this.cursor.down.isDown || (this.direction === 'top' && this.forceTurn))
                    {
                        var list = [],
                            xy,
                            lanes = {'1': false, '2': false};

                        for (var i = 0; i < this.activeBlocks.length; i++)
                        {
                            xy = [];

                            if (this.activeBlocks[i].image.x < this.paddingX + this.activeColumn * this.blockSize - this.blockSize / 2)
                            {
                                xy = [0, undefined];
                            }
                            else if (this.activeBlocks[i].image.x > this.paddingX + this.activeColumn * this.blockSize + this.blockSize / 2)
                            {
                                xy = [2, undefined];
                            }
                            else
                            {
                                xy = [1, undefined];
                            }

                            if (this.activeBlocks[i].image.y < this.topBarHeight + this.blockSize)
                            {
                                xy[1] = 0;
                                lanes['1']  = true;  
                            }
                            else
                            {
                                xy[1] = 1;
                                lanes['2']  = true;
                            }

                            xy.push(i);

                            list.push(xy);
                        }

                        var pos = this.newPositions(list, xy, lanes);

                        var dir = 'top';
                        var next = 'right';
                    }
                    else if (this.direction === 'bottom' && this.cursor.up.isDown || (this.direction === 'bottom' && this.forceTurn))
                    {
                        var list = [],
                            xy,
                            lanes = {'1': false, '2': false};

                        for (var i = 0; i < this.activeBlocks.length; i++)
                        {
                            xy = [];

                            if (this.activeBlocks[i].image.x < this.paddingX + this.activeColumn * this.blockSize - this.blockSize / 2)
                            {
                                xy = [0, undefined];
                            }
                            else if (this.activeBlocks[i].image.x > this.paddingX + this.activeColumn * this.blockSize + this.blockSize / 2)
                            {
                                xy = [2, undefined];
                            }
                            else
                            {
                                xy = [1, undefined];
                            }

                            if (this.activeBlocks[i].image.y < this.topBarHeight + this.paddingY + this.rows * this.blockSize + this.blockSize / 2)
                            {
                                xy[1] = 0;
                                lanes['2']  = true;
                            }
                            else
                            {
                                xy[1] = 1;
                                lanes['1']  = true;
                            }

                            xy.push(i);

                            list.push(xy);
                        }

                        var pos = this.newPositions(list, xy, lanes);
                        
                        var dir = 'bottom';
                        var next = 'left';
                    }

                    // return if no valid position in the current column/row is found
                    if (pos === 'out')
                    {
                        this.pushingBlocks = false;
                        return;
                    }
                    // game over if blocks end up out of game field
                    else if ((this.direction === 'top' && pos[1] < 0) || (this.direction === 'bottom' && pos[1] >= this.rows - 1))
                    {
                        // check for left and top directions because pos gives a position of a box for its top left corner
                        var x, y, quit = false;
                        for (var i = 0; i < list.length; i++)
                        {
                            x = pos[0] + list[i][0];
                            y = pos[1] + list[i][1];

                            if ((this.direction === 'top' && y < 0 ||
                                (this.direction === 'bottom' && y >= this.rows) ||
                                (this.direction === 'top' && this.field[y][x].alive)) ||
                                (this.direction === 'bottom' && this.field[y][x].alive))
                            {
                                quit = true;
                                break;
                            }
                        }

                        if (quit)
                        {
                            if (this.quit === false)
                            {
                                var block, x, y, time, sign;
                                
                                this.controlsActive = false;
                                
                                for (var i = 0; i < this.activeBlocks.length; i++)
                                {
                                    block = this.activeBlocks[i];
                                    
                                    if (this.direction === 'top')
                                    {
                                        y = 0;
                                        time = Math.floor(this.blockVelocity / this.rows);
                                        sign = '+';
                                    }
                                    else
                                    {
                                        y = this.rows - 2;
                                        time = Math.floor(this.blockVelocity / this.rows);
                                        sign = '-';
                                    }

                                    x = pos[0] + list[i][0];

                                    this.activeBlocks[i].image.x = x * this.blockSize + this.paddingX;
                                    this.activeBlocks[i].tween = this.add.tween(this.activeBlocks[i].image).to({y: sign + this.blockSize}, time);
                                    this.add.tween(this.activeBlocks[i].image).to({alpha: 0.65}, time).start();
                                    
                                    if (i === this.activeBlocks.length - 1)
                                    {
                                        this.activeBlocks[i].tween.onComplete.add(function()
                                        {
                                            this.gameOver();
                                        }, this);
                                    }

                                    this.activeBlocks[i].tween.start();
                                }

                                this.quit = true;
                            }

                            return;
                        }
                    }
                    
                    // set time for each tetris block to get to the designated position
                    var time;

                    var r = -1;
                    
                    for (var i = 0; i < list.length; i++)
                    {
                        r = pos[1] + list[i][1];
                        
                        if (r >= 0 && r < this.rows)
                        {
                            break;
                        }
                    }
                    
                    if (this.direction === 'top')
                    {
                        time = Math.floor(((r + 1) / this.rows) * this.blockVelocity);
                    }
                    else
                    {
                        time = Math.floor(((this.rows - r) / this.rows) * this.blockVelocity);
                    }

                    // disable controls and reset previous column var
                    this.controlsActive = false;
                    this.prevCol = false;

                    if (this.turnTimerActive)
                    {
                        this.sideRectTween.stop();
                    }
                    
                    this.changeDirection();
                    this.blockControlsOnKeyDown();

                    var block = this.activeBlocks;
                    var forceTurn = this.forceTurn;

                    this.forceTurn = false;
                    this.buffer[dir] = [];

                    var y, x, single = false;
                    
                    // add tetris blocks to field, set tween for the last block to enable controls, reset active row and column, update score, udpate buffer, set turntimer, update active blocks and if needed update sums.
                    for (var i = 0; i < this.activeBlocks.length; i++)
                    {
                        block = this.activeBlocks[i];
                        
                        y = pos[1] + list[i][1];
                        x = pos[0] + list[i][0];
                        
                        this.activeBlocks[i].image.x = this.paddingX + this.blockSize * x;

                        this.activeBlocks[i].tween = this.add.tween(this.activeBlocks[i].image).to({y: this.topBarHeight + this.paddingY + this.blockSize * y}, time);
                       
                        if (this.activeBlocks.length === 1)
                        {
                            single = true;
                        }
                       
                        if (i === this.activeBlocks.length - 1)
                        {
                            this.activeBlocks[i].tween.onComplete.add(function()
                            {
                                this.addBlockToField(block, y, x);

                                var blocksToDestroy = [];
                                blocksToDestroy = this.findChains(this.field);
                        
                                this.lastChain = blocksToDestroy.length / 2;

                                if (this.lastChain > this.longestChain)
                                {
                                    this.longestChain = this.lastChain;
                                }
                                
                                this.popLastChainMsg();
                                
                                var destroy = this.destroyBlocks(blocksToDestroy);

                                this.updateScoreText();
                                this.resetActiveRowColum();
                                this.updateBuffer(dir);
                                this.blockAddition = true;

                                if (forceTurn)
                                {
                                    this.onKeyUp();
                                }

                                if (single)
                                {
                                    this.pushingBlocks = false;
                                }

                                //this.controlsOn();
                                this.controlsActive = true;
                                this.setTurnTimer();
                            }, this);
                        }
                        else
                        {
                            this.activeBlocks[i].tween.onComplete.add(function(b, yy, xx)
                            {
                                this.addBlockToField(b, yy, xx);
                                this.pushingBlocks = false;
                            }.bind(this, block, y, x), this); 
                        }
 
                        this.activeBlocks[i].tween.start();
                    }
                    
                    this.updateActiveBlock(this.activeBlocks, next);
                    this.updateGuidesBMD();
                }
            }
            else if (this.direction === 'right' || this.direction === 'left')
            {
                if (this.forceTurn ||
                   (this.cursor.left.isDown && this.controlsUp.left && this.direction === 'right') ||
                   (this.cursor.right.isDown && this.controlsUp.right && this.direction ==='left'))
                {
                    this.pushingBlocks = true;
                    
                    if (this.direction === 'right' && this.cursor.left.isDown || (this.direction === 'right' && this.forceTurn))
                    {
                        var list = [],
                            xy,
                            lanes = {'1': false, '2': false};

                        for (var i = 0; i < this.activeBlocks.length; i++)
                        {
                            xy = [];

                            if (this.activeBlocks[i].image.y < this.topBarHeight + this.paddingY + this.activeRow * this.blockSize)
                            {
                                xy = [undefined, 0];
                            }
                            else if (this.activeBlocks[i].image.y > this.topBarHeight + this.paddingY + this.activeRow * this.blockSize + this.blockSize / 2)
                            {
                                xy = [undefined, 2];
                            }
                            else
                            {
                                xy = [undefined, 1];
                            }

                            if (this.activeBlocks[i].image.x < this.paddingX + this.columns * this.blockSize + this.blockSize / 2)
                            {
                                xy[0] = 0;
                                lanes['2']  = true;
                            }
                            else
                            {
                                xy[0] = 1;
                                lanes['1']  = true;
                            }

                            xy.push(i);

                            list.push(xy);
                        }

                        var pos = this.newPositions(list, xy, lanes);
                        
                        var dir = 'right';
                        var next = 'bottom';
                    }
                    else if (this.direction === 'left' && this.cursor.right.isDown || (this.direction === 'left' && this.forceTurn))
                    {
                        var list = [],
                            xy,
                            lanes = {'1': false, '2': false};

                        for (var i = 0; i < this.activeBlocks.length; i++)
                        {
                            xy = [];

                            if (this.activeBlocks[i].image.y < this.topBarHeight + this.paddingY + this.activeRow * this.blockSize)
                            {
                                xy = [undefined, 0];
                            }
                            else if (this.activeBlocks[i].image.y > this.topBarHeight + this.paddingY + this.activeRow * this.blockSize + this.blockSize / 2)
                            {
                                xy = [undefined, 2];
                            }
                            else
                            {
                                xy = [undefined, 1];
                            }

                            if (this.activeBlocks[i].image.x < this.blockSize / 2)
                            {
                                xy[0] = 0;
                                lanes['1']  = true;  
                            }
                            else
                            {
                                xy[0] = 1;
                                lanes['2']  = true;
                            }

                            xy.push(i);

                            list.push(xy);
                        }

                        var pos = this.newPositions(list, xy, lanes);

                        var dir = 'left';
                        var next = 'top';
                    }

                    // return if no valid position in the current column/row is found
                    if (pos === 'out')
                    {
                        this.pushingBlocks = false;
                        return;
                    }
                    // game over if blocks end up out of game field
                    else if ((this.direction === 'left' && pos[0] < 0) || (this.direction === 'right' && pos[0] >= this.columns - 1))
                    {
                        // check for left and top directions because pos gives a position of a box for its top left corner
                        var x, y, quit = false;
                        for (var i = 0; i < list.length; i++)
                        {
                            x = pos[0] + list[i][0];
                            y = pos[1] + list[i][1];

                            if ((this.direction === 'left' && x < 0) ||
                                (this.direction === 'right' && x >= this.columns) ||
                                (this.direction === 'left' && this.field[y][x].alive) || 
                                (this.direction === 'right' && this.field[y][x].alive))
                            {
                                quit = true;
                                break;
                            }
                        }

                        if (quit)
                        {
                            if (this.quit === false)
                            {
                                var block, x, y, time, sign;
                                
                                this.controlsActive = false;
                                
                                for (var i = 0; i < this.activeBlocks.length; i++)
                                {
                                    block = this.activeBlocks[i];

                                    if (this.direction === 'left')
                                    {
                                        x = 0;
                                        time = Math.floor(this.blockVelocity / this.columns);
                                        sign = '+';
                                    }
                                    else
                                    {
                                        x = this.columns - 2;
                                        time = Math.floor(this.blockVelocity / this.columns);
                                        sign = '-';
                                    }

                                    y = pos[1] + list[i][1];

                                    this.activeBlocks[i].image.y = y * this.blockSize + this.topBarHeight + this.paddingY;
                                    this.activeBlocks[i].tween = this.add.tween(this.activeBlocks[i].image).to({x: sign + this.blockSize}, time);
                                    this.add.tween(this.activeBlocks[i].image).to({alpha: 0.65}, time).start();
                                    
                                    if (i === this.activeBlocks.length - 1)
                                    {
                                        this.activeBlocks[i].tween.onComplete.add(function()
                                        {
                                            this.gameOver();
                                        }, this);
                                    }

                                    this.activeBlocks[i].tween.start();
                                }

                                this.quit = true;
                            }

                            return;
                        }
                    }
                    
                    // set time for each tetris block to get to the designated position
                    var time;

                    var r = -1;
                    
                    for (var i = 0; i < list.length; i++)
                    {
                        r = pos[0] + list[i][0];
                        
                        if (r >= 0 && r < this.columns)
                        {
                            break;
                        }
                    }
                    
                    if (this.direction === 'left')
                    {
                        time = Math.floor(((r + 1) / this.columns) * this.blockVelocity);
                    }
                    else
                    {
                        time = Math.floor(((this.columns - r) / this.columns) * this.blockVelocity);
                    }

                    // disable controls and reset previous column var
                    this.controlsActive = false;
                    this.prevCol = false;

                    if (this.turnTimerActive)
                    {
                        this.sideRectTween.stop();
                    }
                    
                    this.changeDirection();
                    this.blockControlsOnKeyDown();

                    var block = this.activeBlocks;
                    var forceTurn = this.forceTurn;
                    
                    this.forceTurn = false;
                    this.buffer[dir] = [];
                    
                    var y, x, single = false;
                    
                    // add tetris blocks to field, set tween for the last block to enable controls, reset active row and column, update score, udpate buffer, set turntimer, update active blocks and if needed update sums.
                    for (var i = 0; i < this.activeBlocks.length; i++)
                    {
                        block = this.activeBlocks[i];
                        
                        y = pos[1] + list[i][1];
                        x = pos[0] + list[i][0];
                        
                        this.activeBlocks[i].image.y = this.topBarHeight + this.paddingY + this.blockSize * y;
                        
                        this.activeBlocks[i].tween = this.add.tween(this.activeBlocks[i].image).to({x: this.paddingX + this.blockSize * x}, time);
                       
                        if (this.activeBlocks.length === 1)
                        {
                            single = true;
                        }
                       
                        if (i === this.activeBlocks.length - 1)
                        {
                            this.activeBlocks[i].tween.onComplete.add(function()
                            {
                                this.addBlockToField(block, y, x);

                                var blocksToDestroy = [];
                                blocksToDestroy = this.findChains(this.field);
                        
                                this.lastChain = blocksToDestroy.length / 2;

                                if (this.lastChain > this.longestChain)
                                {
                                    this.longestChain = this.lastChain;
                                }
                                
                                this.popLastChainMsg();
                                
                                var destroy = this.destroyBlocks(blocksToDestroy);

                                this.updateScoreText();
                                this.resetActiveRowColum();
                                this.updateBuffer(dir);
                                this.blockAddition = true;

                                if (forceTurn)
                                {
                                    this.onKeyUp();
                                }

                                if (single)
                                {
                                    this.pushingBlocks = false;
                                }

                                //this.controlsOn();
                                this.controlsActive = true;
                                this.setTurnTimer();
                            }, this);
                        }
                        else
                        {
                            this.activeBlocks[i].tween.onComplete.add(function(b, yy, xx)
                            {
                                this.addBlockToField(b, yy, xx);
                                this.pushingBlocks = false;
                            }.bind(this, block, y, x), this); 
                        }

                        this.activeBlocks[i].tween.start();
                    }

                    this.updateActiveBlock(this.activeBlocks, next);
                    this.updateGuidesBMD();
                }
            }
        }
    },
    
    addBlock: function(start, number)
    {
        var image = this.imageGroup.getFirstDead();

        if (!image)
        {
            image = this.add.image(start.x, start.y, 'block' + blocks.padNumber(number), 0, this.imageGroup);
            image.name = number;
            image.scale.setTo(this.scaleFactor);
        }
        else
        {
            image.key = 'block' + blocks.padNumber(number);
            image.name = number;
            image.loadTexture(image.key);
            image.scale.setTo(this.scaleFactor);
            image.reset(start.x, start.y);
        }
        var size = 25;
        var o = 0;
        if (this.rows > 21)
        {
            size = 36;
            o = 1;
        }
        else if (this.rows === 21)
        {
            size = 30;
        }
        else if (this.rows === 19)
        {
            size = 28
        }
        var font = 'bold ' + size * this.scaleFactor + 'px Times New Roman';
        var style = {font: font, fill: '#ffffff', wordWrap: true, wordWrapWidth: this.blockSize, align: 'center'};
        var text = this.add.text(0, 0, number, style);
        text.setScaleMinMax(0, 1);
        text.anchor.set(0.5);
        text.x = Math.floor(image.width / (2 * this.scaleFactor));
        text.y = Math.floor(image.height / (2 * this.scaleFactor) + 2 + o);
        text.smoothed = false;

        image.addChild(text);

        return image;
    },
    
    destroyBlocks: function(blocks)
    {
        if (blocks.length > 0)
        {    
            for (var i = 0; i < blocks.length; i += 2)
            {
                var target = this.field[blocks[i+1]][blocks[i]];
                
                if (blocks.gameMode === 'tetris')
                {
                    this.tetrisRemoveNumber(target.value);
                }
                
                target.tween = this.add.tween(target.image).to({x: target.image.x + target.image.width / 2, y: target.image.y + target.image.height / 2}, this.blockDestroyTweenTime, 'Linear');
                target.tween.onComplete.add(this.destroyBlocksTween, this);
                
                var tween = this.add.tween(target.image.scale).to({x: this.blockDestroyScale, y: this.blockDestroyScale}, this.blockDestroyTweenTime, 'Linear');
                
                var block = this.overlayImageGroup.getFirstDead();
                
                if (!block)
                {
                    var blockBMD = this.game.add.bitmapData(this.blockSize, this.blockSize);
                    blockBMD.ctx.fillStyle = 'rgba(199, 0, 100, 0.65)';  // 0, 0, 0, 0.44
                    blockBMD.ctx.fillRect(0, 0, this.blockSize, this.blockSize);
                    block = blockBMD.addToWorld(target.image.x, target.image.y);
                    this.overlayImageGroup.add(block);
                }
                else
                {
                    block.renderable = true;
                    block.scale.x = 1;
                    block.scale.y = 1;
                    block.alpha = 0.65; //0.44
                    block.reset(target.image.x, target.image.y);
                }
                
                block.tween1 = this.add.tween(block).to({x: target.image.x + target.image.width / 2, y: target.image.y + target.image.height / 2}, this.blockDestroyTweenTime, 'Linear');
                block.tween1.onComplete.add(function()
                {
                    block.renderable = false;
                }, this);
                block.tween2 = this.add.tween(block.scale).to({x: this.blockDestroyScale, y: this.blockDestroyScale}, this.blockDestroyTweenTime, 'Linear');

                target.tween.start();
                tween.start();
                block.tween1.start();
                block.tween2.start();
                
                target.alive = false;
                target.image = null;
                target.tween = null;
            }
            return true;
        }
        return false;
    },
    
    destroyBlocksTween: function(image, currentTween)
    {
        var child = image.getChildAt(0);
        child.destroy();
        image.kill();
    },
    
    sumTwoBlocks: function()
    {
        if (this.blockAddition && this.controlsActive && (blocks.gameMode !== 'tetris'))
        {
            if (this.spaceBar.isDown)
            {
                this.blockAddition = false;
                
                switch (this.direction)
                {
                    case 'top':
                        if (this.activeBlock.value > 18 || this.buffer.right.value > 18)
                        {
                            return;
                        }
                        var number = this.activeBlock.value + this.buffer['right'].value;
                        this.buffer.right.image.kill();
                        this.buffer.right.image.getChildAt(0).destroy();
                        //this.buffer.right.image.removeChildAt(0);
                        this.updateBuffer('right');
                        this.buffer.top.value = number;
                        this.updateSums();
                        break;
                    case 'right':
                        if (this.activeBlock.value > 18 || this.buffer.bottom.value > 18)
                        {
                            return;
                        }
                        var number = this.activeBlock.value + this.buffer['bottom'].value;
                        this.buffer.bottom.image.kill();
                        this.buffer.bottom.image.getChildAt(0).destroy();
                        //this.buffer.bottom.image.removeChildAt(0);
                        this.updateBuffer('bottom');
                        this.buffer.right.value = number;
                        this.updateSums();
                        break;
                    case 'bottom':
                        if (this.activeBlock.value > 18 || this.buffer.left.value > 18)
                        {
                            return;
                        }
                        var number = this.activeBlock.value + this.buffer['left'].value;
                        this.buffer.left.image.kill();
                        this.buffer.left.image.getChildAt(0).destroy();
                        //this.buffer.left.image.removeChildAt(0);
                        this.updateBuffer('left');
                        this.buffer.bottom.value = number;
                        this.updateSums();
                        break;
                    case 'left':
                        if (this.activeBlock.value > 18 || this.buffer.top.value > 18)
                        {
                            return;
                        }
                        var number = this.activeBlock.value + this.buffer['top'].value;
                        this.buffer.top.image.kill();
                        this.buffer.top.image.getChildAt(0).destroy();
                        //this.buffer.top.image.removeChildAt(0);
                        this.updateBuffer('top');
                        this.buffer.left.value = number;
                        this.updateSums();
                        break;
                }
                
                this.activeBlock.image.kill();
                //this.activeBlock.image.removeChildAt(0);
                this.activeBlock.image.getChildAt(0).destroy();
                this.activeBlock = {value: number, start: this.activeBlock.start, image: this.addBlock({x: this.activeBlock.image.x, y: this.activeBlock.image.y}, number), tween: null};
            }
        }
    },
    
    // activate movement of blocks on sides only after the player released a direction key (this way if you send a block to the field and keep holding the key the next block won't move until you release a direction key even though controlsActive turns true - though it's not perfect, having separate function fore all four cursor keys would be better but this is satisfying
/*    onKeyUp: function()
    {
        switch(this.direction)
        {
            case 'top':
            case 'bottom':
                this.controlsUp.right = true;
                this.controlsUp.left = true;
                break;
            case 'right':
            case 'left':
                this.controlsUp.up = true;
                this.controlsUp.down = true;
                break;
        }
    },*/
    
    blockControlsOnKeyDown: function()
    {
        this.controlsUp.up = false;
        this.controlsUp.right = false;
        this.controlsUp.down = false;
        this.controlsUp.left = false;
    },
    
    onKeyUp: function()
    {
        switch(this.direction)
        {
            case 'top':
                this.controlsUp.down = true;
                this.controlsUp.left = true;
                this.controlsUp.right = true;
                break;
            case 'bottom':
                this.controlsUp.up = true;
                this.controlsUp.right = true;
                this.controlsUp.left = true;
                break;
            case 'right':
                this.controlsUp.left = true; 
                this.controlsUp.up = true;
                this.controlsUp.down = true;
                break;
            case 'left':
                this.controlsUp.right = true;
                this.controlsUp.down = true;
                this.controlsUp.up = true;
                break;
        }
    },
    
    updateScoreText: function()
    {
        var score = 'SCORE: ' + this.score;
        this.scoreText.text = score;
    },
    
    menu: function()
    {
        this.state.start('menu');
    },
    
    pause: function()
    {
        if (!this.game.paused)
        {
            this.pauseScreen.renderable = true;
            this.game.paused = true;
        }
    },
    
    unpause: function()
    {
        if (this.game.paused)
        {
            this.pauseScreen.renderable = false;
            this.game.paused = false;
        }
    },
    
    onKeyDown: function()
    {
        if (this.game.paused && !this.gameover)
        {
            this.unpause(); 
        }
        else if (this.game.paused && this.gameover)
        {
            if (this.spaceBar.isDown)
            {
                this.game.paused = false;
                this.state.start('game');
            }
        }
    },
    
    gameOver: function()
    {    
        this.gameover = true;
        
        this.updateGameOverScreen();
        
        this.gameOverBMD.addToWorld(Math.floor(this.game.width / 2 - this.goW / 2), Math.floor(this.game.height / 2 - this.goH / 2));

        this.game.paused = true;
        
        return true;
    },
    
    createGameOverScreen: function()
    {
        // game over screen width and height
        this.goW = Math.floor(this.game.width / 2);
        this.goH = Math.floor(this.game.height / 3);

        this.gameOverBMD = this.add.bitmapData(this.goW, this.goH);
        this.gameOverBMD.ctx.fillStyle = '#e5308b';
        this.gameOverBMD.ctx.fillRect(0, 0, this.goW, this.goH);
        this.gameOverBMD.ctx.fillStyle = '#e5308b';
        this.gameOverBMD.ctx.fillRect(1, 1, this.goW - 2, this.goH - 2);
        this.gameOverBMD.ctx.fillStyle = '#ffffff';
        this.gameOverBMD.ctx.fillRect(1, this.goH - 57, this.goW - 2, 56);
    },
    
    updateGameOverScreen: function()
    {
        this.bestScore = window.sessionStorage.getItem('bestScore');

        // check if best score exists in local storage, if not add it, if yes check if it's less than current score and update it if it is
        if (this.bestScore === null)
        {
            this.bestScore = this.score;
            window.sessionStorage.setItem('bestScore', String(this.bestScore));
        }
        else
        {
            if (this.bestScore < this.score)
            {
                this.bestScore = this.score;
                window.sessionStorage.setItem('bestScore', String(this.bestScore));
            }
        }

        var score = 'SCORE: ' + this.score;
        var text = this.game.make.text(0, 0, score, {font: '28px Times New Roman', fill: '#ffffff'});
        text.anchor.setTo(0.5);
        text.smoothed = false;
        this.gameOverBMD.draw(text, Math.floor(this.goW / 2), 50);  //60

        var bestScore = 'BEST SCORE: ' + this.bestScore;
        text = this.game.make.text(0, 0, bestScore, {font: '28px Times New Roman', fill: '#ffffff'});
        text.anchor.setTo(0.5);
        text.smoothed = false;
        this.gameOverBMD.draw(text, Math.floor(this.goW / 2), 100);  //120

        var longestChain = 'LONGEST CHAIN: ' + this.longestChain;
        text = this.game.make.text(0, 0, longestChain, {font: '28px Times New Roman', fill: '#ffffff'});
        text.anchor.setTo(0.5);
        text.smoothed = false;
        this.gameOverBMD.draw(text, Math.floor(this.goW / 2), 150);

        text = this.game.make.text(0, 0, 'PRESS SPACE TO TRY AGAIN', {font: '25px Times New Roman', fill: '#c70064'});
        text.anchor.setTo(0.5);
        text.smoothed = false;
        this.gameOverBMD.draw(text, Math.floor(this.goW / 2), this.goH - 28);
    },
    
    testIndexBounds: function(dir, index)
    {
        // dir = true : check left and right, dir = false : check top and bottom
        // else : for single block mode (needs just one check if it's over the line or not
        
        if (dir)
        {
            return (index < 0 || index >= this.columns) ? true : false; 
        }
        else
        {
            return (index < 0 || index >= this.rows) ? true : false;
        }
    },
    
    findLastValidPosition: function(x, y, bol, cCol, cRow, columns, rows, cols, linkList)
    {
        if (x)
        {
            var index = false;
            var i = cCol > this.prevCol ? -1 : 1;
            var col = cCol;
            
            while (index === false)
            {
                col = col + i;
                
                if (col < 0 || col >= this.columns)
                {
                    i *= -1;
                    col = cCol;
                }
                
                index = this.checkField(false, col, bol);
            }
            
            cCol = col;
            this.vls.x = cCol * this.blockSize + this.paddingX;
            this.vls.tween.stop();
            this.activeBlock.image.x = cCol * this.activeBlock.image.width + this.paddingX;
            this.activeBlock.tween.stop();
            this.controlsOn();

            return [index, cCol, cRow];
        }
        else if (y)
        {
            var index = false;
            var i = cRow > this.prevRow ? -1 : 1;
            var row = cRow;
            
            while (index === false)
            {
                row = row + i;
                if (row < 0 || row >= this.rows)
                {
                    i *= -1;
                    row = cRow;
                }
                index = this.checkField(row, false, bol);
            }
            
            cRow = row;
            this.hls.y = cRow * this.activeBlock.image.height + this.topBarHeight + this.paddingY;
            this.hls.tween.stop();
            this.activeBlock.image.y = cRow * this.activeBlock.image.height + this.topBarHeight + this.paddingY;
            this.activeBlock.tween.stop();
            this.controlsOn();
                        
            return [index, cCol, cRow]; 
        }
    },
    
    turnTimerFn: function()
    {
        if (this.timeDecreaseActive)
        {
            this.turnTime -= this.turnTimeDt;
            this.turnTimeRedTime -= this.turnTimeRedTimeDt;
            
            if (this.turnTimeRedTime <= 0)
            {
                this.turnTimeRedTime = 0;
            }
            
            if (this.turnTime <= this.turnTimeMin)
            {
                this.turnTime = this.turnTimeMin;
                this.timeDecreaseActive = false;
                return;
            }
            
            this.turnTimer = this.game.time.create(false);
            this.turnTimer.loop(this.turnTimeRedTime, this.turnTimerFn, this);
            this.turnTimer.start();
        }
    },
    
    changeSideTetris: function()
    {
        if (this.controlsActive && this.spaceBar.isDown && !this.forceTurn && this.spaceBarReleased && !this.game.pause)
        {
            this.onKeyUp();
            
            this.spaceBarReleased = false;
            
            this.resetActiveRowColum();

            for (var i = 0; i < this.activeBlocks.length; i++)
            {
                if (this.direction === 'top' || this.direction === 'bottom')
                {
                    this.activeBlocks[i].image.x = this.paddingX + (this.activeColumn + this.tetrisBlockSets[this.currentSets[this.direction]].x[i]) * this.blockSize;
                }
                else
                {
                    this.activeBlocks[i].image.y = this.paddingY + this.topBarHeight + (this.activeRow - this.tetrisBlockSets[this.currentSets[this.direction]].x[i]) * this.blockSize;
                }
            }
            
            this.changeDirection();
            this.resetActiveRowColum();
            this.setTurnTimer(true);
            this.activateIndicatingRect();
            this.updateActiveBlock(this.activeBlocks, this.direction);
            this.updateGuidesBMD();
        }
    },
    
    updateSums: function()
    {
        if (blocks.gameMode !== 'tetris')
        {
            this.sums.tr.val = this.buffer['top'].value > 18 || this.buffer['right'].value  > 18 ? this.buffer['top'].value : this.buffer['top'].value + this.buffer['right'].value;
            this.sums.br.val = this.buffer['right'].value > 18 || this.buffer['bottom'].value  > 18 ? this.buffer['right'].value : this.buffer['right'].value + this.buffer['bottom'].value;
            this.sums.bl.val = this.buffer['bottom'].value > 18 || this.buffer['left'].value > 18 ? this.buffer['bottom'].value : this.buffer['bottom'].value + this.buffer['left'].value;
            this.sums.tl.val = this.buffer['left'].value > 18 || this.buffer['top'].value  > 18 ? this.buffer['left'].value : this.buffer['left'].value + this.buffer['top'].value;
            this.sums.tr.text.text = this.sums.tr.val;
            this.sums.br.text.text = this.sums.br.val;
            this.sums.bl.text.text = this.sums.bl.val;
            this.sums.tl.text.text = this.sums.tl.val;
        }
    },
    
    setTurnTimer: function(change)
    {
        var alpha,
            time,
            target;
        
        switch(this.direction)
        {
            case 'top':
                alpha = (change === true) ? this.leftRect.alpha : 1;
                target = this.topRect;
                this.rightRect.alpha = 1;
                this.botRect.alpha = 1;
                this.leftRect.alpha = 1;
                break;
            case 'right':
                alpha = (change === true) ? this.topRect.alpha : 1;
                target = this.rightRect;
                this.topRect.alpha = 1;
                this.botRect.alpha = 1;
                this.leftRect.alpha = 1;
                break;
            case 'bottom':
                alpha = (change === true) ? this.rightRect.alpha : 1;
                target = this.botRect;
                this.topRect.alpha = 1;
                this.rightRect.alpha = 1;
                this.leftRect.alpha = 1;
                break;
            case 'left':
                alpha = (change === true) ? this.botRect.alpha : 1;
                target = this.leftRect;
                this.topRect.alpha = 1;
                this.rightRect.alpha = 1;
                this.botRect.alpha = 1;
                break;
        }
        
        time = (change === true) ? Math.floor(alpha * this.turnTime) : this.turnTime;
        target.alpha = alpha;
        
        if (this.turnTimerActive)
        {
            if (change === true)
            {
                this.sideRectTween.stop();
            }
            this.sideRectTween = this.add.tween(target).to({alpha: 0}, time, 'Linear');
            this.sideRectTween.onComplete.add(this.turnTimeFn, this);
            this.sideRectTween.start();
        }
    },
    
    turnTimeFn: function()
    {
        this.forceTurn = true;
    },
    
    activateIndicatingRect: function()
    {
        switch(this.direction)
        {
            case 'top':
                this.topRect.renderable = true;
                this.rightRect.renderable = false;
                this.botRect.renderable = false;
                this.leftRect.renderable = false;
                break;
            case 'right':
                this.topRect.renderable = false;
                this.rightRect.renderable = true;
                this.botRect.renderable = false;
                this.leftRect.renderable = false;
                break;
            case 'bottom':
                this.topRect.renderable = false;
                this.rightRect.renderable = false;
                this.botRect.renderable = true;
                this.leftRect.renderable = false;
                break;
            case 'left':
                this.topRect.renderable = false;
                this.rightRect.renderable = false;
                this.botRect.renderable = false;
                this.leftRect.renderable = true;
                break;
        }
    },
    
    // reset vertical and/or horizontal guide lines positions and renerability
    resetLinesPosition: function()
    {
        if (this.direction === 'top' || this.direction === 'bottom')
        {
            this.hls.renderable = false;
            this.vls.x = this.activeColumn * this.blockSize + this.paddingX;
            if (blocks.gameMode === 'tetris')
            {
                this.vls.x = (this.activeColumn - 1) * this.blockSize + this.paddingX;
            }
            this.vls.y = this.topBarHeight + this.paddingY;
            this.vls.renderable = true;
        }
        else if (this.direction === 'left' || this.direction === 'right')
        {
            this.vls.renderable = false;
            this.hls.x = this.paddingX;
            this.hls.y = this.activeRow * this.blockSize + this.paddingY + this.topBarHeight;
            if (blocks.gameMode === 'tetris')
            {
                this.hls.y = (this.activeRow - 1) * this.blockSize + this.paddingY + this.topBarHeight;
            }
            this.hls.renderable = true;
        }
    },
    
    resetActiveRowColum: function()
    {
        this.activeRow = Math.floor(this.rows / 2);
        this.activeColumn = Math.floor(this.columns / 2);
        this.resetLinesPosition();
    },
    
    updateActiveBlock: function(block, dir)
    {
        if (blocks.gameMode === 'tetris')
        {
            this.activeBlocks = this.buffer[dir];
        }
        else
        {
            this.activeBlock = this.buffer[dir];
        }
    },

    updateBuffer: function(position)
    {
        if (blocks.gameMode === 'tetris')
        {
            var start = {}, x, y, number;
            var rndSet = this.rnd.integerInRange(0, this.tetrisBlockSets.length - 1);
            var length = this.tetrisBlockSets[rndSet]['x'].length;
            var xx = this.tetrisBlockSets[rndSet]['x'];
            var yy = this.tetrisBlockSets[rndSet]['y'];

            for (var i = 0; i < length; i++)
            {
                start.x = this.startingPoints[position].x;
                start.y = this.startingPoints[position].y;
                
                switch(position)
                {
                    case 'top':
                        x = xx[i]; //this.rnd.integerInRange(-1, 1);
                        y = yy[i]; //(xx === 0) ? 1 : this.rnd.integerInRange(0, 1);
                        start = {x: this.startingPoints[position].x + x * this.blockSize,
                                 y: this.startingPoints[position].y - y * this.blockSize};
                        this.currentSets.top = rndSet;
                        break;
                    case 'right':
                        x = xx[i]; //this.rnd.integerInRange(-1, 1);
                        y = yy[i]; //(xx === 0) ? 1 : this.rnd.integerInRange(0, 1);
                        start = {x: this.startingPoints[position].x + y * this.blockSize,
                                 y: this.startingPoints[position].y - x * this.blockSize};
                        this.currentSets.right = rndSet;
                        break;
                    case 'bottom':
                        x = xx[i]; //this.rnd.integerInRange(-1, 1);
                        y = yy[i]; //(xx === 0) ? 1 : this.rnd.integerInRange(0, 1);
                        start = {x: this.startingPoints[position].x + x * this.blockSize,
                                 y: this.startingPoints[position].y + y * this.blockSize};
                        this.currentSets.bottom = rndSet;
                        break;
                    case 'left':
                        x = xx[i]; //this.rnd.integerInRange(-1, 1);
                        y = yy[i]; //(xx === 0) ? 1 : this.rnd.integerInRange(0, 1);
                        start = {x: this.startingPoints[position].x - y * this.blockSize,
                                 y: this.startingPoints[position].y - x * this.blockSize};
                        this.currentSets.left = rndSet;
                        break;
                }
                
                //number = this.number[this.rnd.integerInRange(0, this.number.length - 1)];
                
                number = this.tetrisGetNumber();

                this.tetrisAddNumber(number);
                this.buffer[position].push({value: number, start: position, image: this.addBlock(start, number), tween: null});
            }
        }
        else
        {
            var number = this.number[this.rnd.integerInRange(0, this.number.length - 1)];
            this.buffer[position] = {value: number, start: position, image: this.addBlock(this.startingPoints[position], number), tween: null};
        }
    },
    
    tetrisGetNumber: function()
    {
        var number, rnd;
        
        var data = [];
        
        rnd = this.rnd.integerInRange(1, 100);
        
        for (var i = 1; i <= this.blockCntMx.length; i++)
        {
            if (this.blockCntMx[i].p >= rnd)
            {
                data.push(i);
            }
        }
        
        if (data.length === 0)
        {
            number = this.rnd.integerInRange(1, this.blockCntMx.length);
        }
        else
        {
            number = data[this.rnd.integerInRange(0, data.length - 1)];
        }

        return number;
    },
    
    tetrisAddNumber: function(num)
    {
        this.blockCntMx[num].cnt++;
        this.blockCntMx.total++;
        this.tetrisUpdatePercentage();
    },
    
    tetrisRemoveNumber: function(num)
    {
        this.blockCntMx[num].cnt--;
        this.blockCntMx.total--;
        this.tetrisUpdatePercentage();
    },
    
    tetrisUpdatePercentage: function()
    {
        for (var i = 1; i <= this.blockCntMx.length; i++)
        {
            this.blockCntMx[i].p = 100 - Math.floor(100 * this.blockCntMx[i].cnt / this.blockCntMx.total);
        }
    },
    
    changeDirection: function()
    {
        for (var i = 0; i < this.directions.length; i++)
        {
            if (this.direction === this.directions[i])
            {
                var index = i + 1;
                if (i === this.directions.length - 1)
                {
                    index = 0;
                }
                this.direction = this.directions[index];
                return;
            }
        }
    },
    
    getTime: function()
    {
        var time = Math.floor(this.game.time.totalElapsedSeconds());
        var seconds = time % 60;
        var minutes = ((time - seconds) / 60) % 60;
        var hours = (time - seconds - minutes * 60) / 3600;
        
        return [hours, minutes, seconds];
    },
    
    addBlockToField: function(block, row, column)
    {
        this.field[row][column].value = block.value;
        this.field[row][column].alive = true;
        this.field[row][column].image = block.image;
        this.field[row][column].tween = null;
    },
    
    checkField: function(row, column, orientation)
    {
        if (row !== false)
        {
            if (orientation)
            {
                for (var i = 0; i < this.field[row].length; i++)
                {
                    if (this.field[row][i].alive)
                    {
                        return i - 1;
                    }

                }
            }
            else if (!orientation)
            {
                for (var i = this.field[row].length - 1; i > -1; i--)
                {
                    if (this.field[row][i].alive)
                    {
                        return i + 1;
                    }
                }
            }
        }
        else if (column !== false)
        {
            if (orientation)
            {
                for (var i = 0; i < this.rows; i++)
                {
                    if (this.field[i][column].alive)
                    {
                        return i - 1;
                    }
                }
            }
            else if (!orientation)
            {
                for (var i = this.rows - 1; i > -1; i--)
                {
                    if (this.field[i][column].alive)
                    {
                        return i + 1;
                    }
                }
            }
        }
        
        return false;
    },
    
    controlsOn: function()
    {
        //this.controlsActive = true;
        this.controlsActivate = true;
    },

    // find ordered chains of blocks in this.field and return their positions in an array as: storage2 /array/ = [x1, y1, x2, y2, ...]
    findChains: function(mtx)
    {
        // already visited blocks for skipping - no need to cycle throguh all blocks if visited before
        var data = {};

        // resulting array of only blocks that are supposed to be removed from stage (every block is in only one times, if you are looking for  individual chains go deeper to findElementChains method variable tmp
        var storage2 = [];

        for (var y = 0; y < this.rows; y++)
        {
            for (var x = 0; x < this.columns; x++)
            {
                // skip dead blocks
                if (!mtx[y][x].alive)
                {
                    continue;
                }
                
                // centerblock is not a valid target for numberchains - skip it.
                if (mtx[y][x].value === 'centerblock')
                {
                    continue;
                }
                
                // don't check blocks already checked during deep check
                if (data.hasOwnProperty(x) && data[x].hasOwnProperty(y))
                {
                    continue;
                }

                // find ordered chains of numbers in 2d array, push individual blocks into storage2 if the length of the chains is greater or equal to this.chainLengthMin
                this.findElementChains(data, storage2, mtx, x, y);

                // cycle through all storage2 elements and check if there are any neighbours that weren't found before by findElementChains (as this only finds direct chains which the element the function is called is part of!)
                for (var i = 0; i < storage2.length; i += 2)
                {
                    // horizontal and vertical neighbours for (storage[i], storage[i+1]) block
                    var positions = [storage2[i], storage2[i+1]-1, storage2[i]-1, storage2[i+1], storage2[i]+1, storage2[i+1], storage2[i], storage2[i+1]+1];

                    for (var j = 0; j < positions.length; j += 2)
                    {
                        // skip if position is out of bounds
                        if (positions[j] < 0 || positions[j+1] < 0 || positions[j] >= this.columns || positions[j+1] >= this.rows)
                        {
                            continue;
                        }

                        // skip if this element is dead
                        if (!mtx[positions[j+1]][positions[j]].alive)
                        {
                            continue;
                        }

                        // skip if this element was already checked
                        if (data.hasOwnProperty(positions[j]) && data[positions[j]].hasOwnProperty(positions[j+1]))
                        {
                            continue;
                        }

                        if (mtx[positions[j+1]][positions[j]].value === mtx[storage2[i+1]][storage2[i]].value + 1 ||
                            mtx[positions[j+1]][positions[j]].value === mtx[storage2[i+1]][storage2[i]].value - 1)
                        {
                            this.findElementChains(data, storage2, mtx, positions[j], positions[j+1]);
                        }
                    }
                }
            }
        }

        return storage2;
    },

    // find ordered elements in 2d array, save resulting positions in storage2 (this array servers as a pointer for blocks which are to be destroyed) and in data object (servers for skipping already visited positions)
    findElementChains: function(data, storage2, mtx, x, y)
    {
        var chains = this.findSegments(mtx, x, y);

        var tmp = this.connectSegments(chains.mins, chains.maxes);
        var storage = [];
        
        for (var i = 0; i < tmp.length; i++)
        {
            for (var j = 0; j < tmp[i].length; j += 2)
            {
                // store only chains of a certain length
                if (tmp[i].length / 2 >= this.chainLengthMin)
                {
                    // increase score by value of each block, increases score for every chain even if the block is shared among two or more chains!
                    this.score += Math.floor(tmp[i].length / 2) * this.field[tmp[i][j+1]][tmp[i][j]].value;
                    
                    storage.push(tmp[i][j], tmp[i][j+1]); 
                    
                    // store chains positions which were already visited and passed the test for chaing length, these won't be considered as options for neighbours in further search
                    if (!data.hasOwnProperty(tmp[i][j]))
                    {
                         data[tmp[i][j]] = {};
                    }
                    data[tmp[i][j]][tmp[i][j+1]] = true;                    
                }
            }
        }

        var bol = false;

        // remove repeating positions from storage and store the resulting positions in storage2
        for (var i = 0; i < storage.length; i += 2)
        {
            for (var j = 0; j < storage2.length; j += 2)
            {
                if (storage[i] === storage2[j] && storage[i+1]  === storage2[j+1])
                {
                    bol = true;
                    break;
                }
            }
            if (bol)
            {
                bol = false;
                continue;
            }
            storage2.push(storage[i], storage[i+1]);
        }
    },

    // works only on arrays of arrays!
    removeRepeatingPoints: function(arr)
    {
        var tmp = [];
        var bol = false;

        for (var i = 0; i < arr.length; i++)
        {
            tmp[i] = [];
            for (var j = 0; j < arr[i].length; j += 2)
            {
                for (var k = 0; k < tmp[i].length; k += 2)
                {
                    if (arr[i][j] === tmp[i][k] && arr[i][j+1] === tmp[i][k+1])
                    {
                        bol = true;
                        break;
                    }
                }
                if (bol)
                {
                    bol = false;
                    continue;
                }
                tmp[i].push(arr[i][j], arr[i][j+1]);
            }
        }

        return tmp;
    },

    // connect segments from findSegments (mins and maxes) into one array, data is an array of arrays!
    connectSegments: function(mins, maxes)
    {
        var data = [];
        var data2 = [];

        for (var i = 0; i < mins.length; i++)
        {
            for (var j = 0; j < maxes.length; j++)
            {
                data.push(mins[i].concat(maxes[j]));
            }
        }

        // because mins and maxes always include position of a starting block remove such repeating positions from the final result and keep only one pointer to such positions
        data2 = this.removeRepeatingPoints(data);

        return data2;
    },

    // find positions of blocks from the current piece in decreasing manner then find them in increasing manner and return object with both arrays
    findSegments: function(mtx, x, y)
    {
        var mins = this.findLower(mtx, x, y, false, false);
        var maxes = this.findGreater(mtx, x, y, false, false);

        var data = {mins: mins, maxes: maxes};

        return data;
    },

    // find ordered chain of numbers in decreasing manner recursively
    findLower: function(mtx, x, y, prevX, prevY)
    {    
        var data = [];
        
        if (!mtx[y][x].alive || mtx[y][x].value === 'centerblock')
        {
            return data;
        }
        
        var tmp = [];
        var positions = [x, y-1, x-1, y, x+1, y, x, y+1];
        
        for (var i = 0; i < positions.length; i += 2)
        {
            if (x === prevX && y === prevY)
            {
                continue;
            }
            
            if (positions[i] < 0 || positions[i+1] < 0 || positions[i] >= this.columns || positions[i+1] >= this.rows)
            {
                continue;
            }
            
            if (!mtx[positions[i+1]][positions[i]].alive || mtx[positions[i+1]][positions[i]].value === 'centerblock')
            {
                continue; 
            }
        
        
            var elm = mtx[y][x].value;
            var elm2 = mtx[positions[i+1]][positions[i]].value;

            if (elm2 === elm - 1)
            {
                tmp = this.findLower(mtx, positions[i], positions[i+1], x, y);
                tmp.forEach(function(elm){
                    elm.push(x, y); 
                })
                data = data.concat(tmp);
            }
        }
        
        if (data.length === 0)
        {
            data.push([x, y]);
        }

        return data;
    },

    // find ordered chain of numbers in increasing manner recursively
    findGreater: function(mtx, x, y, prevX, prevY)
    {    
        var data = [];
        
        if (!mtx[y][x].alive || mtx[y][x].value === 'centerblock')
        {
            return data;
        }
        
        var tmp = [];
        var positions = [x, y-1, x-1, y, x+1, y, x, y+1];
        
        for (var i = 0; i < positions.length; i += 2)
        {
            if (x === prevX && y === prevY)
            {
                continue;
            }

            if (positions[i] < 0 || positions[i+1] < 0 || positions[i] >= this.columns || positions[i+1] >= this.rows)
            {
                continue;
            }

            if (!mtx[positions[i+1]][positions[i]].alive || mtx[positions[i+1]][positions[i]].value === 'centerblock')
            {
                continue; 
            }

            var elm = mtx[y][x].value;
            var elm2 = mtx[positions[i+1]][positions[i]].value;

            if (elm2 === elm + 1)
            {
                tmp = this.findGreater(mtx, positions[i], positions[i+1], x, y);
                tmp.forEach(function(elm){
                    elm.push(x, y); 
                })
                data = data.concat(tmp);
            }
        }
        
        if (data.length === 0)
        {
            data.push([x, y]);
        }

        return data;
    }
};