var player;
var playerUp;
var playerDown;
var playerHitbox;
var memoryObj;
var Wolves;
var Bullets;
var thorns;
var gotAxe;
var fucile = false;
var cheat = 0;
var cheat1 = 0;
var cheat2 = 0;
var cheat3 = 0;
var level;
var viewTop;
var ammoCount;

function worldPreload(){

  game.load.spritesheet('wolfPatrol', 'assets/images/wolfPatrol110x140.png', 110, 140);
  game.load.spritesheet('wolfChaser', 'assets/images/wolfChaser110x140.png', 110, 140);
  game.load.spritesheet('checkpoint', 'assets/images/checkpoint.png', 64, 128);
  game.load.spritesheet('d1', 'assets/images/d1.png', 128, 256);
  game.load.spritesheet('heart', 'assets/images/heart22x22.png', 22, 22);
  game.load.spritesheet('bullet', 'assets/images/bullet.png', 32, 16);
  game.load.spritesheet('bone', 'assets/images/osso40x40.png', 40, 40);
  game.load.spritesheet('cappuccetto', 'assets/images/cappuccetto68x106.png', 68, 106);
  game.load.spritesheet('kingWolf', 'assets/images/spriteboss122x156.png', 122, 156);
  game.load.spritesheet('ammoCount', 'assets/images/ammocount124x36.png', 124, 36);

  game.load.image('pauseButton', 'assets/images/buttonPause.png');
  game.load.image('buttonPlay', 'assets/images/buttonPlay.png');
  game.load.image('buttonMenu', 'assets/images/buttonMenu.png');
  game.load.image('buttonCheck', 'assets/images/buttonCheck.png');
  game.load.image('buttonLevel', 'assets/images/buttonLevel.png');

  game.load.image('ammo', 'assets/images/ammo.png');
  game.load.image('thorns', 'assets/images/thorns.png');
  game.load.image('ground', 'assets/images/ground.png');
  game.load.image('platformStart', 'assets/images/platformStart.png');
  game.load.image('platformCenter1', 'assets/images/platformCenter1.png');
  game.load.image('platformCenter2', 'assets/images/platformCenter2.png');
  game.load.image('platformCenter3', 'assets/images/platformCenter3.png');
  game.load.image('platformEnd', 'assets/images/platformEnd.png');
  game.load.image('bar', 'assets/images/bar.png');
  game.load.image('barGranny', 'assets/images/barGranny.png');
  game.load.image('d1destroyed', 'assets/images/d1destroyed.png');
  game.load.image('border', 'assets/images/border.png');
  game.load.image('backPause', 'assets/images/backPause.png');
  game.load.image('cadavere', 'assets/images/cadavere.png');

};

function worldCreate(){

  game.stage.backgroundColor = "#01041d";

  // WORLD SISTEM
  this.game.scale.pageAlignHorizontally = true;this.game.scale.pageAlignVertically = true;this.game.scale.refresh();
  game.world.setBounds(0, 0, game.world.width, game.world.height);
  game.physics.startSystem(Phaser.Physics.ARCADE);

  // CONTROLS SISTEM
  cursors = game.input.keyboard.createCursorKeys();
  SPACE=game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  C=game.input.keyboard.addKey(Phaser.Keyboard.C);
  CTRL=game.input.keyboard.addKey(Phaser.Keyboard.S);


  // WORLD BACKGROUND start

  platforms = game.add.group();
  platforms.enableBody = true;
  for (i = 0; i < game.world.width / platformlength; i++) {
    var ground = platforms.create(i * platformlength, 58*m, 'ground');
    ground.body.immovable = true;
  };
  // WORLD BACKGROUND end

  // WORLD STUFFS start

  thorns = game.add.group();
  thorns.enableBody = true;

  Wolves = game.add.group();
  Wolves.enableBody = true;

  WolvesP = game.add.group();
  WolvesP.enableBody = true;

  Bullets = game.add.group();
  Bullets.enableBody = true;

  Checkpoints = game.add.group();
  Checkpoints.enableBody = true;

  Carcasse = game.add.group();
  Carcasse.enableBody = true;

  Ammos = game.add.group();
  Ammos.enableBody = true;

  Lives = game.add.group();
  Lives.enableBody = true;

  platformsDes = game.add.group();
  platformsDes.enableBody = true;

  platformsOver = game.add.group();
  platformsOver.enableBody = true;

  Bones = game.add.group();
  Bones.enableBody = true;

  // WORLD STUFFS end

  //ammo rifle
  ammoCount = game.add.sprite(0.5*m, 1*m, 'ammoCount')
  ammoCount.fixedToCamera = true;

  //life
  Hearts = game.add.group();

  heart0 = Hearts.create(0.5*m, 0.5*m, 'heart');
  heart0.frame = 0;
  heart0.fixedToCamera = true;
  heart1 = Hearts.create(1*m, 0.5*m, 'heart');
  heart1.frame = 0;
  heart1.fixedToCamera = true;
  heart2 = Hearts.create(1.5*m, 0.5*m, 'heart');
  heart2.frame = 0;
  heart2.fixedToCamera = true;
  heart3 = Hearts.create(2*m, 0.5*m, 'heart');
  heart3.frame = 0;
  heart3.fixedToCamera = true;
  //bar
  bar = game.add.sprite(3*m, 0.5*m, 'bar');
  bar.fixedToCamera = true;
  barGranny = game.add.sprite(3*m, 0.5*m, 'barGranny');
  barGranny.fixedToCamera = true;
  game.physics.arcade.enable(barGranny);
  barGranny.enableBody = true;

  borderTop = game.add.sprite(0, -150, 'border');
  borderTop.fixedToCamera = true;
  game.physics.arcade.enable(borderTop);
  borderTop.enableBody = true;
  borderTop.anchor.setTo(.2,.4);
  borderTop.scale.x = 1.5;
  borderTop.scale.y = 1.5;


  borderBottom = game.add.sprite(0, 768, 'border');
  borderBottom.fixedToCamera = true;
  game.physics.arcade.enable(borderBottom);
  borderBottom.enableBody = true;
  borderBottom.anchor.setTo(.2,0);
  borderBottom.scale.x = 1.5;
  borderBottom.scale.y = 1.5;

  pauseMenu();

};

