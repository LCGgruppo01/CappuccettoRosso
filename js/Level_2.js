var timeWolves = 0;
var wolvesKilled = 0;
var gotAxe = 1;
var changeWeapon = 0;

var GameLevel_2 = {

  preload: function() {

    game.world.width=126*m;
    game.world.height=64*m;

    worldPreload(); //find in World.js
    playerPreload(); //find in Player.js
  },

  create: function() {
    spawnX = 8*m;
    spawnY = 7*m;

    worldCreate(); //find in World.js
    playerCreate(); //find in Player.js

    CTRL=game.input.keyboard.addKey(Phaser.Keyboard.CONTROL);

    //Cave entering
    rockCreate(0,9,33,1);
    rockCreate(32,1,1,4);
    rockCreate(32,5,10,1);
    //Vertical 1
    rockCreate(33,9,1,11);
    platformCreate(34,12,4);
    rockCreate(42,6,1,6);
    platformCreate(38,15,4);
    rockCreate(42,16,1,7);
    platformCreate(34,18,4);
    platformCreate(38,20,4);
    rockCreate(33,23,9,1);
    //Secret Hall
    rockCreate(43,11,10,1);
    rockCreate(42,15,10,1);
    rockCreate(52,12,1,4);
    //Horizontal 1
    wolfPatrolCreate(33,21,41);
    rockCreate(33,24,1,8);
    platformCreate(29,24,4);
    platformCreate(24,26,4);
    rockCreate(4,19,29,1);
    rockCreate(26,32,8,1);
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
    rockCreate(16,35,13,1);
    platformCreate(10,40,3);
    wolfPatrolCreate(16,39,22);
    wolfCreate(25,39);
    rockCreate(17,41,13,1);
    rockCreate(29,35,1,6);
    //Vertical 3
    rockCreate(9,41,1,11);
    rockCreate(16,41,1,7);
    platformCreate(12,44,4);
    platformCreate(10,48,3);
    //Horizontal 3
    rockCreate(9,52,31,1);
    rockCreate(16,48,24,1);
    rockCreate(40,43,1,6);
    rockCreate(40,52,1,4);
    wolfPatrolCreate(11,48,25);
    wolfCreate(24,48);
    wolfPatrolCreate(28,48,38);
    //Big Hall
    rockCreate(40,42,16,1);
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
    rockCreate(79,44,1,4);
    rockCreate(76,43,4,1);
    rockCreate(76,37,1,6);
    platformCreate(65,46,4);
    platformCreate(61,44,2);
    //Vertical 4
    rockCreate(46,32,1,10);
    platformCreate(47,39,3);
    //Horizontal 4
    rockCreate(47,32,56,1);
    rockCreate(52,36,44,1);
    //Vertical 5
    rockCreate(96,36,1,9);
    rockCreate(102,32,1,16);
    platformCreate(99,37,3);
    platformCreate(97,39,2);
    platformCreate(99,42,3);
    platformCreate(97,45,2);
    rockCreate(92,45,5,1);
    //Boss Hall
    rockCreate(92,46,1,13);
    rockCreate(103,48,20,1);
    rockCreate(93,58,31,1);
    rockCreate(123,48,1,11);



    //HUD
    weaponText = game.add.text(32, 96, 'weapon 1', { fontSize: '15px', fill: 'rgb(255, 255, 255)' });
    weaponText.fixedToCamera = true;

  },

  update: function() {

    worldUpdate(); //find in World.js
    playerUpdate(); //find in Player.js
    weaposChange(); //find in Functions.js

    if(playerUp.health <= 0){
      this.game.state.start('GameLevel_2');
    }

    if(wolvesKilled >= 5){
      game.state.paused;
    }

    rifle(); //find in Functions.js
    render();
    wolvesBehave(Wolves); //find in Functions.js

    //HUD
    weaponText.text = 'weapon ' + gotAxe;

  },

};

game.state.add('GameLevel_2', GameLevel_2);
