import { Creature } from '../../sprites/Creature.js';
import { creatureState } from '../../State/CreatureState.js';
import { ButtonHandler } from '../../Utilities/ButtonHandler.js';
import UIManager from '../../UI/UIManager.js';
import { playerState } from '../../State/PlayerState.js';
import { Actions } from '../../Utilities/ActionHandler.js';
export default class FeedScene extends Phaser.Scene {
    constructor() {
        super('FeedScene');
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

        // creature
        this.creature = new Creature(this, 200, 200, 'rolly', 0);
        this.creature.setDepth(1);
        this.creature.freeze();

        // food
        // Add sprite
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
        // dropzone
        const zone = this.add.sprite(400, 300, 'cookie-plate');
        zone.setDepth(1);
        zone.setInteractive();
        zone.input.dropZone = true;

        // highlight drop zone if object in right area
        this.input.on('dragenter', (pointer, gameObject, dropZone) => {
            zone.setTint(0x88ff88);
        });
        // remove highlight if exits dropzone area
        this.input.on('dragleave', (pointer, gameObject, dropZone) => {
            zone.clearTint();
        });

        // snap object to dropzone when placed in correct area
        this.input.on('drop', (pointer, gameObject, dropZone) => {
            gameObject.x = dropZone.x;
            gameObject.y = dropZone.y;
            gameObject.input.enabled = false;
            zone.clearTint();
            this.completeAction();
        });

        // snap back to start if dropped outside zone
        this.input.on('dragend', (pointer, gameObject, dropped) => {
            if (!dropped) {
                gameObject.setPosition(400, 200);
            }
        });

        // return button
        const buttonData = [
            {
                x: 720,
                y: 50,
                texture: 'exit-ui',
                actionKey: 'refundFeed',
                linkedAction: 'feed'
            }
        ];
        // need to decide how i want to handle the scene knowing which stat to refund from
        this.ui = new UIManager(
            this,
            playerState,
            creatureState,
            [],
            buttonData,
            ButtonHandler
        );
        this.ui.createActionButtons();
    }

    completeAction() {
        creatureState.setStat(this.action.stat, this.action.amount);
        this.endInteraction();
    }

    endInteraction() {
        this.scene.stop();
        this.scene.launch('GameScene');
    }
}
