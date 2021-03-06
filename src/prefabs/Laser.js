//Bullet prefab
class Laser extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.physics.world.enable(this);
        scene.add.existing(this); //add to existing, diplaylist updatelist

        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'laser');
        //attributes
        this.speed = bulletSpeed;
        this.born = 0;
        this.direction = 0;
        this.xSpeed = 0;
        this.ySpeed = 0;
    }

    Fire(shooter, targetX, targetY){
        this.setPosition(shooter.x, shooter.y); // Initial position
        this.direction = Math.atan( (targetX-this.x) / (targetY-this.y));

        // Calculate X and y velocity of bullet to moves it from shooter to target
        if (targetY >= this.y)
        {
            this.xSpeed = this.speed*Math.sin(this.direction);
            this.ySpeed = this.speed*Math.cos(this.direction);
        }
        else
        {
            this.xSpeed = -this.speed*Math.sin(this.direction);
            this.ySpeed = -this.speed*Math.cos(this.direction);
        }

        this.rotation = shooter.rotation; // angle bullet with shooters rotation
        this.born = 1000; // Time since new bullet spawned
    }

    update(time, delta){
        this.x += this.xSpeed * delta;
        this.y += this.ySpeed * delta;
        this.born += delta;
        if (this.born > 1800)
        {
            this.destroy();
        }
    }

}