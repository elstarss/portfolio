import BootScene from './scenes/BootScene.js';
import WelcomeScene from './scenes/WelcomeScene.js';
import { GameScene } from './scenes/GameScene.js';
import ShopScene from './scenes/ShopScene.js';
import FeedScene from './scenes/actionScenes/FeedScene.js';
import HelpScene from './scenes/HelpScreen.js';
import GameoverScene from './scenes/GameoverScene.js';
import CleanScene from './scenes/actionScenes/CleanScene.js';
import PlayScene from './scenes/actionScenes/PlayScene.js';

export const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    scale: {
        mode: Phaser.Scale.FIT,
        width: 800,
        height: 500
    },
    backgroundColor: '#7f3c99ff',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 0 }
            // debug: true
        }
    },
    scene: [
        BootScene,
        WelcomeScene,
        GameScene,
        HelpScene,
        ShopScene,
        FeedScene,
        CleanScene,
        PlayScene,
        GameoverScene
    ],
    fps: {
        limit: 60
    },
    input: { mouse: true, touch: true }
};
