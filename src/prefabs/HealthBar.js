class HealthBar {

    constructor(scene, x, y, width, height, maxhp, color_healthy, color_hurt, color_bg, color_border) {
        this.bar = new Phaser.GameObjects.Graphics(scene);

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.maxhp = maxhp;
        this.color_healthy = color_healthy;
        this.color_hurt = color_hurt;
        this.color_bg = color_bg;
        this.color_border = color_border;

        this.value = maxhp;
        this.border_thickness = 2;

      
        scene.physics.world.enable(this);

        this.draw();

        scene.add.existing(this.bar);
    }

    decrease(amount) {
        this.value -= amount;

        if (this.value < 0) {
            this.value = 0;
        }

        this.draw();

        return (this.value === 0);
    }

    increase(amount) {
        this.value += amount;

        if (this.value > this.maxhp) {
            this.value = this.maxhp;
        }

        this.draw();

        return (this.value === 0);
    }

    draw() {
        this.bar.clear();

        //  border
        this.bar.fillStyle(this.color_border);
        this.bar.fillRect(this.x, this.y, this.width, this.height);

        //  background
        this.bar.fillStyle(this.color_bg);
        this.bar.fillRect(this.x + this.border_thickness, this.y + this.border_thickness, this.width - (this.border_thickness*2), this.height - (this.border_thickness*2));

        if (this.value < this.maxhp/4) {
            this.bar.fillStyle(this.color_hurt);
        }
        else {
            this.bar.fillStyle(this.color_healthy);
        }
        // health
        this.bar.fillRect(this.x + this.border_thickness, this.y + this.border_thickness, ((this.value/this.maxhp)*this.width) - (this.border_thickness*2), this.height - (this.border_thickness*2));

    }


}
