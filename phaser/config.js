import BootScene from './scenes/BootScene.js';
import { GameScene } from './scenes/GameScene.js';

export const config = {
    type: Phaser.AUTO,
    width: 500,
    height: 500,
    parent: 'game-container',
    backgroundColor: '#7f3c99ff',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 0 },
            debug: true
        }
    },
    scene: [BootScene, GameScene],
    fps: {
        limit: 30
    }
};
