import UIManager from '../../UI/UIManager.js';
import { playerState } from '../../State/PlayerState.js';
import { creatureState } from '../../State/CreatureState.js';
import { ButtonHandler } from '../../Utilities/ButtonHandler.js';
import { Actions } from '../../Utilities/ActionHandler.js';
import { ManualCreatureContainer } from '../../sprites/ManualCreatureContainer.js';

export default class PlayScene extends Phaser.Scene {
    constructor() {
        super('PlayScene');
    }

    init(data) {
        this.action = data.action;
    }

    create() {
        const background = this.add
            .image(0, 0, 'bg')
            .setOrigin(0)
            .setDisplaySize(this.scale.width, this.scale.height);
        background.setDepth(0);
        const buttonData = [
            {
                x: 720,
                y: 50,
                texture: 'exit-ui',
                actionKey: 'refundPlay',
                linkedAction: 'play',
                payload: Actions.play.cost
            }
        ];
        const playText = `Click to throw the ball for ${creatureState.getName()}!`;
        this.ui = new UIManager(
            this,
            playerState,
            creatureState,
            [],
            buttonData,
            ButtonHandler
        );
        this.ui.createActionButtons();
        this.text = this.ui.createCustomText(200, 100, playText, 24);

        this.input.keyboard.on('keydown-ESC', () => {
            this.closeHelp();
        });
        // game logic
        ManualCreatureContainer.createAnimations(this);
        this.creature = new ManualCreatureContainer(this, 400, 200);
        this.creature.setMood('neutral');
        this.creature.equipAccessory('red-glasses');

        this.toy = this.add.image(200, 200, 'ball');

        this.input.on('pointerdown', (pointer) => {
            if (this.throwOnCooldown) return;
            this.throwOnCooldown = true;
            this.throwToy(pointer.worldX, pointer.worldY);
            this.time.delayedCall(800, () => {
                this.throwOnCooldown = false;
            });
        });
        this.joyGained = 0;
    }

    update() {
        this.creature.updateMood();
        if (this.target) {
            this.creature.x = Phaser.Math.Linear(
                this.creature.x,
                this.target.x,
                0.04
            );
            this.creature.y = Phaser.Math.Linear(
                this.creature.y,
                this.target.y,
                0.04
            );
            const dist = Phaser.Math.Distance.Between(
                this.creature.x,
                this.creature.y,
                this.target.x,
                this.target.y
            );

            if (dist < 10) {
                this.onCatchToy();
            }
        }
    }

    throwToy(x, y) {
        this.toy.setPosition(this.creature.x, this.creature.y);
        this.tweens.add({
            targets: this.toy,
            x,
            y,
            duration: 400,
            ease: 'Quad.out',
            onComplete: () => {
                this.chaseToy();
            }
        });
    }
    chaseToy() {
        this.creature.setMood('walking');
        this.target = new Phaser.Math.Vector2(this.toy.x, this.toy.y - 30);
    }

    onCatchToy() {
        this.target = null;
        this.creature.setMood('excited');
        this.joyGained++;
        this.showJoy();
        if (this.joyGained >= 3) {
            this.joyGained = 0;
            this.completeAction();
        }
    }
    showJoy() {
        const icon = this.add
            .image(this.creature.x, this.creature.y - 20, 'star')
            .setScale(0.5);

        this.tweens.add({
            targets: icon,
            y: icon.y - 20,
            alpha: 0,
            scale: 1.5,
            duration: 700,
            ease: 'Back.out',
            onComplete: () => icon.destroy()
        });
    }

    closeHelp() {
        ButtonHandler.refundFeed(this, Actions.play.cost);
    }

    completeAction() {
        creatureState.setStat(this.action.stat, this.action.amount);
        this.time.delayedCall(1200, () => {
            this.endInteraction();
        });
    }

    endInteraction() {
        this.scene.stop();
        this.scene.launch('GameScene');
    }
}
