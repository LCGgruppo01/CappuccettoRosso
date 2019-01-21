var BadEnd1 = {

  preload: function() {
    game.load.crossOrigin = 'anonymous';
    game.load.image('scenaE1', 'assets/scene/gameover.jpg');
  },

  create: function() {
    scenaE1 = game.add.sprite(0, 0, 'scenaE1');

    restart = game.add.sprite(512, 50, 'buttonCheck');
    restart.anchor.setTo(0.5,0);
    restart.inputEnabled = true;
    restart.fixedToCamera = true;

    restartLevel = game.add.sprite(924, 50, 'buttonLevel');
    restartLevel.anchor.setTo(1,0);
    restartLevel.inputEnabled = true;
    restartLevel.fixedToCamera = true;

    mainMenu = game.add.sprite(100, 50, 'buttonMenu');
    mainMenu.inputEnabled = true;
    mainMenu.fixedToCamera = true;
  },

  update: function() {

    restart.events.onInputUp.add(function(){
      if (level == 1) {
        this.game.state.start('GameLevel_1');
      }else if (level == 2) {
        this.game.state.start('GameLevel_2');
      }
    });

    restartLevel.events.onInputUp.add(function(){
      if (level == 1) {
        this.game.state.start('GameLevel_1');
        spawnX = 4*m;
        spawnY = 55*m;
      }else if (level == 2) {
        this.game.state.start('GameLevel_2');
        spawnX = 9.5*m;
        spawnY = 8*m;
      }
    });

    mainMenu.events.onInputUp.add(function(){
      this.game.state.start('GameStart');
      spawnX = 4*m;
      spawnY = 55*m;
      fucile = false;
    });

  },

};

game.state.add('BadEnd1', BadEnd1);
