/**
 * Generated from the Phaser Sandbox
 *
 * //phaser.io/sandbox/NynQHaDE
 *
 * This source requires Phaser 2.6.2
 */

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

var scoreWolves = 10;
var scoreCandiesText;
var scoreToothbrushes = 10;
var scoreToothbrushesText;
var jump = 500;
var openImage;
var candies;
var toothbrushes;

function preload() {

}

var StartState = {
    preload: function() {
        game.load.crossOrigin = 'anonymous';
        game.load.image('open', 'https://i.imgur.com/r7PzpJB.png');
    },

    create: function() {
        image = game.add.sprite(game.world.centerX, game.world.centerY, 'open');
        image.anchor.set(0.5);
        image.inputEnabled = true;
        image.events.onInputDown.add(this.imageClick, this);
        scoreCandies = 10;
        scoreToothbrushes = 10;
        jump = 200;

    },
    
    imageClick: function(pointer) {
        this.game.state.start('Game1');
    }
    
}

game.state.add('Start', StartState);

var Game1State = {
    preload: function() {

        game.load.crossOrigin = 'anonymous';
        
        game.load.image('bullet', 'https://image.flaticon.com/icons/png/512/226/226507.png');
        game.load.image('candy', 'https://cdn4.iconfinder.com/data/icons/new-year-christmas-nativity-xmas-noel-yule/192/.svg-7-512.png');
        
        game.load.baseURL = 'http://examples.phaser.io/assets/';
    
        game.load.image('sky', 'skies/sky2.png');
        game.load.image('ground', 'sprites/platform.png');
        game.load.spritesheet('dude', 'sprites/pacman_by_oz_28x28.png', 28, 28);
    },

    create: function() {
        game.world.setBounds(0, 0, 800*3, 600);
        game.physics.startSystem(Phaser.Physics.ARCADE);
        var cielo=game.add.sprite(0, 0, 'sky');
        cielo.scale.setTo(5, 1);
        
        scoreWolves = 10;

        
        platforms = game.add.group();
        platforms.enableBody = true;
        var ground = platforms.create(0, game.world.height - 64, 'ground');
        ground.scale.setTo(5, 2);
        ground.body.immovable = true;
        var ledge = platforms.create(400, 400, 'ground');
        ledge.body.immovable = true;
        ledge = platforms.create(-150, 250, 'ground');
        ledge.body.immovable = true;
        
        ledge = platforms.create(800, 270, 'ground');
        ledge.body.immovable = true;
        
        
        ledge = platforms.create(-150, 700, 'ground');
        ledge.body.immovable = true;
        
        
        ledge = platforms.create(-100, 1400, 'ground');
        ledge.body.immovable = true;
        
        player = game.add.sprite(32, game.world.height - 80, 'dude');
        game.physics.arcade.enable(player);
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;
        player.animations.add('right', [0, 1, 2, 3], 10, true);
        player.animations.add('left', [7, 8, 9, 10], 10, true);
        
        game.camera.follow(player);
        
        
        cursors = game.input.keyboard.createCursorKeys();
        SPACE=game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        

        Wolves = game.add.group();
        Wolves.enableBody = true;
        
        Bullets = game.add.group();
        Bullets.enableBody = true;

    
        scoreWolvesText = game.add.text(16, 488, 'Remaining Wolves: 10', { fontSize: '32px', fill: '#FFF' });
        
    },
    
    update: function() {
        var hitPlatform = game.physics.arcade.collide(player, platforms);
        game.physics.arcade.collide(Wolves, platforms);
        game.physics.arcade.overlap(player, Wolves, this.loose, null, this);
        game.physics.arcade.overlap(Bullets, platforms, this.elide, null, this);
        game.physics.arcade.overlap(Bullets, Wolves, this.collectWolves, null, this);
        
        player.scale.setTo(jump/1000+0.5, jump/1000+0.5);
        
        player.body.velocity.x = 0;
    
        if (cursors.left.isDown)
        {
            player.body.velocity.x = -350;
            player.animations.play('left');
        }
        else if (cursors.right.isDown)
        {
            player.body.velocity.x = 350;
            player.animations.play('right');
        }
        else
        {
            player.animations.stop();
            player.frame = 5;
        }
    
        if (cursors.up.isDown && player.body.touching.down && hitPlatform)
        {
            player.body.velocity.y = -300;
        }
        
        if (SPACE.isDown && cursors.left.isDown)
        {
            var bullet = Bullets.create(player.x, player.y-10, 'bullet');
            bullet.body.velocity.x = -700;
            bullet.scale.setTo(0.04, 0.04);


        }
        else if (SPACE.isDown)
        {
            bullet = Bullets.create(player.x, player.y-10, 'bullet');
            bullet.body.velocity.x = 700;
            bullet.scale.setTo(0.04, 0.04);


        }
        

        if(Math.random()<0.015) {
            var wolf = Wolves.create(800*Math.random(), 0, 'candy');
            wolf.body.gravity.y = 200;
            wolf.body.velocity.x = 0;
            wolf.body.bounce.y =0.2;
            wolf.scale.setTo(0.08, 0.08);
        }

    },
    
    loose: function (player, wolf) {
        this.game.state.start('Bad');
    },
    
    elide: function (siElide, rimane) {
        siElide.kill();
    },
    
    collectWolves: function (bul, wol) {
        wol.kill();
        bul.kill();
        scoreWolves--;
        scoreWolvesText.text = 'Remaining Wolves: ' + scoreWolves;
        if(scoreWolves === 0)
            this.game.state.start('Good');
    }
}

game.state.add('Game1', Game1State);

var GoodState = {
    preload: function() {
        game.load.crossOrigin = 'anonymous';
        game.load.image('open', 'https://img.freepik.com/free-vector/clean-tooth-background_1270-86.jpg?size=338&ext=jpg');
    },

    create: function() {
        game.world.setBounds(0, 0, 800, 600);
        image = game.add.sprite(game.world.centerX, game.world.centerY, 'open');
        image.anchor.set(0.5);
        image.inputEnabled = true;
        image.events.onInputDown.add(this.imageClick, this);
    },
    
    imageClick: function(pointer) {
        this.game.state.start('Start');
    }
    
}

game.state.add('Good', GoodState);

game.state.add('Game1', Game1State);

var BadState = {
    preload: function() {
        game.load.crossOrigin = 'anonymous';
        game.load.image('open', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy0kSXXPUNRgkBb4PI0wAHSon2mSo2Xj6oojXZ90NZIIBAKIc6');
    },

    create: function() {
        game.world.setBounds(0, 0, 800, 600);
        image = game.add.sprite(game.world.centerX, game.world.centerY, 'open');
        image.anchor.set(0.5);
        image.inputEnabled = true;
        image.events.onInputDown.add(this.imageClick, this);
    },
    
    imageClick: function(pointer) {
        this.game.state.start('Start');
    }
    
}

game.state.add('Bad', BadState);

// start the boot state
game.state.start('Start');

function create() {
  
}

function update () {

}

function render () {

}
