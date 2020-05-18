class Dimension extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        //scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(true);
        scene.add.existing(this); //add to existing, diplaylist updatelist
    }
}