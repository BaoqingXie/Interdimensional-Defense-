
class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.audio('menubgm', './assets/SoundEffects/pulsating sound.mp3');
        this.load.audio('Selection', './assets/SoundEffects/Selection.wav');
        this.load.image('menubg', './assets/Backgrounds/MenuBackground.png');
        this.load.image('InterdimensionalDefense', './assets/Sprites/InterdimensionalDefense.png');
        this.load.atlas('Start', './assets/Sprites/Start.png', './assets/Sprites/Start.json');
        this.load.atlas('Instruction', './assets/Sprites/Instruction.png', './assets/Sprites/Instruction.json');
        this.load.atlas('Credits', './assets/Sprites/Credit.png', './assets/Sprites/Credit.json');
        this.load.image('Player', './assets/Sprites/player1-0.png');
    }

    create() {

        game.input.mouse.releasePointerLock();

        //play and loop BGM
        this.menubgm = this.sound.add('menubgm', { volume: 0.3, loop: true });
        this.menubgm.play();

        let menuconfig = {
            fontFamily: 'Courier New',
            fontSize: '50px',
            color: '#000000',
            align: 'left',
            fixedWidth: 0,
        }


        this.Gamelogo = this.add.sprite(gamewidth / 2, gameheight / 2 - 200, 'InterdimensionalDefense').setScale(0.75, 0.75);
        this.Gamelogo.setDepth(2);

        this.Start = this.add.sprite(gamewidth / 2, gameheight / 2 - 100, 'Start').setScale(0.5, 0.5);
        this.Start.setDepth(2);
        this.Instruction = this.add.sprite(gamewidth / 2, gameheight / 2, 'Instruction').setScale(0.5, 0.5);
        this.Instruction.setDepth(2);
        this.Credits = this.add.sprite(gamewidth / 2, gameheight / 2 + 100, 'Credits').setScale(0.5, 0.5);
        this.Credits.setDepth(2);

        this.Start.setInteractive({
            useHandCursor: true
        });

        this.Instruction.setInteractive({
            useHandCursor: true
        });

        this.Credits.setInteractive({
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
            if (gameObject === this.Start) {
                this.menubgm.stop();
                this.BGMisPlaying = false;
                this.scene.start("playScene");
            } else if (gameObject === this.Instruction) {
                this.scene.switch("InstructionScene");
            } else {
                this.scene.switch("CreditsScene");
            }
        });

        this.menubg = this.add.tileSprite(0, 0, 1280, 960, 'menubg').setOrigin(0, 0);
        // bgm
        // if (!this.BGMisPlaying) {
        //     this.menubgm = this.sound.add('menubgm');
        //     this.menubgm.loop = true;
        //     this.menubgm.volume = 0.7;
        //     this.menubgm.play();
        //     this.BGMisPlaying = true;
        // }


    }

    update() {
        this.menubg.tilePositionX -= 4
    }

}
