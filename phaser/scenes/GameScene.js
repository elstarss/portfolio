export class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }
    create() {
        this.add
            .text(200, 300, 'Hello Phaser!', { fontSize: '32px', fill: '#fff' })
            .setOrigin(0.5);

        console.log('loaded game scene');
    }
}
