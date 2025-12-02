import { Creature } from '../../sprites/Creature.js';
import { creatureState } from '../../State/CreatureState.js';
import { UIHandlers } from '../../Utilities/UIHandler.js';
import UIButton from '../../UI/UIButton.js';
export default class FeedScene extends Phaser.Scene {
    constructor() {
        super('FeedScene');
    }

    init(data) {
        this.action = data.action;
        console.log(this.action);
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

        // this.input.on('dragstart', (pointer, gameObject) => {
        //     console.log('dragstart fired for', gameObject.texture.key);
        // });
        // plate- drop zone
        // Add drop zone (plate)
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
                x: 550,
                y: 400,
                texture: 'cancel-ui',
                actionKey: 'refund'
            }
        ];

        this.buttons = buttonData.map((data) => {
            const btn = new UIButton(
                this,
                data.x,
                data.y,
                data.texture,
                0,
                data.actionKey
            );
            btn.on('pointerdown', () =>
                UIHandlers[data.actionKey](this, this.action.amount)
            );
            return btn;
        });
    }

    completeAction() {
        creatureState.setStat(this.action.stat, this.action.amount);
        this.endInteraction();
    }

    endInteraction() {
        this.scene.stop();
        this.scene.launch('GameScene');
        this.scene.launch('UIScene');
    }
}
