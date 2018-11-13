var timeWolves = 0;

var GameLevel_1 = {

  preload: function() {

    game.load.image('sky', 'http://examples.phaser.io/assets/skies/sky2.png');

    game.world.width=167*m;
    game.world.height=55*m;

    game.load.crossOrigin = 'anonymous';

    game.load.image('bullet', 'http://examples.phaser.io/assets/bullets/bullet13.png');
    game.load.image('sky', 'http://examples.phaser.io/assets/skies/sky2.png');

    game.load.spritesheet('wolf', 'assets/images/wolf_430x498.png', 430, 498);

    game.load.image('ground', 'assets/images/ground.png');
    game.load.image('house', 'assets/images/house.png');
    game.load.image('thorns', 'assets/images/thorns.png');
    game.load.image('axe', 'assets/images/axe.png');
    game.load.image('p1', 'assets/images/p1.png');
    game.load.image('p2', 'assets/images/p2.png');
    game.load.image('s2', 'assets/images/s2.png');
    game.load.image('p3', 'assets/images/p3.png');
    game.load.image('p4', 'assets/images/p4.png');
    game.load.image('p5', 'assets/images/p5.png');
    game.load.image('p6', 'assets/images/p6.png');

    playerPreload(); //find in Player.js
    worldPreload(); //find in World.js
  },

  create: function() {
    //Backgrounds
    game.add.sprite(0, 47*m, 'house');
    game.add.sprite(28*m, 24*m, 's2');
    axe = game.add.sprite(16*m, 52*m, 'axe');
    game.physics.arcade.enable(axe);

    worldCreate(); //find in World.js

    gotAxe=0;

    player = game.add.sprite(40*m, 28*m, 'granny');
    playerCreate(); //find in Player.js

    //objects
    platforms.create(12*m, 51*m, 'p1');
    platforms.create(28*m, 24*m, 'p3');
    platforms.create(39*m, 31*m, 'p5');
    platforms.create(39*m, 24*m, 'p6');
    //tronco interno
    wolfCreate(36,52);
    platformCreate(34, 51, 5);
    platformCreate(31, 48, 3);
    platformCreate(31, 45, 2);
    platformCreate(31, 39, 4);
    platformCreate(31, 34, 4);
    platformCreate(35, 42, 4);
    platformCreate(36, 36, 3);
    //tronco esterno
    platformCreate(42, 31, 5);
    //albero 2
    platformCreate(48, 41, 7);
    platformCreate(52, 47, 12);
    platformCreate(60, 38, 12);
    platformCreate(58, 44, 5);
    platformCreate(42, 49, 8);
    platformCreate(52, 51, 4);
    //spine
    thornsCreate(70, 53, 22);

    //destructible objects
    var p2 = platformsDes.create(22*m, 48*m, 'p2');
    p2.body.immovable = true;

    platforms.forEach(function(platform){
      platform.body.immovable = true;
    });
    platformsOver.forEach(function(platform){
      platform.body.immovable = true;
    });


  },

  update: function() {

    worldUpdate(); //find in World.js

    playerUpdate(); //find in Player.js

    if (game.time.now > timeWolves){
      var wolf = Wolves.create(55*m,  50*m, 'wolf');
      wolf.body.gravity.y = gravity;
      wolf.body.bounce.y =bounce;
      wolf.scale.setTo(0.2, 0.2);
      timeWolves = game.time.now + 4000;
    }

    if(player.health <= 0)
    {
      this.game.state.start('GameLevel_1');
      gotAxe=0;
    }

    wolvesBehave(Wolves); //find in Functions.js

  },

};

game.state.add('GameLevel_1', GameLevel_1);
