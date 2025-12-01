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
        this.load.image('feed-ui', 'phaser/assets/feed-ui.png');
        this.load.image('pet-ui', 'phaser/assets/pet-ui.png');
        this.load.image('nextDay-ui', 'phaser/assets/next-day-ui.png');
        this.load.image('shop-ui', 'phaser/assets/shop-ui.png');
        this.load.image('start-ui', 'phaser/assets/start-ui.png');
        this.load.image('home-ui', 'phaser/assets/home-ui.png');
        this.load.image('clean-ui', 'phaser/assets/clean-ui.png');

        // icons
        this.load.setPath('phaser/assets/icons/');
        this.load.image('joy-icon', 'joy-icon.png');
        this.load.image('clean-icon', 'water-icon.png');
        this.load.image('food-icon', 'food-icon.png');
    }

    create() {
        this.scene.start('GameScene');
    }
}
