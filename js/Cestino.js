//WALL JUMP start
if (cursors.up.isDown && player.body.touching.right){
    player.body.velocity.y = playerJump;
    player.body.velocity.x = - 1000;
    salto = 1;
}

if (cursors.up.isDown && player.body.touching.left){
    player.body.velocity.y = playerJump;
    player.body.velocity.x = 1000;
    salto = 1;
}
//WALL JUMP end

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
