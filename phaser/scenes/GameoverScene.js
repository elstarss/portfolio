import { creatureState } from '../State/CreatureState.js';
import { playerState } from '../State/PlayerState.js';
import UIManager from '../UI/UIManager.js';
import { ButtonHandler } from '../Utilities/ButtonHandler.js';

export default class GameoverScene extends Phaser.Scene {
    emptyStatsArr = ['jf'];
    constructor() {
        super('GameoverScene');
    }
    init(emptyStatsArr) {
        this.emptyStatsArr = emptyStatsArr.statsArr;
    }

    create() {
        console.log(this.emptyStatsArr);
        const background = this.add
            .image(0, 0, 'bg')
            .setOrigin(0)
            .setDisplaySize(this.scale.width, this.scale.height);
        background.setDepth(0);

        const statFailureReasons = {
            hunger: 'starving',
            clean: 'too dirty',
            joy: 'very sad',
            failed: 'unhappy'
        };
        const endGameText = this.buildGameOverMessage(
            this.emptyStatsArr,
            statFailureReasons
        );
        // ui
        const buttonData = [
            {
                x: 400,
                y: 250,
                texture: 'start-over-ui',
                actionKey: 'start-over'
            }
        ];
        this.ui = new UIManager(
            this,
            playerState,
            creatureState,
            [],
            buttonData,
            ButtonHandler
        );
        this.buttons = this.ui.createActionButtons();
        this.buttons.forEach((button) => button.setScale(1.5));
        this.text = this.ui.createCustomText(400, 150, endGameText, 24);
        this.text.setWordWrapWidth(550).setOrigin(0.5);
    }
    buildGameOverMessage(emptyStatsArr, statFailureReasons) {
        const array = emptyStatsArr == undefined ? ['failed'] : emptyStatsArr;
        const reasons = array.map((stat) => statFailureReasons[stat]);
        if (reasons.length === 0) {
            return 'Something went wrong.';
        }
        if (reasons.length === 1) {
            return `Oh no! ${creatureState.getName()} was ${
                reasons[0]
            } and ran away!`;
        }
        const last = reasons.pop();
        const reasonString = `${reasons.join(', ')} and ${last}`;

        return `Oh no! ${creatureState.getName()} ${reasonString}, so decided they would try their luck out in the big wide world...`;
    }
}
