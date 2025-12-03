import UIButton from '../UI/UIButton.js';
import { CreatureStats, PlayerStats } from '../State/Stats.js';
import { creatureState } from '../State/CreatureState.js';
import { ShopHandlers } from '../Utilities/ShopHandlers.js';
import { EventBus } from '../Utilities/EventBus.js';
import { playerState } from '../State/PlayerState.js';
import UIManager from '../UI/UIManager.js';

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

        this.ui = new UIManager(
            this,
            playerState,
            creatureState,
            [],
            buttonData,
            ShopHandlers
        );

        this.buttons = this.ui.createActionButtons();
        this.text = this.ui.createCoinText();
        console.log(this.text);

        this.handleStatChange = (stat, value) => {
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
