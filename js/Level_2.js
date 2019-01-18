var timeWolves = 0;
var wolvesKilled = 0;
var gotAxe = 1;
var changeWeapon = 0;
var shake = 0.05;
var kingShot = 0;
var tempo = 0;
var step = 0;
var fristBone = 0;

var GameLevel_2 = {

  preload: function() {

    game.world.width=126*m;
    game.world.height=60*m;
    game.load.image('secretHall', 'assets/images/secretHall.png');
    game.load.image('memoryObj', 'assets/images/memory_object.png');
    game.load.image('fucile', 'assets/images/fucile.png');
    game.load.image('scena4', 'assets/scene/cappuccetto alla finestra.jpg');
    game.load.image('scena3', 'assets/scene/cappuccetto alla finestra.jpg');
    game.load.spritesheet('heart', 'assets/images/heart.png', 32, 32);

    game.load.image('livello2', 'assets/images/level2.png');

    worldPreload(); //find in World.js
    playerPreload(); //find in Player.js
  },

  create: function() {

    level2 = game.add.sprite(0*m, 1*m, 'livello2');

    level = 2;
    step = 0;
    shake = 0.05;
    fristBone = 0;
    bulletN = 5;
    fucileTerra = game.add.sprite(13*m, 8*m, 'fucile');
    game.physics.arcade.enable(fucileTerra);
    fucileTerra.enableBody = true;

    if (spawnY > 25*m) {
      fucile = true;
      fucileTerra.alpha = 0;
    }else {
      fucile = false;
      scene3 = game.add.sprite(0, 0, 'scena3');
      scene3.alpha = 0;
      scene3.fixedToCamera = true;
    }

    worldCreate(); //find in World.js
    playerCreate(); //find in Player.js

    //Cave entering
    wolfCreate(27,7);
    rockCreate(0,9,33,1);
    rockCreate(32,1,1,4);
    rockCreate(32,5,10,1);
    //Vertical 1
    rockCreate(33,9,1,11);
    platformCreate(34,12,4);
    rockCreate(42,6,1,9);
    platformCreate(38,15,4);
    rockCreate(42,16,1,7);
    platformCreate(34,18,4);
    platformCreate(38,20,4);
    rockCreate(33,23,9,1);
    //Horizontal 1
    wolfPatrolCreate(33,21,41);
    rockCreate(33,24,1,8);
    platformCreate(29,24,4);
    platformCreate(24,26,4);
    rockCreate(4,19,29,1);
    rockCreate(26,32,8,1);
    thornsCreate(26,31,10);
    wolfPatrolCreate(18,27,26);
    checkpointCreate(16,27);
    rockCreate(25,29,1,4);
    rockCreate(16,29,9,1);
    //Vertical 2
    rockCreate(4,20,1,20);
    rockCreate(16,30,1,5);
    platformCreate(5,31,6);
    wolfCreate(6,29);
    platformCreate(9,34,7);
    platformCreate(5,37,4);
    //Horizontal 2
    rockCreate(4,40,6,1);
    wolfCreate(27,39);
    //Secret Hall
    secretHall = game.add.sprite(16*m, 35*m, 'secretHall');
    rockCreate(16,36,1,3);
    rockCreate(17,41,13,1);
    rockCreate(29,35,1,6);
    rockCreate(16,35,13,1);
    scene4 = game.add.sprite(0, 0, 'scena4');
    scene4.alpha = 0;
    scene4.fixedToCamera = true;

    memoryObj4 = game.add.sprite(24*m, 40*m, 'memoryObj');
    memoryObj4.tint = 0x1a53ff;
    game.physics.arcade.enable(memoryObj4);
    memoryObj4.enableBody = true;

    //Vertical 3
    platformCreate(12,42,4);
    rockCreate(9,41,1,11);
    rockCreate(16,41,1,7);
    platformCreate(10,45,4);
    platformCreate(13,48,3);
    //Horizontal 3
    rockCreate(9,52,31,1);
    rockCreate(16,48,24,1);
    rockCreate(40,43,1,6);
    rockCreate(40,52,1,4);
    wolfPatrolCreate(10,48,25);
    wolfCreate(24,48);
    wolfPatrolCreate(28,48,38);
    //Big Hall
    checkpointCreate(44,54);
    rockCreate(40,42,36,1);
    rockCreate(40,56,9,1);
    rockCreate(49,56,1,3);
    rockCreate(50,58,24,1);
    platformCreate(52,54,6);
    wolfPatrolCreate(52,52,58);
    platformCreate(60,52,7);
    wolfPatrolCreate(60,50,67);
    platformCreate(68,50,3);
    platformCreate(71,48,3);
    wolfPatrolCreate(75,46,85);
    rockCreate(74,48,1,11);
    thornsCreate(50,57,26);
    rockCreate(75,48,5,1);
    rockCreate(79,44,13,1);
    rockCreate(80,48,12,1);
    rockCreate(76,43,4,1);
    rockCreate(76,37,1,6);
    rockCreate(92,45,10,1);
    //Boss Hall
    checkpointCreate(89,46);
    rockCreate(92,48,1,11);
    rockCreate(102,45,1,4);
    rockCreate(103,48,20,1);
    rockCreate(93,58,31,1);
    rockCreate(123,48,1,11);
    //bossFight
    platformCreate(97,55,2);
    platformCreate(101,53,3);
    platformCreate(105,55,2);
    //cutscene
    rockCutscene = platforms.create(93*m, 48*m, '');
    rockCutscene.body.setSize(9*m, 1*m, 0, 0);
    rockCutscene.body.immovable = true;

    kingWolf = game.add.sprite(115*m, 56*m, 'kingWolf');
    game.physics.arcade.enable(kingWolf);
    kingWolf.enableBody = true;
    kingWolf.body.gravity.y = gravity;
    kingWolf.health = 6;
    kingWolf.alpha = 0.5;
    kingWolf.anchor.setTo(.5,.5);

    wolfLife1 = game.add.sprite(kingWolf.x, kingWolf.y - 50, 'heart');
    wolfLife2 = game.add.sprite(kingWolf.x + 50, kingWolf.y - 50, 'heart');
    wolfLife3 = game.add.sprite(kingWolf.x + 100, kingWolf.y - 50, 'heart');
    wolfLife4 = game.add.sprite(kingWolf.x + 150, kingWolf.y - 50, 'heart');
    wolfLife5 = game.add.sprite(kingWolf.x + 150, kingWolf.y - 50, 'heart');
    wolfLife6 = game.add.sprite(kingWolf.x + 150, kingWolf.y - 50, 'heart');

    platformsDes.forEach(function(d1){
      d1.body.immovable = true;
      d1.frame = 0;
      d1.stato = 1;
    });

    cappuccetto = game.add.sprite(121*m, 57*m, 'cappuccetto');
    game.physics.arcade.enable(cappuccetto);
    cappuccetto.enableBody = true;

    thorns.setAll('alpha','0');

    platformsOver.setAll('alpha','0');

  },

  update: function() {

    worldUpdate(); //find in World.js
    playerUpdate(); //find in Player.js

    game.physics.arcade.overlap(playerUp, memoryObj4, collectMe4, null, this);
    game.physics.arcade.overlap(playerUp, fucileTerra, collectMe3, null, this);

    //secretHall
    if((playerUp.x > 17*m && playerUp.x < 29*m) && (playerUp.y > 35*m && playerUp.y < 41*m)){
      secretHall.alpha = secretHall.alpha*0.98;
    }else{
      secretHall.alpha = 1;
    }

    if(playerUp.health <= 0){
      this.game.state.start('GameLevel_2');
    }

    if(wolvesKilled >= 5){
      game.state.paused;
    }

    wolfKingHearts();

    //if (kingWolf.health == 75) {
      //kingWolf.body.velocity.x = -500;
      //if (kingWolf.x < 92*m) {
        //kingWolf.body.velocity.x = 0;
      //}
    //}

    //cutscene
    if (playerUp.body.x >= 93*m && step <= 1) {
      game.input.keyboard.removeKey(Phaser.Keyboard.UP);
    }
    if (playerUp.body.x >= 95.5*m && step <= 3) {
      game.input.keyboard.removeKey(Phaser.Keyboard.LEFT);
      game.input.keyboard.removeKey(Phaser.Keyboard.RIGHT);
      game.input.keyboard.removeKey(Phaser.Keyboard.DOWN);
      game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
      game.input.keyboard.removeKey(Phaser.Keyboard.H);
      game.input.keyboard.removeKey(Phaser.Keyboard.S);
      playerUp.body.velocity.x = 0;
      gotAxe = 1;
      if (step <= 3 && (fristBone == 0 || fristBone == 1 || fristBone == 3)) {
        playerUp.animations.stop(null, true);
        playerDown.animations.stop(null, true);
      }
      if (borderTop.cameraOffset.y <= -10 && step == 0) {
        borderTop.cameraOffset.y = borderTop.cameraOffset.y + 3;
        borderBottom.cameraOffset.y = borderBottom.cameraOffset.y - 2;
      }
      setTimeout(function(){
        if (playerUp.body.y <= 51*m && step == 0) {
          game.camera.shake(shake, 1000);
          shake = shake*0.95;
        }
        setTimeout(function(){
          rockCutscene.body.immovable = false;
        }, 500)
      }, 1000)
    }

    if (kingWolf.health <= 0){
      rock1.kill();
      rock2.kill();
      game.camera.follow(playerUp, Phaser.Camera.FOLLOW_LOCKON, 0.05, 0.05);
    }
    else if (step == 4) {
      cursors = game.input.keyboard.createCursorKeys();
      SPACE = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      C = game.input.keyboard.addKey(Phaser.Keyboard.C);
      H = game.input.keyboard.addKey(Phaser.Keyboard.H);
      CTRL = game.input.keyboard.addKey(Phaser.Keyboard.S);
      wolfKingShot();
    }
    else if (step == 3){
      if (borderTop.cameraOffset.y <= -155) {
        step = 4;
      }
      else {
        borderTop.cameraOffset.y = borderTop.cameraOffset.y - 2;
        borderBottom.cameraOffset.y = borderBottom.cameraOffset.y + 2;
      }
    }
    else if(step == 2){
      kingWolf.body.velocity.x = 0;
      setTimeout(function(){
        if (fristBone == 0) {
          bone = Bones.create(kingWolf.x, kingWolf.y, 'barGranny');
          bone.rimbalzo = 0;
          bone.body.gravity.y = gravity;
          bone.tempo = Math.sqrt(Math.pow((kingWolf.x - playerUp.x), 2) + Math.pow((kingWolf.y - playerUp.y), 2))/500;
          bone.body.velocity.x = -(kingWolf.x - playerUp.x)/bone.tempo;
          bone.body.velocity.y = (Math.sqrt(Math.pow(500, 2) - Math.pow(bone.body.velocity.x, 2)) -0.5*gravity*bone.tempo);
          fristBone = 1;
        }
      }, 1100);
      setTimeout(function(){
        if (fristBone == 1) {
          step = 2;
          axeHit = false;
          changeHitbox();
          playerUp.animations.play('rightAxeChop');
          bone.body.velocity.x = - bone.body.velocity.x;
          bone.body.velocity.y = - bone.body.velocity.y;
          fristBone = 2;
        }
      }, 2600);
      setTimeout(function(){
        if (fristBone == 2) {
          fristBone = 3;
        }
      }, 3040);
      setTimeout(function(){
        if (fristBone == 2 || fristBone == 3) {
          kingWolf.damage(1);
          flashDamage();
          bone.kill();
          step = 3;
          fristBone = 4;
        }
      }, 3950);
    }
    else if (game.camera.x <= 99.5*m && step == 1) {
      rock1 = platforms.create(94.3*m, 48*m, '');
      rock1.body.setSize(1*m, 11*m, 0, 0);
      rock1.body.immovable = true;
      rock2 = platforms.create(111.2*m, 48*m, '');
      rock2.body.setSize(1*m, 11*m, 0, 0);
      rock2.body.immovable = true;
      step = 2;
    }
    else if (step == 1) {
      setTimeout(function(){
        kingWolf.body.velocity.x = -250;
      },200)
      setTimeout(function(){
        game.camera.x -= 8;
      },550)
    }
    else if (game.camera.x >= 107.5*m && step == 0) {
      step = 1;
    }
    else if (playerUp.body.y >= 56*m && step == 0) {
      game.camera.follow();
      game.camera.x += 8;
    }

    barGranny.cameraOffset.x = Math.sqrt(Math.pow(playerUp.body.position.x, 2) + Math.pow(playerUp.body.position.y, 2))/22.5 + 2.5*m;

    if (kingWolf.health <= 0) {
      Bones.forEach(function(bone){
        bone.kill();
      });
    }
    wolvesBehave(Wolves); //find in Functions.js

  },

};

game.state.add('GameLevel_2', GameLevel_2);
