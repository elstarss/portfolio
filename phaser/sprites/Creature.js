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
    freeze() {
        const body = this.body;
        body.setVelocity(0, 0);
        body.setAcceleration(0, 0);
        body.setDrag(0, 0);
        body.setAllowGravity(false);
        body.setImmovable(true);
        body.moves = false;
    }
    unfreeze() {
        const body = this.body;
        body.setAllowGravity(true);
        body.setImmovable(false);
        body.moves = true;

        const [minV, maxV] = [-60, 60];
        this.setVelocity(
            Phaser.Math.Between(minV, maxV),
            Phaser.Math.Between(minV, maxV)
        );
    }
    update() {}
}
