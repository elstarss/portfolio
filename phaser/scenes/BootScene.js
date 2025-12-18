export default class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        this.load.image('bg', 'phaser/assets/bg.png');
        this.load.image('help-bg', 'phaser/assets/help-bg.png');

        // ss and accessories
        this.load.spritesheet('creature', 'phaser/assets/creature-ss.png', {
            frameWidth: 160,
            frameHeight: 320
        });
        this.load.setPath('phaser/assets/sprite-sheets/');
        this.load.spritesheet('black-glasses', 'black-glasses.png', {
            frameWidth: 160,
            frameHeight: 320
        });
        this.load.spritesheet('red-glasses', 'red-glasses.png', {
            frameWidth: 160,
            frameHeight: 320
        });
        this.load.spritesheet('heart-glasses', 'heart-glasses.png', {
            frameWidth: 160,
            frameHeight: 320
        });

        // ui
        this.load.setPath('phaser/assets/ui/');
        this.load.image('feed-ui', 'feed-ui.png');
        this.load.image('pet-ui', 'pet-ui.png');
        this.load.image('nextDay-ui', 'next-day-ui.png');
        this.load.image('shop-ui', 'shop-ui.png');
        this.load.image('start-ui', 'start-ui.png');
        this.load.image('home-ui', 'home-ui.png');
        this.load.image('clean-ui', 'clean-ui.png');
        this.load.image('cancel-ui', 'cancel-ui.png');
        this.load.image('help-ui', 'help-ui.png');
        this.load.image('exit-ui', 'exit-ui.png');
        this.load.image('buy-ui', 'buy-ui.png');
        this.load.image('name-ui', 'name-ui.png');
        this.load.image('generate-ui', 'generate-ui.png');
        this.load.image('start-over-ui', 'start-over-ui.png');

        // icons
        this.load.setPath('phaser/assets/icons/');
        this.load.image('joy-icon', 'joy-icon.png');
        this.load.image('clean-icon', 'water-icon.png');
        this.load.image('food-icon', 'food-icon.png');
        this.load.image('cookie', 'cookie.png');
        this.load.image('cookie-plate', 'cookie-plate.png');
        this.load.image('star', 'star.png');

        // shop
        this.load.setPath('phaser/assets/shop/');
        this.load.image('food-shop', 'food-shop.png');
        this.load.image('soap-shop', 'soap-shop.png');
        this.load.image('toys-shop', 'toys-shop.png');

        // feed
        this.load.setPath('phaser/assets/feed/');
        this.load.image('feed-bg', 'feed-bg.png');
        this.load.image('feed-mouth', 'feed-mouth.png');

        // clean
        this.load.setPath('phaser/assets/clean/');
        this.load.image('bubble', 'bubble-clean.png');

        // play
        this.load.setPath('phaser/assets/play/');
        this.load.image('ball', 'ball.png');
    }

    create() {
        this.scene.start('WelcomeScene');
    }
}
