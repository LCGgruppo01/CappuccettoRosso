var salto;
var wallJump = 0;
var shootTime = 0;
var timeWolfHit = 0;
var position = "rightt";

function playerBehaviour(){

  var hitPlatform = game.physics.arcade.collide(player, platforms);

  healthText.text = 'Health: ' + player.health;

  //PLAYER MOVEMENT start
  if (cursors.left.isDown && game.time.now>timeWolfHit)
  {
      player.body.velocity.x = -playerVelocity;
      position = "leftt";
      player.frame = 0;
  }
  else if (cursors.right.isDown && game.time.now>timeWolfHit)
  {
      player.body.velocity.x = playerVelocity;
      position = "rightt";
      player.frame = 1;
  }

  player.body.velocity.x = player.body.velocity.x * 0.87;
  //PLAYER MOVEMENT end

  //PLAYER JUMP start
  if (cursors.up.isDown && player.body.touching.down && hitPlatform)
  {
      player.body.velocity.y = playerJump;
      salto = 1;
  }

  if (cursors.up.isUp && salto == 1)
  {
      salto = 2;
  }

  if (cursors.up.isDown && salto == 2)
  {
      player.body.velocity.y = playerJump;
      salto = 3;
  }
  //PLAYER JUMP end

  //WALL JUMP start
  if (cursors.up.isDown && player.body.touching.right && hitPlatform)
  {
      player.body.velocity.y = playerJump;
      player.body.velocity.x = - 1000;
      salto = 1;
  }

  if (cursors.up.isDown && player.body.touching.left && hitPlatform)
  {
      player.body.velocity.y = playerJump;
      player.body.velocity.x = 1000;
      salto = 1;
  }
  //WALL JUMP end

  //SHOOTING start
  if (SPACE.isDown && position=="leftt" && game.time.now > shootTime)
  {
      var bullet = Bullets.create(player.x - 10, player.y + 20, 'bullet');
      bullet.body.gravity.y = gravity;
      bullet.body.velocity.y = -100;
      bullet.body.velocity.x = -400;
      shootTime = game.time.now + 300;

  }
  else if (SPACE.isDown && position=="rightt" && game.time.now > shootTime)
  {
      bullet = Bullets.create(player.x + 10, player.y + 20, 'bullet');
      bullet.body.gravity.y = gravity;
      bullet.body.velocity.y = -100;
      bullet.body.velocity.x = 400;
      shootTime = game.time.now + 300;
  }
  //SHOOTING end

}
