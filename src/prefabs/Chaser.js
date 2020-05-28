class Chaser extends Phaser.GameObjects.Sprite {

    constructor (scene, x, y, texture, frame, dim) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        
        scene.physics.world.enable(this);
        scene.add.existing(this); 
        this.dimension = dim; // give enemy a dimension it belongs to
        this.speed = chaserSpeed;
        this.hp = 3;
    }

    update() {
        this.rotation = Phaser.Math.Angle.Between(this.x, this.y, p1player.x, p1player.y);
        
        if(p1player.y != this.y)
            this.direction = Math.atan((p1player.x - this.x) / (p1player.y - this.y));

        if (p1player.y > this.y){
            this.x += this.speed * Math.sin(this.direction);
            this.y += this.speed * Math.cos(this.direction);
        }
        else{
            this.x -= this.speed * Math.sin(this.direction);
            this.y -= this.speed * Math.cos(this.direction);
        }
    }
    
}