import { ManualCreature } from '../../sprites/ManualCreature.js';
import { Creature } from '../../sprites/Creature.js';
import UIManager from '../../UI/UIManager.js';
import { playerState } from '../../State/PlayerState.js';
import { creatureState } from '../../State/CreatureState.js';
import { ButtonHandler } from '../../Utilities/ButtonHandler.js';
import { Actions } from '../../Utilities/ActionHandler.js';

export default class CleanScene extends Phaser.Scene {
    constructor() {
        super('CleanScene');
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
        Creature.createAnimations(this);
        this.creature = new ManualCreature(this, 400, 50, 'creature', 1);
        this.creature.setScale(1.25);
        this.creature.setMood('neutral');

        // bubbles
        this.bubbles = this.add.group();
        this.spawnBubbles(15);
        this.remainingBubbles = this.bubbles.getLength();

        const cleanText = `POP the bubbles to give ${creatureState.getName()} a bath!`;
        const buttonData = [
            {
                x: 720,
                y: 50,
                texture: 'exit-ui',
                actionKey: 'refundClean',
                linkedAction: 'clean',
                payload: Actions.clean.cost
            }
        ];

        this.ui = new UIManager(
            this,
            playerState,
            creatureState,
            [],
            buttonData,
            ButtonHandler
        );
        this.ui.createActionButtons();
        this.text = this.ui.createCustomText(200, 150, cleanText, 24);

        this.input.keyboard.on('keydown-ESC', () => {
            this.closeHelp();
        });
    }

    update() {
        if (this.remainingBubbles <= 0) {
            this.completeAction();
        } else if (this.remainingBubbles <= 5) {
            this.creature.setMood('excited');
        } else if (this.remainingBubbles <= 10) {
            this.creature.setMood('happy');
        }
        this.creature.updateMood();
    }

    spawnBubbles(count) {
        for (let i = 0; i < count; i++) {
            const bubble = this.add.image(
                Phaser.Math.Between(300, 500),
                Phaser.Math.Between(200, 350),
                'bubble'
            );
            bubble.setInteractive({ useHandCursor: true });
            bubble.on('pointerdown', () => {
                this.popBubble(bubble);
            });
            this.bubbles.add(bubble);
        }
    }
    popBubble(bubble) {
        this.tweens.add({
            targets: bubble,
            scale: 1.4,
            alpha: 0,
            duration: 200,
            onComplete: () => {
                bubble.destroy();
                this.remainingBubbles--;
            }
        });
    }
    closeHelp() {
        ButtonHandler.refundClean(this, Actions.clean.cost);
    }

    completeAction() {
        console.log(this.action);
        creatureState.setStat(this.action.stat, this.action.amount);
        this.endInteraction();
    }

    endInteraction() {
        this.scene.stop();
        this.scene.launch('GameScene');
    }
}
