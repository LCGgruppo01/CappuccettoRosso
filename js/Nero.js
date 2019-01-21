var Nero = {

  preload: function() {
    game.load.crossOrigin = 'anonymous';
    game.load.image('scena0', 'assets/scene/nero.jpg');
  },

  create: function() {
    scena0 = game.add.sprite(0, 0, 'scena0');
    scena0.inputEnabled = true;
    scena0.events.onInputUp.add(imageClick0);
  },

  update: function() {

  },

};

function imageClick0() {
    this.game.state.start('ScenaBloodmoon');
}

game.state.add('Nero', Nero);
