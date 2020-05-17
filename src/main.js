let gamewitdh = 640;
let gameheight = 480;

let config = {
    type: Phaser.AUTO,
    width: gamewitdh,
    height: gameheight,

    physics: {
        default: "arcade",
        arcade: {
            debug: true,
            gravity: {
                y: 0
            }
        }
    },

    scene: [Play],
};

let game = new Phaser.Game(config);

//variable
let keyW, keyA, keyS, keyD;

let deltax = 0;
let deltay = 0;

let p1player;
let r1reticle;
let p1Bullets;

let moveKeys;

