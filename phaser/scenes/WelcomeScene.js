import UIButton from '../UI/UIButton.js';

export default class WelcomeScene extends Phaser.Scene {
    constructor() {
        super('WelcomeScene');
    }

    create() {
        console.log('welcome scene');
        const background = this.add
            .image(0, 0, 'bg')
            .setOrigin(0)
            .setDisplaySize(this.scale.width, this.scale.height);
        background.setDepth(0);
        this.startButton = new UIButton(this, 100, 100, 'start-ui', 0, 'start');
        this.startButton.on('pointerdown', () => this.scene.start('GameScene'));
    }
}
