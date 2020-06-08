
class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.audio('menubgm', './assets/SoundEffects/menu.mp3');
        this.load.image('menubg', './assets/Backgrounds/MenuBackground.png');
    }

    create() {

        //play and loop BGM
        //this.sound.play('menubgm', { volume: 0.4, loop : true});

        this.add.text(gamewidth/2, gameheight/2,'press S to enter Demo').setOrigin(0.5, 0.5);
        this.add.text(gamewidth/2, gameheight/2+30,'wasd to move, mouse to aim and shoot').setOrigin(0.5, 0.5);
        this.add.text(gamewidth/2, gameheight/2+60,'space to shift dimensions').setOrigin(0.5, 0.5);
        this.add.text(gamewidth/2, gameheight/2+90,'game is still in progress').setOrigin(0.5, 0.5);
        this.menubg = this.add.tileSprite(0, 0, 1280, 960, 'menubg').setOrigin(0, 0);
      
        this.input.keyboard.on('keydown_S', ()=> {
            this.scene.start("playScene"); 
        });
    }

    update() {
        this.menubg.tilePositionX -= 4
    }

}