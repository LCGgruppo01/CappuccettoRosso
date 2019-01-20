var RitornoLupi = {

  preload: function() {
    game.load.crossOrigin = 'anonymous';
    game.load.image('scena2', 'assets/scene/ritorno lupi.jpg');
  },

  create: function() {
    scena2 = game.add.sprite(0, 0, 'scena2');
    scena2.inputEnabled = true;
    scena2.events.onInputUp.add(imageClick3);
  },

  update: function() {

  },

};

function imageClick3() {
    this.game.state.start('GameLevel_2');
}

game.state.add('RitornoLupi', RitornoLupi);
