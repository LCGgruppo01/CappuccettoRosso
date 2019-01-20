var Rapimento = {

  preload: function() {
    game.load.crossOrigin = 'anonymous';
    game.load.image('scena3', 'assets/scene/bloodmoon.jpg');
  },

  create: function() {
    scena3 = game.add.sprite(0, 0, 'scena3');
    scena3.inputEnabled = true;
    scena3.tint = 0x1a53ff;
    scena3.events.onInputUp.add(imageClick4);
  },

  update: function() {

  },

};

function imageClick4() {
    this.game.state.start('GameLevel_1');
}

game.state.add('Rapimento', Rapimento);
