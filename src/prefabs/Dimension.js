class Dimension extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        this.dimension = 1;
        this.dimensionfile = 'bg1';
        this.oncooldown = false;
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyspace)){
            if (!this.oncooldown && this.dimension!=1){
                this.dimension = 1;
                this.dimensionfile = 'bg1';
                this.oncooldown = true;
                setTimeout(() => {this.oncooldown = false;}, shiftcooldown); //cooldown
                return true;
            }
            else if (!this.oncooldown && this.dimension!=2){
                this.dimension = 2;
                this.dimensionfile = 'bg2';
                this.oncooldown = true;
                setTimeout(() => {this.oncooldown = false;}, shiftcooldown); //cooldown
                return true;
            }
        }
        
        // else if (!this.oncooldown && this.dimension!=3 && Phaser.Input.Keyboard.JustDown(key3)){
        //     this.dimension = 3;
        //     this.dimensionfile = 'bg3';
        //     this.oncooldown = true;
        //     setTimeout(() => {this.oncooldown = false;}, shiftcooldown); //cooldown
        //     return true;
        // }

        //no input, shifting is on cooldown, or already in dimension
        return false;
    }

    getdimension(){
        return this.dimension;
    }

    getfilename(){
        return this.dimensionfile;
    }
}