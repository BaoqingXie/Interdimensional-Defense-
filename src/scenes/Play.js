class Play extends Phaser.Scene {
    constructor() {
        super("playScene");//scene name
    }

    preload() {
        this.load.image('Player', './assets/tempAssets/PNG/Man Blue/manBlue_gun.png');
        this.load.image('bullet', './assets/tempAssets/PNG/weapon_silencer.png');
        this.load.image('background', './assets/DimensionEarth.png');
    }

    create() {
        this.background = this.add.tileSprite(0, 0, 640, 480, 'background').setScale(1.25, 1.25).setOrigin(0, 0);

        this.p1player = new Player(this, 400, 300, 'Player');

        //keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        //keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        //keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        //keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        moveKeys = this.input.keyboard.addKeys({
            'up': Phaser.Input.Keyboard.KeyCodes.W,
            'down': Phaser.Input.Keyboard.KeyCodes.S,
            'left': Phaser.Input.Keyboard.KeyCodes.A,
            'right': Phaser.Input.Keyboard.KeyCodes.D
        });

        this.cameras.main.zoom = 0.8;
        this.cameras.main.startFollow(this.p1player);

        //this.p1player.setVelocityX(-10);
        this.input.keyboard.on('keydown', ()=> {
            console.log('G');
        });


    }

    update() {
        this.p1player.update(this);
        this.constrainVelocity(this.p1player, 500);

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

}