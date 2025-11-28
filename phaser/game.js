import { config } from './config.js';
import BootScene from './scenes/BootScene.js';
import { GameScene } from './scenes/GameScene.js';
import { UIScene } from './scenes/UIScene.js';

config.scene = [BootScene, GameScene, UIScene];

const game = new Phaser.Game(config);
console.log(Phaser);
