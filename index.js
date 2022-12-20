import { Game, GameOver } from './game.js'

const config = {
    type: Phaser.AUTO,
    width: 1250,
    height: 630,
    scene: [Game, GameOver],
    scale: {
    mode: Phaser.Scale.FIT
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: { y: 300 }
        }
    }
};

var game = new Phaser.Game(config);