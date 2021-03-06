// CREATE functions start
function platformCreate(x, y, length, fall){
  var ledge2 = platformsOver.create(x*m, y*m, 'platformEnd');
  ledge2.body.immovable = true;
  ledge2.caduta = fall;

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

    ledge2 = platformsOver.create(x * m + (length - 1) * m, y * m, 'platformStart');
    ledge2.body.immovable = true;
    ledge2.caduta = fall;
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

function rockCreate(x, y, l, h) {
  rock = platforms.create(x*m, y*m, '');
  rock.body.setSize(l*m, h*m, 0, 0);
  rock.body.immovable = true;

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
  var wolf = Wolves.create(x*m, y*m, 'wolfChaser');
  wolf.anchor.setTo(.5,.5);
  wolf.body.setSize(105, 128, 0, 12);
  wolf.body.gravity.y = gravity;
  wolf.body.bounce.y = bounce;
  wolf.health = 100;
  wolf.casuale =0.2 + Math.random()*0.7;
  wolf.animations.add('sane', [0, 1, 2, 3, 4, 5], 10, true);
  wolf.animations.add('damage', [10, 11, 12, 13, 14, 15], 10, true);
};

function wolfPatrolCreate(x, y, fine){
  var wolf = WolvesP.create(x*m, y*m, 'wolfPatrol');
  wolf.anchor.setTo(0.5,.5);
  wolf.body.setSize(105, 128, 0, 12);
  wolf.body.gravity.y = gravity;
  wolf.body.bounce.y = bounce;
  wolf.inizio = x * m;
  wolf.fine = fine * m - 32;
  wolf.health = 100;
  wolf.animations.add('sane', [0, 1, 2, 3, 4, 5], 10, true);
  wolf.animations.add('damage', [10, 11, 12, 13, 14, 15], 10, true);
};

function checkpointCreate(x, y){
  var checkpoint = Checkpoints.create(x*m, y*m, 'checkpoint');
  checkpoint.frame = 0;
  checkpoint.body.setSize(100,10,0,90);
  checkpoint.animations.add('checkhit', [1, 2, 3, 4, 5, 6], 10, true);
}
// CREATE functions end

// COLLIDE & OVERLAP functions start
function elide(siElide, rimane) {
    siElide.kill();
};

function thornHit(playerFunction, thorn) {
 if (game.time.now>timeHit){
   if(thorn.body.touching.up){
     player.setAll('body.velocity.y', -700);
     playerUp.damage(25);
     timeHit=game.time.now+300;
   }else if(thorn.body.touching.left){
     player.setAll('body.velocity.x', -700);
     playerUp.damage(25);
     timeHit=game.time.now+300;
   }else if(thorn.body.touching.right){
     player.setAll('body.velocity.y', 700);
     playerUp.damage(25);
     timeHit=game.time.now+300;
   }
 }};

function wolfHit(player, wolf) {
  if (game.time.now > immunity && axeHit == true){
    wolf.body.velocity.x = -(playerUp.x - wolf.x)/Math.abs(playerUp.x - wolf.x)*500;
    player.body.velocity.x = (player.x - wolf.x)/Math.abs(player.x - wolf.x)*1000;
    timeHit = game.time.now + 300;
    immunity = game.time.now + 500;
    player.damage(25);
  }
};

function kingWolfHit(player, kingWolf) {
  if (game.time.now > immunity){
    if (kingWolf.body.velocity.x != 0) {
      player.body.velocity.x = - (player.x - kingWolf.x)/Math.abs(player.x - kingWolf.x)*3000;
    }
    else {
      player.body.velocity.x = (player.x - kingWolf.x)/Math.abs(player.x - kingWolf.x)*2000;
    }
    timeHit = game.time.now + 300;
    immunity = game.time.now + 2000;
    player.damage(25);
  }
};

// danno per Wolf Patrol
function wolfBulletDamagePatrol(bullet, wolf){
  if (game.time.now > immunity){
    if (wolf.health < 110 && Math.random() < 0.7 && fucile == true) {
      ammo = Ammos.create(wolf.x, wolf.y, 'ammo');
      ammo.body.gravity.y = gravity;
      ammo.body.bounce.y = 0.2;
    }
    if (wolf.health < 110 && Math.random() < 0.3) {
      life = Lives.create(wolf.x, wolf.y, 'heart');
      life.frame = 3;
      life.body.gravity.y = gravity;
      life.body.bounce.y = 0.2;
    }
    wolf.damage(100);
    immunity = game.time.now + 500;
    wolf.body.velocity.y = 2000;
    carcassa1 = Carcasse.create(wolf.x, wolf.y, 'wolfPatrol');
    carcassa1.enableBody = true;
    carcassa1.body.gravity.y = gravity;
    carcassa1.anchor.setTo(.5,.5);
    carcassa1.body.setSize(110, 10, 0, 130);
    carcassa1.animations.add('animazioneCarcassa', [20, 21 ,22], 10, false)
    carcassa1.animations.play('animazioneCarcassa');
    if (wolf.body.velocity.x > 0) {
      carcassa1.scale.x = -1;
    }
  }
  bullet.kill();
};

function wolfHitboxDamagePatrol(hitbox, wolf) {
  if (game.time.now > immunity && axeHit === false){
    if (wolf.health < 100) {
      carcassa1 = Carcasse.create(wolf.x, wolf.y, 'wolfPatrol');
      carcassa1.enableBody = true;
      carcassa1.body.gravity.y = gravity;
      carcassa1.anchor.setTo(.5,.5);
      carcassa1.body.setSize(110, 10, 0, 130);
      carcassa1.animations.add('animazioneCarcassa', [20, 21 ,22], 10, false)
      carcassa1.animations.play('animazioneCarcassa');
      if (wolf.body.velocity.x > 0) {
        carcassa1.scale.x = -1;
      }
    }
    if (wolf.health < 100 && Math.random() < 0.7 && fucile == true) {
      ammo = Ammos.create(wolf.x, wolf.y, 'ammo');
      ammo.body.gravity.y = gravity;
      ammo.body.bounce.y = 0.2;
    }
    if (wolf.health < 100 && Math.random() < 0.3) {
      life = Lives.create(wolf.x, wolf.y, 'heart');
      life.frame = 3;
      life.body.gravity.y = gravity;
      life.body.bounce.y = 0.2;
    }
    wolf.body.velocity.y = 2000;
    wolf.body.velocity.x = -(playerUp.x - wolf.x)/Math.abs(playerUp.x - wolf.x)*500;
    wolf.damage(50);
    immunity = game.time.now + 500;
  }
};


// danno per Wolf Inseguitore
function wolfHitboxDamageChaser(hitbox, wolf) {
  if (game.time.now > immunity && axeHit === false){
    if (wolf.health < 100) {
      carcassa1 = Carcasse.create(wolf.x, wolf.y, 'wolfChaser');
      carcassa1.enableBody = true;
      carcassa1.body.gravity.y = gravity;
      carcassa1.anchor.setTo(.5,.5);
      carcassa1.body.setSize(110, 10, 0, 130);
      carcassa1.animations.add('animazioneCarcassa', [20, 21 ,22], 10, false)
      carcassa1.animations.play('animazioneCarcassa');
      if (wolf.body.velocity.x > 0) {
        carcassa1.scale.x = -1;
      }
    }
    if (wolf.health < 100 && Math.random() < 0.7 && fucile == true) {
      ammo = Ammos.create(wolf.x, wolf.y, 'ammo');
      ammo.body.gravity.y = gravity;
      ammo.body.bounce.y = 0.2;
    }
    if (wolf.health < 100 && Math.random() < 0.3) {
      life = Lives.create(wolf.x, wolf.y, 'heart');
      life.frame = 3;
      life.body.gravity.y = gravity;
      life.body.bounce.y = 0.2;
    }
    wolf.body.velocity.y = 2000;
    wolf.body.velocity.x = -(playerUp.x - wolf.x)/Math.abs(playerUp.x - wolf.x)*500;
    wolf.damage(50);
    immunity = game.time.now + 500;
  }
};

function wolfBulletDamageChaser(bullet, wolf){
  if (game.time.now > immunity){
    if (wolf.health < 110 && Math.random() < 0.7 && fucile == true) {
      ammo = Ammos.create(wolf.x, wolf.y, 'ammo');
      ammo.body.gravity.y = gravity;
      ammo.body.bounce.y = 0.2;
    }
    if (wolf.health < 110 && Math.random() < 0.3) {
      life = Lives.create(wolf.x, wolf.y, 'heart');
      life.frame = 3;
      life.body.gravity.y = gravity;
      life.body.bounce.y = 0.2;
    }
    wolf.damage(100);
    immunity = game.time.now + 500;
    wolf.body.velocity.y = 2000;
    carcassa1 = Carcasse.create(wolf.x, wolf.y, 'wolfChaser');
    carcassa1.enableBody = true;
    carcassa1.body.gravity.y = gravity;
    carcassa1.anchor.setTo(.5,.5);
    carcassa1.body.setSize(110, 10, 0, 130);
    carcassa1.animations.add('animazioneCarcassa', [20, 21 ,22], 10, false)
    carcassa1.animations.play('animazioneCarcassa');
    if (wolf.body.velocity.x > 0) {
      carcassa1.scale.x = -1;
    }
  }
  bullet.kill();
};



function kill(bul, wol) {
    wol.kill();
    bul.kill();
};

function checkpointHit(player, checkpoint){
  spawnX = checkpoint.body.x;
  spawnY = checkpoint.body.y - 64;
  checkpoint.animations.play('checkhit');
};

function platformOverCollide (){
  platformsOver.forEach(function(platform) {
    if(playerUp.body.y + 80 - platform.body.y <= 0){
      game.physics.arcade.collide(player, platform);
    }
  })

};

function desWall(play, d1){
  if (d1.stato < 3){
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
    d1.kill();
    d1Destroyed = game.add.sprite(d1.x, d1.y + 208, 'd1destroyed');
    }
};

function collectMe1(player, memoryObj1){
  if(cursors.down.isDown){
    scene1.alpha = 1;
    scene1.inputEnabled = true;
    Carcasse.setAll('alpha', 0);
    playerUp.alpha = 0;
    playerDown.alpha = 0;
    bar.alpha = 0;
    barGranny.alpha = 0;
    Hearts.alpha = 0;
    d1Destroyed.alpha = 0;
    memoryObj1.kill();
    game.paused = true;
    scene1.events.onInputUp.add(unpauseImage);
  }
};

function collectMe2(player, memoryObj2){
  if(cursors.down.isDown){
    scene2.alpha = 1;
    scene2.inputEnabled = true;
    Carcasse.setAll('alpha', 0);
    playerUp.alpha = 0;
    playerDown.alpha = 0;
    bar.alpha = 0;
    barGranny.alpha = 0;
    Hearts.alpha = 0;
    gabbia.alpha = 0;
    d1Destroyed.alpha = 0;
    memoryObj2.kill();
    game.paused = true;
    spawnX = 8;
    spawnY = 8;
    scene2.events.onInputUp.add(nextLevelImg);
  }
};

function collectMe3(player, fucileTerra){
  if(cursors.down.isDown){
    scene3.alpha = 1;
    scene3.inputEnabled = true;
    Carcasse.setAll('alpha', 0);
    Ammos.setAll('alpha', 0);
    playerUp.alpha = 0;
    pause.alpha = 0;
    playerDown.alpha = 0;
    bar.alpha = 0;
    barGranny.alpha = 0;
    tutorialS.alpha = 0;
    Hearts.alpha = 0;
    fucileTerra.kill();
    game.paused = true;
    scene3.events.onInputUp.add(unpauseImage2);
    fucile = true;
    gotAxe = 2;
  }
};

function collectMe4(player, memoryObj4){
  if(cursors.down.isDown){
    scene4.alpha = 1;
    scene4.inputEnabled = true;
    Carcasse.setAll('alpha', 0);
    Ammos.setAll('alpha', 0);
    playerUp.alpha = 0;
    playerDown.alpha = 0;
    bar.alpha = 0;
    barGranny.alpha = 0;
    Hearts.alpha = 0;
    secretHall.alpha = 0;
    memoryObj4.kill();
    game.paused = true;
    ammoCount.alpha = 0;
    scene4.events.onInputUp.add(unpauseImage2);
  }
};

function collectMe5(player, cappuccetto2){
  if(cursors.down.isDown){
    scene5.alpha = 1;
    scene5.inputEnabled = true;
    Carcasse.setAll('alpha', 0);
    Ammos.setAll('alpha', 0);
    playerUp.alpha = 0;
    playerDown.alpha = 0;
    bar.alpha = 0;
    barGranny.alpha = 0;
    Hearts.alpha = 0;
    game.paused = true;
    scene5.events.onInputUp.add(endImg);
  }
};

function boneHitPlayer(player, bone) {
  if (game.time.now > immunity && axeHit == true){
    if(kingWolf.body.velocity.x <= 1){
      playerUp.body.velocity.x = (player.x - bone.x)/Math.abs(player.x - bone.x)*1000;
    }
    timeHit = game.time.now + 300;
    immunity = game.time.now + 500;
    player.damage(25);
    bone.kill();
  }
  if (axeHit == false && bone.rimbalzo == 0){
    bone.rimbalzo = 1;
    bone.body.velocity.x = - bone.body.velocity.x;
    bone.body.velocity.y = - bone.body.velocity.y;
  }
};

function boneHitKing(kingWolf, bone) {
  if (game.time.now > immunity && bone.rimbalzo == 1){
    kingWolf.body.velocity.x = -1000;
    immunity = game.time.now + 500;
    kingWolf.damage(1);
    bone.kill();
    kingWolf.animations.play('danno');
    game.camera.flash(0x00701f, 50);
    //quando muore
    if (kingWolf.health <=0) {
      carcassa = Carcasse.create(kingWolf.x, kingWolf.y - 156/2, "kingWolf");
      carcassa.frame = 17;
    }

  }
};
// COLLIDE & OVERLAP functions end

// wolves BEHAVE and FRAMES functions start
function wolvesBehave(Wolves) {
  game.physics.arcade.collide(Wolves, platforms);

  Wolves.forEach(function(wolf){

  if (game.time.now > immunity) {


   if(Math.abs(playerUp.x - wolf.x) < 600 && Math.abs(playerUp.x - wolf.x) > 80 && - playerUp.y + wolf.y < 160){
     wolf.body.velocity.x = (playerUp.x - wolf.x)/Math.abs(playerUp.x - wolf.x)*50 + (playerUp.x - wolf.x)/Math.abs(playerUp.x - wolf.x)*200*wolf.casuale;
   }else if (Math.abs(playerUp.x - wolf.x) > 0 && Math.abs(playerUp.x - wolf.x) > 80 && - playerUp.y + wolf.y < 160) {
     wolf.body.velocity.x = wolf.body.velocity.x;
   }
   else if (Math.abs(playerUp.x - wolf.x) > 600 && - playerUp.y + wolf.y > 160) {
     wolf.body.velocity.x = 0;
   }

   if ((wolf.body.touching.left || wolf.body.touching.right) && wolf.body.touching.down){
     wolf.body.velocity.y = wolfJump;
    }
  }
  });
};

function wolfPatrolBehave(WolvesP){
  WolvesP.forEach(function(wolf){
      if(wolf.body.position.x <= wolf.inizio) {
        wolf.body.velocity.x = 200;
      }
      else if(wolf.body.position.x >= wolf.fine) {
          wolf.body.velocity.x = -200;
      }
    });
  };

function wolfFrames(Wolves){
    Wolves.forEach(function(wolf){

    if(wolf.health >= 100)
    {
      wolf.animations.play('sane');
    }else if (wolf.health < 100) {
      wolf.animations.play('damage');
    }
    if (wolf.body.velocity.x > 0) {
      wolf.scale.x = -1;
    }else if (wolf.body.velocity.x < 0) {
      wolf.scale.x = 1;
    }
  });
};

function wolfKingShot(){
  if (game.time.now > kingShot && kingWolf.health > 0 && kingWolf.body.velocity.x === 0) {
    kingWolf.animations.play('lancio');
    bone = Bones.create(kingWolf.x, kingWolf.y, 'bone');
    bone.animations.add('boneAnimation', [0, 1, 2], 10, true);
    bone.animations.play('boneAnimation');
    bone.rimbalzo = 0;
    bone.body.gravity.y = gravity;

    if (kingWolf.body.position.x < 100*m) {
      if (player.y >= kingWolf.y) {
        bone.tempo = Math.sqrt(Math.pow((kingWolf.x - playerUp.x), 2) + Math.pow((kingWolf.y - playerUp.y), 2))/500;
        bone.body.velocity.x = (kingWolf.x - playerUp.x)/bone.tempo;
        bone.body.velocity.y = (Math.sqrt(Math.pow(500, 2) - Math.pow(bone.body.velocity.x, 2)) -0.5*gravity*bone.tempo);
        kingShot = game.time.now + 1500*Math.random() + 1000;
      }else if (player.y <= kingWolf.y) {
        bone.tempo = Math.sqrt(Math.pow((kingWolf.x - playerUp.x), 2) + Math.pow((kingWolf.y - playerUp.y), 2))/500;
        bone.body.velocity.x = 500;
        bone.body.velocity.y = -Math.sqrt(Math.pow((kingWolf.x - playerUp.x), 2) + 10*Math.pow((kingWolf.y - playerUp.y), 2))/1.5;
        kingShot = game.time.now + 1500*Math.random() + 1000;
      }
    }

    else {
      if (player.y >= kingWolf.y) {
        bone.tempo = Math.sqrt(Math.pow((kingWolf.x - playerUp.x), 2) + Math.pow((kingWolf.y - playerUp.y), 2))/500;
        bone.body.velocity.x = -(kingWolf.x - playerUp.x)/bone.tempo;
        bone.body.velocity.y = (Math.sqrt(Math.pow(500, 2) - Math.pow(bone.body.velocity.x, 2)) -0.5*gravity*bone.tempo);
        kingShot = game.time.now + 1500*Math.random() + 500;
      }else if (player.y <= kingWolf.y) {
        bone.tempo = Math.sqrt(Math.pow((kingWolf.x - playerUp.x), 2) + Math.pow((kingWolf.y - playerUp.y), 2))/500;
        bone.body.velocity.x = -500;
        bone.body.velocity.y = -Math.sqrt(Math.pow((kingWolf.x - playerUp.x), 2) + 10*Math.pow((kingWolf.y - playerUp.y), 2))/1.5;
        kingShot = game.time.now + 1500*Math.random() + 500;
      }
    }
  }
};

function wolfKingHearts() {

  wolfLife1.x = kingWolf.x - 50;
  wolfLife2.x = kingWolf.x - 30;
  wolfLife3.x = kingWolf.x - 10;
  wolfLife4.x = kingWolf.x + 10;
  wolfLife5.x = kingWolf.x + 30;
  wolfLife6.x = kingWolf.x + 50;

  if (kingWolf.health == 5) {
    wolfLife6.frame = 1;
  }if (kingWolf.health == 4) {
    wolfLife5.frame = 1;
    if(kingWolf.x > 97*m){
    kingWolf.body.velocity.x = -400;
  }else {
    kingWolf.body.velocity.x = 0;
  }
  }if (kingWolf.health == 3) {
    wolfLife4.frame = 1;
    if(kingWolf.x < 109*m){
    kingWolf.body.velocity.x = 400;
    }else {
      kingWolf.body.velocity.x = 0;
    }
  }if (kingWolf.health == 2) {
    wolfLife3.frame = 1;
    if(kingWolf.x > 97*m){
    kingWolf.body.velocity.x = -400;
    }else {
      kingWolf.body.velocity.x = 0;
    }
  }if (kingWolf.health == 1) {
    wolfLife2.frame = 1;
    if(kingWolf.x < 109*m){
    kingWolf.body.velocity.x = 400;
    }else {
      kingWolf.body.velocity.x = 0;
    }
  }if (kingWolf.health === 0) {
    wolfLife1.frame = 1;
    wolfLife1.kill();
    wolfLife2.kill();
    wolfLife3.kill();
    wolfLife4.kill();
    wolfLife5.kill();
    wolfLife6.kill();
  }
};

function wolfKingAnimationCreate() {
  kingWolf.animations.add('fermo', [0, 1, 2, 3], 10, false);
  kingWolf.animations.add('corriCapp', [4, 5, 6, 7], 10, false);
  kingWolf.animations.add('corri', [8, 9, 10, 11], 10, false);
  lancio = kingWolf.animations.add('lancio', [12, 13, 14, 15], 10, false);
  danno = kingWolf.animations.add('danno', [16], 5, false);
  kingWolf.animations.add('morto', [16, 16, 16, 17], 10, false);
  kingWolf.animations.play('fermo');
}
function wolfKingAnimationUpdate() {
  if (lancio.isPlaying || danno.isPlaying) {

  }else if (kingWolf.body.velocity.x === 0) {
    kingWolf.animations.play('fermo');
  }else if (kingWolf.body.velocity.x !== 0) {
    kingWolf.animations.play('corri');
  }

  //Scaling per Direzione
  if (kingWolf.x > 96.95*m && kingWolf.x < 97.05*m) {
    kingWolf.scale.x = -1;
  }else if (kingWolf.x > 106.95*m && kingWolf.x < 107.05*m) {
    kingWolf.scale.x = 1;
  }

};
var primavolta = 1;
function animazioneRapimento(kingWolf, cappuccetto) {
  cappuccetto.frame = 3;
  cappuccetto.alpha = 0;
  if (primavolta <= 1) {
    gabbia = game.add.sprite(176*m, 3478, 'cappuccetto')
    gabbia.frame = 3;
    primavolta++;
  }
  kingWolf.scale.x = -1;
};
// wolves BEHAVE and FRAMES functions end

//weapos START
function getAxe(payer, axe) {
  if(cursors.down.isDown){
     gotAxe=1;
     axe.frame = 0;
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

function rifle(){
  if (gotAxe == 2) {
    if (SPACE.isDown && game.time.now > shootTime && shoot == true && bulletN > 0){
      if (position == "leftt") {
        var bullet = Bullets.create(playerUp.x - 25, playerUp.y + 10, 'bullet');
        bullet.body.gravity.y = 25;
        bullet.body.velocity.x = - bulletVelocity - Math.abs(playerUp.body.velocity.x);
        bullet.animations.add('bulletFire', [0, 1, 2, 3], 10, true);
        bullet.animations.play('bulletFire');
      }else if (position == "rightt") {
        bullet = Bullets.create(playerUp.x + 25, playerUp.y + 10, 'bullet');
        bullet.scale.x = -1;
        bullet.body.gravity.y = 25;
        bullet.body.velocity.x = bulletVelocity + Math.abs(playerUp.body.velocity.x);
        bullet.animations.add('bulletFire', [0, 1, 2, 3], 10, true);
        bullet.animations.play('bulletFire');
      }
      shootTime = game.time.now + 600;
      shoot = false;
      bulletN--;
      if (position == "rightt") {
        playerUp.body.velocity.x = -500;
      }
      else if (position == "leftt") {
        playerUp.body.velocity.x = +500;
      }
    }

    if (game.time.now > shootTime) {
      shoot = true;
      axeHit = true;
      if (bulletN <= 0) {
        gotAxe=1;
      }
    }

  }
};

function weaposChange(){
  if(CTRL.isDown && gotAxe == 1 && game.time.now > changeWeapon && fucile == true){
    gotAxe = 2;
    changeWeapon = game.time.now + 300;
  }
  else if(CTRL.isDown && gotAxe == 2 && game.time.now > changeWeapon){
    gotAxe = 1;
    changeWeapon = game.time.now + 300;
  }
};

function collectAmmo(player, ammo) {
  ammo.kill();
  if (bulletN < 10) {
    bulletN++;
  }
};

function heal(player, life){
  life.kill();
  playerUp.heal(25);
};
//weapos END

//animations START
function playerAnimationDown() {
  if (playerUp.body.velocity.x > 5 || playerUp.body.velocity.x < -5) {
    if (playerUp.body.touching.down) {
      if (gotAxe==0) {
        playerDown.animations.play('right');
      }else if (gotAxe==1) {
        playerDown.animations.play('right');
      }else if (gotAxe==2) {
        playerDown.animations.play('right');
      }
    }else {
      if (gotAxe === 0) {
        playerDown.frame = 11;
      }else if (gotAxe == 1) {
        playerDown.frame = 11;
      }else if (gotAxe == 2) {
        playerDown.frame = 11;
      }
    }
  }else if(playerUp.body.touching.down){
    if (gotAxe === 0) {
      playerDown.frame = 0;
    }else if (gotAxe == 1) {
      playerDown.frame = 0;
    }else if (gotAxe == 2) {
      playerDown.frame = 0;
    }
  }else{
    playerDown.frame = 11;
  }
  if (position=='leftt') {
    playerDown.scale.x = -1;
  }else {
    playerDown.scale.x = 1;
  }
};

function playerAnimationUp(){
  if (playerUp.body.velocity.x > 5 || playerUp.body.velocity.x < -5) {
    if (playerUp.body.touching.down) {
      if (gotAxe==0) {
        playerUp.animations.play('right');
      }else if (gotAxe==1) {
        playerUp.animations.play('rightAxe');
      }else if (gotAxe==2) {
        playerUp.animations.play('rightGun');
      }
    }else {
      if (gotAxe === 0) {
        playerUp.frame = 0;
      }else if (gotAxe == 1) {
        playerUp.frame = 5;
      }else if (gotAxe == 2) {
        playerUp.frame = 10;
      }
    }
  }else if(playerUp.body.touching.down){
    if (gotAxe === 0) {
      playerUp.frame = 1;
    }else if (gotAxe == 1) {
      playerUp.frame = 6;
    }else if (gotAxe == 2) {
      playerUp.frame = 11;
    }
  }else{
    if (gotAxe === 0) {
      playerUp.frame = 0;
    }else if (gotAxe == 1) {
      playerUp.frame = 5;
    }else if (gotAxe == 2) {
      playerUp.frame = 10;
    }
  }
  if (position=='leftt') {
    playerUp.scale.x = -1;
  }else {
    playerUp.scale.x = 1;
  }
  if (axeHit == false){
    playerUp.animations.play('rightAxeChop');
  }else if(shoot == false && gotAxe == 2 && game.time.now > tAnimazioneSparo){
    playerUp.animations.play('rightShot');
    tAnimazioneSparo = game.time.now + 600;
  }

};
//animations END
var tAnimazioneSparo = 0;
//player attack HItBOX

function changeHitbox() {
  if (axeHit == false) {
    playerHitbox.body.setSize(40, 91, 0, 0);
    if (position == "rightt") {
      playerHitbox.body.x = playerUp.body.x + 49;
    }else if (position == "leftt") {
      playerHitbox.body.x = playerUp.body.x - 40;
    }
  }else {
    playerHitbox.body.setSize(0, 0, 0, 0);
  }
};
//used in hitBoxUpdate

function hitBoxCreate() {
  playerHitbox = game.add.sprite(spawnX, spawnY, '');
  game.physics.arcade.enable(playerHitbox);
  playerHitbox.enableBody = true;
  playerHitbox.body.collideWorldBounds = true;
  playerHitbox.body.setSize(0, 60, 0, 0);
};

function hitBoxUpdate() {
  playerHitbox.body.x = playerUp.body.x + 30;
  playerHitbox.body.y = playerUp.body.y;
  changeHitbox();
};

function flashDamage(){
  if (timeHit >= game.time.now + 290) {
    game.camera.flash(0xff0015, 100);
  }
};

// start PAUSE menù

function pauseMenu() {
  P=game.input.keyboard.addKey(Phaser.Keyboard.P);

  pause = game.add.sprite(950, 30, 'pauseButton');
  pause.inputEnabled = true;
  pause.fixedToCamera = true;

  P.onDown.add(paused, this);
  pause.events.onInputUp.add(paused);
  game.input.onDown.add(unpaused);
  //aggiungo per fixare un bug
  onPause = game.add.text(500, 350, ' ', { font: '24px Arial', fill: '#fff' });
  restart = game.add.text(500, 350, ' ', { font: '24px Arial', fill: '#fff' });
  restartLevel = game.add.text(500, 350, ' ', { font: '24px Arial', fill: '#fff' });
  mainMenu = game.add.text(500, 350, ' ', { font: '24px Arial', fill: '#fff' });
};

function paused() {
  if (game.paused === false) {

    // When the paus button is pressed, we pause the game
    setTimeout(function(){
      game.paused = true;
    }, 20);
     backPause = game.add.sprite(0,0,"backPause");
     backPause.alpha = 0.7;
     backPause.fixedToCamera = true;
     pause.alpha = 0;

     onPause = game.add.sprite(850, 25, 'buttonPlay');
     onPause.inputEnabled = true;
     onPause.fixedToCamera = true;

     restart = game.add.sprite(512, 650, 'buttonCheck');
     restart.anchor.setTo(0.5,0);
     restart.inputEnabled = true;
     restart.fixedToCamera = true;

     restartLevel = game.add.sprite(924, 650, 'buttonLevel');
     restartLevel.anchor.setTo(1,0);
     restartLevel.inputEnabled = true;
     restartLevel.fixedToCamera = true;

     mainMenu = game.add.sprite(100, 650, 'buttonMenu');
     mainMenu.inputEnabled = true;
     mainMenu.fixedToCamera = true;

  }
};

function unpaused(){
  if (game.paused) {
    onPause.events.onInputUp.add(function(){
      game.paused = false;
      onPause.kill();
      restart.kill();
      restartLevel.kill();
      mainMenu.kill();
      backPause.alpha = 0;
      pause.alpha = 1;
    });

    restart.events.onInputUp.add(function(){
      game.paused = false;
      onPause.kill();
      restart.kill();
      restartLevel.kill();
      mainMenu.kill();
      backPause.alpha = 0;
      if (level == 1) {
        this.game.state.start('GameLevel_1');
      }else if (level == 2) {
        this.game.state.start('GameLevel_2');
      }
    });

    restartLevel.events.onInputUp.add(function(){
      game.paused = false;
      onPause.kill();
      restart.kill();
      restartLevel.kill();
      mainMenu.kill();
      backPause.alpha = 0;
      if (level == 1) {
        this.game.state.start('GameLevel_1');
        spawnX = 4*m;
        spawnY = 55*m;
      }else if (level == 2) {
        this.game.state.start('GameLevel_2');
        spawnX = 9.5*m;
        spawnY = 8*m;
      }
    });

    mainMenu.events.onInputUp.add(function(){
      game.paused = false;
      onPause.kill();
      restart.kill();
      restartLevel.kill();
      mainMenu.kill();
      backPause.alpha = 0;
      this.game.state.start('GameStart');
      spawnX = 4*m;
      spawnY = 55*m;
      fucile = false;
    });
  }
};

//end PAUSE menù

// TEST & DEBUG functions
function unpauseImage(event){
  game.paused = false;
  scene1.inputEnabled = false;
  scene2.inputEnabled = false;
  memoryObjCollect++
  playerUp.alpha = 1;
  playerDown.alpha = 1;
  bar.alpha = 1;
  barGranny.alpha = 1;
  Hearts.alpha = 1;
  if(spawnX < 98*m){
    d1Destroyed.alpha = 1;
  }
  scene1.alpha = 0;
  scene2.alpha = 0;
  Carcasse.setAll('alpha', 1);
};

function unpauseImage2(event){
  game.paused = false;
  scene4.inputEnabled = false;
  scene5.inputEnabled = false;
  memoryObjCollect++
  playerUp.alpha = 1;
  playerDown.alpha = 1;
  bar.alpha = 1;
  barGranny.alpha = 1;
  pause.alpha = 1;
  Hearts.alpha = 1;
  if (spawnY <= 25*m) {
    scene3.alpha = 0;
    scene3.inputEnabled = false;
  }
  scene4.alpha = 0;
  Carcasse.setAll('alpha', 1);
  Ammos.setAll('alpha', 1);
  tutorialS.alpha = 1;
};

function nextLevelImg(event){
  game.paused = false;
  memoryObjCollect++
  playerUp.alpha = 1;
  playerDown.alpha = 1;
  bar.alpha = 1;
  barGranny.alpha = 1;
  Hearts.alpha = 1;
  d1Destroyed.alpha = 1;
  scene1.alpha = 0;
  scene2.alpha = 0;
  this.game.state.start('GameLevel_2');
  playerUp.health = 100;
  spawnX = 9.5*m;
  spawnY = 8*m;
};

function endImg(event) {
  game.paused = false;
  this.game.state.start('GameStart');
};

function render() {
  game.debug.body(playerUp);
  game.debug.body(playerHitbox);

  WolvesP.forEach(function(wolf) {
    game.debug.body(wolf);
  });

};

function cheats() {
  //super jump
  if(cheat == 0 && C.isDown){
    cheat = 1;
    setTimeout(function(){
       cheat = 0;
     }, 3000);
  }
  if(cheat == 1 && cursors.up.isDown){
    cheat = 2;
  }
  if(cheat == 2 && cursors.down.isDown){
    cheat = 3;
  }
  if(cheat == 3 && cursors.up.isDown){
    cheat = 4;
  }
  if(cheat == 4 && SPACE.isDown){
    cheat = 5;
  }
  if(cheat == 5 && cursors.down.isDown){
    playerJump = -800;
  }

  //lunar gravity
  if(cheat1 == 0 && C.isDown){
    cheat1 = 1;
    setTimeout(function(){
       cheat1 = 0;
     }, 3000);
  }
  if(cheat1 == 1 && cursors.down.isDown){
    cheat1 = 2;
  }
  if(cheat1 == 2 && cursors.right.isDown){
    cheat1 = 3;
  }
  if(cheat1 == 3 && cursors.up.isDown){
    cheat1 = 4;
  }
  if(cheat1 == 4 && cursors.left.isDown){
    cheat1 = 5;
  }
  if(cheat1 == 5 && SPACE.isDown){
    gravity = 300;
    player.setAll('body.gravity.y', gravity);
    Wolves.setAll('body.gravity.y', gravity);
  }

  //super velocity
  if(cheat2 == 0 && C.isDown){
    cheat2 = 1;
    setTimeout(function(){
       cheat2 = 0;
     }, 3000);
  }
  if(cheat2 == 1 && cursors.right.isDown){
    cheat2 = 2;
  }
  if(cheat2 == 2 && cursors.left.isDown){
    cheat2 = 3;
  }
  if(cheat2 == 3 && cursors.right.isDown){
    cheat2 = 4;
  }
  if(cheat2 == 4 && cursors.left.isDown){
    cheat2 = 5;
  }
  if(cheat2 == 5 && SPACE.isDown){
    playerVelocity = 600;
  }
};
