class Enemy extends Phaser.GameObjects.Sprite {

    constructor (scene, x, y, texture, frame, type, spd) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        
        scene.physics.world.enable(this);
        scene.add.existing(this); 
        this.dimension = type; // give enemy a dimension it belongs to
        this.hp = 3;
        this.speed = spd;
    }

    update() {
        this.rotation = Phaser.Math.Angle.Between(this.x, this.y, p1player.x, p1player.y);
        
        if (p1player.y >= this.y){
            this.x += this.speed*Math.sin(this.direction);
            this.y += this.speed*Math.cos(this.direction);
        }
        else{
            this.x -= this.speed*Math.sin(this.direction);
            this.y -= this.speed*Math.cos(this.direction);
        }

        //this.x += this.xSpeed;
        //this.y += this.ySpeed;
    }
    
}