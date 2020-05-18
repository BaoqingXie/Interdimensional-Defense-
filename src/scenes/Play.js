class Play extends Phaser.Scene {
    constructor() {
        super("playScene");//scene name
    }

    preload() {
        this.load.image('Player', './assets/tempAssets/PNG/Man Blue/manBlue_gun.png');
        this.load.image('Enemy1', './assets/tempAssets/PNG/Man Brown/manBrown_stand.png');
        this.load.image('bullet', './assets/tempAssets/PNG/weapon_silencer.png');
        this.load.image('reticle', './assets/reticle.jpg');
        this.load.image('bg1', './assets/Backgrounds/tempbg1.png');
        this.load.image('bg2', './assets/Backgrounds/tempbg2.png');
        //this.load.image('bg3', './assets/Backgrounds/tempbg3.png');
        this.load.image('bg3', './assets/Backgrounds/DimensionEarth.png');
        this.load.audio('Pistol_shooting', './assets/SoundEffects/Pistol_shooting.mp3');
        this.load.audio('dimension_shift', './assets/SoundEffects/DimensionShift.mp3');
    }

    create() {
        this.dimension = new Dimension(this,0,0,'bg3').setScale(1,1).setOrigin(0,0);

        p1Bullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });

        p1player = new Player(this, gamewidth / 2, gameheight / 2, 'Player').setOrigin(0.5, 0.5);
        r1reticle = new reticle(this, gamewidth / 2, gameheight / 2, 'reticle').setScale(0.01, 0.01);


        key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
        key3 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);


        this.badguy = new Enemy(this, gamewidth / 2 + 100, gameheight / 2 + 100, 'Enemy1').setOrigin(0.5, 0.5);

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

            this.sound.play('Pistol_shooting', { volume: 0.25 });
            // Get bullet from bullets group
            var bullet = p1Bullets.get().setActive(true).setVisible(true);

            if (bullet) {
                bullet.Fire(p1player, r1reticle);
                this.physics.add.collider(this.badguy, bullet, this.enemyHitCallback);
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
        this.badguy.rotation = Phaser.Math.Angle.Between(this.badguy.x, this.badguy.y, p1player.x, p1player.y);

        // Make reticle move with player
        r1reticle.body.velocity.x = p1player.body.velocity.x;
        r1reticle.body.velocity.y = p1player.body.velocity.y;

        var distx = Math.abs(this.badguy.x - p1player.x);
        var disty = Math.abs(this.badguy.y - p1player.y);

        if (this.badguy.x > p1player.x)
            this.badguy.x -= 1 + distx / 1000;
        else if (this.badguy.x < p1player.x)
            this.badguy.x += 1 + distx / 1000;

        if (this.badguy.y > p1player.y)
            this.badguy.y -= 1 + disty / 1000;
        else if (this.badguy.y < p1player.y)
            this.badguy.y += 1 + disty / 1000;

        //if(this.badguy.x)
        this.constrainVelocity(p1player, maxSpeed);
        this.constrainReticle(r1reticle, 600, p1player);

        
        if(this.dimension.update()){  //dimension.update returns true when 1, 2, or 3 is pressed
            this.sound.play('dimension_shift', { volume: 0.45 });
            this.dimension.setTexture(this.dimension.getfilename()); //updates bg texture to current dimension
        }
    }

    enemyHitCallback(enemyHit, bulletHit) {
        // Reduce hp of enemy
        if (bulletHit.active === true && enemyHit.active === true) {
            enemyHit.hp = enemyHit.hp - 1;
            console.log("Enemy hp: ", enemyHit.hp);

            // Kill enemy if hp <= 0
            if (enemyHit.hp <= 0) {
                enemyHit.setActive(false).setVisible(false);
            }

            // Destroy bullet
            bulletHit.setActive(false).setVisible(false);
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
}