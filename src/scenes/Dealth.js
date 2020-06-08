class Dealth extends Phaser.Scene {

    constructor() {

        super("DealthScene");

    }

    preload() {

        this.load.image('End', './assets/Backgrounds/EndBackground.png');
        this.load.image('GameOver', './assets/Sprites/GameOver.png');
        this.load.atlas('Restart', './assets/Sprites/Restart.png', './assets/Sprites/Restart.json');
        this.load.atlas('Back', './assets/Sprites/Back.png', './assets/Sprites/Back.json');
        this.load.audio('Selection', './assets/Sprites/Selection.wav');

    }

    create() {
        //menu background
        this.menubg = this.add.tileSprite(0, 0, 1280, 960, 'End').setOrigin(0, 0);

        let titleConfig = {
            fontFamily: 'Courier New',
            fontSize: '30px',
            color: '#000000',
            align: 'left',
            fixedWidth: 0,
        }

        let smallConfig = {
            fontFamily: 'Courier New',
            fontSize: '15px',
            color: '#000000',
            align: 'left',
            fixedWidth: 0,
        }
        let textSpacer = 100;

        game.input.mouse.releasePointerLock();

        this.add.image(centerX ,  centerY - 3 * textSpacer,'GameOver', 10).setScale(1, 1);
        this.Restart = this.add.sprite(centerX ,  centerY - 2 * textSpacer,'Restart', 10).setScale(1, 1);
        this.Back = this.add.sprite(centerX ,  centerY - 1 * textSpacer,'Back', 10).setScale(1, 1);

        this.Back.setInteractive({
            useHandCursor: true
        });
        this.Restart.setInteractive({
            useHandCursor: true
        });


        this.input.on('gameobjectover', (pointer, gameObject, event) => {
            gameObject.setFrame(2);
        });

        this.input.on('gameobjectout', (pointer, gameObject, event) => {
            gameObject.setFrame(1);
        });

        this.input.on('gameobjectdown', (pointer, gameObject, event) => {
            this.sound.play('Selection', {volume:0.25});
            if (gameObject === this.Restart) {
                this.scene.start("playScene");
            }

            if (gameObject === this.Back) {
                this.scene.start("menuScene");
            }
        });

    }

    update() {
        this.menubg.tilePositionX += 4;  // scroll tile sprite
    }
}