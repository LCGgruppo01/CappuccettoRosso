var timeWolves = 0;
var wolvesKilled = 0;
var gotAxe = 1;
var changeWeapon = 0;

var GameLevel_2 = {

  preload: function() {

    game.load.image('sky', 'http://examples.phaser.io/assets/skies/sky1.png');

    game.world.width=185*m;
    game.world.height=61*m;

    worldPreload(); //find in World.js
    playerPreload(); //find in Player.js

    if (spawnX > 20*m) {
      gotAxe=2;
    }

  },

  create: function() {

    worldCreate(); //find in World.js
    playerCreate(); //find in Player.js

    CTRL=game.input.keyboard.addKey(Phaser.Keyboard.CONTROL);

    wolfCreate(10, 49); //find in Function.js

    //HUD
    weaponText = game.add.text(32, 96, 'weapon 1', { fontSize: '15px', fill: 'rgb(255, 255, 255)' });
    weaponText.fixedToCamera = true;

  },

  update: function() {

    worldUpdate(); //find in World.js
    playerUpdate(); //find in Player.js
    weaposChange(); //find in Functions.js

    if ( game.time.now > timeWolves){
      var wolf = Wolves.create(10*m, 49*m, 'wolf');
      wolf.body.gravity.y = gravity;
      wolf.body.bounce.y =bounce;
      wolf.scale.setTo(0.2, 0.2);
      timeWolves = game.time.now + 4000;
    }

    if(player.health <= 0){
      this.game.state.start('GameLevel_2');
    }

    if(wolvesKilled >= 5){
      game.state.paused;
    }

    rifle(); //find in Functions.js

    wolvesBehave(Wolves); //find in Functions.js

    //HUD
    weaponText.text = 'weapon ' + gotAxe;

  },

};

game.state.add('GameLevel_2', GameLevel_2);
