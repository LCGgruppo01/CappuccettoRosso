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
  playerUp = player.create(spawnX, spawnY, 'grannyUp');
  playerDown = player.create(spawnX, spawnY, 'grannyDown');
  game.camera.follow(playerUp);

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
  playerDown.animations.add('left', [3, 2, 1, 0], 10, true);
  playerDown.animations.add('right', [6, 7, 8, 9], 10, true);
  playerUp.animations.add('left', [3, 2, 1, 0], 10, true);
  playerUp.animations.add('right', [6, 7, 8, 9], 10, true);
  playerUp.animations.add('leftAxe', [13, 12, 11, 10], 10, true);
  playerUp.animations.add('rightAxe', [16, 17, 18, 19], 10, true);
  playerUp.animations.add('leftAxeChop', [1, 0, 0, 19], 10, true);
  playerUp.animations.add('rightAxeChop', [4, 7, 18, 0], 10, true);

};

function playerUpdate(){

  //player MOVEMENT start
  if(playerUp.body.touching.down){}
  if (cursors.left.isDown && game.time.now > timeHit){
    player.setAll('body.velocity.x', -playerVelocity);
    position = "leftt";
    if(playerUp.body.touching.down) {
      playerDown.animations.play('left');
      if (gotAxe==0) {
        playerUp.animations.play('left');
      }else if (gotAxe==1) {
        playerUp.animations.play('leftAxe');
      }else if (gotAxe==2) {
        playerUp.animations.play('leftGun');
      }
    }else {
      playerDown.frame = 4;
      if (gotAxe===0) {
        playerUp.frame = 4
      }else if (gotAxe==1) {
        playerUp.frame = 14
      }else if (gotAxe==2) {
        playerUp.frame = 24
      }
    }
  }else if (position == "leftt"){
    playerDown.frame = 4;
    if (gotAxe===0) {
      playerUp.frame = 4
    }else if (gotAxe==1) {
      playerUp.frame = 14
    }else if (gotAxe==2) {
      playerUp.frame = 24
    }
  }

  if (cursors.right.isDown && game.time.now > timeHit){
    player.setAll('body.velocity.x', playerVelocity);
    position = "rightt";
    if(playerUp.body.touching.down) {
      playerDown.animations.play('right');
      if (gotAxe==0) {
        playerUp.animations.play('right');
      }else if (gotAxe==1) {
        playerUp.animations.play('rightAxe');
      }else if (gotAxe==2) {
        playerUp.animations.play('rightGun');
      }
    }else {
      playerDown.frame = 5;
      if (gotAxe===0) {
        playerUp.frame = 5
      }else if (gotAxe==1) {
        playerUp.frame = 15
      }else if (gotAxe==2) {
        playerUp.frame = 25
      }
    }
  }else if (position == "rightt"){
    playerDown.frame = 5;
    if (gotAxe===0) {
      playerUp.frame = 5
    }else if (gotAxe==1) {
      playerUp.frame = 15
    }else if (gotAxe==2) {
      playerUp.frame = 25
    }
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

};
