// CREATE functions start
function platformCreate(x, y, lenght){
   var ledge2 = platformsOver.create(x*m, y*m, 'platformStart');
   ledge2.body.immovable = true;

   for (i = 0; i < lenght - 2; i++) {
    var numeroCasuale=Math.random();
    if(numeroCasuale<0.33){
        ledge2 = platformsOver.create(x*m + m + i * m, y*m, 'platformCenter1');
        ledge2.body.immovable = true;
      }else if(numeroCasuale>0.33 && numeroCasuale<0.66){
        ledge2 = platformsOver.create(x*m + m + i * m, y*m, 'platformCenter2');
        ledge2.body.immovable = true;
      }else{
        ledge2 = platformsOver.create(x*m + m + i * m, y*m, 'platformCenter3');
        ledge2.body.immovable = true;
      }
  };

  ledge2 = platformsOver.create(x * m + (lenght - 1) * m, y * m, 'platformEnd');
  ledge2.body.immovable = true;
};

function ledgeCreate(x,y){
  var ledge =  platforms.create(x*m, y*m, 'ground');
  ledge.body.immovable = true;
};

function thornsCreate(x, y,lenght){
  for (i = 0; i < lenght - 2; i++) {
  thorns.create(x*m + i*m, y*m, 'thorns');
  i++;
  }
};

function wolfCreate(x, y){
  var wolf = Wolves.create(x*m, y*m, 'wolf');
  wolf.scale.setTo(0.2, 0.2);
  wolf.body.gravity.y = gravity;
  wolf.body.bounce.y = bounce;
};

function wolfPatrolCreate(x, y, fine){
  var wolf = WolvesP.create(x*m, y*m, 'wolf');
  wolf.scale.setTo(0.2, 0.2);
  wolf.body.gravity.y = gravity;
  wolf.body.bounce.y = bounce;
  wolf.inizio = x * m;
  wolf.fine = fine * m - 32;
  //patrol
};

function checkpointCreate(x, y){
  var checkpoint = Checkpoints.create(x*m, y*m, 'checkpoint');
  checkpoint.frame = 0;
}
// CREATE functions end

// COLLIDE functions start
function elide(siElide, rimane) {
    siElide.kill();
};

function thornHit(playerFunction, thorn) {
  if (game.time.now>timeHit){
    if(thorn.body.touching.up){
      player.setAll('body.velocity.y', -400);
      playerUp.damage(10);
      timeHit=game.time.now+300;
    }else if(thorn.body.touching.left){
      player.setAll('body.velocity.x', -600);
      playerUp.damage(10);
      timeHit=game.time.now+300;
    }else if(thorn.body.touching.right){
      player.setAll('body.velocity.y', 600);
      playerUp.damage(10);
      timeHit=game.time.now+300;
    }
  }
};

function wolfHit(player, wolf) {
  if((player.x +32 - wolf.x)/Math.abs(player.x +32 - wolf.x)>0 && position == 'leftt' && axeHit == false){
    wolf.kill();
  }
  else if((player.x +32 - wolf.x)/Math.abs(player.x +32 - wolf.x)<0 && position == 'rightt' && axeHit == false){
    wolf.kill();
  }
  else if (game.time.now > immunity){
    player.body.velocity.x = (player.x - wolf.x)/Math.abs(player.x - wolf.x)*4000;
    timeHit = game.time.now + 300;
    immunity = game.time.now + 1000;
    player.damage(25);
  }
};

function kill(bul, wol) {
    wol.kill();
    bul.kill();
};

function checkpointHit(player, checkpoint){
  spawnX = checkpoint.body.x;
  spawnY = checkpoint.body.y - 64;
  checkpoint.frame = 1;
};
// COLLIDE functions end

function wolvesBehave(Wolves) {

  game.physics.arcade.collide(Wolves, platforms);


  Wolves.forEach(function(wolf){
   if(Math.abs(playerUp.x - wolf.x) < 600){
     wolf.body.velocity.x = (playerUp.x - wolf.x)/Math.abs(playerUp.x - wolf.x)*50;
   }
   else{
     wolf.body.velocity.x = 0;
   }
   if (wolf.body.touching.down && playerUp.body.touching.down && Math.abs(playerUp.x - wolf.x) < 250) {
     if(wolf.y - playerUp.y > 15){
     wolf.body.velocity.y = wolfJump;
     }
     else{
     wolf.body.velocity.y = 0;
     }
   }
   if ((wolf.body.touching.left || wolf.body.touching.right) && wolf.body.touching.down){
     wolf.body.velocity.y = wolfJump;
   }
   });

};

function wolfPatrolBehave(WolvesP){
  WolvesP.forEach(function(wolf){
    if(wolf.body.position.x <= wolf.inizio) {
      wolf.body.velocity.x = 100;
    }
    else if(wolf.body.position.x >= wolf.fine) {
        wolf.body.velocity.x = -100;
    }
  });
};

function wolfFrames(Wolves){
  Wolves.forEach(function(wolf){

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

//Get the gotAxe
function getAxe(payer, axe) {
  if(cursors.down.isDown){
     gotAxe=1;
     axe.kill();
  }
};

function axeChop(){

  if (AXE.isDown && game.time.now > shootTime && axeHit == true){
    timeAxe = game.time.now + 1000;
    axeHit = false;
  }

  if (axeHit == false && game.time.now > timeAxe) {
    shootTime = game.time.now + 1000;
    axeHit = true;
  }

};



//TEST FUNCTIONS
function testCreate(){
  H=game.input.keyboard.addKey(Phaser.Keyboard.H);
};
function testUpdate(){
  if(H.isDown){
    playerUp.heal(100);
  }
};

function platformOverCollide (){
  platformsOver.forEach(function(platform) {
    if(playerUp.body.velocity.y < 0){
      game.physics.arcade.collide(player, platform);
    }
  })

};
