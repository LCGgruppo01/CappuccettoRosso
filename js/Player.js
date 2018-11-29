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
  game.load.spritesheet('grannyUp', 'assets/images/granny_up_64x96.png', 64, 96);
  game.load.spritesheet('grannyDown', 'assets/images/granny_down_64x96.png', 64, 96);


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

  playerDown.animations.add('right', [1, 3], 10, true);
  playerDown.animations.add('left', [0, 2], 10, true);

};

function playerUpdate(){

  //player MOVEMENT start
  if(playerUp.body.touching.down){}
  if (cursors.left.isDown && game.time.now > timeHit){
    player.setAll('body.velocity.x', -playerVelocity);
    position = "leftt";
    if(playerUp.body.touching.down) {playerDown.animations.play('left');}
    else {playerDown.frame = 2;}
  }else if (position == "leftt"){
    playerDown.frame = 2;
  }
  if (cursors.right.isDown && game.time.now > timeHit){
    player.setAll('body.velocity.x', playerVelocity);
    position = "rightt";
    if(playerUp.body.touching.down) {playerDown.animations.play('right');}
    else {playerDown.frame = 3;}
  }else if (position == "rightt"){
    playerDown.frame = 3;
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

  if(axeHit == false){
    if(gotAxe==1){
      game.physics.arcade.overlap(platformsDes, player, elide, null, this);
    }else{
      game.physics.arcade.collide(player, platformsDes);
    }
    if(position == 'rightt'){
      playerUp.frame = 3;
    }
    else{
      playerUp.frame = 2;
    }
  }
  else{
    game.physics.arcade.collide(player, platformsDes);

    if(position == 'leftt'){
      playerUp.frame = 0;
    }
    else{
      playerUp.frame = 1;
    }
  }

};
