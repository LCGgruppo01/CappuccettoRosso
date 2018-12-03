var player;
var playerUp;
var playerDown;
var Wolves;
var Bullets;
var thorns;
var gotAxe;

function worldPreload(){
  game.load.image('platformStart', 'assets/images/platformStart.png');
  game.load.image('platformCenter1', 'assets/images/platformCenter1.png');
  game.load.image('platformCenter2', 'assets/images/platformCenter2.png');
  game.load.image('platformCenter3', 'assets/images/platformCenter3.png');
  game.load.image('platformEnd', 'assets/images/platformEnd.png');
};

function worldCreate(){

  // WORLD SISTEM
  game.world.setBounds(0, 0, game.world.width, game.world.height);
  game.physics.startSystem(Phaser.Physics.ARCADE);

  // CONTROLS SISTEM
  cursors = game.input.keyboard.createCursorKeys();
  SPACE=game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  AXE=game.input.keyboard.addKey(Phaser.Keyboard.A);

  // WORLD BACKGROUND start
  Backgrounds = game.add.group();
  for (i = 0; i < game.world.width / backgroundWidth; i++) {
    var background = Backgrounds.create(i * backgroundWidth, 0, 'sky');
    Backgrounds.scale.setTo(1,1.2);
  };

  platforms = game.add.group();
  platforms.enableBody = true;
  for (i = 0; i < game.world.width / platformLenght; i++) {
    var ground = platforms.create(i * platformLenght, game.world.height - platformHeight, 'ground');
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

  // HUD
  healthText = game.add.text(32, 32, 'health 100', { fontSize: '30px', fill: 'rgb(255, 255, 255)' });
  healthText.fixedToCamera = true;


  testCreate();

};

function worldUpdate(){

  game.physics.arcade.collide(player, platforms);
  game.physics.arcade.overlap(player, Wolves, wolfHit, null, this);
  game.physics.arcade.overlap(player, WolvesP, wolfHit, null, this);
  game.physics.arcade.collide(Wolves, platforms);
  game.physics.arcade.collide(Wolves, platformsOver);
  game.physics.arcade.collide(WolvesP, platforms);
  game.physics.arcade.collide(WolvesP, platformsOver);
  game.physics.arcade.overlap(playerUp, thorns, thornHit, null, this);
  game.physics.arcade.overlap(Bullets, Wolves, kill, null, this);
  game.physics.arcade.overlap(Bullets, WolvesP, kill, null, this);
  game.physics.arcade.overlap(playerUp, axe, getAxe, null, this);
  game.physics.arcade.overlap(Bullets, platforms, elide, null, this);
  game.physics.arcade.overlap(Bullets, platformsOver, elide, null, this);
  game.physics.arcade.overlap(player, Checkpoints, checkpointHit, null, this);

  if(gotAxe==1){
    game.physics.arcade.overlap(Bullets, platformsDes, kill, null, this);
  }else {
    game.physics.arcade.overlap(Bullets, platformsDes, elide, null, this);
  }

  platformOverCollide(); //find in Functions.js
  // HUD
  healthText.text = 'Health ' + playerUp.health;

  wolvesBehave(Wolves); //find in Functions.js
  wolfPatrolBehave(WolvesP); //find in Functions.js
  wolfFrames(Wolves); //find in Functions.js
  wolfFrames(WolvesP); //find in Functions.js

  testUpdate();

};
