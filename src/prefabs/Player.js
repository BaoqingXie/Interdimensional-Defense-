//Player prefab
class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.physics.world.enable(this);
        this.body.setDrag(500,500);
        this.body.setCollideWorldBounds(true);
        scene.add.existing(this); //add to existing, diplaylist updatelist
    }

    movement(scene) {

        scene.input.keyboard.on('keydown_W', ()=> {
            this.body.setAccelerationY(-400);
            console.log('1');
        });
        scene.input.keyboard.on('keydown_S', ()=> {
            this.body.setAccelerationY(400);
        });
        scene.input.keyboard.on('keydown_A', ()=> {
            this.body.setAccelerationX(-400);
        });
        scene.input.keyboard.on('keydown_D', ()=> {
            this.body.setAccelerationX(400);
        });

        scene.input.keyboard.on('keyup_W', ()=> {
            if (moveKeys['down'].isUp){
            console.log('1');
            this.body.setAccelerationY(0);   
            }
        });
        scene.input.keyboard.on('keyup_S', ()=> {
            if (moveKeys['up'].isUp)
            this.body.setAccelerationY(0);
        });
        scene.input.keyboard.on('keyup_A', ()=> {
            if (moveKeys['right'].isUp)
            this.body.setAccelerationX(0);
        });
        scene.input.keyboard.on('keyup_D', ()=> {
            if (moveKeys['left'].isUp)
            this.body.setAccelerationX(0);
        });

    }
}