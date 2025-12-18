import { PlayerStats } from '../State/Stats.js';
import { creatureState } from '../State/CreatureState.js';
import { EventBus } from '../Utilities/EventBus.js';
import { playerState } from '../State/PlayerState.js';
import UIManager from '../UI/UIManager.js';
import { ButtonHandler } from '../Utilities/ButtonHandler.js';
import { Actions, ShopActions } from '../Utilities/ActionHandler.js';

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
            { x: 720, y: 50, texture: 'exit-ui', actionKey: 'home' },
            {
                x: 200,
                y: 250,
                texture: 'red-glasses-ui',
                actionKey: 'glasses',
                accessoryKey: ShopActions.glasses.red
            },
            {
                x: 400,
                y: 250,
                texture: 'heart-glasses-ui',
                actionKey: 'glasses',
                accessoryKey: ShopActions.glasses.heart
            },
            {
                x: 600,
                y: 250,
                texture: 'black-glasses-ui',
                actionKey: 'glasses',
                accessoryKey: ShopActions.glasses.black
            }
        ];

        this.ui = new UIManager(
            this,
            playerState,
            creatureState,
            [],
            buttonData,
            ButtonHandler,
            ShopActions
        );

        this.buttons = this.ui.createActionButtons();
        this.text = this.ui.createCoinText();

        this.handleStatChange = (stat, value) => {
            if (stat === PlayerStats.COINS) {
                this.text.setText(`coins: ${value}`);
            }
        };

        this.input.keyboard.on('keydown-ESC', () => {
            this.closeHelp();
        });

        this.handleStatChange = this.handleStatChange.bind(this);
        EventBus.on('player:statChanged', this.handleStatChange);

        // cleanup listener
        this.events.once('shutdown', () => {
            EventBus.off('player:statChanged', this.handleStatChange);
        });
    }

    closeHelp() {
        ButtonHandler.home(this);
    }
}
