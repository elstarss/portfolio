import { creatureState } from '../State/CreatureState.js';
import UIButton from '../UI/UIButton.js';
import UIBar from '../UI/UIBar.js';
import { UIHandlers } from '../UI/UIHandler.js';
import { CreatureStats } from '../State/CreatureStats.js';

export class UIScene extends Phaser.Scene {
    hungerBar;
    cleanBar;
    timeLeft;
    UIBars;
    constructor() {
        super('UIScene');
    }

    create() {
        const buttonData = [
            { x: 100, y: 100, texture: 'feed-ui', actionKey: 'feed' },
            { x: 100, y: 200, texture: 'pet-ui', actionKey: 'pet' },
            { x: 100, y: 300, texture: 'clean-ui', actionKey: 'clean' },
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
            btn.on('pointerdown', () => UIHandlers[btn.actionKey](this));
            return btn;
        });

        // status bars
        const statusLevelData = [
            { stat: CreatureStats.HUNGER, x: 500, y: 50, colour: 0xff5555 },
            { stat: CreatureStats.CLEAN, x: 500, y: 100, colour: 0x55aaff },
            { stat: CreatureStats.JOY, x: 500, y: 150, colour: 0xffff00 }
        ];

        this.UIBars = statusLevelData.map(
            (data) =>
                new UIBar(
                    this,
                    data.x,
                    data.y,
                    200,
                    20,
                    creatureState.getMaxStat(data.stat),
                    data.colour,
                    data.stat
                )
        );
        // subscribing to creatureState stat changes
        creatureState.emitter.on('statChanged', (stat, value) => {
            const bar = this.UIBars.find((b) => b.statName === stat);
            if (bar) bar.setValue(value);
        });
        this.UIBars.forEach((bar) => {
            const currentValue = creatureState.getStat(bar.statName);
            bar.setValue(currentValue);
        });
    }

    update() {}
}
