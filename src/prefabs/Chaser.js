class Chaser extends Phaser.GameObjects.Sprite {

    constructor (scene, x, y, texture, frame, dim) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        
        scene.physics.world.enable(this);
        scene.add.existing(this); 
        this.dimension = dim; // give enemy a dimension it belongs to
        this.speed = chaserSpeed;
        this.hp = 3;

        if(this.dimension == 1){ // set animation keys depending on the dimension this belongs to
            this.defAnimKey = 'chaser1';
            this.hidAnimKey = 'h-chaser1';
        }
        if(this.dimension == 2){
            this.defAnimKey = 'chaser2';
            this.hidAnimKey = 'h-chaser2';
        }
        if(this.dimension == 3){
            this.defAnimKey = 'chaser3';
            this.hidAnimKey = 'h-chaser3';
        }

        if(this.dimension == dimensionManager.getdimension()){
            this.play(this.defAnimKey); // play regular animation
        }else{
            this.play(this.hidAnimKey); // play the hidden animation
            this.alpha = 0.66; // lower alpha to make it more clear they are invulnerable
        }
        //this.play(defAnimKey);
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

    changeSprite(){ // called during dimension.update(); updates sprite to either "hidden" or "shown"
        if(this.active){
            if(this.dimension == dimensionManager.getdimension()){
                this.play(this.defAnimKey); // play regular animation
                this.alpha = 1;
            }else{
                this.play(this.hidAnimKey); // play the hidden animation
                this.alpha = 0.66; // lower alpha to make it more clear they are invulnerable
            }
        }
    }
    
    
}