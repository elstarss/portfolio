import BootScene from './scenes/BootScene.js';
import WelcomeScene from './scenes/WelcomeScene.js';
import { GameScene } from './scenes/GameScene.js';
import { UIScene } from './scenes/UIScene.js';
import ShopScene from './scenes/ShopScene.js';

export const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 500
    },
    backgroundColor: '#7f3c99ff',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 0 },
            debug: true
        }
    },
    scene: [BootScene, WelcomeScene, GameScene, UIScene, ShopScene],
    fps: {
        limit: 30
    }
};
