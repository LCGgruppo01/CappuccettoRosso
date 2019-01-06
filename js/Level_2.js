var timeWolves = 0;
var wolvesKilled = 0;
var gotAxe = 1;
var changeWeapon = 0;
var shake = 0.05;
var kingShot = 0;

var GameLevel_2 = {

  preload: function() {

    game.world.width=126*m;
    game.world.height=64*m;
    game.load.image('secretHall', 'assets/images/secretHall.png');

    worldPreload(); //find in World.js
    playerPreload(); //find in Player.js
  },

  create: function() {

    var step = 0;
    fucile = true;
    
    worldCreate(); //find in World.js
    playerCreate(); //find in Player.js

    //Cave entering
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
    //Vertical 3
    platformCreate(13,42,3);
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
    wolfCreate(78,46);
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
    //cutscene
    rockCutscene = platforms.create(93*m, 48*m, '');
    rockCutscene.body.setSize(9*m, 1*m, 0, 0);
    rockCutscene.body.immovable = true;
    kingWolf = game.add.sprite(115*m, 55*m, 'kingWolf');
    game.physics.arcade.enable(kingWolf);
    kingWolf.enableBody = true;
    platformsDes.create(118*m, 54*m, 'd1');
    cappuccetto = game.add.sprite(121*m, 57*m, 'cappuccetto');
    game.physics.arcade.enable(cappuccetto);
    cappuccetto.enableBody = true;

  },

  update: function() {

    worldUpdate(); //find in World.js
    playerUpdate(); //find in Player.js

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

    //cutscene
    if (playerUp.body.x >= 93*m && step == 0) {
      game.input.keyboard.removeKey(Phaser.Keyboard.UP);
    }
    if (playerUp.body.x >= 97*m && step <= 1) {
      game.input.keyboard.removeKey(Phaser.Keyboard.LEFT);
      game.input.keyboard.removeKey(Phaser.Keyboard.RIGHT);
      game.input.keyboard.removeKey(Phaser.Keyboard.DOWN);
      game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
      game.input.keyboard.removeKey(Phaser.Keyboard.H);
      playerUp.body.velocity.x = 0;
      playerUp.frame = 0;
      playerDown.frame = 0;
      if (playerUp.body.y <= 51*m && step == 0) {
        game.camera.shake(shake, 1000);
        shake = shake*0.95;
      }
      setTimeout(function(){
        rockCutscene.body.immovable = false;
      }, 500)
    }
    if (playerUp.body.y >= 57*m && step == 0) {
      game.camera.follow();
      game.camera.x += 8;
    }
    if (game.camera.x >= 107.5*m && step == 0) {
      step = 1;
    }
    if (step == 1) {
      setTimeout(function(){
        kingWolf.body.velocity.x = -250;
      },200)
      setTimeout(function(){
        game.camera.x -= 8;
      },550)
    }
    if (game.camera.x <= 99.5*m && step == 1) {
      rockCreate(94.2,48,1,11);
      rockCreate(111.1,48,1,11);
      step = 2;
    }
    if (step == 2){
      kingWolf.body.velocity.x = 0;
      cursors = game.input.keyboard.createCursorKeys();
      SPACE = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      C = game.input.keyboard.addKey(Phaser.Keyboard.C);
      H = game.input.keyboard.addKey(Phaser.Keyboard.H);
      wolfKingShot();
    }
    render();
    wolvesBehave(Wolves); //find in Functions.js

  },

};

game.state.add('GameLevel_2', GameLevel_2);
