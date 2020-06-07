class CityWall extends HealthBar {
    constructor(scene, x, y, width, height, maxhp, color_healthy, color_hurt, color_bg, color_border) {
        super(scene, x, y, width, height, maxhp, color_healthy, color_hurt, color_bg, color_border)
        // this.bar = new Phaser.GameObjects.Graphics(scene);

        this.maxhealth = 100;
        this.health = this.maxhealth;

        scene.add.existing(this);

        // this.draw();

        // scene.add.existing(this.bar);
    }

    //returns true if health goes to 0, false if not-0
    damage (amount) {
        this.health -= amount;
        HealthBar.prototype.decrease(amount);
        if (this.health <= 0){
            this.health = 0;
            return true;
        }
        return false;
    }

    heal (amount) {
        this.health += amount;
        HealthBar.prototype.increase(amount);
        if (this.health >= this.maxhealth){
            this.health = this.maxhealth;
        }
    }

    draw () {
        HealthBar.prototype.draw();
    }

}