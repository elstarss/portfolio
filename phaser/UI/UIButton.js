export default class UIButton extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, effect) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setInteractive({ useHandCursor: true });

        this.effect = effect;
        this.defaultScale = 1;
        this.hoverScale = 1.1;
        this.hoverTween = null;
        this.setupHoverEffects();
    }

    setupHoverEffects() {
        this.on('pointerover', () => {
            if (this.hoverTween) this.hoverTween.stop();
            this.hoverTween = this.scene.tweens.add({
                targets: this,
                scale: this.hoverScale,
                duration: 140,
                ease: 'Quad.easeOut'
            });
        });
        this.on('pointerout', () => {
            if (this.hoverTween) this.hoverTween.stop();
            this.hoverTween = this.scene.tweens.add({
                targets: this,
                scale: this.defaultScale,
                duration: 140,
                ease: 'Quad.easeOut'
            });
        });
        this.on('pointerdown', () => {
            this.scene.tweens.add({
                targets: this,
                scale: this.hoverScale * 0.9,
                yoyo: true,
                duration: 100
            });
        });
    }
}
