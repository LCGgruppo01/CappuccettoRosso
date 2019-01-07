var GameStart = {

  preload: function() {
    game.load.crossOrigin = 'anonymous';
    game.load.image('copertina', 'assets/images/copertina.png');
    game.load.image('start', 'assets/images/start.png');
  },

  create: function() {
    this.game.scale.pageAlignHorizontally = true;this.game.scale.pageAlignVertically = true;this.game.scale.refresh();
    game.add.sprite(0, 0, 'copertina');
    start = game.add.sprite(game.world.width/2, game.world.height/2, 'start');
    start.anchor.setTo(.5,.5);
    start.inputEnabled = true;
    start.events.onInputDown.add(this.imageClick, this);
  },

  imageClick: function(pointer) {
      this.game.state.start('GameLevel_2');
  }

};

var game = new Phaser.Game(1024, 768, Phaser.AUTO);

game.state.add('GameStart', GameStart);
game.state.start('GameStart');
