class Charger extends Phaser.GameObjects.Sprite {

    constructor (scene, x, y, texture, frame, dim) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        
        scene.physics.world.enable(this);
        scene.add.existing(this); 
        this.dimension = dim; // give enemy a dimension it belongs to
        this.speed = chargerSpeed;
        this.hp = 3;
        this.rotation = Math.PI/2; // face down
    }

    update() {
        // chargers run straight downwards (towards the wall)
        if(this.y < 400) {// WHATEVER PIXEL THE WALL IS AT
            this.y += this.speed;
        }
        else{
            // attack animation? 
        } 
                
    }
    
}