let gamewidth = 640;
let gameheight = 480;

let config = {
    type: Phaser.AUTO,
    width: gamewidth,
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

    scene: [Menu,Play],
};

let game = new Phaser.Game(config);

let deltax = 0;
let deltay = 0;

let dimensionManager;
let p1player;
let r1reticle;
let p1Bullets;

let moveKeys;
let key1;
let key2;
let key3;

let bulletSpeed = 1;

let shiftcooldown = 300;
//player movement
let drag = 1000;
let maxSpeed = 250;
let acceleration = 2400;

//chasers
let chaserSpeed = 1;

//chargers
let chargerSpeed = 0.8;