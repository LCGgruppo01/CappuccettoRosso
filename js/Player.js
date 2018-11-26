var salto;
var wallJump = 0;
var shootTime = 0;
var shoot = true;
var axeHit = true;
var timeHit = 0;
var position = "rightt";

function playerPreload(){

  game.load.spritesheet('granny', 'assets/images/granny_64x96.png', 64, 96);

};

function playerCreate(){

  player.frame = 1;
  game.camera.follow(player);

  //PLAYER PHYSICS
  game.physics.arcade.enable(player);
  player.body.collideWorldBounds = true;
  player.body.bounce.y = bounce;
  player.body.gravity.y = gravity;

  //PLAYER HEALTH
  player.health = 100;
  player.maxHealth = 100;
  player.heal(100);

};

function playerUpdate(){

  //PLAYER MOVEMENT start
  if (cursors.left.isDown && game.time.now > timeHit){
      player.body.velocity.x = -playerVelocity;
      position = "leftt";
      player.frame = 0;
  }
  else if (cursors.right.isDown && game.time.now > timeHit){
      player.body.velocity.x = playerVelocity;
      position = "rightt";
      player.frame = 1;
  }

  player.body.velocity.x = player.body.velocity.x * slowDownFactor;
  //PLAYER MOVEMENT end

  //PLAYER JUMP start
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
  //PLAYER JUMP end

  //SHOOTING start
  if (SPACE.isDown && position=="leftt" && game.time.now > shootTime && shoot == true){
    var bullet = Bullets.create(player.x - 10, player.y + 20, 'bullet');
    bullet.body.gravity.y = gravity;
    bullet.body.velocity.y = -100;
    bullet.body.velocity.x = -bulletVelocity + player.body.velocity.x;
    shootTime = game.time.now + 300;
    shoot = false;
  }
  else if (SPACE.isDown && position=="rightt" && game.time.now > shootTime && shoot == true){
    bullet = Bullets.create(player.x + 10, player.y + 20, 'bullet');
    bullet.body.gravity.y = gravity;
    bullet.body.velocity.y = -100;
    bullet.body.velocity.x = bulletVelocity + player.body.velocity.x;
    shootTime = game.time.now + 300;
    shoot = false;
  }

  if (SPACE.isUp) {
    shoot = true;
  }
  //SHOOTING end

};
