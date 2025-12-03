import { creatureState } from '../State/CreatureState.js';
import { playerState } from '../State/PlayerState.js';
import UIManager from '../UI/UIManager.js';
import { ButtonHandler } from '../Utilities/ButtonHandler.js';

export default class WelcomeScene extends Phaser.Scene {
    constructor() {
        super('WelcomeScene');
    }

    create() {
        const background = this.add
            .image(0, 0, 'bg')
            .setOrigin(0)
            .setDisplaySize(this.scale.width, this.scale.height);
        background.setDepth(0);

        const welcomeText =
            "Welcome! \nWhilst you're on my portfolio there's a little creature here you can look after if you want!";

        const buttonData = [
            { x: 400, y: 250, texture: 'start-ui', actionKey: 'start' }
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
        this.text = this.ui.createCustomText(400, 150, welcomeText, 24);
        this.text.setWordWrapWidth(550).setOrigin(0.5);

        // playing
        // const emitter1 = this.add.particles(400, -40, 'star', {
        //     angle: { min: -300, max: 800 },
        //     speed: { min: 50, max: 150 },
        //     lifespan: 4000,
        //     gravityY: 30,
        //     quantity: 2,
        //     bounce: 0.4,
        //     bounds: new Phaser.Geom.Rectangle(-100, -200, 1000, 750)
        // });
        // const emitter2 = this.add.particles(400, -40, 'star', {
        //     angle: { min: -80, max: 260 },
        //     speed: { min: 50, max: 150 },
        //     lifespan: 4000,
        //     gravityY: 30,
        //     quantity: 2,
        //     bounce: 0.4,
        //     bounds: new Phaser.Geom.Rectangle(-100, -200, 1000, 750)
        // });

        // emitter1.particleBringToTop = false;
        // const fx = emitter1.postFX.addBokeh(0.5, 1, 0.2);
    }
}
