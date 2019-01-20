var BadEnd1 = {

  preload: function() {
    game.load.crossOrigin = 'anonymous';
    game.load.image('scenaE1', 'assets/scene/gameover.jpg');
  },

  create: function() {
    scenaE1 = game.add.sprite(0, 0, 'scenaE1');
    scenaE1.inputEnabled = true;
    scenaE1.events.onInputUp.add(imageClickE1);
  },

  update: function() {

  },

};

function imageClickE1() {
    this.game.state.start('GameLevel_1');
}

game.state.add('BadEnd1', BadEnd1);
