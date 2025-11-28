export default class UIButton extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, actionKey) {
        super(scene, x, y, texture, frame);

        this.actionKey = actionKey;

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setInteractive();
    }
}
