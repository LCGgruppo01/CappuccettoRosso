var player;
var playerUp;
var playerDown;
var playerHitbox;
var memoryObj;
var Wolves;
var Bullets;
var thorns;
var gotAxe;
var cheat = 0;
var cheat1 = 0;
var cheat2 = 0;
var cheat3 = 0;

function worldPreload(){
  game.load.image('bullet', 'http://examples.phaser.io/assets/bullets/bullet13.png');

  game.load.spritesheet('wolf', 'assets/images/wolf.png', 64, 128);
  game.load.spritesheet('checkpoint', 'assets/images/checkpoint.png', 64, 128);
  game.load.spritesheet('d1', 'assets/images/d1.png', 128, 256);
  game.load.spritesheet('heart', 'assets/images/heart.png', 32, 32);

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
  game.load.image('kingWolf', 'assets/images/kingWolf.png');
  game.load.image('cappuccetto', 'assets/images/cappuccetto.png');
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
  AXE=game.input.keyboard.addKey(Phaser.Keyboard.A);
  C=game.input.keyboard.addKey(Phaser.Keyboard.C);

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

  platformsDes = game.add.group();
  platformsDes.enableBody = true;

  platformsOver = game.add.group();
  platformsOver.enableBody = true;

  // WORLD STUFFS end

  //life
  Hearts = game.add.group();

  heart0 = Hearts.create(0.5*m, 0.25*m, 'heart');
  heart0.frame = 0;
  heart0.fixedToCamera = true;
  heart1 = Hearts.create(1*m, 0.25*m, 'heart');
  heart1.frame = 0;
  heart1.fixedToCamera = true;
  heart2 = Hearts.create(1.5*m, 0.25*m, 'heart');
  heart2.frame = 0;
  heart2.fixedToCamera = true;
  heart3 = Hearts.create(2*m, 0.25*m, 'heart');
  heart3.frame = 0;
  heart3.fixedToCamera = true;
  //bar
  bar = game.add.sprite(3*m, 0.5*m, 'bar');
  bar.fixedToCamera = true;
  barGranny = game.add.sprite(3*m, 0.5*m, 'barGranny');
  barGranny.fixedToCamera = true;
  game.physics.arcade.enable(barGranny);
  barGranny.enableBody = true;
  //position
  xt = game.add.text(32, 64, 'x', { fontSize: '15px', fill: 'rgb(255, 255, 255)' });
  xt.fixedToCamera = true;
  yt = game.add.text(32, 80, 'y', { fontSize: '15px', fill: 'rgb(255, 255, 255)' });
  yt.fixedToCamera = true;

  testCreate();
  pauseMenu();


};

function worldUpdate(){

  game.physics.arcade.overlap(playerHitbox, Wolves, wolfHitboxDamage, null, this);
  game.physics.arcade.overlap(playerHitbox, WolvesP, wolfHitboxDamage, null, this);
  game.physics.arcade.overlap(playerUp, thorns, thornHit, null, this);
  game.physics.arcade.overlap(Bullets, Wolves, kill, null, this);
  game.physics.arcade.overlap(Bullets, WolvesP, kill, null, this);
  game.physics.arcade.overlap(Bullets, platforms, elide, null, this);
  game.physics.arcade.overlap(Bullets, platformsOver, elide, null, this);
  game.physics.arcade.overlap(player, Checkpoints, checkpointHit, null, this);
  game.physics.arcade.overlap(playerHitbox, platformsDes, desWall, null, this);
  game.physics.arcade.overlap(playerUp, memoryObj1, collectMe1, null, this);
  game.physics.arcade.overlap(playerUp, memoryObj2, collectMe2, null, this);

  game.physics.arcade.collide(Wolves, platforms);
  game.physics.arcade.collide(player, platforms);
  game.physics.arcade.collide(playerUp, Wolves, wolfHit, null, this);
  game.physics.arcade.collide(playerUp, WolvesP, wolfHit, null, this);
  game.physics.arcade.collide(Wolves, platformsOver);
  game.physics.arcade.collide(WolvesP, platforms);
  game.physics.arcade.collide(WolvesP, platformsOver);
  game.physics.arcade.collide(player, platformsDes);
  game.physics.arcade.collide(Wolves, platformsDes);
  game.physics.arcade.collide(WolvesP, platformsDes);
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
    heart3.frame = 1;
  }
  else if (playerUp.health == 50) {
    heart2.frame = 1;
  }
  else {
    heart1.frame = 1;
  }

  barGranny.cameraOffset.x = playerUp.body.position.x/32 + 3*m;

  xt.text = 'x ' + playerUp.body.x/m;
  yt.text = 'y ' + playerUp.body.y/m;

  wolvesBehave(Wolves); //find in Functions.js
  wolfPatrolBehave(WolvesP); //find in Functions.js
  wolfFrames(Wolves); //find in Functions.js
  wolfFrames(WolvesP); //find in Functions.js

  cheats();
  testUpdate();
  flashDamage();

};
