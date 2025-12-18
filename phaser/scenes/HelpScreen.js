import { creatureState } from '../State/CreatureState.js';
import { playerState } from '../State/PlayerState.js';
import UIManager from '../UI/UIManager.js';
import { ButtonHandler } from '../Utilities/ButtonHandler.js';
import { EventBus } from '../Utilities/EventBus.js';
import { AUDIO } from '../State/Events.js';

export default class HelpScene extends Phaser.Scene {
    constructor() {
        super('HelpScene');
    }
    init(data) {}

    create() {
        const background = this.add.image(400, 250, 'help-bg').setOrigin(0.5);
        background.setDepth(0);

        this.tweens.add({
            targets: this.cameras.main,
            alpha: 1,
            duration: 400,
            ease: 'Linear'
        });

        const buttonData = [
            {
                x: 570,
                y: 100,
                texture: 'exit-ui',
                actionKey: 'exit',
                standardClick: true
            }
        ];
        const helpText =
            "You need some help? No problem! \n\nYour goal is to keep this lil guy alive by making sure their stat levels don't dip too low- if you try to start a day with a stat depleted there will be consequences.. so best to avoid that! \nFeeding and cleaning your critter cost coins, which you can pay for from your daily wage. Your employer is unfortunately flakey so your wage does vary day to day, so mind your coins and save for the items in the shop!";

        this.ui = new UIManager(
            this,
            playerState,
            creatureState,
            [],
            buttonData,
            ButtonHandler
        );
        this.ui.createActionButtons();
        this.text = this.ui.createCustomText(400, 250, helpText, 18);
        this.text.setWordWrapWidth(350).setOrigin(0.5);

        this.input.keyboard.on('keydown-ESC', () => {
            EventBus.emit(AUDIO.PLAY_SFX, 'click');
            this.closeHelp();
        });
    }
    closeHelp() {
        const method = ButtonHandler.exit;
        method(this);
    }
}
