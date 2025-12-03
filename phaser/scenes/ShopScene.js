import UIButton from '../UI/UIButton.js';
import { CreatureStats, PlayerStats } from '../State/Stats.js';
import { creatureState } from '../State/CreatureState.js';
import { ShopHandlers } from '../Utilities/ShopHandlers.js';
import { EventBus } from '../Utilities/EventBus.js';
import { playerState } from '../State/PlayerState.js';

export default class ShopScene extends Phaser.Scene {
    constructor() {
        super('ShopScene');
    }

    create() {
        const background = this.add
            .image(0, 0, 'bg')
            .setOrigin(0)
            .setDisplaySize(this.scale.width, this.scale.height);
        background.setDepth(0);

        // buttons
        const buttonData = [
            { x: 200, y: 100, texture: 'food-shop', actionKey: 'buy-food' },
            { x: 200, y: 200, texture: 'soap-shop', actionKey: 'buy-soap' },
            { x: 200, y: 300, texture: 'toys-shop', actionKey: 'buy-toys' },
            { x: 100, y: 100, texture: 'home-ui', actionKey: 'home' }
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
            btn.on('pointerdown', () => ShopHandlers[data.actionKey](this));
            return btn;
        });

        // const box = this.add.rectangle(200, 200, 100, 100, 0xff0000);
        // box.setInteractive();
        // this.input.setDraggable(box);

        // this.input.on('dragstart', (pointer, gameObject) => {
        //     console.log('dragstart');
        // });

        // this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
        //     console.log('dragging', dragX, dragY);
        //     gameObject.x = dragX;
        //     gameObject.y = dragY;
        //     // or: gameObject.setPosition(dragX, dragY);
        // });

        // this.input.on('dragend', (pointer, gameObject) => {
        //     console.log('dragend');
        // });

        // coins text
        this.text = this.add.text(
            250,
            100,
            `coins: ${playerState.getStat(PlayerStats.COINS)}`,
            {
                fontFamily: 'MS PGothic',
                fontSize: 20,
                color: '#5f2199ff'
            }
        );

        this.handleStatChange = (stat, value) => {
            const bar = this.UIBars.find((b) => b.statName === stat);
            if (bar) bar.targetValue = value;

            if (stat === PlayerStats.COINS) {
                this.text.setText(`coins: ${value}`);
            }
        };

        this.handleStatChange = this.handleStatChange.bind(this);
        EventBus.on('player:statChanged', this.handleStatChange);

        // cleanup listener
        this.events.once('shutdown', () => {
            EventBus.off('player:statChanged', this.handleStatChange);
        });
    }
}
