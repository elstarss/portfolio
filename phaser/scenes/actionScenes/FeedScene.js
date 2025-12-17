import { creatureState } from '../../State/CreatureState.js';
import { ButtonHandler } from '../../Utilities/ButtonHandler.js';
import UIManager from '../../UI/UIManager.js';
import { playerState } from '../../State/PlayerState.js';
import { Actions } from '../../Utilities/ActionHandler.js';
export default class FeedScene extends Phaser.Scene {
    buttonData = this.buttonData;
    constructor() {
        super('FeedScene');
    }

    init(data) {
        this.action = data.action;
    }

    create() {
        const background = this.add
            .image(0, 0, 'feed-bg')
            .setOrigin(0)
            .setDisplaySize(this.scale.width, this.scale.height);
        background.setDepth(0);

        // food
        const food = this.add.sprite(400, 200, 'cookie');
        food.setInteractive(
            new Phaser.Geom.Rectangle(0, 0, food.width, food.height),
            Phaser.Geom.Rectangle.Contains
        );
        this.input.setDraggable(food);
        food.setDepth(2);
        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.setPosition(dragX, dragY);
        });
        const zone = this.add.sprite(403, 301, 'feed-mouth');
        zone.setDepth(1);
        zone.setInteractive();
        zone.input.dropZone = true;

        this.input.on('dragenter', (pointer, gameObject, dropZone) => {
            zone.setTint(0x88ff88);
        });

        this.input.on('dragleave', (pointer, gameObject, dropZone) => {
            zone.clearTint();
        });

        this.input.on('drop', (pointer, gameObject, dropZone) => {
            gameObject.x = dropZone.x;
            gameObject.y = dropZone.y;
            gameObject.input.enabled = false;
            zone.clearTint();
            this.completeAction();
        });

        this.input.on('dragend', (pointer, gameObject, dropped) => {
            if (!dropped) {
                gameObject.setPosition(400, 200);
            }
        });

        // ui
        const buttonData = [
            {
                x: 720,
                y: 50,
                texture: 'exit-ui',
                actionKey: 'refundFeed',
                linkedAction: 'feed',
                payload: Actions.feed.cost
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

        this.input.keyboard.on('keydown-ESC', () => {
            this.closeHelp();
        });
    }
    closeHelp() {
        ButtonHandler.refundFeed(this, Actions.feed.cost);
    }

    completeAction() {
        creatureState.setStat(this.action.stat, this.action.amount);
        this.time.delayedCall(400, () => {
            this.endInteraction();
        });
    }

    endInteraction() {
        this.scene.stop();
        this.scene.launch('GameScene');
    }
}
