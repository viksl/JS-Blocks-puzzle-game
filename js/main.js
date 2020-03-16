var blocks = blocks || {};
blocks.phaserGame = new Phaser.Game(690, 730, Phaser.AUTO, 'gameDiv');

blocks.phaserGame.state.add('boot', blocks.boot);
blocks.phaserGame.state.add('load', blocks.load);
blocks.phaserGame.state.add('menu', blocks.menu);
blocks.phaserGame.state.add('game', blocks.game);

blocks.padNumber =  function(num) {
        return (num < 10 ? '0' : '') + num;
};

blocks.phaserGame.state.start('boot');