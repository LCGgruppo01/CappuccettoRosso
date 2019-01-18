var GameStart = {

  preload: function() {
    game.load.crossOrigin = 'anonymous';
    game.load.image('copertina', 'assets/images/copertina.png');
    game.load.image('start', 'assets/images/start.png');
    game.load.image('startL1', 'assets/images/startL1.png');
    game.load.image('startL2', 'assets/images/startL2.png');
  },

  create: function() {
    this.game.scale.pageAlignHorizontally = true;this.game.scale.pageAlignVertically = true;this.game.scale.refresh();
    copertina = game.add.sprite(0, 0, 'copertina');
    start = game.add.sprite(512, 384, 'start');
    start.anchor.setTo(.5,.5);
    start.inputEnabled = true;
    start.events.onInputUp.add(imageClick);
    l1 = game.add.sprite(512, 100, 'startL1');
    l1.anchor.setTo(.5,.5);
    l1.inputEnabled = true;
    l1.events.onInputUp.add(imageClickLevel1);
    l2 = game.add.sprite(512, 500, 'startL2');
    l2.anchor.setTo(.5,.5);
    l2.inputEnabled = true;
    l2.events.onInputUp.add(imageClickLevel2);
  },

};

function imageClick() {
    this.game.state.start('ScenaBloodmoon');
}
function imageClickLevel1() {
    spawnX = 2*m;
    spawnY = 56*m;
    this.game.state.start('GameLevel_1');
}
function imageClickLevel2() {
    spawnX = 6*m;
    spawnY = 6*m;
    this.game.state.start('GameLevel_2');
}

var game = new Phaser.Game(1024, 768, Phaser.AUTO);

game.state.add('GameStart', GameStart);
game.state.start('GameStart');
