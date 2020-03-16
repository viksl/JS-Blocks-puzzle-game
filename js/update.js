blocks.game.prototype.update = function(game) {

    if (!this.gameover)
    {
        //console.log('turn time: ', this.turnTime, 'turn time dt: ', this.turnTimeDt, 'turn time min: ',  this.turnTimeMin, 'turn time red time: ', this.turnTimeRedTime, 'turn time red time dt: ', this.turnTimeRedTimeDt);
        if (this.controlsActivate === true)
        {
            if (Date.now() - this.moveTimer > this.controlsTweenTime * this.controlsTweenTimeFactor)
            {
                this.controlsActive = true;
                this.controlsActivate = false;

                this.moveTimer = 0;
            }
        }
        
        if (blocks.gameMode === 'tetris')
        {
            if (!this.pushingBlocks)
            {
                this.pushBlocksToFieldTetris();
            }

            if (!this.spaceBar.isDown)
            {
                this.spaceBarReleased = true;
            }

            this.changeSideTetris();

            this.moveBlocksTetris();            
        }
        else
        {
            this.sumTwoBlocks();
            this.pushBlockToField();
            this.moveBlock();
        }
        
        this.activateIndicatingRect();
    }
    //console.log(this.game.input.activePointer);
/*    if (this.gameover)
    {
        if (this.spaceBar.isDown)
        {
            this.state.start('game');
        }
    }*/
};