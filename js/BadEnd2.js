var BadEnd2 = {

  preload: function() {
    game.load.crossOrigin = 'anonymous';
    game.load.image('scenaE2', 'assets/scene/finalebrutto.jpg');
  },

  create: function() {
    scenaE2 = game.add.sprite(0, 0, 'scenaE2');
    scenaE2.inputEnabled = true;
    scenaE2.events.onInputUp.add(imageClickE2);
  },

  update: function() {

  },

};

function imageClickE2() {
    this.game.state.start('GameLevel_2');
}

game.state.add('BadEnd2', BadEnd2);
