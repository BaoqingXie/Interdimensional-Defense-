class Credits extends Phaser.Scene {

    constructor() {

        super("CreditsScene");

    }

    preload() {

        this.load.atlas('Credits', './assets/Sprites/Credit.png', './assets/Sprites/Credit.json');
        this.load.image('menubg', './assets/Backgrounds/MenuBackground.png');
        this.load.audio('Selection', './assets/SoundEffects/Selection.wav');
        this.load.atlas('Back', './assets/Sprites/Back.png', './assets/Sprites/Back.json');
    }

    create() {
        //menu background
        console.log('in the credits');

        this.menubg = this.add.tileSprite(0, 0, 1280, 960, 'menubg').setOrigin(0, 0);

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
        let textSpacer = 60;


        this.add.text(gamewidth/2-200, gameheight/2-5*textSpacer, 'Presented By The Cooler Team', titleConfig).setOrigin(0, 0);
        this.add.text(gamewidth/2-200, gameheight/2-4*textSpacer, 'Alec Zhang', smallConfig).setOrigin(0, 0);
        this.add.text(gamewidth/2-200, gameheight/2-3*textSpacer, 'Brad Kim', smallConfig).setOrigin(0, 0);
        this.add.text(gamewidth/2-200, gameheight/2-2*textSpacer, 'Baoqing Xie', smallConfig).setOrigin(0, 0);
        this.add.text(gamewidth/2-200, gameheight/2-1*textSpacer, 'Junyao Li', smallConfig).setOrigin(0, 0);
        this.add.text(gamewidth/2-200, gameheight/2, 'Outside Resource:', titleConfig).setOrigin(0, 0);
        this.add.text(gamewidth/2-200, gameheight/2+1*textSpacer, 'logo: Textcraft.com', smallConfig).setOrigin(0, 0);
        this.add.text(gamewidth/2-200, gameheight/2+2*textSpacer, 'healthbar.js: https://phaser.io/examples', smallConfig).setOrigin(0, 0);
        this.add.text(gamewidth/2-200, gameheight/2+3*textSpacer, 'SoundEffects: https://freesound.org', smallConfig).setOrigin(0, 0);
        this.add.text(gamewidth/2-200, gameheight/2+4*textSpacer, 'IdeasaboutItemsAssets: https://opengameart.org/', smallConfig).setOrigin(0, 0);

        this.Back = this.add.sprite(200, 50, 'Back', 1).setScale(0.5, 0.5);
        this.Back.setInteractive({
            useHandCursor: true
        });

        this.input.on('gameobjectover', (pointer, gameObject, event) => {
            gameObject.setFrame(2);
        });

        this.input.on('gameobjectout', (pointer, gameObject, event) => {
            gameObject.setFrame(1);
        });

        this.input.on('gameobjectdown', (pointer, gameObject, event) => {
            this.sound.play('Selection', { volume: 0.25 });
            this.scene.start("menuScene");
        });


    }

    update() {
        this.menubg.tilePositionX += 4;  // scroll tile sprite
    }
}