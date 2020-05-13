class Play extends Phaser.Scene {
    constructor() {
        super("playScene");//scene name
    }

    preload() {
        this.load.image('Player', './assets/tempAssets/PNG/Man Blue/manBlue_gun.png');
        this.load.image('bullet', './assets/tempAssets/PNG/weapon_silencer.png');
    }

    create() {
        this.p1player = this.physics.add.sprite(400, 300, 'Player');;

        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.p1player.setVelocity(10, 0);


    }

    update() {
        this.p1player.update();

    }

}