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
if (player.y >= kingWolf.y) {
  bone.tempo = Math.sqrt(Math.pow((kingWolf.x - playerUp.x), 2) + Math.pow((kingWolf.y - playerUp.y), 2))/500;

  bone.body.velocity.x = -(kingWolf.x - playerUp.x)/bone.tempo;
  bone.body.velocity.y = (Math.sqrt(Math.pow(500, 2) - Math.pow(bone.body.velocity.x, 2)) -0.5*gravity*bone.tempo);
  kingShot = game.time.now + 2000*Math.random();
}else if (player.y <= kingWolf.y) {
  bone.tempo = Math.sqrt(Math.pow((kingWolf.x - playerUp.x), 2) + Math.pow((kingWolf.y - playerUp.y), 2))/500;

  bone.body.velocity.x = -500;
  bone.body.velocity.y = -Math.sqrt(Math.pow((kingWolf.x - playerUp.x), 2) + 10*Math.pow((kingWolf.y - playerUp.y), 2))/1.5;
  kingShot = game.time.now + 2000*Math.random();
}

//SHOOTING end
