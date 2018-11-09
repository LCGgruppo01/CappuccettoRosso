
function chiama(x, y, lenght)
{
  //crea la prima piattaforma
   var ledge2 = platforms.create(x, y, 'groundStart');
   ledge2.body.immovable = true;

   for (i = 0; i < lenght - 2; i++) {
    var numeroCasuale=Math.random();
    if(numeroCasuale<0.33){
        ledge2 = platforms.create(x + 32 + i * 32, y, 'groundCenter1');
        ledge2.body.immovable = true;
      }else if(numeroCasuale>0.33 && numeroCasuale<0.66){
        ledge2 = platforms.create(x + 32 + i * 32, y, 'groundCenter2');
        ledge2.body.immovable = true;
      }else{
        ledge2 = platforms.create(x + 32 + i * 32, y, 'groundCenter3');
        ledge2.body.immovable = true;
      }
  };

  ledge2 = platforms.create(x + (lenght - 1) * 32, y, 'groundEnd');
  ledge2.body.immovable = true;
};

function elide(siElide, rimane) {
    siElide.kill();
};

function thornHit(player, thorn) {
    player.body.velocity.y=-400;
    player.damage(25);
};

function wolfHit(player, wolf) {
    player.body.velocity.x=(player.x - wolf.x)/Math.abs(player.x - wolf.x)*4000;
    if (game.time.now>timeWolfHit)
    {
        timeWolfHit=game.time.now+300;
        player.damage(25);
    }
};

function killWolves(bul, wol) {
    wol.kill();
    bul.kill();
};

function wolvesBehave(Wolves) {
  Wolves.forEach(function(wolf){
   if(Math.abs(player.x - wolf.x) < 600){
     wolf.body.velocity.x = (player.x - wolf.x)/Math.abs(player.x - wolf.x)*50;
   }
   else{
     wolf.body.velocity.x = 0;
   }
   if (wolf.body.touching.down && player.body.touching.down && Math.abs(player.x - wolf.x) < 250) {
     if(wolf.y - player.y > 15){
     wolf.body.velocity.y = -250;
     }
     else{
     wolf.body.velocity.y = 0;
     }
   }
   if (wolf.body.touching.left || wolf.body.touching.right && wolf.body.touching.down){
     wolf.body.velocity.y = -250;
   }
   if(wolf.body.velocity.x <=0)
   {
     wolf.frame=0;
   }
   if(wolf.body.velocity.x >0)
   {
     wolf.frame=1;
   }
   });

};
