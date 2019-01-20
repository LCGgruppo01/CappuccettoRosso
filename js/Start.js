var cr = false;
var au = false;
var ho = false;
var parallaxBG = 100;
var parallaxMBG = 350;
var parallaxMG = 600;
var parallaxFG = 800;
var parallaxFFG = 950;

var GameStart = {

  preload: function() {
    game.load.crossOrigin = 'anonymous';
    game.load.image('copertinaBG', 'assets/images/copertinaBG.png');
    game.load.image('copertinaFG', 'assets/images/copertinaFG.png');
    game.load.image('copertinaMG', 'assets/images/copertinaMG.png');
    game.load.image('copertinaMBG', 'assets/images/copertinaMBG.png');
    game.load.image('start', 'assets/images/start.png');
    game.load.image('startCR', 'assets/images/startCR.png');
    game.load.image('startAU', 'assets/images/startAU.png');
    game.load.image('startHO', 'assets/images/startHO.png');
  },

  create: function() {
    this.game.scale.pageAlignHorizontally = true;this.game.scale.pageAlignVertically = true;this.game.scale.refresh();
    copertinaBG = game.add.sprite(-1024, 0, 'copertinaBG');
    game.physics.arcade.enable(copertinaBG);
    copertinaBG.enableBody = true;
    copertinaMBG = game.add.sprite(-1024, 0, 'copertinaMBG');
    game.physics.arcade.enable(copertinaMBG);
    copertinaMBG.enableBody = true;
    copertinaMG = game.add.sprite(-1024, 0, 'copertinaMG');
    game.physics.arcade.enable(copertinaMG);
    copertinaMG.enableBody = true;
    copertinaFG = game.add.sprite(-1024, 0, 'copertinaFG');
    game.physics.arcade.enable(copertinaFG);
    copertinaFG.enableBody = true;

    start = game.add.sprite(974, 50, 'start');
    game.physics.arcade.enable(start);
    start.enableBody = true;
    start.anchor.setTo(1,0);
    start.inputEnabled = true;
    start.events.onInputUp.add(imageClick);
    l1 = game.add.sprite(512, 100, '');
    game.physics.arcade.enable(l1);
    l1.enableBody = true;
    l1.anchor.setTo(.5,.5);
    l1.inputEnabled = true;
    l1.events.onInputUp.add(imageClickLevel1);
    l2 = game.add.sprite(512, 500, '');
    game.physics.arcade.enable(l2);
    l2.enableBody = true;
    l2.anchor.setTo(.5,.5);
    l2.inputEnabled = true;
    l2.events.onInputUp.add(imageClickLevel2);

    CR = game.add.sprite(50, 718, 'startCR');
    CR.anchor.setTo(0,0);
    CR.inputEnabled = true;
    CR.events.onInputUp.add(imageClickCR);
    AU = game.add.sprite(974, 718, 'startAU');
    AU.anchor.setTo(1,0);
    AU.inputEnabled = true;
    AU.events.onInputUp.add(imageClickAU);
    HO = game.add.sprite(512, 718, 'startHO');
    HO.anchor.setTo(.5,0);
    HO.inputEnabled = true;
    HO.events.onInputUp.add(imageClickHO);
  },

  update: function() {

    if (copertinaFG.body.x <= 200 && cr == true) {
      copertinaBG.body.velocity.x = parallaxBG;
      copertinaMBG.body.velocity.x = parallaxMBG;
      copertinaMG.body.velocity.x = parallaxMG;
      start.body.velocity.x = parallaxFFG;
      l1.body.velocity.x = parallaxFFG;
      l2.body.velocity.x = parallaxFFG;
      copertinaFG.body.velocity.x = parallaxFG;
    }
    else if (copertinaFG.body.x >= -2248 && au == true) {
      copertinaBG.body.velocity.x = -parallaxBG;
      copertinaMBG.body.velocity.x = -parallaxMBG;
      copertinaMG.body.velocity.x = -parallaxMG;
      start.body.velocity.x = -parallaxFFG;
      l1.body.velocity.x = -parallaxFFG;
      l2.body.velocity.x = -parallaxFFG;
      copertinaFG.body.velocity.x = -parallaxFG;
    }
    else if ((copertinaFG.body.x <= -1025 || copertinaFG.body.x >= -1023) && ho == true) {
      if (copertinaFG.body.x < -1024) {
        copertinaBG.body.velocity.x = parallaxBG;
        copertinaMBG.body.velocity.x = parallaxMBG;
        copertinaMG.body.velocity.x = parallaxMG;
        start.body.velocity.x = parallaxFFG;
        l1.body.velocity.x = parallaxFFG;
        l2.body.velocity.x = parallaxFFG;
        copertinaFG.body.velocity.x = parallaxFG;
      }
      else if (copertinaFG.body.x > -1024) {
        copertinaBG.body.velocity.x = -parallaxBG;
        copertinaMBG.body.velocity.x = -parallaxMBG;
        copertinaMG.body.velocity.x = -parallaxMG;
        start.body.velocity.x = -parallaxFFG;
        l1.body.velocity.x = -parallaxFFG;
        l2.body.velocity.x = -parallaxFFG;
        copertinaFG.body.velocity.x = -parallaxFG;
      }
    }
    else {
      copertinaBG.body.velocity.x = 0;
      copertinaMBG.body.velocity.x = 0;
      copertinaMG.body.velocity.x = 0;
      copertinaFG.body.velocity.x = 0;
      start.body.velocity.x = 0;
      l1.body.velocity.x = 0;
      l2.body.velocity.x = 0;
      cr = false;
      au = false;
      ho = false;
    }

    copertinaBG.body.y = -10 -game.input.mousePointer.y/200;
    copertinaMBG.body.y = -10 -game.input.mousePointer.y/150;
    copertinaMG.body.y = 10 -game.input.mousePointer.y/100;
    copertinaFG.body.y = 20 -game.input.mousePointer.y/35;

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

function imageClickCR() {
  cr = true;
  au = false;
  ho = false;
}

function imageClickAU() {
  au = true;
  cr = false;
  ho = false;
}

function imageClickHO() {
  ho = true;
  cr = false;
  au = false;
}

var game = new Phaser.Game(1024, 768, Phaser.AUTO);

game.state.add('GameStart', GameStart);
game.state.start('GameStart');
