var player;
var Wolves;
var Bullets;
var thorns;

function worldPreload(){

  game.world.width=1350;

  game.load.crossOrigin = 'anonymous';

  game.load.image('bullet', 'http://examples.phaser.io/assets/bullets/bullet13.png');
  game.load.spritesheet('wolf', 'assets/images/wolf_430x498.png', 430, 498);
  game.load.image('ground', 'assets/images/piattaforma.jpeg');
  game.load.image('groundStart', 'assets/images/groundStart_32x32.png');
  game.load.image('groundEnd', 'assets/images/groundEnd_32x32.png');
  game.load.image('groundCenter1', 'assets/images/groundCenter1_32x32.png');
  game.load.image('groundCenter2', 'assets/images/groundCenter2_32x32.png');
  game.load.image('groundCenter3', 'assets/images/groundCenter3_32x32.png');
  game.load.image('thorns', 'assets/images/thorns.png');

};

function worldCreate(){

  // WORLD SISTEM
  game.world.setBounds(0, 0, game.world.width*2, game.world.height);
  game.physics.startSystem(Phaser.Physics.ARCADE);

  // CONTROLS SISTEM
  cursors = game.input.keyboard.createCursorKeys();
  SPACE=game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

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

  Bullets = game.add.group();
  Bullets.enableBody = true;
  // WORLD STUFFS end

  // HUD
  healthText = game.add.text(32, 32, 'health: 100', { fontSize: '25px', fill: 'rgb(255, 255, 255)' });
  healthText.fixedToCamera = true;

  wolfesLeft = game.add.text(32, 64, 'Wolves left: 5', { fontSize: '25px', fill: 'rgb(255, 255, 255)' });
  wolfesLeft.fixedToCamera = true;

};

function worldUpdate(){

  game.physics.arcade.overlap(Bullets, platforms, elide, null, this); //find in Function.js
  game.physics.arcade.overlap(player, thorns, thornHit, null, this); //find in Function.js
  game.physics.arcade.overlap(player, Wolves, wolfHit, null, this); //find in Function.js
  game.physics.arcade.overlap(Bullets, Wolves, killWolves, null, this); //find in Function.js

};
