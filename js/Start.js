var GameStart = {

  preload: function() {
    game.load.crossOrigin = 'anonymous';
    game.load.image('open', 'http://1.bp.blogspot.com/-a8aV13i0t9Y/Vi4LTodbxuI/AAAAAAAABdM/YPArwcG7Gx8/s1600/cappuccetto-rosso-e-il-lupo.jpg');
  },

  create: function() {
    this.game.scale.pageAlignHorizontally = true;this.game.scale.pageAlignVertically = true;this.game.scale.refresh();
    image = game.add.sprite(game.world.centerX, game.world.centerY, 'open');
    image.scale.setTo(0.6,0.6);
    image.anchor.set(0.5);
    image.inputEnabled = true;
    image.events.onInputDown.add(this.imageClick, this);
  },

  imageClick: function(pointer) {
      this.game.state.start('GameLevel_2');
  }

};

var game = new Phaser.Game(1024, 768, Phaser.AUTO);

game.state.add('GameStart', GameStart);
game.state.start('GameStart');
