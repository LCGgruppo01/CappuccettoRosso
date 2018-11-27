var salto;
var wallJump = 0;
var shootTime = 0;
var shoot = true;
var axeHit = true;
var timeHit = 0;
var position = "rightt";
var timeAxe = 0;

function playerPreload(){

  game.load.spritesheet('granny', 'assets/images/granny_64x96.png', 64, 96);
  game.load.spritesheet('grannyUp', 'assets/images/granny_up_64x60.png', 64, 60);
  game.load.spritesheet('grannyDown', 'assets/images/granny_down64x36.png', 64, 36);


};

function playerCreate(){

  player.frame = 1;
  game.camera.follow(player);

  //player PHYSICS
  game.physics.arcade.enable(player);
  player.body.collideWorldBounds = true;
  player.body.bounce.y = bounce;
  player.body.gravity.y = gravity;

  //player HEALTH
  player.health = 100;
  player.maxHealth = 100;
  player.heal(100);

};

function playerUpdate(){

  //player MOVEMENT start
  if (cursors.left.isDown && game.time.now > timeHit){
      player.body.velocity.x = -playerVelocity;
      position = "leftt";
  }
  else if (cursors.right.isDown && game.time.now > timeHit){
      player.body.velocity.x = playerVelocity;
      position = "rightt";

  }

  player.body.velocity.x = player.body.velocity.x * slowDownFactor;
  //player MOVEMENT end

  //player JUMP start
  if (cursors.up.isDown && player.body.touching.down){
      player.body.velocity.y = playerJump;
      salto = 1;
  }

  if (cursors.up.isUp && salto == 1){
      salto = 2;
  }

  if (cursors.up.isDown && salto == 2){
      player.body.velocity.y = playerJump;
      salto = 3;
  }
  //player JUMP end

  axeChop();

  if(axeHit == false){
    if(position == 'rightt'){
      player.frame = 3;
    }
    else{
      player.frame = 2;
    }
  }
  else{
    if(position == 'leftt'){
      player.frame = 0;
    }
    else{
      player.frame = 1;
    }
  }

};
