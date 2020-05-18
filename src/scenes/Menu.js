
class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
    }

    create() {
        this.add.text(gamewitdh/2, gameheight/2,'press S to enter Demo').setOrigin(0.5, 0.5);
        this.add.text(gamewitdh/2, gameheight/2+30,'wasd to move, mouse to aim and shoot').setOrigin(0.5, 0.5);
        this.add.text(gamewitdh/2, gameheight/2+60,'game is still in progress').setOrigin(0.5, 0.5);


        this.input.keyboard.on('keydown_S', ()=> {
            this.scene.start("playScene"); 
        });
    }

    update() {
    }

}