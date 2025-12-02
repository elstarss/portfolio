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
        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.setPosition(dragX, dragY);
        });

        this.input.on('dragstart', (pointer, gameObject) => {
            console.log('dragstart fired for', gameObject.texture.key);
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
        this.scene.resume('GameScene');
        this.scene.resume('UIScene');
    }
}
