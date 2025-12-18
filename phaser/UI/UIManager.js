import { AUDIO } from '../State/Events.js';
import { PlayerStats } from '../State/Stats.js';
import { Actions } from '../Utilities/ActionHandler.js';
import { EventBus } from '../Utilities/EventBus.js';
import UIBar from './UIBar.js';
import UIButton from './UIButton.js';

export default class UIManager {
    constructor(
        scene,
        playerState,
        creatureState,
        statsData,
        buttonData,
        handlers,
        actions = Actions
    ) {
        this.scene = scene;
        this.playerState = playerState;
        this.creatureState = creatureState;

        this.statsData = statsData || [];
        this.buttonData = buttonData || [];
        this.handlers = handlers || {};
        this.actions = actions;

        this.buttons = {};
        this.text = {};
        this.bars = {};
    }

    // Create everything at once
    createAllUI() {
        this.createCoinText();
        this.createStatBars();
        this.createActionButtons();
    }

    // COIN TEXT
    createCoinText(x = 50, y = 50) {
        this.text.coins = this.scene.add.text(
            x,
            y,
            `COINS: ${this.playerState.getStat(PlayerStats.COINS)}`,
            {
                fontFamily: 'Consolas',
                fontSize: 20,
                fontStyle: 'bold',
                color: '#5f2199ff',
                shadow: {
                    offsetX: 0.9,
                    offsetY: 0.9,
                    color: '#4c1b7aff',
                    fill: true
                }
            }
        );
        return this.text.coins;
    }
    returnCoinText() {
        return this.text.coins;
    }
    // custom text
    createCustomText(x, y, text, fontsize) {
        const customText = this.scene.add.text(x, y, text, {
            fontFamily: 'Consolas',
            fontSize: fontsize,
            fontStyle: 'bold',
            color: '#5f2199ff',
            shadow: {
                offsetX: 0.9,
                offsetY: 0.9,
                color: '#4c1b7aff',
                fill: true
            }
        });
        return customText;
    }

    // STAT BARS
    createStatBars() {
        this.bars = this.statsData.map((data) => {
            const rgbHex = data.colour.slice(0, 7);
            const phaserColor =
                Phaser.Display.Color.HexStringToColor(rgbHex).color;
            return new UIBar(
                this.scene,
                data.x,
                data.y,
                200,
                20,
                data.stat,
                data.icon,
                phaserColor
            );
        });
    }
    returnUIBars() {
        return this.bars;
    }

    // ACTION BUTTONS
    createActionButtons() {
        this.buttons = this.buttonData.map((data) => {
            const button = new UIButton(
                this.scene,
                data.x,
                data.y,
                data.texture,
                0,
                data.actionKey
            );
            button.setClickHandler(() => {
                if (data.standardClick == true) {
                    EventBus.emit(AUDIO.PLAY_SFX, 'click');
                }
                const handler = this.handlers[data.actionKey];
                const payload = data.payload || data.accessoryKey || null;
                if (handler) handler(this.scene, payload);
            });
            return button;
        });
        return this.buttons;
    }
    returnActionButtons() {
        return this.buttons;
    }

    // MESSAGE POPUP
    showMessage(msg) {
        const t = this.scene.add
            .text(100, 200, msg, { fontSize: '20px', color: '#ff0' })
            .setAlpha(0);

        this.scene.tweens.add({
            targets: t,
            alpha: 1,
            duration: 200,
            yoyo: true,
            hold: 1000,
            completeDelay: 200,
            onComplete: () => t.destroy()
        });
    }
}
