class Enemy extends Phaser.GameObjects.Sprite {

    constructor (scene, x, y, texture, frame, type) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        
        scene.physics.world.enable(this);
        scene.add.existing(this); 
        this.dimension = type; // give enemy a dimension it belongs to
    }

    update() {
        
    }
    
}