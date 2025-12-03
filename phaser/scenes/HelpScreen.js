import { creatureState } from '../State/CreatureState.JS';
import { playerState } from '../State/PlayerState.JS';
import UIManager from '../UI/UIManager.JS';
import { ButtonHandler } from '../Utilities/ButtonHandler.JS';

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
            { x: 570, y: 100, texture: 'exit-ui', actionKey: 'exit' }
        ];

        this.ui = new UIManager(
            this,
            playerState,
            creatureState,
            [],
            buttonData,
            ButtonHandler
        );
        this.ui.createActionButtons();

        this.input.keyboard.on('keydown-ESC', () => {
            this.closeHelp();
        });
    }
    closeHelp() {
        const method = ButtonHandler.exit;
        method(this);
    }
}
