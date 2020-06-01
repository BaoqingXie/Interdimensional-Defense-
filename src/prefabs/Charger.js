class Charger extends Phaser.GameObjects.Sprite {

    constructor (scene, x, y, texture, frame, dim) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        
        scene.physics.world.enable(this);
        scene.add.existing(this); 
        this.dimension = dim; // give enemy a dimension it belongs to
        this.speed = chargerSpeed;
        this.hp = 3;
        this.attacking = false;
         
        if(this.dimension == 1){ // set animation keys depending on the dimension this belongs to
            this.defAnimKey = 'charger1';
            this.hidAnimKey = 'h-charger1';
        }
        if(this.dimension == 2){
            this.defAnimKey = 'charger2';
            this.hidAnimKey = 'h-charger2';
        }
        if(this.dimension == 3){
            this.defAnimKey = 'charger3';
            this.hidAnimKey = 'h-charger3';
        }

        if(this.dimension == dimensionManager.getdimension()){
            this.play(this.defAnimKey); // play regular animation
        }else{
            this.play(this.hidAnimKey); // play the hidden animation
        }
    }

    update() {
            // chargers run straight downwards (towards the wall)
        if(this.y < 400) {// WHATEVER PIXEL THE WALL IS AT
                this.y += this.speed;
        }
        else{ 
            // attack animation? 
            if(!this.attacking){
                this.damageTimer = this.scene.time.addEvent({
                    delay: 1000,
                    callback: () => {
                        if(this.active){ this.scene.wallhealth.decrease(4);}
                    },
                    loop: true
                })
            }
            this.attacking = true;
        }
    }

    changeSprite(){ // called during dimension.update(); updates sprite to either "hidden" or "shown"
        if(this.active){    
            if(this.dimension == dimensionManager.getdimension()){
                this.play(this.defAnimKey); // play regular animation
            }else{
                this.play(this.hidAnimKey); // play the hidden animation
            }
        }
    }
    
}