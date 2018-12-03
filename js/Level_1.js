var timeWolves = 0;

var GameLevel_1 = {

  preload: function() {

    game.load.image('sky', 'http://examples.phaser.io/assets/skies/sky2.png');

    game.world.width=180*m;
    game.world.height=61*m;

    game.load.crossOrigin = 'anonymous';

    game.load.image('bullet', 'http://examples.phaser.io/assets/bullets/bullet13.png');
    game.load.image('sky', 'http://examples.phaser.io/assets/skies/sky2.png');

    game.load.spritesheet('wolf', 'assets/images/wolf_430x498.png', 430, 498);
    game.load.spritesheet('checkpoint', 'assets/images/checkpoint.png', 96, 96);

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
    game.load.image('p8', 'assets/images/p8.png');
    game.load.image('p9', 'assets/images/p9.png');
    game.load.image('p10', 'assets/images/p10.png');
    game.load.image('p11', 'assets/images/p11.png');
    game.load.image('p12', 'assets/images/p12.png');
    game.load.image('p13', 'assets/images/p13.png');

    playerPreload(); //find in player.js
    worldPreload(); //find in World.js
  },

  create: function() {
    //Backgrounds
    game.add.sprite(0, 47*m, 'house');
    axe = game.add.sprite(16*m, 52*m, 'axe');
    game.physics.arcade.enable(axe);

    worldCreate(); //find in World.js

    gotAxe=0;

    playerCreate(); //find in player.js

    //objects
    //albero esterno
    platformCreate(26,50,6);
    wolfPatrolCreate(26,48,31);
    platformCreate(35,51,7);
    wolfPatrolCreate(35,49,42);
    platformCreate(34,47,5);
    platformCreate(28,46,3);
    platformCreate(31,44,4);
    platformCreate(35,51,7);
    platformCreate(24,41,7);
    wolfPatrolCreate(24,39,31);
    platformCreate(34,39,10);
    platformCreate(27,37,5);
    platformCreate(37,36,13);
    wolfPatrolCreate(37,34,50);
    //albero cavo 1
    platformCreate(55,35,5);
    platformCreate(57,32,3);
    platformCreate(50,30,4);
    platformCreate(54,27,5);
    wolfPatrolCreate(54,25,59);
    platformCreate(50,25,3);
    platformCreate(53,23,5);
    platformCreate(57,21,3);
    platformCreate(52,19,4);
    platformCreate(50,17,3);
    platformCreate(54,15,4);
    wolfPatrolCreate(54,13,58);
    //ponte
    platformCreate(63,16,11);
    checkpointCreate(64,15);
    wolfPatrolCreate(66,14,74);
    //albero cavo 2
    platformCreate(77,16,4);
    platformCreate(83,19,4);
    platformCreate(77,23,7);
    wolfPatrolCreate(77,21,84);
    platformCreate(81,27,4);
    platformCreate(80,31,7);
    wolfPatrolCreate(80,29,87);
    platformCreate(78,36,3);
    platformCreate(77,39,7);
    wolfPatrolCreate(77,37,84);
    platformCreate(80,43,7);
    platformCreate(77,48,10);
    wolfPatrolCreate(77,46,87);
    platformCreate(79,51,4);
    platformCreate(85,52,2);
    platformCreate(82,54,3);
    platformCreate(77,56,4);
    //platform spine
    thornsCreate(90,57,67)
    platformCreate(93,52,9);
    checkpointCreate(98,51);
    platformCreate(104,54,6);
    wolfPatrolCreate(104,52,110);
    platformCreate(112,52,2);
    platformCreate(116,55,9);
    wolfPatrolCreate(116,53,125);
    platformCreate(128,54,2);
    platformCreate(137,54,1);
    platformCreate(141,53,1);
    platformCreate(144,51,7);
    wolfPatrolCreate(144,49,151);
    platformCreate(152,53,4);
    platformCreate(156,56,25);


    //destructible objects
    var p2 = platformsDes.create(22*m, 48*m, 'p2');
    p2.body.immovable = true;

    platforms.forEach(function(platform){
      platform.body.immovable = true;
    });
    platformsOver.forEach(function(platform){
      platform.body.immovable = true;
    });

  if (spawnX > 20*m) {
    gotAxe=1;
  }


  },

  update: function() {

    worldUpdate(); //find in World.js

    playerUpdate(); //find in player.js

    if (game.time.now > timeWolves){
      var wolf = Wolves.create(55*m,  50*m, 'wolf');
      wolf.body.gravity.y = gravity;
      wolf.body.bounce.y =bounce;
      wolf.scale.setTo(0.2, 0.2);
      timeWolves = game.time.now + 4000;
    }

    if(playerUp.health <= 0)
    {
      this.game.state.start('GameLevel_1');
      gotAxe=0;
    }


  },

};

game.state.add('GameLevel_1', GameLevel_1);
