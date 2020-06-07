class Play extends Phaser.Scene {
    constructor() {
        super("playScene");//scene name
    }

    preload() {
        this.load.atlas('ID-spritesheet', './assets/InterdimensionalDefense.png', './assets/InterdimensionalDefense.json');

        this.load.image('Player', './assets/Sprites/player1-0.png');
        this.load.image('charger2', './assets/Sprites/charger2-0.png');
        this.load.image('chaser3', './assets/Sprites/chaser3-0.png');
        this.load.image('laser', './assets/Sprites/laser.png');
        this.load.image('reticle', './assets/Sprites/reticle.png');
        this.load.image('explode1', './assets/Particle/16_sunburn_spritesheet.png');
        this.load.image('explode2', './assets/Particle/12_nebula_spritesheet.png');

        this.load.image('bg1', './assets/Backgrounds/tempbg1.png');
        this.load.image('bg2', './assets/Backgrounds/DimensionSky.png');
        this.load.image('bg3', './assets/Backgrounds/DimensionEarth.png');
        //this.load.image('background', './assets/backgrounds/grey.png');

        this.load.audio('laser_sound', './assets/SoundEffects/Laser.mp3');
        this.load.audio('dimension_shift', './assets/SoundEffects/DimensionShift.mp3');
        this.load.audio('BulletHit', './assets/SoundEffects/BulletHit.mp3');
        this.load.audio('ChargerDead', './assets/SoundEffects/ChargerDead.wav');
        this.load.audio('ChaserDead', './assets/SoundEffects/ChaserDead.wav');

        // load animation/sprite atlas

    }

    create() {

        //particle effects when explode
        Chaserparticle = this.add.particles('explode1');
        Chaserparticle.setDepth(2);
        Chargerparticle = this.add.particles('explode2');
        Chargerparticle.setDepth(2);

        //create anims using the texture atlas
        this.anims.create({
            key: 'player-idle',
            frames: [
                { key: 'ID-spritesheet', frame: 'player-8' },
                { key: 'ID-spritesheet', frame: 'player-0' },
            ],
            frameRate: 6,
            repeat: -1
        });

        this.anims.create({
            key: 'player-walk',
            frames: this.anims.generateFrameNames('ID-spritesheet', {
                start: 0,
                end: 7,
                zeroPad: 1,
                prefix: 'player-',
            }),
            frameRate: 12,
            repeat: -1
        });

        this.anims.create({
            key: 'charger1',
            frames: this.anims.generateFrameNames('ID-spritesheet', {
                start: 0,
                end: 11,
                zeroPad: 2,
                prefix: 'charger1-',
            }),
            frameRate: 9,
            repeat: -1
        });
        this.anims.create({
            key: 'h-charger1',
            frames: this.anims.generateFrameNames('ID-spritesheet', {
                start: 0,
                end: 11,
                zeroPad: 2,
                prefix: 'h-charger1-',
            }),
            frameRate: 9,
            repeat: -1
        });

        this.anims.create({
            key: 'charger2',
            frames: this.anims.generateFrameNames('ID-spritesheet', {
                start: 0,
                end: 11,
                zeroPad: 2,
                prefix: 'charger2-',
            }),
            frameRate: 9,
            repeat: -1
        });
        this.anims.create({
            key: 'h-charger2',
            frames: this.anims.generateFrameNames('ID-spritesheet', {
                start: 0,
                end: 11,
                zeroPad: 2,
                prefix: 'h-charger2-',
            }),
            frameRate: 9,
            repeat: -1
        });

        this.anims.create({
            key: 'charger3',
            frames: this.anims.generateFrameNames('ID-spritesheet', {
                start: 0,
                end: 11,
                zeroPad: 2,
                prefix: 'charger3-',
            }),
            frameRate: 9,
            repeat: -1
        });
        this.anims.create({
            key: 'h-charger3',
            frames: this.anims.generateFrameNames('ID-spritesheet', {
                start: 0,
                end: 11,
                zeroPad: 2,
                prefix: 'h-charger3-',
            }),
            frameRate: 9,
            repeat: -1
        });

        this.anims.create({
            key: 'chaser1',
            frames: this.anims.generateFrameNames('ID-spritesheet', {
                start: 0,
                end: 7,
                zeroPad: 1,
                prefix: 'chaser1-',
            }),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'h-chaser1',
            frames: this.anims.generateFrameNames('ID-spritesheet', {
                start: 0,
                end: 3,
                zeroPad: 1,
                prefix: 'h-chaser1-',
            }),
            frameRate: 4,
            repeat: -1
        });

        this.anims.create({
            key: 'chaser2',
            frames: this.anims.generateFrameNames('ID-spritesheet', {
                start: 0,
                end: 7,
                zeroPad: 1,
                prefix: 'chaser2-',
            }),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'h-chaser2',
            frames: this.anims.generateFrameNames('ID-spritesheet', {
                start: 0,
                end: 3,
                zeroPad: 1,
                prefix: 'h-chaser2-',
            }),
            frameRate: 4,
            repeat: -1
        });

        this.anims.create({
            key: 'chaser3',
            frames: this.anims.generateFrameNames('ID-spritesheet', {
                start: 0,
                end: 7,
                zeroPad: 1,
                prefix: 'chaser3-',
            }),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'h-chaser3',
            frames: this.anims.generateFrameNames('ID-spritesheet', {
                start: 0,
                end: 3,
                zeroPad: 1,
                prefix: 'h-chaser3-',
            }),
            frameRate: 4,
            repeat: -1
        });

        dimensionManager = new Dimension(this, 0, 0, 'bg3').setScale(1, 1).setOrigin(0, 0);

        p1Bullets = this.physics.add.group({ classType: Laser, runChildUpdate: true });

        p1player = new Player(this, gamewidth / 2, gameheight / 2, 'Player').setOrigin(0.5, 0.5);
        r1reticle = new reticle(this, gamewidth / 2, gameheight / 2, 'reticle').setScale(1, 1);

        //healthbar_constructor(scene, x, y, width, height, maxhp, color_healthy, color_hurt, color_bg, color_border)
        health = new HealthBar(this, 50, 20, 50, 16, 100, 0x00ff00, 0xff0000, 0xffffff, 0x000000);
        wallhealth = new HealthBar(this, gamewidth/2 - 150, 450, 300, 16, 300, 0x40a0ff, 0xff0000, 0xffffff, 0x000000);

        key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
        key3 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);

        this.timescores = 0;
        this.clock = this.time.addEvent({
            delay: 1000,                // ms
            callback: this.printTime,
            //args: [],
            callbackScope: this,
            loop: true
        });


        let smallConfig = {
            fontFamily: 'Comic Sans MS',
            fontSize: '20px',
            color: '#808000',
            align: 'left',
            fixedWidth: 0,
        }


        //this.badguy1 = new Chaser(this, 100, 50, 'chaser3', 0, 3).setOrigin(0.5, 0.5); // spawn a chaser in dimension 3 (chase player)
        //this.badguy2 = new Charger(this, gamewidth / 2 + 100, 50, 'charger2', 0, 2).setOrigin(0.5, 0.5); //  spawn a charger in dimension 2 (charge the wall)

        this.badguy1 = this.physics.add.group({ runChildUpdate: true });
        this.badguy2 = this.physics.add.group({ runChildUpdate: true });

        this.levelCount = 0;
        this.spawnInterval = 5000;
        this.roundTime = 120000;
        this.repeatCount = this.roundTime / this.spawnInterval;
        this.levelTimeEvent = this.time.addEvent({ delay: this.roundTime, callback: this.newLevel, callbackScope: this, loop: true, startAt: this.roundTime });
        this.text = this.add.text(400, 100, [], smallConfig);
        this.text.setText('Level: ' + this.levelCount);

        moveKeys = this.input.keyboard.addKeys({
            'up': Phaser.Input.Keyboard.KeyCodes.W,
            'down': Phaser.Input.Keyboard.KeyCodes.S,
            'left': Phaser.Input.Keyboard.KeyCodes.A,
            'right': Phaser.Input.Keyboard.KeyCodes.D
        });

        this.cameras.main.zoom = 1;
        this.cameras.main.startFollow(p1player);

        p1player.movement(this);

        this.input.on('pointerdown', function (pointer, time, lastFired) {
            if (p1player.active === false)
                return;

            this.sound.play('laser_sound', { volume: 0.3 });
            // Get bullet from bullets group
            var bullet = p1Bullets.get().setActive(true).setVisible(true);
            console.log(this);

            if (bullet) {
                bullet.Fire(p1player, r1reticle.x, r1reticle.y);
                this.physics.add.collider(this.badguy1.getChildren(), bullet, this.enemyHitCallback, null, this);
                this.physics.add.collider(this.badguy2.getChildren(), bullet, this.enemyHitCallback, null, this);
            }
        }, this);

        game.canvas.addEventListener('mousedown', function () {
            game.input.mouse.requestPointerLock();
        });

        // Exit pointer lock when Q or escape (by default) is pressed.
        this.input.keyboard.on('keydown_Q', function (event) {
            if (game.input.mouse.locked)
                game.input.mouse.releasePointerLock();
        }, 0, this);

        this.input.on('pointermove', function (pointer) {
            if (this.input.mouse.locked) {
                r1reticle.movement(p1player, pointer.movementX, pointer.movementY);
            }
        }, this);


    }

    update() {
        p1player.rotation = Phaser.Math.Angle.Between(p1player.x, p1player.y, r1reticle.x, r1reticle.y);
        //this.adjustCamera(p1player, r1reticle);

        // Make reticle move with player
        r1reticle.body.velocity.x = p1player.body.velocity.x;
        r1reticle.body.velocity.y = p1player.body.velocity.y;

        health.x = p1player.x - 23;
        health.y = p1player.y + 30;
        health.draw();
        //wallhealth.draw();

        this.constrainVelocity(p1player, maxSpeed);
        this.constrainReticle(r1reticle, 600, p1player);

        // update dimension
        if (dimensionManager.update()) {  //dimension.update returns true when 1, 2, or 3 is pressed
            this.sound.play('dimension_shift', { volume: 0.4 });
            dimensionManager.setTexture(dimensionManager.getfilename()); //updates bg texture to current dimension

            //change the badguy sprites

            let children1 = this.badguy1.getChildren();
            for (var c = 0; c < children1.length; c++) {
                console.log(c);
                children1[c].changeSprite();
            }

            let children2 = this.badguy2.getChildren();
            for (var c = 0; c < children2.length; c++) {
                console.log(c);
                children2[c].changeSprite();
            }

        }

        //this.physics.add.collider(p1player, this.badguy1, this.playerHitCallback);
        //this.physics.add.collider(p1player, this.badguy2, this.playerHitCallback);

        if (p1player.invincibility == false) {
            this.physics.overlap(p1player, this.badguy1.getChildren(), this.playerHitCallback, null, this);
            this.physics.overlap(p1player, this.badguy2.getChildren(), this.playerHitCallback, null, this);
        }

        this.text.setText('Level: ' + this.levelCount + ' is paused' + this.levelTimeEvent.paused);

        //console.log(this.repeatCount);
        //console.log(this.spawnInterval);
        console.log(this.levelTimeEvent.elapsed);

        if (this.levelTimeEvent.elapsed >= 119900) {
            this.levelTimeEvent.paused = true;
            this.Timeevent.destroy();
            console.log('paused');
            setTimeout(() => { this.levelTimeEvent.paused = false; }, 10000);
        }


    }

    enemyHitCallback(enemyHit, bulletHit) {
        // Reduce hp of enemy
        if (enemyHit.dimension == dimensionManager.getdimension() && bulletHit.active === true && enemyHit.active === true) {
            enemyHit.hp = enemyHit.hp - 1;
            
            console.log("Enemy hp: ", enemyHit.hp);
            this.sound.play('BulletHit', { volume: 0.3 });

            // Kill enemy if hp <= 0
            if (enemyHit.hp <= 0) {
                if (enemyHit.dimension == 3) {
                    this.sound.play('ChaserDead', { volume: 0.3 });
                    Chaserparticle.createEmitter({
                        alpha: { start: 1, end: 0 },
                        scale: { start: 0.1, end: 0.1 },
                        //tint: { start: 0xff945e, end: 0xff945e },
                        speed: 10,
                        accelerationY: -30,
                        angle: { min: -85, max: -95 },
                        rotate: { min: -180, max: 180 },
                        lifespan: { min: 500, max: 600 },
                        frequency: 10,
                        maxParticles: 5,
                        x: enemyHit.x,
                        y: enemyHit.y
                    });
                }

                if (enemyHit.dimension == 2) {
                    this.sound.play('ChargerDead', { volume: 0.3 });
                    Chargerparticle.createEmitter({
                        alpha: { start: 1, end: 0 },
                        scale: { start: 0.1, end: 0.1 },
                        //tint: { start: 0xff945e, end: 0xff945e },
                        speed: 10,
                        accelerationY: -30,
                        angle: { min: -85, max: -95 },
                        rotate: { min: -180, max: 180 },
                        lifespan: { min: 500, max: 600 },
                        frequency: 10,
                        maxParticles: 5,
                        x: enemyHit.x,
                        y: enemyHit.y
                    });
                }
                enemyHit.destroy();
            }

            // Destroy bullet
            bulletHit.destroy();

        }
    }

    playerHitCallback(playerHit, enemyHit) {
        // Reduce health of player
        if (enemyHit.active === true && playerHit.active === true) {
            playerHit.Hpchange(-5);
            health.decrease(5);

            playerHit.invincibility = true;
            playerHit.alpha = 0.5;


            setTimeout(() => { p1player.reset(); }, 300);

        }
    }

    constrainVelocity(sprite, maxVelocity) {
        if (!sprite || !sprite.body)
            return;

        var angle, currVelocitySqr, vx, vy;
        vx = sprite.body.velocity.x;
        vy = sprite.body.velocity.y;
        currVelocitySqr = vx * vx + vy * vy;

        if (currVelocitySqr > maxVelocity * maxVelocity) {
            angle = Math.atan2(vy, vx);
            vx = Math.cos(angle) * maxVelocity;
            vy = Math.sin(angle) * maxVelocity;
            sprite.body.velocity.x = vx;
            sprite.body.velocity.y = vy;
        }
    }

    constrainReticle(reticle, radius, player) {

        // Only works when camera follows player
        var distX = reticle.x - player.x;
        var distY = reticle.y - player.y;

        // Ensures reticle cannot be moved offscreen
        if (distX > gamewidth) {
            console.log('fix');
            reticle.x = player.x + gamewidth;
        }
        else if (distX < -gamewidth) {
            console.log('fix');
            reticle.x = player.x - gamewidth;
        }

        if (distY > gameheight)
            reticle.y = player.y + gameheight;
        else if (distY < -gameheight)
            reticle.y = player.y - gameheight;

        // Ensures reticle cannot be moved further than dist(radius) from player
        var distBetween = Phaser.Math.Distance.Between(player.x, player.y, reticle.x, reticle.y);
        if (distBetween > radius) {
            // Place reticle on perimeter of circle on line intersecting player & reticle
            var scale = distBetween / radius;

            console.log('fix')

            reticle.x = player.x + (reticle.x - player.x) / scale;
            reticle.y = player.y + (reticle.y - player.y) / scale;
        }

    }

    adjustCamera(sprite1, sprite2) {
        var avgX = ((sprite1.x + sprite2.x) / 2) - 400;
        var avgY = ((sprite1.y + sprite2.y) / 2) - 300;
        console.log(avgX);
        console.log(avgY);
        this.cameras.main.scrollX = avgX;
        this.cameras.main.scrollY = avgY;
    }

    newLevel() {
        this.Timeevent = this.time.addEvent({ delay: this.spawnInterval, callback: this.spawnEnemy, callbackScope: this, loop: true, repeat: this.repeatCount });
        this.levelCount++;
        this.spawnInterval /= 2;
        this.repeatCount *= 2;
    }

    spawnEnemy() {
        let charger = new Charger(this, this.getRandomArbitrary(0, 800), this.getRandomArbitrary(0, -100), 'charger2', 0, 2).setOrigin(0.5, 0.5);
        let chaser = new Chaser(this, this.getRandomArbitrary(0, 800), this.getRandomArbitrary(0, -100), 'chaser3', 0, 3).setOrigin(0.5, 0.5); // spawn a chaser in dimension 3 (chase player)

        this.badguy1.add(charger);
        this.badguy2.add(chaser);
    }

    getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    printTime() {
        this.timescores += 0.1;
    }

    Paused() {
        this.levelTimeEvent.paused = false;
        this.Timeevent.paused = false;
    }
}
