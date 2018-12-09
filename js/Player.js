var salto;
var wallJump = 0;
var shootTime = 0;
var shoot = true;
var axeHit = true;
var timeHit = 0;
var immunity = 0;
var position = "rightt";
var timeAxe = 0;

function playerPreload(){

  game.load.spritesheet('grannyUp', 'assets/images/grannyUp_64x85.png', 64, 85);
  game.load.spritesheet('grannyDown', 'assets/images/granny_down_64x85.png', 64, 85);

};

function playerCreate(){

  player = game.add.group();
  playerDown = player.create(spawnX, spawnY, 'grannyDown');
  playerUp = player.create(spawnX, spawnY, 'grannyUp');
  game.camera.follow(playerUp);
  playerUp.anchor.setTo(.5,.5);
  playerDown.anchor.setTo(.5,.5);

  //player attack HItBOX
  hitBoxCreate();

  //player PHYSICS
  game.physics.arcade.enable(player);
  player.enableBody = true;
  player.setAll('body.collideWorldBounds', true);
  player.setAll('body.bounce.y', bounce);
  player.setAll('body.gravity.y', gravity);

  //player HEALTH
  playerUp.health = 100;
  playerUp.maxHealth = 100;
  playerUp.heal(100);

  //player ANIMATIONS
  playerDown.animations.add('left', [0, 1, 2, 3], 10, true);
  playerDown.animations.add('right', [6, 7, 8, 9], 10, true);
  playerUp.animations.add('left', [0, 1, 2, 3], 10, true);
  playerUp.animations.add('right', [6, 7, 8, 9], 10, true);
  playerUp.animations.add('leftAxe', [10, 11, 12, 13], 10, true);
  playerUp.animations.add('rightAxe', [16, 17, 18, 19], 10, true);
  playerUp.animations.add('leftAxeChop', [1, 0, 0, 19], 10, true);
  playerUp.animations.add('rightAxeChop', [4, 7, 18, 0], 10, true);

};

function playerUpdate(){

  //player MOVEMENT start
  if (cursors.left.isDown && game.time.now > timeHit){
    player.setAll('body.velocity.x', -playerVelocity);
    position = "leftt";
  }

  if (cursors.right.isDown && game.time.now > timeHit){
    player.setAll('body.velocity.x', playerVelocity);
    position = "rightt";
  }

  player.setAll('body.velocity.x', playerUp.body.velocity.x * slowDownFactor);
  //player MOVEMENT end

  //player JUMP start
  if (cursors.up.isDown && playerUp.body.touching.down){
    player.setAll('body.velocity.y', playerJump);
    salto = 1;
  }

  if (cursors.up.isUp && salto == 1){
      salto = 2;
  }

  if (cursors.up.isDown && salto == 2){
    player.setAll('body.velocity.y', playerJump);
    salto = 3;
  }
  //player JUMP end

  axeChop(); //find in Functions.js
  playerAnimation();
  playerDown.body.x = playerUp.body.x;
  playerDown.body.y = playerUp.body.y;

  hitBoxUpdate();

};
