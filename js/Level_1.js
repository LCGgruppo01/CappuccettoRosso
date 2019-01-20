var scene1;
var timeWolves = 0;
var wait = 0;
var step1 = 0;
var memoryObjCollect = 0;
var level1back;
var gabbia;
var vitaFineLivello;

var GameLevel_1 = {

  preload: function() {

    game.world.width=185*m;
    game.world.height=59*m;

    game.load.crossOrigin = 'anonymous';

    game.load.spritesheet('axe', 'assets/images/axe80x80.png', 80, 80);

    game.load.image('p1', 'assets/images/p1.png');
    game.load.image('p2', 'assets/images/p2.png');
    game.load.image('p3', 'assets/images/p3.png');
    game.load.image('p4', 'assets/images/p4.png');
    game.load.image('p5', 'assets/images/p5.png');
    game.load.image('p6', 'assets/images/p6.png');
    game.load.image('t1', 'assets/images/t1.png');
    game.load.image('tutorialMove', 'assets/images/tutorial_move.png');
    game.load.image('tutorialUp', 'assets/images/tutorial_up.png');
    game.load.image('tutorialAxe', 'assets/images/tutorial_axe.png');
    game.load.image('tutorialSpace', 'assets/images/tutorial_space.png');
    game.load.image('memoryObj', 'assets/images/mantella.png');

    game.load.image('scena1', 'assets/scene/avvicinando.jpg');
    game.load.image('scena2', 'assets/scene/latroverò.jpg');

    game.load.image('livello1', 'assets/images/level1.png');
    game.load.image('livello1back', 'assets/images/level1sfondo.png');
    game.load.image('skyBackground', 'assets/images/sky background.png');

    playerPreload(); //find in player.js
    worldPreload(); //find in World.js
  },

  create: function() {
    level = 1;
    step1 = 0;

    skyBack = game.add.sprite(0, 0, 'skyBackground');
    skyBack.fixedToCamera = true;

    level1back = game.add.sprite(1*m, 1*m, 'livello1back');
    game.physics.arcade.enable(level1back);
    level1back.enableBody = true;
    level1 = game.add.sprite(0*m, 1*m, 'livello1');

    //Backgrounds
    game.add.sprite(6.5*m, 57*m, 'tutorialMove');
    game.add.sprite(10.5*m, 55*m, 'tutorialUp');
    game.add.sprite(14.25*m, 53.1*m, 'tutorialAxe');
    game.add.sprite(15.75*m, 54*m, 'tutorialSpace');
    axe = game.add.sprite(13.9*m, 53.8*m, 'axe');
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
    wolfPatrolCreate(26,48,30.5);
    platformCreate(35,51,7);
    wolfPatrolCreate(35,49,41.5,1);
    platformCreate(34,47,5);
    platformCreate(28,46,3);
    platformCreate(31,44,4);
    platformCreate(35,51,7);
    platformCreate(24,41,7);
    wolfPatrolCreate(24,39,30.5);
    platformCreate(34,39,10);
    platformCreate(27,37,5);
    platformCreate(37,36,10);
    wolfPatrolCreate(37,34,46);
    //albero cavo 1
    trunkCreate(47,1,31);
    trunkCreate(47,36,22);
    platformsDes.create(48*m, 32*m, 'd1');
    platformCreate(50,38,10);
    platformCreate(55,35,5);
    platformCreate(57,32,3);
    platformCreate(50,30,4);
    platformCreate(54,27,5);
    wolfPatrolCreate(54,25,58.5);
    platformCreate(50,25,3);
    platformCreate(53,23,5);
    platformCreate(57,21,3);
    platformCreate(52,19,4);
    platformCreate(50,17,3);
    platformCreate(54,15,4);
    wolfPatrolCreate(54,13,57.5);
    platformsDes.create(61*m, 12*m, 'd1');
    trunkCreate(60,1,11);
    trunkCreate(60,16,42);
    //ponte
    platformCreate(63,16,11);
    checkpointCreate(64,14);
    wolfPatrolCreate(66,14,73.5);
    //albero cavo 2
    trunkCreate(74,1,11);
    trunkCreate(74,16,42);
    platformsDes.create(75*m, 12*m, 'd1');
    platformCreate(77,16,4);
    platformCreate(83,19,4);
    platformCreate(77,23,7);
    wolfPatrolCreate(77,21,83.5);
    platformCreate(81,27,4);
    platformCreate(80,31,7);
    wolfPatrolCreate(80,29,85.5);
    platformCreate(78,36,3);
    platformCreate(77,39,7);
    wolfPatrolCreate(77.5,37,83.5);
    platformCreate(80,43,7);
    platformCreate(77,48,10);
    wolfPatrolCreate(77,46,84.5);
    platformCreate(79,51,4);
    platformCreate(85,52,2);
    platformCreate(82,54,3);
    platformCreate(77,56,4);
    platformsDes.create(87*m, 44*m, 'd1');
    trunkCreate(87,1,43);
    trunkCreate(87,48,6);
    //platform spine
    thornsCreate(93,57,64)
    platformCreate(93,52,9);
    checkpointCreate(98,50);
    platformCreate(104,54,6);
    wolfPatrolCreate(104,52,109.5);
    platformCreate(112,52,2);
    platformCreate(116,55,9);
    wolfPatrolCreate(116,53,124.5);
    platformCreate(128,54,2);
    platformCreate(137,54,1);
    platformCreate(141,53,1);
    platformCreate(144,51,7);
    wolfPatrolCreate(144,49,150.5);
    platformCreate(152,53,4);
    platformCreate(156,56,30);
    platformsDes.create(170*m, 52*m, 'd1');
    wolfCreate(168,54);
    wolfCreate(166,54);

    d1Destroyed = game.add.sprite(-5, 0, 'd1destroyed');

    //cutscene
    kingWolf = game.add.sprite(180*m, 51*m, 'kingWolf');
    kingWolf.anchor.setTo(.5,.5);
    game.physics.arcade.enable(kingWolf);
    kingWolf.enableBody = true;
    kingWolf.body.gravity.y = gravity;
    wolfKingAnimationCreate()

    cappuccetto = game.add.sprite(176*m, 53*m, 'cappuccetto');
    game.physics.arcade.enable(cappuccetto);
    cappuccetto.enableBody = true;
    cappuccetto.body.gravity.y = gravity;
    cappuccetto.animations.add('ferma', [0, 2, 1, 2], 10, false);

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

    scene1 = game.add.sprite(0, 0, 'scena1');
    scene1.alpha = 0;
    scene1.fixedToCamera = true;

    memoryObj1 = game.add.sprite(85*m, 51.3*m, 'memoryObj');
    game.physics.arcade.enable(memoryObj1);
    memoryObj1.enableBody = true;

    scene2 = game.add.sprite(0, 0, 'scena2');
    scene2.alpha = 0;
    scene2.fixedToCamera = true;

    memoryObj2 = game.add.sprite(182*m, 55*m, 'cadavere');
    game.physics.arcade.enable(memoryObj2);
    memoryObj2.enableBody = true;


  platformsOver.setAll('alpha','0');
  platforms.setAll('alpha','0');
  thorns.setAll('alpha','0');

  game.time.events.loop(500, function () {
    level1back.body.velocity.y = - playerUp.body.velocity.y/20;
  });


  },

  update: function() {

    worldUpdate(); //find in World.js
    playerUpdate(); //find in player.js

    if (playerUp.x < 19*m) {
      playerJump = -425;
    }else {
      playerJump = -450;
    }

    game.physics.arcade.overlap(playerUp, axe, getAxe, null, this);
    game.physics.arcade.overlap(playerUp, memoryObj1, collectMe1, null, this);
    game.physics.arcade.overlap(playerUp, memoryObj2, collectMe2, null, this);
    game.physics.arcade.overlap(kingWolf, cappuccetto, animazioneRapimento, null, this);
    game.physics.arcade.collide(cappuccetto, platformsOver);
    game.physics.arcade.collide(cappuccetto, platforms);
    game.physics.arcade.collide(kingWolf, platforms);
    game.physics.arcade.collide(kingWolf, platformsOver);



    //cutscene START
    if(playerUp.body.x >= 172*m){
      if (borderTop.cameraOffset.y <= 8 && cappuccetto.body.x < 180*m) {
        borderTop.cameraOffset.y = borderTop.cameraOffset.y + 3;
        borderBottom.cameraOffset.y = borderBottom.cameraOffset.y - 2;
      }
      if (borderTop.cameraOffset.y >= -150 && cappuccetto.body.x > 180*m) {
        borderTop.cameraOffset.y = borderTop.cameraOffset.y - 3;
        borderBottom.cameraOffset.y = borderBottom.cameraOffset.y + 2;
      }
      if(cappuccetto.body.x > 180*m){
        cursors = game.input.keyboard.createCursorKeys();
        SPACE = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        C = game.input.keyboard.addKey(Phaser.Keyboard.C);
        H = game.input.keyboard.addKey(Phaser.Keyboard.H);
        game.camera.follow(playerUp, Phaser.Camera.FOLLOW_LOCKON, 0.05, 0.05);
        player.setAll('body.collideWorldBounds', true);
      }
      else if (cappuccetto.body.x < 195*m) {
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
          if (game.camera.x <= 175*m) {
            game.camera.x += 4;
          }
        }, 1700);
        setTimeout(function(){
          if (step1 == 0) {
            kingWolf.body.velocity.x = -250;
          }
          if(kingWolf.body.x <= 176*m){
            step1 = 1;
            cappuccetto.body.velocity.x = 250;
            kingWolf.body.velocity.x = 250;
            vitaFineLivello = playerUp.health;
          }
        }, 3000);
      }
    }
    //cutscene END

    barGranny.cameraOffset.x = playerUp.body.position.x/32 + 3*m;

    if(playerUp.health <= 0){
      this.game.state.start('BadEnd1');
      gotAxe=0;
    }

    if (kingWolf.body.velocity.x < 10) {
      cappuccetto.animations.play('ferma');
      if (kingWolf.body.velocity.x === 0) {
        kingWolf.animations.play('fermo');
      }else if (kingWolf.body.velocity.x !== 0) {
        kingWolf.animations.play('corri');
      }
    }else{
      kingWolf.animations.play('corriCapp');
    }

  },

  imageClick: function(pointer) {
      this.game.state.start('GameLevel_1');
  }

};

game.state.add('GameLevel_1', GameLevel_1);
