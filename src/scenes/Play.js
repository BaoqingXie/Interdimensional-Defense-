class Play extends Phaser.Scene {
    constructor() {
        super("playScene");//scene name
    }

    preload() {
        this.load.atlas('ID-spritesheet', './assets/InterdimensionalDefense.png', './assets/InterdimensionalDefense.json');
        this.load.atlas('wall-atlas', './assets/Sprites/wall.png', './assets/Sprites/wall.json');

        this.load.image('laser', './assets/Sprites/laser.png');
        this.load.image('reticle', './assets/Sprites/reticle.png');

        this.load.image('explode1', './assets/Particle/16_sunburn_spritesheet.png');
        this.load.image('explode2', './assets/Particle/12_nebula_spritesheet.png');


        this.load.image('ShopInterface', './assets/Sprites/ShopInterface.png');

        this.load.image('FireRate', './assets/Sprites/FireRate.png');
        this.load.image('LaserDamage', './assets/Sprites/Laser-Damage.png');
        this.load.image('Speed', './assets/Sprites/Speed.png');

        this.load.image('FireRate_disabled', './assets/Sprites/FireRate_disabled.png');
        this.load.image('LaserDamage_disabled', './assets/Sprites/Damage_disabled.png');
        this.load.image('Speed_disabled', './assets/Sprites/Speed_disabled.png');

        this.load.image('FireRate_price', './assets/Sprites/firerate_price.png');
        this.load.image('LaserDamage_price', './assets/Sprites/damage_price.png');
        this.load.image('Speed_price', './assets/Sprites/speed_price.png');


        this.load.image('bg1', './assets/Backgrounds/DimensionRed.png');
        this.load.image('bg2', './assets/Backgrounds/DimensionGreen.png');


        this.load.audio('laser_fire', './assets/SoundEffects/Laser.mp3');
        this.load.audio('dimension_shift', './assets/SoundEffects/DimensionShift.mp3');

        this.load.audio('laser_hit', './assets/SoundEffects/laser_hit.mp3');
        this.load.audio('ChargerDead', './assets/SoundEffects/ChargerDead.mp3');
        this.load.audio('ChaserDead', './assets/SoundEffects/ChaserDead.wav');
        this.load.audio('BGM', './assets/SoundEffects/bgm.ogg');

        // load animation/sprite atlas
        this.load.atlas('Add', './assets/Sprites/AddCombine.png', './assets/Sprites/AddCombine.json')
        this.load.atlas('Cancel', './assets/Sprites/CancelCombine.png', './assets/Sprites/CancelCombine.json')
        this.load.atlas('Shop', './assets/Sprites/ShopCombine.png', './assets/Sprites/ShopCombine.json')


    }

    create() {

        //UI
        this.isShopOpen = 0;
        this.shopSelection = 0;

        let textSpacer = 35;
        let yoffset = 30;

        this.ShopInterface = this.add.image(gamewidth/2, gameheight/2, 'ShopInterface').setScale(1.2, 1.2).setAlpha(this.isShopOpen).setOrigin(0.5,0.5);
        this.ShopInterface.setDepth(2);

        this.LaserDamage = this.add.image(gamewidth/2 - 90, gameheight/2 - textSpacer - yoffset, 'LaserDamage').setScale(0.4, 0.4).setAlpha(this.isShopOpen);
        this.FireRate = this.add.image(gamewidth/2 - 105, gameheight/2 + textSpacer - yoffset, 'FireRate').setScale(0.4, 0.4).setAlpha(this.isShopOpen);
        this.Speed = this.add.image(gamewidth/2 - 82, gameheight/2 - yoffset, 'Speed').setScale(0.4, 0.4).setAlpha(this.isShopOpen);
        this.LaserDamage.setDepth(3);
        this.Speed.setDepth(3);
        this.FireRate.setDepth(3);

        this.LaserDamage_disabled = this.add.image(gamewidth/2 - 90, gameheight/2 - textSpacer - yoffset, 'LaserDamage_disabled').setScale(0.4, 0.4).setAlpha(this.isShopOpen);
        this.FireRate_disabled = this.add.image(gamewidth/2 - 105, gameheight/2 + textSpacer - yoffset, 'FireRate_disabled').setScale(0.4, 0.4).setAlpha(this.isShopOpen);
        this.Speed_disabled = this.add.image(gamewidth/2 - 82, gameheight/2 - yoffset, 'Speed_disabled').setScale(0.4, 0.4).setAlpha(this.isShopOpen);
        this.LaserDamage_disabled.setDepth(3);
        this.Speed_disabled.setDepth(3);
        this.FireRate_disabled.setDepth(3);
        this.LaserDamage_ismaxed = false;
        this.Speed_ismaxed = false;
        this.FireRate_ismaxed = false;

        this.LaserDamagePrice = this.add.sprite(gamewidth/2 + 20, gameheight/2 - textSpacer - yoffset, 'LaserDamage_price').setScale(0.4, 0.4).setAlpha(this.isShopOpen);
        this.SpeedPrice = this.add.sprite(gamewidth/2 + 9, gameheight/2 - yoffset, 'Speed_price').setScale(0.4, 0.4).setAlpha(this.isShopOpen);
        this.FireRatePrice = this.add.sprite(gamewidth/2 + 20, gameheight/2 + textSpacer - yoffset, 'FireRate_price').setScale(0.4, 0.4).setAlpha(this.isShopOpen);
        this.LaserDamagePrice.setDepth(3);
        this.SpeedPrice.setDepth(3);
        this.FireRatePrice.setDepth(3);

        this.Add = this.add.sprite(gamewidth/2 + 90, gameheight/2 - textSpacer - yoffset, 'Add', 1).setScale(0.5, 0.5).setAlpha(this.isShopOpen).setActive(this.isShopOpen);
        this.Add2 = this.add.sprite(gamewidth/2 + 90, gameheight/2 - yoffset, 'Add', 1).setScale(0.5, 0.5).setAlpha(this.isShopOpen).setActive(this.isShopOpen);
        this.Add3 = this.add.sprite(gamewidth/2 + 90, gameheight/2 + textSpacer - yoffset, 'Add', 1).setScale(0.5, 0.5).setAlpha(this.isShopOpen).setActive(this.isShopOpen);
        this.Add.setDepth(3);
        this.Add2.setDepth(3);
        this.Add3.setDepth(3);
        
        

        this.input.keyboard.on('keydown_B', () => {
            if (this.isShopOpen == 0) {
                this.isShopOpen = 0.8;
            } else {
                this.isShopOpen = 0;
            }

            
            this.Add.setFrame(1);
            this.Add2.setFrame(1);
            this.Add3.setFrame(1);
            this.shopSelection = 0;

            if (this.LaserDamage_ismaxed){
                this.LaserDamage_disabled.setAlpha(this.isShopOpen);
            }
            else {
                this.LaserDamage.setAlpha(this.isShopOpen);
            }
            if (this.Speed_ismaxed){
                this.Speed_disabled.setAlpha(this.isShopOpen);
            }
            else {
                this.Speed.setAlpha(this.isShopOpen);
            }
            if (this.FireRate_ismaxed){
                this.FireRate_disabled.setAlpha(this.isShopOpen);
            }
            else {
                this.FireRate.setAlpha(this.isShopOpen);
            }
            this.ShopInterface.setAlpha(this.isShopOpen);
            this.LaserDamagePrice.setAlpha(this.isShopOpen);
            this.SpeedPrice.setAlpha(this.isShopOpen);
            this.FireRatePrice.setAlpha(this.isShopOpen);
            this.Add.setAlpha(this.isShopOpen).setActive(this.isShopOpen).setFrame(2);
            this.Add2.setAlpha(this.isShopOpen).setActive(this.isShopOpen);
            this.Add3.setAlpha(this.isShopOpen).setActive(this.isShopOpen);
        });

        this.input.keyboard.on('keydown_DOWN', () => {
            if (this.isShopOpen > 0) {
                this.Add.setFrame(1);
                this.Add2.setFrame(1);
                this.Add3.setFrame(1);

                if (this.shopSelection == 0) {
                    this.Add2.setFrame(2);
                } else if (this.shopSelection == 1) {
                    this.Add3.setFrame(2);
                }
                else if (this.shopSelection == 2) {
                    this.Add.setFrame(2);
                }

                this.shopSelection += 1;
                if (this.shopSelection == 3) {
                    this.shopSelection = 0;
                }
            }
        });

        this.input.keyboard.on('keydown_UP', () => {
            if (this.isShopOpen > 0) {
                this.Add.setFrame(1);
                this.Add2.setFrame(1);
                this.Add3.setFrame(1);


                if (this.shopSelection == 0) {
                    this.Add3.setFrame(2);
                } else if (this.shopSelection == 1) {
                    this.Add.setFrame(2);
                }
                else if (this.shopSelection == 2) {
                    this.Add2.setFrame(2);
                }

                this.shopSelection -= 1;
                if (this.shopSelection == -1) {
                    this.shopSelection = 2;
                }
            }
        });

        this.input.keyboard.on('keydown_ENTER', () => {

            var damage_price = 30;
            var firerate_price = 10;
            var speed_price = 5;


            if (this.shopSelection == 0){
                if (LaserDamage < 3 && p1player.money >= damage_price) {
                    LaserDamage += 1;
                    p1player.money -= damage_price;
                    if (LaserDamage >= 3){
                        this.LaserDamage_ismaxed = true;
                        this.LaserDamage.setAlpha(0);
                        this.LaserDamage_disabled.setAlpha(this.isShopOpen);
                    }
                }
            }
            if (this.shopSelection == 2 && p1player.money >= firerate_price) {
                if (FireRate > 200) {
                    FireRate -= 200;
                    p1player.money -= firerate_price;
                    if (FireRate <= 200){
                        this.FireRate_ismaxed = true;
                        this.FireRate.setAlpha(0);
                        this.FireRate_disabled.setAlpha(this.isShopOpen);
                    }
                }
            }
            if (this.shopSelection == 1 && p1player.money >= speed_price) {
                if (acceleration < 2600) {
                    acceleration += 200;
                    maxSpeed += 15;
                    drag += 100;
                    p1player.money -= speed_price;
                    if (acceleration >= 2600){
                        this.Speed_ismaxed = true;
                        this.Speed.setAlpha(0);
                        this.Speed_disabled.setAlpha(this.isShopOpen);
                    }
                }
            }
        });





        //particle effects when explode
        Chaserparticle = this.add.particles('explode1');
        Chaserparticle.setDepth(2);
        Chargerparticle = this.add.particles('explode2');
        Chargerparticle.setDepth(2);



        //play and loop BGM
        this.bgm = this.sound.add('BGM', { volume: 0.35, loop: true });
        this.bgm.play();


        this.anims.create({
            key: 'wall-anim',
            frames: this.anims.generateFrameNames('wall-atlas', {
                start: 1,
                end: 5,
                zeroPad: 1,
                prefix: 'wall-',
            }),
            frameRate: 20,
            repeat: 0
        });

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



        dimensionManager = new Dimension(this,0,0,'bg1').setScale(1,1).setOrigin(0,0);
      
        this.wall = new Wall(this, 0, 870, 'wall-atlas', 'wall-1').setOrigin(0,0).setScale(1.145, 1.06);
        wallhealth = new HealthBar(this, gamewidth/2 +500, 10, 300, 16, 300, 0x40a0ff, 0xff0000, 0xffffff, 0x000000);

        
        p1Bullets = this.physics.add.group({ classType: Laser, runChildUpdate: true });

        p1player = new Player(this, gamewidth / 2, gameheight / 2, 'Player').setOrigin(0.5, 0.5);
        r1reticle = new reticle(this, gamewidth / 2, gameheight / 2, 'reticle').setScale(1, 1);


        //healthbar_constructor(scene, x, y, width, height, maxhp, color_healthy, color_hurt, color_bg, color_border)
        health = new HealthBar(this, 50, 20, 50, 16, 100, 0x00ff00, 0xff0000, 0xffffff, 0x000000);

        lastFired = 0;
      

        keyspace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


        this.timescores = 0;

        this.badguy1 = this.physics.add.group({ runChildUpdate: true });
        this.badguy2 = this.physics.add.group({ runChildUpdate: true });

        this.levelCount = 0;
        this.spawnInterval = 5000;
        this.roundTime = 120000;
        this.repeatCount = this.roundTime / this.spawnInterval;
        this.levelTimeEvent = this.time.addEvent({ delay: this.roundTime, callback: this.newLevel, callbackScope: this, loop: true, startAt: this.roundTime });



        let smallConfig = {
            fontFamily: 'Courier New',
            fontSize: '35px',
            color: '#FFFFFF',
            align: 'left',
            fixedWidth: 0,
        }

        this.wave_ui = this.add.text(50, 20, [], smallConfig);
        this.credits_ui = this.add.text(50, 60, [], smallConfig);
        this.wall_ui = this.add.text(400, 20,[], smallConfig)
        this.wall_ui.setText('Wall ');
        this.wave_ui.setDepth(3);
        this.credits_ui.setDepth(3);
        this.wall_ui.setDepth(3);




        moveKeys = this.input.keyboard.addKeys({
            'up': Phaser.Input.Keyboard.KeyCodes.W,
            'down': Phaser.Input.Keyboard.KeyCodes.S,
            'left': Phaser.Input.Keyboard.KeyCodes.A,
            'right': Phaser.Input.Keyboard.KeyCodes.D
        });

        this.cameras.main.zoom = 1;
        //this.cameras.main.startFollow(p1player);
        //this.cameras.main.setBounds(0, 0, 1280, 960);
        //this.cameras.main.setDeadzone(1280, 960);

        p1player.movement(this);

        this.input.on('pointerdown', function (pointer) {
            if ((gametime - lastFired) > FireRate) {
                lastFired = gametime;
                if (p1player.active === false)
                    return;


                this.sound.play('laser_fire', { volume: 0.25 });
                // Get bullet from bullets group
                var bullet = p1Bullets.get().setActive(true).setVisible(true);

                if (bullet) {
                    bullet.Fire(p1player, r1reticle.x, r1reticle.y);
                    this.physics.add.collider(this.badguy1.getChildren(), bullet, this.enemyHitCallback, null, this);
                    this.physics.add.collider(this.badguy2.getChildren(), bullet, this.enemyHitCallback, null, this);
                }
            }
        }, this);

        game.canvas.addEventListener('mousedown', function () {
            game.input.mouse.requestPointerLock();
        });
        1
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

    update(time) {
        p1player.rotation = Phaser.Math.Angle.Between(p1player.x, p1player.y, r1reticle.x, r1reticle.y);
        //this.adjustCamera(p1player, r1reticle);

        // Make reticle move with player
        //r1reticle.body.velocity.x = p1player.body.velocity.x;
        //r1reticle.body.velocity.y = p1player.body.velocity.y;

        health.x = p1player.x - 23;
        health.y = p1player.y + 30;
        health.draw();
        
        wallhealth.x = 500;
        wallhealth.y = 26;
        wallhealth.draw();
    

        this.constrainVelocity(p1player, maxSpeed);
        this.constrainReticle(r1reticle, 600, p1player);

        // update dimension
        if (dimensionManager.update()) {  //dimension.update returns true when 1, 2, or 3 is pressed
            this.sound.play('dimension_shift', { volume: 0.4 });
            this.cameras.main.shake(100,0.002);
            dimensionManager.setTexture(dimensionManager.getfilename()); //updates bg texture to current dimension

            //change the badguy sprites

            let children1 = this.badguy1.getChildren();

            for (var c = 0; c < children1.length; c++) {

                children1[c].changeSprite();
            }

            let children2 = this.badguy2.getChildren();

            for (var c = 0; c < children2.length; c++) {

                children2[c].changeSprite();
            }

        }

        if (p1player.invincibility == false) {
            this.physics.overlap(p1player, this.badguy1.getChildren(), this.playerHitCallback, null, this);
            this.physics.overlap(p1player, this.badguy2.getChildren(), this.playerHitCallback, null, this);
        }

        this.wave_ui.setText('   Wave ' + this.levelCount);
        this.credits_ui.setText('Credits ' + p1player.money)
        


        gametime = time;

        if (this.levelTimeEvent.elapsed >= 119900) {
            this.bgm.pause();
            this.levelTimeEvent.paused = true;
            this.Timeevent.destroy();
            setTimeout(() => { this.levelTimeEvent.paused = false;this.bgm.resume(); }, 30000);
        }

          if(p1player.hp <= 0 || wallhealth.value <=0){
            this.badguy1.clear();
            this.badguy2.clear();
            this.bgm.stop();
            this.scene.start("DealthScene");
        }
    }

    enemyHitCallback(enemyHit, bulletHit) {
        // Reduce hp of enemy
        if (enemyHit.dimension == dimensionManager.getdimension() && bulletHit.active === true && enemyHit.active === true) {

            enemyHit.hp = enemyHit.hp - LaserDamage;

            this.sound.play('laser_hit', { volume: 0.4 });


            // Kill enemy if hp <= 0
            if (enemyHit.hp <= 0) {
                if (enemyHit.dimension == 1) {
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

                p1player.money += 1;
                p1player.hp += 10;
                health.increase(10);
            }

            // Destroy bullet
            bulletHit.destroy();

        }
    }

    playerHitCallback(playerHit, enemyHit) {
        // Reduce health of player
        if (enemyHit.active === true && playerHit.active === true && enemyHit.dimension === dimensionManager.getdimension()) {
            playerHit.Hpchange(-10);
            health.decrease(10);

            playerHit.invincibility = true;
            playerHit.alpha = 0.5;
           
            this.cameras.main.shake(250,0.0025);

            setTimeout(() => { p1player.reset(); }, 650);

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
            reticle.x = player.x + gamewidth;
        }
        else if (distX < -gamewidth) {
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

            reticle.x = player.x + (reticle.x - player.x) / scale;
            reticle.y = player.y + (reticle.y - player.y) / scale;
        }

    }

    adjustCamera(sprite1, sprite2) {
        var avgX = ((sprite1.x + sprite2.x) / 2) - 400;
        var avgY = ((sprite1.y + sprite2.y) / 2) - 300;
        this.cameras.main.scrollX = avgX;
        this.cameras.main.scrollY = avgY;
    }

    newLevel() {
        this.Timeevent = this.time.addEvent({ delay: this.spawnInterval, callback: this.spawnEnemy, callbackScope: this, loop: true, repeat: this.repeatCount });
        this.levelCount++;
        this.spawnInterval /= 2;
        this.repeatCount *= 2;
    }


    spawnEnemy(){
        let charger = new Charger(this, this.getRandomArbitrary(0, 800), this.getRandomArbitrary(-100, 0), 'charger2', 0, Math.ceil(Math.random() * 2)).setOrigin(0.5, 1); 
        let chaser = new Chaser(this, this.getRandomArbitrary(0, 800), this.getRandomArbitrary(-100, 0), 'chaser3', 0, Math.ceil(Math.random() * 2)).setOrigin(0.5, 0.5); // spawn a chaser in dimension 3 (chase player)


        this.badguy1.add(charger);
        this.badguy2.add(chaser);
    }

    getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    Paused() {
        this.levelTimeEvent.paused = false;
        this.Timeevent.paused = false;
    }
}

