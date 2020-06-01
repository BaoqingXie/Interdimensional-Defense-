class coloroverlay_Dimension extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);

        //constants
        this.green1 = 0x3a522c;
        this.blue2 = 0x2c4852;
        this.red3 = 0x522c2f;
        this.dalpha = 120;

        //color overlays
        this.dimension1 = scene.add.rectangle(gamewidth/2,gameheight/2,gamewidth,gameheight,this.green1,255)
        this.dimension2 = scene.add.rectangle(gamewidth/2,gameheight/2,gamewidth,gameheight,this.blue2,255)
        this.dimension3 = scene.add.rectangle(gamewidth/2,gameheight/2,gamewidth,gameheight,this.red3,255)

        //variables
        this.dimensionindex = 3;
        this.oncooldown = false;

        //set initial dimension to red/3
        this.dimension1.setFillStyle(this.green1,255);
        this.dimension2.setFillStyle(this.blue2,255);
        this.dimension3.setFillStyle(this.red3,this.dalpha);
        
    }

    update(){
        if (!this.oncooldown && this.dimensionindex!=1 && Phaser.Input.Keyboard.JustDown(key1)){
            this.dimension1.setFillStyle(this.green1,this.dalpha);
            this.dimension2.setFillStyle(this.blue2,255);
            this.dimension3.setFillStyle(this.red3,255);

            this.dimensionindex = 1;

            this.oncooldown = true;
            setTimeout(() => {this.oncooldown = false;}, shiftcooldown); //cooldown
            return true;
        }
        else if (!this.oncooldown && this.dimensionindex!=2 && Phaser.Input.Keyboard.JustDown(key2)){
            this.dimension1.setFillStyle(this.green1,255);
            this.dimension2.setFillStyle(this.blue2,this.dalpha);
            this.dimension3.setFillStyle(this.red3,255);

            this.dimensionindex = 2;

            this.oncooldown = true;
            setTimeout(() => {this.oncooldown = false;}, shiftcooldown); //cooldown
            return true;
        }
        else if (!this.oncooldown && this.dimensionindex!=3 && Phaser.Input.Keyboard.JustDown(key3)){
            this.dimension1.setFillStyle(this.green1,255);
            this.dimension2.setFillStyle(this.blue2,255);
            this.dimension3.setFillStyle(this.red3,this.dalpha);

            this.dimensionindex = 3;

            this.oncooldown = true;
            setTimeout(() => {this.oncooldown = false;}, shiftcooldown); //cooldown
            return true;
        }

        //no input, shifting is on cooldown, or already in dimension
        return false;
    }

    getdimension(){
        return this.dimensionindex;
    }

    getfilename(){
        return this.dimensionfile;
    }
}