function worldUpdate(){

  game.physics.arcade.overlap(playerHitbox, Wolves, wolfHitboxDamageChaser, null, this);
  game.physics.arcade.overlap(playerHitbox, WolvesP, wolfHitboxDamagePatrol, null, this);
  game.physics.arcade.overlap(playerUp, thorns, thornHit, null, this);
  game.physics.arcade.overlap(Bullets, Wolves, wolfBulletDamageChaser, null, this);
  game.physics.arcade.overlap(Bullets, WolvesP, wolfBulletDamagePatrol, null, this);
  game.physics.arcade.overlap(Bullets, platforms, elide, null, this);
  game.physics.arcade.overlap(Bullets, platformsOver, elide, null, this);
  game.physics.arcade.overlap(player, Checkpoints, checkpointHit, null, this);
  game.physics.arcade.overlap(playerHitbox, platformsDes, desWall, null, this);
  game.physics.arcade.overlap(Bones, platforms, elide, null, this);
  game.physics.arcade.overlap(playerUp, Bones, boneHitPlayer, null, this);
  game.physics.arcade.overlap(kingWolf, Bones, boneHitKing, null, this);
  game.physics.arcade.overlap(player, Ammos, collectAmmo, null, this);
  game.physics.arcade.overlap(player, Lives, heal, null, this);
  game.physics.arcade.overlap(playerUp, kingWolf, kingWolfHit, null, this);

  game.physics.arcade.collide(Wolves, platforms);
  game.physics.arcade.collide(player, platforms);
  game.physics.arcade.collide(Ammos, platforms);
  game.physics.arcade.collide(Lives, platforms);
  game.physics.arcade.collide(Carcasse, platforms);
  game.physics.arcade.collide(playerUp, Wolves, wolfHit, null, this);
  game.physics.arcade.collide(playerUp, WolvesP, wolfHit, null, this);
  game.physics.arcade.collide(Wolves, platformsOver);
  game.physics.arcade.collide(Ammos, platformsOver);
  game.physics.arcade.collide(Lives, platformsOver);
  game.physics.arcade.collide(WolvesP, platforms);
  game.physics.arcade.collide(WolvesP, platformsOver);
  game.physics.arcade.collide(Carcasse, platformsOver);
  game.physics.arcade.collide(player, platformsDes);
  game.physics.arcade.collide(Wolves, platformsDes);
  game.physics.arcade.collide(WolvesP, platformsDes);
  game.physics.arcade.collide(kingWolf, platforms);
  platformOverCollide(); //find in Functions.js

  // HUD
  //life
  if(playerUp.health == 100){
    heart0.frame = 0;
    heart1.frame = 0;
    heart2.frame = 0;
    heart3.frame = 0;
  }
  else if (playerUp.health == 75) {
    heart0.frame = 0;
    heart1.frame = 0;
    heart2.frame = 0;
    heart3.frame = 1;
  }
  else if (playerUp.health == 50) {
    heart0.frame = 0;
    heart1.frame = 0;
    heart2.frame = 1;
    heart3.frame = 1;
  }
  else {
    heart0.frame = 0;
    heart1.frame = 1;
    heart2.frame = 1;
    heart3.frame = 1;
  }

  wolvesBehave(Wolves); //find in Functions.js
  wolfPatrolBehave(WolvesP); //find in Functions.js
  wolfFrames(Wolves); //find in Functions.js
  wolfFrames(WolvesP); //find in Functions.js

  cheats();
  weaposChange(); //find in Functions.js

  if (fucile == true) {
    ammoCount.alpha = 1;
    ammoCount.frame = 10 - bulletN;
    rifle(); //find in Functions.js
  }else {
    ammoCount.alpha = 0;
  }
  if (game.paused == true) {
    ammoCount.alpha = 0;
  }

  onPause.tint = 0xffffff;

};
