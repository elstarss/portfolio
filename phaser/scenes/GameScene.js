import { Creature } from '../sprites/Creature.js';
import { creatureState } from '../State/CreatureState.js';
import { playerState } from '../State/PlayerState.js';
import { PlayerStats } from '../State/Stats.js';
import { CreatureStats } from '../State/Stats.js';
import UIManager from '../UI/UIManager.js';
import { ButtonHandler } from '../Utilities/ButtonHandler.js';
import { EventBus } from '../Utilities/EventBus.js';

export class GameScene extends Phaser.Scene {
    creature;
    constructor() {
        super('GameScene');
    }
    create() {
        // this.scene.launch('UIScene');

        // bg
        const background = this.add
            .image(0, 0, 'bg')
            .setOrigin(0)
            .setDisplaySize(this.scale.width, this.scale.height);
        background.setDepth(0);

        // creature
        this.creature = new Creature(this, 200, 300, 'rolly', 0);
        this.creature.setDepth(1);

        // ui

        // status bars
        const statusLevelData = [
            {
                stat: CreatureStats.HUNGER,
                icon: 'food-icon',
                x: 550,
                y: 100,
                colour: '#1FBF71'
            },
            {
                stat: CreatureStats.CLEAN,
                icon: 'clean-icon',
                x: 550,
                y: 150,
                colour: '#003dafff'
            },
            {
                stat: CreatureStats.JOY,
                icon: 'joy-icon',
                x: 550,
                y: 200,
                colour: '#f2c94cff'
            }
        ];
        // buttons
        const buttonData = [
            { x: 100, y: 100, texture: 'feed-ui', actionKey: 'feed' },
            { x: 100, y: 200, texture: 'clean-ui', actionKey: 'clean' },
            { x: 100, y: 300, texture: 'pet-ui', actionKey: 'pet' },
            { x: 100, y: 400, texture: 'shop-ui', actionKey: 'shop' },
            { x: 700, y: 400, texture: 'nextDay-ui', actionKey: 'next-day' },
            { x: 700, y: 50, texture: 'help-ui', actionKey: 'help' }
        ];
        this.ui = new UIManager(
            this,
            playerState,
            creatureState,
            statusLevelData,
            buttonData,
            ButtonHandler
        );

        this.ui.createAllUI();
        this.UIBars = this.ui.returnUIBars();
        this.text = this.ui.returnCoinText();
        this.buttons = this.ui.returnActionButtons();
        this.buttons.forEach((button) => button.setDepth(2));

        this.handleStatChange = (stat, value) => {
            const bar = this.UIBars.find((b) => b.statName === stat);
            if (bar) bar.targetValue = value;
            if (stat === PlayerStats.COINS) {
                this.text.setText(`COINS: ${value}`);
            }
        };

        this.handleStatChange = this.handleStatChange.bind(this);
        EventBus.on('creature:statChanged', this.handleStatChange);
        EventBus.on('player:statChanged', this.handleStatChange);

        // cleanup listeners when scene stops
        this.events.once('shutdown', () => {
            EventBus.off('player:statChanged', this.handleStatChange);
            EventBus.off('creature:statChanged', this.handleStatChange);
        });
    }

    update() {
        this.UIBars.forEach((bar) => bar.update());
        this.creature.update();
    }
}
