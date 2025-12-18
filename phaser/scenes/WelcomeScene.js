import { creatureState } from '../State/CreatureState.js';
import { playerState } from '../State/PlayerState.js';
import UIManager from '../UI/UIManager.js';
import { AudioManager } from '../Utilities/AudioManager.js';
import { ButtonHandler } from '../Utilities/ButtonHandler.js';

export default class WelcomeScene extends Phaser.Scene {
    // currentName = initialName;
    constructor() {
        super('WelcomeScene');
    }

    create() {
        const background = this.add
            .image(0, 0, 'bg')
            .setOrigin(0)
            .setDisplaySize(this.scale.width, this.scale.height);
        background.setDepth(0);
        this.audioManager = new AudioManager(this);

        const welcomeText =
            "First things first, give your new friend a name! Click roll until you're happy with the name locked in, then start.";

        const nameOptions = [
            'Fluffy',
            'Steve',
            'Susan',
            'Rex',
            'Meep',
            'Angel',
            'George',
            'Socks',
            'Mike',
            'Sparky',
            'Destroyer',
            'Gloomio',
            'Fury',
            'Spots',
            'Bluey',
            'Twigs',
            'Friend'
        ];

        const buttonData = [
            {
                x: 600,
                y: 300,
                texture: 'generate-ui',
                actionKey: 'roll',
                payload: { nameOptions }
            },
            {
                x: 600,
                y: 370,
                texture: 'start-ui',
                actionKey: 'start'
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
        this.text = this.ui.createCustomText(400, 150, welcomeText, 24);
        this.text.setWordWrapWidth(550).setOrigin(0.5);
        const nameSpace = this.add.image(300, 325, 'name-ui');
        nameSpace.setScale(2);
        this.currentName =
            nameOptions[Phaser.Math.Between(0, nameOptions.length - 1)];
        this.nameText = this.ui.createCustomText(
            300,
            325,
            this.currentName,
            40
        );
        buttonData[0].payload.textObject = this.nameText;
        this.nameText.setWordWrapWidth(200).setOrigin(0.5);
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
    rollNameAnimation(textObj, finalName, speed = 60, cycles = 9) {
        const tempNames = ['...', '??', '###', '!!!'];
        let count = 0;

        const event = this.time.addEvent({
            delay: speed,
            loop: true,
            callback: () => {
                count++;
                if (count >= cycles) {
                    textObj.setText(finalName);
                    event.remove();
                    return;
                }
                textObj.setText(
                    tempNames[Phaser.Math.Between(0, tempNames.length - 1)]
                );
            }
        });
    }
    lockInNameAnimation(textObj, onComplete) {
        this.tweens.add({
            targets: textObj,
            scale: 1.3,
            duration: 150,
            yoyo: true,
            ease: 'Quad.easeOut'
        });

        this.tweens.add({
            targets: textObj,
            alpha: 0,
            delay: 250,
            duration: 300,
            onComplete
        });
    }
}
