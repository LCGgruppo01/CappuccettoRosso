var ScenaBloodmoon = {

  preload: function() {
    game.load.crossOrigin = 'anonymous';
    game.load.image('scena', 'assets/scene/bloodmoon.jpg');
  },

  create: function() {
    scena = game.add.sprite(0, 0, 'scena');
    scena.inputEnabled = true;
    scena.events.onInputUp.add(imageClick2);
  },

  update: function() {

  },

};

function imageClick2() {
    this.game.state.start('GameLevel_1');
}

game.state.add('ScenaBloodmoon', ScenaBloodmoon);
