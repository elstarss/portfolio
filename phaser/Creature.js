export class Creature extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setInteractive();
        this.setCollideWorldBounds(true);

        this.body.velocity.x = 50;
        this.body.velocity.y = 50;
        this.body.setBounce(1);
    }
    update() {}
}
