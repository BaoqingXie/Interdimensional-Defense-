
class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.audio('menubgm', './assets/SoundEffects/pulsating sound.mp3');
        this.load.image('menubg', './assets/Backgrounds/MenuBackground.png');
    }

    create() {

        //play and loop BGM
        let menubgm = this.sound.add('menubgm', { volume: 0.1, loop : true});
        menubgm.play();

        let menuconfig = {
            fontFamily: 'Courier New',
            fontSize: '30px',
            color: '#000000',
            align: 'left',
            fixedWidth: 0,
        }

        this.menubg = this.add.tileSprite(0, 0, 1280, 960, 'menubg').setOrigin(0, 0);
        
        this.add.text(gamewidth/2, gameheight/2 - 30,'press S to enter Demo', menuconfig).setOrigin(0.5, 0.5);
        this.add.text(gamewidth/2, gameheight/2 + 30,'wasd to move, mouse to aim and shoot', menuconfig).setOrigin(0.5, 0.5);
        this.add.text(gamewidth/2, gameheight/2 + 60,'space to shift dimensions', menuconfig).setOrigin(0.5, 0.5);

        

      
        this.input.keyboard.on('keydown_S', ()=> {
            menubgm.stop();
            this.scene.start("playScene"); 
        });

    }

    update() {
        this.menubg.tilePositionX -= 4
    }

}
