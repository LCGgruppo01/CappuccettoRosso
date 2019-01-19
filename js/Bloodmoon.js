var ScenaBloodmoon = {

  preload: function() {
    game.load.crossOrigin = 'anonymous';
    game.load.image('scena1', 'assets/scene/bloodmoon.jpg');
  },

  create: function() {
    scena1 = game.add.sprite(0, 0, 'scena1');
    scena1.inputEnabled = true;
    scena1.events.onInputUp.add(imageClick2);
  },

  update: function() {

  },

};

function imageClick2() {
    this.game.state.start('RitornoLupi');
}

game.state.add('ScenaBloodmoon', ScenaBloodmoon);
