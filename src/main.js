

let gamewidth =  800;
let gameheight =  600;

let config = {
    type: Phaser.WEBGL,
    width: gamewidth,
    height: gameheight,

    physics: {
        default: "arcade",
        arcade: {
            debug: false,
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
let time = 0;
let gametime = 0;
let lastFired;

let dimensionManager;
let p1player;
let r1reticle;
let p1Bullets;
let health;
let Chaserparticle;
let Chargerparticle;

let wallhealth;

let moveKeys;
let keyspace;

let bulletSpeed = 1;

let shiftcooldown = 300;

//player movement
let drag = 1000;
let maxSpeed = 250;
let acceleration = 1500;

//gun attributes
let LaserDamage = 1;
let FireRate = 750;

//chasers
let chaserSpeed = 1;

//chargers
let chargerSpeed = 0.8;