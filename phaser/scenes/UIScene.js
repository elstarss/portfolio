import { creatureState } from '../State/CreatureState.js';
import UIButton from '../UI/UIButton.js';
import UIBar from '../UI/UIBar.js';
import { UIHandlers } from '../Utilities/UIHandler.js';
import { CreatureStats, PlayerStats } from '../State/Stats.js';
import { playerState } from '../State/PlayerState.js';
import { EventBus } from '../Utilities/EventBus.js';

export class UIScene extends Phaser.Scene {
    hungerBar;
    cleanBar;
    timeLeft;
    UIBars;
    camera;
    constructor() {
        super('UIScene');
    }

    create() {
        // this.scene.bringToTop();

        const buttonData = [
            { x: 100, y: 100, texture: 'feed-ui', actionKey: 'feed' },
            { x: 100, y: 200, texture: 'clean-ui', actionKey: 'clean' },
            { x: 100, y: 300, texture: 'pet-ui', actionKey: 'pet' },
            { x: 100, y: 400, texture: 'shop-ui', actionKey: 'shop' },
            { x: 600, y: 350, texture: 'nextDay-ui', actionKey: 'next-day' }
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
            btn.on('pointerdown', () => UIHandlers[data.actionKey](this));
            return btn;
        });

        // status bars
        const statusLevelData = [
            {
                stat: CreatureStats.HUNGER,
                icon: 'food-icon',
                x: 500,
                y: 50,
                colour: 0xff5555
            },
            {
                stat: CreatureStats.CLEAN,
                icon: 'clean-icon',
                x: 500,
                y: 100,
                colour: 0x55aaff
            },
            {
                stat: CreatureStats.JOY,
                icon: 'joy-icon',
                x: 500,
                y: 150,
                colour: 0xffff00
            }
        ];

        this.UIBars = statusLevelData.map((data) => {
            return new UIBar(
                this,
                data.x,
                data.y,
                200, // width- standard
                20, // height- standard
                data.stat,
                data.icon,
                data.colour
            );
        });

        // money ui
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
    }
}
