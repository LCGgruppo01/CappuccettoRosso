// CREATE functions start
function platformCreate(x, y, length, position, fall){
  if(position == 1){
    spriteStart = 'platformStart'
    var ledge2 = platformsOver.create(x*m, y*m, spriteStart);
    ledge2.body.immovable = true;
    ledge2.caduta = fall;
  }
  else if (position == 2) {
    spriteStart = 'platformEnd'
    var ledge2 = platformsOver.create(x*m+64, y*m, spriteStart);
    ledge2.scale.x = -1;
    ledge2.body.immovable = true;
    ledge2.caduta = fall;
  }

   for (i = 0; i < length - 2; i++) {
    var numeroCasuale=Math.random();
    if(numeroCasuale<0.33){
        ledge2 = platformsOver.create(x*m + m + i * m, y*m, 'platformCenter1');
        ledge2.body.immovable = true;
        ledge2.caduta = fall;
      }else if(numeroCasuale>0.33 && numeroCasuale<0.66){
        ledge2 = platformsOver.create(x*m + m + i * m, y*m, 'platformCenter2');
        ledge2.body.immovable = true;
        ledge2.caduta = fall;
      }else{
        ledge2 = platformsOver.create(x*m + m + i * m, y*m, 'platformCenter3');
        ledge2.body.immovable = true;
        ledge2.caduta = fall;
      }
  };

  if(position == 2){
    spriteEnd = 'platformStart'
    ledge2 = platformsOver.create(x * m + (length - 1) * m, y * m, spriteEnd);
    ledge2.body.immovable = true;
    ledge2.caduta = fall;
  }
  else if (position == 1) {
    spriteEnd = 'platformEnd'
    ledge2 = platformsOver.create(x * m + (length - 1) * m, y * m, spriteEnd);
    ledge2.scale.x = -1;
    ledge2.body.immovable = true;
    ledge2.caduta = fall;
  }
};

function trunkCreate(x, y, height){
  for (i = 0; i < height; i++) {
    ledge2 = platforms.create(x*m, y*m + i * m, 't1');
    ledge2.body.immovable = true;
  }
};

function trunkBg(x, y, height){
  for (i = 0; i < height; i++) {
    game.add.sprite(x*m, y*m + i * m, 's1');
    i = i+9;
  }
};

function ledgeCreate(x,y){
  var ledge =  platforms.create(x*m, y*m, 'ground');
  ledge.body.immovable = true;
};

function thornsCreate(x, y,length){
  for (i = 0; i < length - 2; i++) {
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
  wolf.vita = 2;
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
    if (wolf.vita == 2){
      wolf.vita = 1;
      immunity = game.time.now + 1000;
    }
    else if (wolf.vita == 1 && game.time.now > immunity){
      wolf.kill();
    }
  }
  else if((player.x + 32 - wolf.x)/Math.abs(player.x +32 - wolf.x)<0 && position == 'rightt' && axeHit == false){
    if (wolf.vita == 2){
      wolf.vita =  1;
      immunity = game.time.now + 1000;
      wolf.body.velocity.x = (player.x - wolf.x)/Math.abs(player.x - wolf.x)*50;
    }
    else if (wolf.vita == 1 && game.time.now > immunity){
      wolf.kill();
    }
  }
  if (game.time.now > immunity && axeHit == true){
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

function platformOverCollide (){
  platformsOver.forEach(function(platform) {
    if(playerUp.body.y + 64 - platform.body.y <= 0){
      game.physics.arcade.collide(player, platform);
    }
  })

};

function desWall(player, d1){
  if (d1.stato < 3){
    game.physics.arcade.collide(player, platformsDes);
    if(d1.stato == 1 && axeHit == false){
      d1.frame = 1;
      d1.stato = 2;
      wait = game.time.now + 300;
    }
    else if(d1.stato == 2 && axeHit == false && game.time.now > wait){
      d1.frame = 2;
      d1.stato = 3;
    }
  }
  else{
    game.physics.arcade.overlap(player, platformsDes);
  }

};
// COLLIDE functions end

// wolves BEHAVE and FRAMES functions start
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
// wolves BEHAVE and FRAMES functions end

//Get the gotAxe
function getAxe(payer, axe) {
  if(cursors.down.isDown){
     gotAxe=1;
     axe.kill();
  }
};

function axeChop(){

  if (SPACE.isDown && game.time.now > shootTime && axeHit == true && gotAxe==1){
    timeAxe = game.time.now + 300;
    axeHit = false;
  }

  if (axeHit == false && game.time.now > timeAxe && gotAxe==1) {
    shootTime = game.time.now + 300;
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
