var salto;
var wallJump = 0;
var shootTime = 0;
var shoot = true;
var axeHit = true;
var timeHit = 0;
var immunity = 0;
var position = "rightt";
var timeAxe = 0;
var animAxe;
var bulletN = 5;

function playerPreload(){

  game.load.spritesheet('grannyUp', 'assets/images/GRANNYup67x75h.png', 67, 75);
  game.load.spritesheet('grannyDown', 'assets/images/GRANNYdown67x75h.png', 67, 75);

};

function playerCreate(){

  player = game.add.group();
  playerDown = player.create(spawnX, spawnY, 'grannyDown');
  playerUp = player.create(spawnX, spawnY, 'grannyUp');
  game.camera.follow(playerUp, Phaser.Camera.FOLLOW_LOCKON, 0.05, 0.05);
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
  playerUp.body.setSize(30, 60, 15, 15);
  playerDown.body.setSize(30, 60, 15, 15);


  //player HEALTH
  playerUp.health = 100;
  playerUp.maxHealth = 100;
  playerUp.heal(100);

  //player ANIMATIONS
  playerDown.animations.add('right', [1, 2, 3, 4], 10, true);
  playerUp.animations.add('right', [6, 7, 8, 9], 10, true);
  playerUp.animations.add('rightAxe', [1, 2, 3, 4], 10, true);
  animAxe = playerUp.animations.add('rightAxeChop', [10, 11, 12, 13], 10, true);
  animAxe.loop = false;

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

  if(playerUp.body.velocity.y > 600){
    playerUp.body.velocity.y = 600;
  }
  //player JUMP end

  axeChop();
  rifle();

  //find in Functions.js
  if (animAxe.isPlaying) {
    if (position=='leftt') {
      playerUp.scale.x = -1;
    }else {
      playerUp.scale.x = 1;
    }
  }else {
    playerAnimationUp();
  }
  playerAnimationDown();

  playerDown.body.x = playerUp.body.x;
  playerDown.body.y = playerUp.body.y;

  hitBoxUpdate();

};
