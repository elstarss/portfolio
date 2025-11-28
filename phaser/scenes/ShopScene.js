import UIButton from '../UI/UIButton.js';
export default class ShopScene extends Phaser.Scene {
    constructor() {
        super('ShopScene');
    }

    create() {
        console.log('shop scene');
        const background = this.add
            .image(0, 0, 'bg')
            .setOrigin(0)
            .setDisplaySize(this.scale.width, this.scale.height);
        background.setDepth(0);
        this.backButton = new UIButton(this, 100, 100, 'home-ui', 0, 'home');
        this.backButton.on('pointerdown', () => this.scene.start('GameScene'));
    }
}
