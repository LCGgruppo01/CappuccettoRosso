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

//SHOOTING end
