//Player prefab
class reticle extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(true);
        scene.add.existing(this); //add to existing, diplaylist updatelist
    }

    movement(player, deltax, deltay) {

            // Move reticle with mouse
            this.x += deltax;
            this.y += deltay;

            // Only works when camera follows player
            var distX = this.x - player.x;
            var distY = this.y - player.y;

            // Ensures reticle cannot be moved offscreen
            if (distX > gamewitdh){
                console.log('fix');
                this.x = player.x + gamewitdh;
            }
            else if (distX < -gamewitdh){
                console.log('fix');
                this.x = player.x - gamewitdh;
            }

            if (distY > gameheight)
                this.y = player.y + gameheight;
            else if (distY < -gameheight)
                this.y = player.y - gameheight;

    }

}