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
  var wolf = Wolves.create(x*m, y*m, 'wolf');
  wolf.anchor.setTo(.5,.5);
  wolf.body.gravity.y = gravity;
  wolf.body.bounce.y = bounce;
  wolf.health = 100;
  wolf.casuale = Math.random();
  wolf.animations.add('sane', [2, 3], 5, true);
  wolf.animations.add('damage', [0, 1], 5, true);
};

function wolfPatrolCreate(x, y, fine){
  var wolf = WolvesP.create(x*m, y*m, 'wolf');
  wolf.anchor.setTo(.5,.5);
  wolf.body.gravity.y = gravity;
  wolf.body.bounce.y = bounce;
  wolf.inizio = x * m;
  wolf.fine = fine * m - 32;
  wolf.health = 100;
  wolf.animations.add('sane', [2, 3], 5, true);
  wolf.animations.add('damage', [0, 1], 5, true);
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
    player.body.velocity.x = (player.x - wolf.x)/Math.abs(player.x - wolf.x)*4000;
    timeHit = game.time.now + 300;
    immunity = game.time.now + 500;
    player.damage(25);
  }
};

function wolfHitboxDamage(hitbox, wolf) {
  if (game.time.now > immunity && axeHit === false){
    wolf.body.velocity.y = 2000;
    wolf.body.velocity.x = -(playerUp.x - wolf.x)/Math.abs(playerUp.x - wolf.x)*500;
    wolf.damage(50);
    immunity = game.time.now + 500;
  }
}

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
    if(playerUp.body.y + 50 - platform.body.y <= 0){
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

function collectMe(player, memoryObj){
  if(cursors.down.isDown){
    if (memoryObjCollect == 0) {
      scene1.alpha = 1;
      scene1.inputEnabled = true;
    }
    else if (memoryObjCollect == 1) {
      scene2.alpha = 1;
      scene2.inputEnabled = true;
    }
    playerUp.alpha = 0;
    playerDown.alpha = 0;
    bar.alpha = 0;
    barGranny.alpha = 0;
    Hearts.alpha = 0;
    memoryObj.kill();
    game.paused = true;
    game.input.onDown.add(unpauseImage, this);
  }
};
// COLLIDE & OVERLAP functions end

// wolves BEHAVE and FRAMES functions start
function wolvesBehave(Wolves) {

  game.physics.arcade.collide(Wolves, platforms);


  Wolves.forEach(function(wolf){
  if (game.time.now > immunity) {

   if(Math.abs(playerUp.x - wolf.x) < 600 && - playerUp.y + wolf.y < 160){
      wolf.body.velocity.x = (playerUp.x - wolf.x)/Math.abs(playerUp.x - wolf.x)*50 + (playerUp.x - wolf.x)/Math.abs(playerUp.x - wolf.x)*200*wolf.casuale;
   }
   else{
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
    if (SPACE.isDown && position=="leftt" && game.time.now > shootTime && shoot == true){
      var bullet = Bullets.create(playerUp.x - 10, playerUp.y + 20, 'bullet');
      bullet.body.gravity.y = gravity;
      bullet.body.velocity.y = -100;
      bullet.body.velocity.x = -bulletVelocity + playerUp.body.velocity.x;
      shootTime = game.time.now + 300;
      shoot = false;
    }
    else if (SPACE.isDown && position=="rightt" && game.time.now > shootTime && shoot == true){
      bullet = Bullets.create(playerUp.x + 10, playerUp.y + 20, 'bullet');
      bullet.body.gravity.y = gravity;
      bullet.body.velocity.y = -100;
      bullet.body.velocity.x = bulletVelocity + playerUp.body.velocity.x;
      shootTime = game.time.now + 300;
      shoot = false;
    }

    if (SPACE.isUp) {
      shoot = true;
    }
  }
}

function weaposChange(){
  if(CTRL.isDown && gotAxe == 1 && game.time.now > changeWeapon){
    gotAxe = 2;
    changeWeapon = game.time.now + 300;
  }
  else if(CTRL.isDown && gotAxe == 2 && game.time.now > changeWeapon){
    gotAxe = 1;
    changeWeapon = game.time.now + 300;
  }
}
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
        playerUp.frame = 5;
      }else if (gotAxe == 1) {
        playerUp.frame = 0;
      }else if (gotAxe == 2) {
        playerUp.frame = 25;
      }
    }
  }else if(playerUp.body.touching.down){
    if (gotAxe === 0) {
      playerUp.frame = 5;
    }else if (gotAxe == 1) {
      playerUp.frame = 0;
    }else if (gotAxe == 2) {
      playerUp.frame = 25;
    }
  }else{
    if (gotAxe === 0) {
      playerUp.frame = 5;
    }else if (gotAxe == 1) {
      playerUp.frame = 0;
    }else if (gotAxe == 2) {
      playerUp.frame = 25;
    }
  }
  if (position=='leftt') {
    playerUp.scale.x = -1;
  }else {
    playerUp.scale.x = 1;
  }
  if (axeHit == false){
    playerUp.animations.play('rightAxeChop');
  }

};
//animations END

