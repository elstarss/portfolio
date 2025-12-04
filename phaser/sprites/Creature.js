import { creatureState } from '../State/CreatureState.js';
import { CreatureStats } from '../State/Stats.js';

export class Creature extends Phaser.Physics.Arcade.Sprite {
    currentMood;
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setInteractive();
        this.setCollideWorldBounds(true);

        // this.body.velocity.x = 50;
        // this.body.velocity.y = 0;
        this.body.setBounce(1);
        this.setScale(1.2);

        Creature.createAnimations(scene);
        // this.play('idle_neutral');
    }

    playNeutralIdle() {
        this.play('idle_neutral');
    }
    playHappyIdle() {
        this.play('idle_happy');
    }
    playSadIdle() {
        this.play('idle_sad');
    }
    playExcitedIdle() {
        this.play('idle_excited');
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
                    18, 19, 20, 21, 22, 23, 24, 24, 25, 26, 27, 28, 29, 29, 18
                ]
            }),
            frameRate: 4,
            repeat: -1
        });
    }
    updateMood() {
        const mood = creatureState.howIsCreatureFeeling();
        if (this.currentMood === mood) return;
        this.currentMood = mood;
        if (mood === 'sad') this.playSadIdle();
        else if (mood === 'neutral') this.playNeutralIdle();
        else if (mood === 'excited') {
            this.playExcitedIdle();
        } else this.playHappyIdle();
    }

    update() {
        // const body = this.body;
        // if (body.velocity.x > 0) {
        //     body.velocity.y = 0;
        // } else if (body.velocity.y > 0) {
        //     this.anims.play('standing');
        // }
    }
}
