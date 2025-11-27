export default class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        // // Load assets here
        // this.load.image('phaser-logo', 'assets/phaser-logo.png');
    }

    create() {
        this.scene.start('GameScene');
    }
}
