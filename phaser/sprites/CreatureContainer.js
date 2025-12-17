import { creatureState } from '../State/CreatureState.js';

export class CreatureContainer extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setCollideWorldBounds(true);
        this.body.setBounce(1);

        this.base = scene.add.sprite(0, 0, 'creature');
        this.add(this.base);

        this.accessories = {};

        CreatureContainer.createAnimations(scene);
    }

    updateMood() {
        const mood = creatureState.howIsCreatureFeeling();
        if (this.currentMood === mood) return;
        this.currentMood = mood;
        if (mood === 'sad') this.playSadIdle();
        else if (mood === 'neutral') this.playNeutralIdle();
        else if (mood === 'excited') this.playExcitedIdle();
        else this.playHappyIdle();
    }
    update() {
        Object.values(this.accessories).forEach((sprite) => {
            sprite.setFrame(this.base.frame.name);
        });
    }

    playAnim(key) {
        this.base.play(key, true);
        Object.values(this.accessories).forEach((sprite) => {
            sprite.setFrame(this.base.frame.name);
        });
    }
    playNeutralIdle() {
        this.playAnim('idle_neutral');
    }
    playHappyIdle() {
        this.playAnim('idle_happy');
    }
    playSadIdle() {
        this.playAnim('idle_sad');
    }
    playExcitedIdle() {
        this.playAnim('idle_excited');
    }
    playWalk() {
        this.playAnim('walking');
    }

    equipAccessory(accessoryKey, offsetX = 0, offsetY = 0) {
        if (this.accessories[accessoryKey]) return;
        const sprite = this.scene.add.sprite(offsetX, offsetY, accessoryKey);
        this.add(sprite);
        this.accessories[accessoryKey] = sprite;
    }
    equipBlackGlasses() {
        if (this.accessories.glasses) return;
        const glasses = this.scene.add.sprite(0, 0, 'black-glasses');
        this.add(glasses);
        this.accessories.glasses = glasses;
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

    static createAnimations(scene) {
        if (scene.anims.exists('idle_neutral')) return;
        scene.anims.create({
            key: 'idle_neutral',
            frames: scene.anims.generateFrameNumbers('creature', {
                frames: [1, 2, 3, 4, 5, 6, 6]
            }),
            frameRate: 1,
            repeat: -1
        });
        scene.anims.create({
            key: 'idle_happy',
            frames: scene.anims.generateFrameNumbers('creature', {
                frames: [8, 9, 10, 11, 12, 12]
            }),
            frameRate: 4,
            repeat: -1
        });
        scene.anims.create({
            key: 'idle_sad',
            frames: scene.anims.generateFrameNumbers('creature', {
                frames: [13, 14, 15, 16, 17, 17, 17]
            }),
            frameRate: 4,
            repeat: -1,
            yoyo: true
        });
        scene.anims.create({
            key: 'idle_excited',
            frames: scene.anims.generateFrameNumbers('creature', {
                frames: [
                    18, 18, 19, 19, 20, 20, 20, 21, 22, 23, 24, 24, 24, 24, 25,
                    26, 27, 28, 29, 29, 30, 31, 32, 33, 34, 34, 34, 18, 18, 18,
                    19, 19, 19
                ]
            }),
            frameRate: 4,
            repeat: -1
        });
        scene.anims.create({
            key: 'walking',
            frames: scene.anims.generateFrameNumbers('creature', {
                frames: [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48]
            }),
            frameRate: 4,
            repeat: -1
        });
    }
}
