class Instruction extends Phaser.Scene {

    constructor() {

        super("InstructionScene");

    }

    preload() {

        this.load.image('Chaser', './assets/Sprites/chaser1-0.png');
        this.load.image('Charger', './assets/Sprites/charger1-0.png');
        this.load.image('Player', './assets/Sprites/player1-0.png');
        this.load.audio('Selection', './assets/Sprites/Selection.wav');
        this.load.atlas('Wall', './assets/Sprites/wall.png', './assets/Sprites/wall.json');
        this.load.atlas('Back', './assets/Sprites/Back.png', './assets/Sprites/Back.json');
        this.load.image('menubg', './assets/Backgrounds/MenuBackground.png');
    }

    create() {
        //menu background
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

        this.add.text(centerX - 6 * textSpacer, centerY - 5 * textSpacer, 'Control:', titleConfig).setOrigin(0, 0);
        this.add.text(centerX - 6 * textSpacer, centerY - 4 * textSpacer, 'Use Wasd to move', smallConfig).setOrigin(0, 0);
        this.add.text(centerX - 6 * textSpacer, centerY - 3.5 * textSpacer, 'mouse click to shoot', smallConfig).setOrigin(0, 0);
        this.add.text(centerX - 6 * textSpacer, centerY - 3 * textSpacer, 'Press B to open the shop', smallConfig).setOrigin(0, 0);
        this.add.text(centerX - 6 * textSpacer, centerY - 2.5 * textSpacer, 'In the shop, press down arrow to select', smallConfig).setOrigin(0, 0);
        this.add.text(centerX - 6 * textSpacer, centerY - 2 * textSpacer, 'In the shop, press enter to buy', smallConfig).setOrigin(0, 0);
        this.add.text(centerX - 6 * textSpacer, centerY - 1.5 * textSpacer, 'Press spaceBar to change dimension', smallConfig).setOrigin(0, 0);

        this.add.image(centerX - 6.5 * textSpacer,  centerY - 3 * textSpacer,'Player', 10).setScale(1, 1);

        this.add.text(centerX + textSpacer, centerY - 5 * textSpacer, 'Monsters:', titleConfig).setOrigin(0, 0);
        this.add.text(centerX + textSpacer, centerY - 4 * textSpacer, 'Charger will directly go to attack wall', smallConfig).setOrigin(0, 0);
        this.add.text(centerX + textSpacer, centerY - 2 * textSpacer, 'Chaser will attack the player', smallConfig).setOrigin(0, 0);
        this.add.image(centerX + 0.4*textSpacer, centerY - 4 * textSpacer,'Charger').setOrigin(0, 0);
        this.add.image(centerX + 0.4*textSpacer, centerY - 2 * textSpacer,'Chaser').setOrigin(0, 0);

        this.add.text(centerX - textSpacer, centerY + 0.5 * textSpacer, 'How to play:', titleConfig).setOrigin(0, 0);
        this.add.text(centerX - 4 * textSpacer, centerY + 1.5 * textSpacer, '1. Use your player to doge enmemy and shoot the monster', smallConfig).setOrigin(0, 0);
        this.add.text(centerX - 4 * textSpacer, centerY + 2.5 * textSpacer, '2. Avoid your player death and the wall health equal to zero,', smallConfig).setOrigin(0, 0);
        this.add.text(centerX - 4 * textSpacer, centerY + 3.5 * textSpacer, '3. Use the money you get from killing monster to upgrade your weapon.', smallConfig).setOrigin(0, 0);
        this.add.text(centerX - 4 * textSpacer, centerY + 4.5 * textSpacer, '4. Keep Alive!.', smallConfig).setOrigin(0, 0);

        //this.add.image(centerX - 5*textSpacer, centerY + 2.2 * textSpacer,'fart');

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
            this.sound.play('Selection', {volume:0.25});
            this.scene.start("menuScene");
        });


    }

    update() {
        this.menubg.tilePositionX += 4;  // scroll tile sprite
    }
}