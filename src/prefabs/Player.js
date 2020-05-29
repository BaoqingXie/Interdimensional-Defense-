//Player prefab
class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.physics.world.enable(this);
        this.body.setDrag(drag,drag);
        this.body.setCollideWorldBounds(true);
        scene.add.existing(this); //add to existing, diplaylist updatelist
        this.hp = 5;
        console.log(this);
    }

    movement(scene) {

        scene.input.keyboard.on('keydown_W', ()=> {
            this.body.setAccelerationY(-acceleration);
            this.play('player-walk');
        });
        scene.input.keyboard.on('keydown_S', ()=> {
            this.body.setAccelerationY(acceleration);
            this.play('player-walk');
        });
        scene.input.keyboard.on('keydown_A', ()=> {
            this.body.setAccelerationX(-acceleration);
            this.play('player-walk');
        });
        scene.input.keyboard.on('keydown_D', ()=> {
            this.body.setAccelerationX(acceleration);
            this.play('player-walk');
        });

        scene.input.keyboard.on('keyup_W', ()=> {
            if (moveKeys['down'].isUp)
            this.body.setAccelerationY(0);   
            
            console.log(this.body.acceleration);
            if(this.body.acceleration.x == 0)
                this.anims.stop();
        });
        scene.input.keyboard.on('keyup_S', ()=> {
            if (moveKeys['up'].isUp)
            this.body.setAccelerationY(0);
            
            console.log(this.body.acceleration);
            if(this.body.acceleration.x == 0)
                this.anims.stop();
        });
        scene.input.keyboard.on('keyup_A', ()=> {
            if (moveKeys['right'].isUp)
            this.body.setAccelerationX(0);
            
            if(this.body.acceleration.y == 0)
                this.anims.stop();
        });
        scene.input.keyboard.on('keyup_D', ()=> {
            if (moveKeys['left'].isUp)
            this.body.setAccelerationX(0);
            
            console.log(this.body.acceleration);
            if(this.body.acceleration.y == 0)
                this.anims.stop();
        });

    }

    Hpchange(number){
        this.hp += number;
    }
}