//player attack HItBOX

function changeHitbox() {
  if (axeHit == false) {
    playerHitbox.body.setSize(30, 60, 0, 0);
    if (position == "rightt") {
      playerHitbox.body.x = playerUp.body.x + 30;
    }else if (position == "leftt") {
      playerHitbox.body.x = playerUp.body.x - 30;
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

  pause = game.add.text(900, 30, 'Pause', { font: '24px Arial', fill: '#fff' });
  pause.inputEnabled = true;
  pause.fixedToCamera = true;

  P.onDown.add(paused, this);
  pause.events.onInputUp.add(paused);
  game.input.onDown.add(unpaused);
  //aggiungo per fixare un bug
  onPause = game.add.text(500, 350, ' ', { font: '24px Arial', fill: '#fff' });
};

function paused() {
  if (game.paused === false) {

    // When the paus button is pressed, we pause the game
    setTimeout(function(){
      game.paused = true;
     }, 20);
    onPause = game.add.text(500, 350, 'Esci Dalla Siesta', { font: '24px Arial', fill: '#fff' });
    onPause.inputEnabled = true;
    onPause.fixedToCamera = true;
  }
};

function unpaused(event){
  if (game.paused) {
    onPause.events.onInputUp.add(function(){
      game.paused = false;
      onPause.text = '';
    });
  }
};

//end PAUSE menù

// TEST & DEBUG functions

function imagesCreate(x1,y1, x2,y2){
  if (memoryObjCollect <= 0){
    scene1 = Scenes.create(0, 0, 'open');
    scene1.alpha = 0;
    scene1.scale.setTo(0.6,0.6);
    scene1.fixedToCamera = true;

    memoryObj1 = MemoryObjs.create(x1*m, y1*m, 'memoryObj');
  }

  if (memoryObjCollect <= 1){
    scene2 = Scenes.create(0, 0, 'open');
    scene2.tint = 0x1a53ff;
    scene2.alpha = 0;
    scene2.scale.setTo(0.6,0.6);
    scene2.fixedToCamera = true;

    memoryObj2 = MemoryObjs.create(x2*m, y2*m, 'memoryObj');
    memoryObj2.tint = 0x1a53ff;
  }
};

function unpauseImage(event){
  game.paused = false;
  memoryObjCollect++
  playerUp.alpha = 1;
  playerDown.alpha = 1;
  bar.alpha = 1;
  barGranny.alpha = 1;
  Hearts.alpha = 1;
  if (memoryObjCollect == 1) {
    scene1.alpha = 0;
  }
  else if (memoryObjCollect == 2) {
    scene2.alpha = 0;
  }
};

function testCreate(){
  H=game.input.keyboard.addKey(Phaser.Keyboard.H);
};
function testUpdate(){
  if(H.isDown){
    playerUp.heal(100);
  }
};
function render() {
  game.debug.body(playerUp);
  game.debug.body(playerHitbox);

  platforms.forEach(function(platform) {
    game.debug.body(platform);
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
