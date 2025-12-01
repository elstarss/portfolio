export default class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        this.load.spritesheet('rolly', 'phaser/assets/rolly-ss.png', {
            frameWidth: 128,
            frameHeight: 128
        });
        this.load.image('bg', 'phaser/assets/bg.png');
        this.add.image('wheely', 'phaser/assets/wheely.png');

        // ui
        this.load.setPath('phaser/assets/ui/');
        this.load.image('feed-ui', 'feed-ui.png');
        this.load.image('pet-ui', 'pet-ui.png');
        this.load.image('nextDay-ui', 'next-day-ui.png');
        this.load.image('shop-ui', 'shop-ui.png');
        this.load.image('start-ui', 'start-ui.png');
        this.load.image('home-ui', 'home-ui.png');
        this.load.image('clean-ui', 'clean-ui.png');

        // icons
        this.load.setPath('phaser/assets/icons/');
        this.load.image('joy-icon', 'joy-icon.png');
        this.load.image('clean-icon', 'water-icon.png');
        this.load.image('food-icon', 'food-icon.png');

        // shop
        this.load.setPath('phaser/assets/shop/');
        this.load.image('food-shop', 'food-shop.png');
        this.load.image('soap-shop', 'soap-shop.png');
        this.load.image('toys-shop', 'toys-shop.png');
    }

    create() {
        this.scene.start('GameScene');
    }
}
