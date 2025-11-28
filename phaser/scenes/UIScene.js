import { creatureState } from '../State/CreatureState.js';
import UIButton from '../UI/UIButton.js';
import UIBar from '../UI/UIBar.js';

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
            { x: 100, y: 150, texture: 'feed-ui', effect: 'feed' },
            { x: 100, y: 250, texture: 'pet-ui', effect: 'pet' },
            { x: 100, y: 350, texture: 'shop-ui', effect: 'shop' },
            { x: 600, y: 350, texture: 'nextDay-ui', effect: 'next-day' }
        ];
        this.buttons = buttonData.map((data) => {
            const button = new UIButton(
                this,
                data.x,
                data.y,
                data.texture,
                0,
                data.effect
            );

            button.on('pointerdown', button.interact, button);
            return button;
        });

        // status bars
        const statusLevelData = [
            {
                x: 500,
                y: 50,
                width: 200,
                height: 20,
                maxValue: creatureState.getMaxHunger(),
                colour: 0xff5555,
                updateFunction: () => creatureState.getHungerLevel()
            },
            {
                x: 500,
                y: 100,
                width: 200,
                height: 20,
                maxValue: creatureState.getMaxClean(),
                colour: 0x55aaff,
                updateFunction: () => creatureState.getCleanLevel()
            },
            {
                x: 500,
                y: 150,
                width: 200,
                height: 20,
                maxValue: creatureState.getMaxJoy(),
                colour: 0xffff00,
                updateFunction: () => creatureState.getJoyLevel()
            }
        ];
        this.UIBars = statusLevelData.map((data) => {
            const bar = new UIBar(
                this,
                data.x,
                data.y,
                data.width,
                data.height,
                data.maxValue,
                data.colour,
                data.updateFunction
            );
            return bar;
        });
    }

    update() {
        // will update every frame
        this.UIBars.forEach((bar) => bar.update());
    }
}
