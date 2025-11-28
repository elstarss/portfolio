export default class WelcomeScene extends Phaser.Scene {
    constructor() {
        super('WelcomeScene');
    }

    create() {
        this.scene.start('GameScene');
    }
}
