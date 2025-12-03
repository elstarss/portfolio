export default class UIButton extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, effect) {
        super(scene, x, y, texture, frame);
        this.effect = effect;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setInteractive();
    }
}
