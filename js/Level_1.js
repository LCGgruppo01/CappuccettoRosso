var timeWolves = 0;
var wolvesKilled = 0;

var GameLevel_1 = {

  preload: function() {

    game.load.image('sky', 'http://examples.phaser.io/assets/skies/sky2.png');

    worldPreload(); //find in World.js
    playerPreload(); //find in Player.js

  },

  create: function() {

    worldCreate(); //find in World.js

    ledgeCreate(game.world.width*0.1, game.world.height-100); //find in Function.js
    ledgeCreate(game.world.width*0.25, game.world.height-100); //find in Function.js

    modularLedgeCreate(500, 100, 5); //find in Functions.js
    modularLedgeCreate(1000, 500, 10); //find in Functions.js
    modularLedgeCreate(600, 250, 2); //find in Functions.js

    thornsCreate(game.world.width*0.195, game.world.height-100); //find in Function.js

    wolfCreate(1300,  game.world.height - 200); //find in Function.js

    player = game.add.sprite(32, game.world.height - 200, 'granny');
    playerCreate(); //find in Player.js

  },

  update: function() {

    worldUpdate(); //find in World.js

    playerUpdate(); //find in Player.js

    if (game.time.now > timeWolves){
      var wolf = Wolves.create(1300,  game.world.height - 200, 'wolf');
      wolf.body.gravity.y = gravity;
      wolf.body.bounce.y =bounce;
      wolf.scale.setTo(0.2, 0.2);
      timeWolves = game.time.now + 4000;
    }

    if(player.health <= 0)
    {
      this.game.state.start('GameLevel_1');
    }

    if(wolvesKilled >= 5){
      this.game.state.start('GameLevel_2');
    }

    wolvesBehave(Wolves); //find in Functions.js

  },

};

game.state.add('GameLevel_1', GameLevel_1);
