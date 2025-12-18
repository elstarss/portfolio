import UIManager from '../../UI/UIManager.js';
import { playerState } from '../../State/PlayerState.js';
import { creatureState } from '../../State/CreatureState.js';
import { ButtonHandler } from '../../Utilities/ButtonHandler.js';
import { Actions } from '../../Utilities/ActionHandler.js';
import { ManualCreatureContainer } from '../../sprites/ManualCreatureContainer.js';
import { AudioManager } from '../../Utilities/AudioManager.js';
import { EventBus } from '../../Utilities/EventBus.js';
import { AUDIO } from '../../State/Events.js';

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

        ManualCreatureContainer.createAnimations(this);
        this.creatureContainer = new ManualCreatureContainer(this, 400, 200);
        this.creatureContainer.setScale(1.25);
        this.creatureContainer.checkAccessoriesWorn();
        this.creatureContainer.setMood('neutral');

        this.audioManager = new AudioManager(this);

        // bubbles
        this.bubbles = this.add.group();
        this.spawnBubbles(12);
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
        } else if (this.remainingBubbles <= 4) {
            this.creatureContainer.setMood('excited');
        } else if (this.remainingBubbles <= 7) {
            this.creatureContainer.setMood('happy');
        }
        this.creatureContainer.updateMood();
    }

    spawnBubbles(count) {
        for (let i = 0; i < count; i++) {
            const bubble = this.add.image(
                Phaser.Math.Between(320, 480),
                Phaser.Math.Between(250, 350),
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
        EventBus.emit(AUDIO.PLAY_SFX, 'pop');
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
        EventBus.emit(AUDIO.PLAY_SFX, 'click');
        ButtonHandler.refundClean(this, Actions.clean.cost);
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
