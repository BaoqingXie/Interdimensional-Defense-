
class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
    }

    create() {
        this.add.text(gamewitdh/2, gameheight/2,'press S to enter Demo').setOrigin(0, 0);

        this.input.keyboard.on('keydown_S', ()=> {
            this.scene.start("playScene"); 
        });
    }

    update() {
    }

}