//Player prefab
class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this); //add to existing, diplaylist updatelist
        this.setAngle(90);
    }

    update() {
        if (keyW.isDown) {
            this.y -= 2;
        } else if (keyA.isDown) {
            this.x -= 2;
        } else if(keyS.isDown){
            this.y +=2;
        }else if(keyD.isDown){
            this.x +=2;
        }
    }
}