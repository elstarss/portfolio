import { config } from './config.js';
import BootScene from './scenes/BootScene.js';
import { GameScene } from './scenes/GameScene.js';

// Add scenes to config
config.scene = [BootScene, GameScene];
console.log(config);

// Initialize the game
const game = new Phaser.Game(config);
console.log(Phaser);
