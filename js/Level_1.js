var time = 0;
var backgroundWidth = 800;
var timeWolves = 0;
var timeWolfHit = 0;
var player;
var Wolves;
var Bullets;
var thorns;
var platformLenght = 400;
var platformHeight = 64;
var salto;

var GameLevel_1 = {

  preload: function() {

    game.world.width=1350;

    game.load.crossOrigin = 'anonymous';

    game.load.image('bullet', 'http://examples.phaser.io/assets/bullets/bullet13.png');
    game.load.image('sky', 'http://examples.phaser.io/assets/skies/sky2.png');

    game.load.spritesheet('wolf', 'assets/images/wolf_430x498.png', 430, 498);
    game.load.image('ground', 'assets/images/piattaforma.jpeg');
    game.load.image('groundStart', 'assets/images/groundStart_32x32.png');
    game.load.image('groundEnd', 'assets/images/groundEnd_32x32.png');
    game.load.image('groundCenter1', 'assets/images/groundCenter1_32x32.png');
    game.load.image('groundCenter2', 'assets/images/groundCenter2_32x32.png');
    game.load.image('groundCenter3', 'assets/images/groundCenter3_32x32.png');
    game.load.image('thorns', 'assets/images/thorns.png');
    game.load.spritesheet('granny', 'assets/images/granny_369x432.png', 369, 432);

  },
  create: function() {
    game.world.setBounds(0, 0, game.world.width*2, game.world.height);
    game.physics.startSystem(Phaser.Physics.ARCADE);

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

    var ledge =  platforms.create(game.world.width*0.1, game.world.height-100, 'ground');
    ledge.scale.setTo(0.5, 1.2);
    ledge.body.immovable = true;
    ledge = platforms.create(game.world.width*0.25, game.world.height-100, 'ground');
    ledge.scale.setTo(0.5, 1.2);
    ledge.body.immovable = true;

    player = game.add.sprite(32, game.world.height - 200, 'granny');
    player.frame = 1;
    game.physics.arcade.enable(player);
    player.scale.setTo(0.2, 0.2);
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 500;
    player.body.collideWorldBounds = true;
    game.camera.follow(player);
    var position="rightt";
    player.health=100;
    player.maxHealth=100;
    player.heal(100);

    thorns = game.add.group();
    thorns.enableBody = true;
    var thorn = thorns.create(game.world.width*0.195, game.world.height-100, 'thorns');
    thorn.scale.setTo(0.7, 0.7);


    cursors = game.input.keyboard.createCursorKeys();
    SPACE=game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);


    Wolves = game.add.group();
    Wolves.enableBody = true;
    var wolf = Wolves.create(1300,  game.world.height - 200, 'wolf');
    wolf.body.gravity.y = 500;
    wolf.body.bounce.y =0.2;
    wolf.scale.setTo(0.2, 0.2);


    Bullets = game.add.group();
    Bullets.enableBody = true;

    healthText = game.add.text(32, 32, 'health: 100', { fontSize: '50px', fill: 'rgb(255, 255, 255)' });
    healthText.fixedToCamera = true;

    chiama(500, 100, 5);
    chiama(1000, 500, 10);
    chiama(600, 250, 2);

  },
  update: function() {

    wolvesBehave(Wolves);

    var hitPlatform = game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(Wolves, platforms);
    game.physics.arcade.overlap(Bullets, platforms, elide, null, this);
    game.physics.arcade.overlap(player, thorns, thornHit, null, this);
    game.physics.arcade.overlap(player, Wolves, wolfHit, null, this);
    game.physics.arcade.overlap(Bullets, Wolves, killWolves, null, this);

    player.body.velocity.x = player.body.velocity.x*0.87;

    healthText.text='Health: ' + player.health;

    if (cursors.left.isDown && game.time.now>timeWolfHit)
    {
        player.body.velocity.x = -250;
        position="leftt";
        player.frame=0;
    }
    else if (cursors.right.isDown && game.time.now>timeWolfHit)
    {
        player.body.velocity.x = 250;
        position="rightt";
        player.frame=1;
    }

    if (cursors.up.isDown && player.body.touching.down && hitPlatform)
    {
        player.body.velocity.y = -300;
        salto=1;

    }

    if (cursors.up.isUp && salto==1)
    {
        salto=2;
    }

    if (cursors.up.isDown && salto==2)
    {
        player.body.velocity.y = -250;
        salto=3;
    }
    if (SPACE.isDown && position=="leftt" && game.time.now>time)
    {
        var bullet = Bullets.create(player.x -10, player.y +20, 'bullet');
        bullet.body.gravity.y = 400;
        bullet.body.velocity.y = -100;
        bullet.body.velocity.x = -400;
        time=game.time.now+300;

    }
    else if (SPACE.isDown && position=="rightt" && game.time.now>time)
    {
        bullet = Bullets.create(player.x +10, player.y +20, 'bullet');
        bullet.body.gravity.y = 400;
        bullet.body.velocity.y = -100;
        bullet.body.velocity.x = 400;
        time=game.time.now+300;

    }

    if ( game.time.now > timeWolves){
      var wolf = Wolves.create(1300,  game.world.height - 200, 'wolf');
      wolf.body.gravity.y = 500;
      wolf.body.bounce.y =0.2;
      wolf.scale.setTo(0.2, 0.2);
      timeWolves = game.time.now + 4000;
    }

    if(player.health <= 0)
    {
      this.game.state.start('GameLevel_1');
    }

  },

};



game.state.add('GameLevel_1', GameLevel_1);
