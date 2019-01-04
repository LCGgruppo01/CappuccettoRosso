var scene1;
var timeWolves = 0;
var wait = 0;
var step = 0;
var memoryObjCollect = 0;

var GameLevel_1 = {

  preload: function() {

    game.world.width=185*m;
    game.world.height=61*m;

    game.load.crossOrigin = 'anonymous';

    game.load.spritesheet('axe', 'assets/images/axe_64.png', 64, 64);

    game.load.image('house', 'assets/images/house.png');
    game.load.image('p1', 'assets/images/p1.png');
    game.load.image('p2', 'assets/images/p2.png');
    game.load.image('p3', 'assets/images/p3.png');
    game.load.image('p4', 'assets/images/p4.png');
    game.load.image('p5', 'assets/images/p5.png');
    game.load.image('p6', 'assets/images/p6.png');
    game.load.image('s1', 'assets/images/s1.png');
    game.load.image('t1', 'assets/images/t1.png');
    game.load.image('tutorialMove', 'assets/images/tutorial_move.png');
    game.load.image('tutorialUp', 'assets/images/tutorial_up.png');
    game.load.image('tutorialAxe', 'assets/images/tutorial_axe.png');
    game.load.image('tutorialSpace', 'assets/images/tutorial_space.png');
    game.load.image('memoryObj', 'assets/images/memory_object.png');

    game.load.image('open', 'http://1.bp.blogspot.com/-a8aV13i0t9Y/Vi4LTodbxuI/AAAAAAAABdM/YPArwcG7Gx8/s1600/cappuccetto-rosso-e-il-lupo.jpg');

    game.load.image('livello1', 'assets/images/livello1.png');
    game.load.image('livello1parte2', 'assets/images/livello1parte2 .png');
    game.load.image('skyBackground', 'assets/images/sky background.png');


    playerPreload(); //find in player.js
    worldPreload(); //find in World.js
  },

  create: function() {
    skyBack = game.add.sprite(0, 0, 'skyBackground');
    skyBack.fixedToCamera = true;

    game.add.sprite(1*m, 1*m, 'livello1');
    parte2 = game.add.sprite(91*m, 1*m, 'livello1parte2');
    parte2.scale.setTo(10,10);
    //Backgrounds
    game.add.sprite(0*m, 50*m, 'house');
    game.add.sprite(6.5*m, 57*m, 'tutorialMove');
    game.add.sprite(10.5*m, 55*m, 'tutorialUp');
    game.add.sprite(14.25*m, 53.5*m, 'tutorialAxe');
    game.add.sprite(15.75*m, 54*m, 'tutorialSpace');
    axe = game.add.sprite(14*m, 54*m, 'axe');
    axe.frame= 1;
    game.physics.arcade.enable(axe);
    //trunkBg(47,1,60);
    //trunkBg(74,1,60);

    worldCreate(); //find in World.js

    gotAxe=0;

    playerCreate(); //find in player.js

    //tutorial
    platforms.create(9*m, 57*m, 'p1');
    platforms.create(12*m, 55*m, 'p2');
    platformsDes.create(18*m, 51*m, 'd1');
    platforms.create(21*m, 56*m, 'p3');
    platforms.create(38*m, 57*m, 'p4');
    platforms.create(41*m, 55*m, 'p5');
    platforms.create(44*m, 53*m, 'p6');
    checkpointCreate(31,56);
    wolfCreate(42,53);
    //albero esterno
    platformCreate(26,50,6);
    wolfPatrolCreate(26,48,31);
    platformCreate(35,51,7);
    wolfPatrolCreate(35,49,42,1);
    platformCreate(34,47,5);
    platformCreate(28,46,3);
    platformCreate(31,44,4);
    platformCreate(35,51,7);
    platformCreate(24,41,7);
    wolfPatrolCreate(24,39,31);
    platformCreate(34,39,10);
    platformCreate(27,37,5);
    platformCreate(37,36,10);
    wolfPatrolCreate(37,34,47);
    //albero cavo 1
    trunkCreate(47,1,31);
    trunkCreate(47,36,22);
    platformsDes.create(48*m, 32*m, 'd1');
    platformCreate(50,38,10);
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
    platformsDes.create(61*m, 12*m, 'd1');
    trunkCreate(60,1,11);
    trunkCreate(60,16,42);
    //ponte
    platformCreate(63,16,11);
    checkpointCreate(64,14);
    wolfPatrolCreate(66,14,74);
    //albero cavo 2
    trunkCreate(74,1,11);
    trunkCreate(74,16,42);
    platformsDes.create(75*m, 12*m, 'd1');
    platformCreate(77,16,4);
    platformCreate(83,19,4);
    platformCreate(77,23,7);
    wolfPatrolCreate(77,21,84);
    platformCreate(81,27,4);
    platformCreate(80,31,7);
    wolfPatrolCreate(80,29,86);
    platformCreate(78,36,3);
    platformCreate(77,39,7);
    wolfPatrolCreate(77,37,84);
    platformCreate(80,43,7);
    platformCreate(77,48,10);
    wolfPatrolCreate(77,46,85);
    platformCreate(79,51,4);
    platformCreate(85,52,2);
    platformCreate(82,54,3);
    platformCreate(77,56,4);
    platformsDes.create(87*m, 44*m, 'd1');
    trunkCreate(87,1,43);
    trunkCreate(87,48,6);
    //platform spine
    thornsCreate(90,57,67)
    platformCreate(93,52,9);
    checkpointCreate(98,50);
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
    platformCreate(156,56,30);
    platformsDes.create(170*m, 52*m, 'd1');
    //wolfCreate(168,54);
    //wolfCreate(166,54);
    //cutscene
    kingWolf = game.add.sprite(178*m, 53*m, 'kingWolf');
    game.physics.arcade.enable(kingWolf);
    kingWolf.enableBody = true;
    cappuccetto = game.add.sprite(176*m, 55*m, 'cappuccetto');
    game.physics.arcade.enable(cappuccetto);
    cappuccetto.enableBody = true;

    platforms.forEach(function(platform){
      platform.body.immovable = true;
    });
    platformsOver.forEach(function(platform){
      platform.body.immovable = true;
    });
    platformsDes.forEach(function(d1){
      d1.body.immovable = true;
      d1.frame = 0;
      d1.stato = 1;
    });

    if (spawnX > 20*m) {
      gotAxe=1;
    }

  //scenes
  if (memoryObjCollect <= 0){
    scene1 = game.add.sprite(0, 0, 'open');
    scene1.alpha = 0;
    scene1.scale.setTo(0.6,0.6);
    scene1.fixedToCamera = true;

    memoryObj1 = game.add.sprite(33*m, 57*m, 'memoryObj');
    game.physics.arcade.enable(memoryObj1);
    memoryObj1.enableBody = true;
  }
  if (memoryObjCollect <= 1){
    scene2 = game.add.sprite(0, 0, 'open');
    scene2.tint = 0x1a53ff;
    scene2.alpha = 0;
    scene2.scale.setTo(0.6,0.6);
    scene2.fixedToCamera = true;

    memoryObj2 = game.add.sprite(182*m, 55*m, 'memoryObj');
    memoryObj2.tint = 0x1a53ff;
    game.physics.arcade.enable(memoryObj2);
    memoryObj2.enableBody = true;
  }

  platformsOver.setAll('alpha','0');
  platforms.setAll('alpha','0');

  },

  update: function() {

    worldUpdate(); //find in World.js

    playerUpdate(); //find in player.js

    game.physics.arcade.overlap(playerUp, axe, getAxe, null, this);
    game.physics.arcade.overlap(playerUp, memoryObj1, collectMe1, null, this);
    game.physics.arcade.overlap(playerUp, memoryObj2, collectMe2, null, this);

    //cutscene START
    if(playerUp.body.x >= 172*m){
      if(cappuccetto.body.x > 180*m){
        cursors = game.input.keyboard.createCursorKeys();
        SPACE = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        C = game.input.keyboard.addKey(Phaser.Keyboard.C);
        H = game.input.keyboard.addKey(Phaser.Keyboard.H);
        game.camera.follow(playerUp, Phaser.Camera.FOLLOW_LOCKON, 0.05, 0.05);
        player.setAll('body.collideWorldBounds', true);
      }
      else if (cappuccetto.body.x < 180*m) {
        game.input.keyboard.removeKey(Phaser.Keyboard.UP);
        game.input.keyboard.removeKey(Phaser.Keyboard.LEFT);
        game.input.keyboard.removeKey(Phaser.Keyboard.RIGHT);
        game.input.keyboard.removeKey(Phaser.Keyboard.DOWN);
        game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
        game.input.keyboard.removeKey(Phaser.Keyboard.H);
        player.setAll('body.collideWorldBounds', false);
        game.camera.follow();
        if(playerUp.body.x >= 172*m && playerUp.body.x < 173*m){
          playerUp.body.velocity.x = 0;
          playerUp.frame = 0;
          playerDown.frame = 0;
        }
        setTimeout(function(){
          if (game.camera.x <= 165*m) {
            game.camera.x += 4;
          }
         }, 200);
        setTimeout(function(){
          if (step == 0) {
            kingWolf.body.velocity.x = -250;
          }
          if(kingWolf.body.x <= 176*m){
            step = 1;
            cappuccetto.body.velocity.x = 250;
            kingWolf.body.velocity.x = 250;
          }
        }, 1300);
      }
    }
    //cutscene END

    if(playerUp.health <= 0){
      this.game.state.start('GameLevel_1');
      gotAxe=0;
    }

  },

  imageClick: function(pointer) {
      this.game.state.start('GameLevel_2');
  }

};

game.state.add('GameLevel_1', GameLevel_1);
