import { DayTransitionHandler } from './DayTransitionHandler.js';
import { Actions, performAction } from './ActionHandler.js';
import { playerState } from '../State/PlayerState.js';
import { PlayerStats } from '../State/Stats.js';
import { creatureState } from '../State/CreatureState.js';

export const ButtonHandler = {
    start: (scene) => {
        const finalName = scene.currentName || 'Fluffy';
        creatureState.setName(finalName);
        scene.lockInNameAnimation(scene.nameText, () => {
            scene.scene.start('GameScene');
        });
    },
    feed: (scene) => performAction(scene, Actions.feed),
    pet: (scene) => performAction(scene, Actions.play),
    clean: (scene) => performAction(scene, Actions.clean),
    'next-day': (scene) => {
        DayTransitionHandler.start(scene);
    },
    shop: (scene) => {
        scene.scene.pause('GameScene');
        scene.scene.launch('ShopScene');
    },
    refundFeed: (scene, actionConfig) => {
        const amount = actionConfig;
        playerState.setStat(PlayerStats.COINS, +amount);
        scene.scene.sleep('FeedScene');
        scene.scene.launch('GameScene');
    },
    refundClean: (scene, actionConfig) => {
        const amount = actionConfig;
        playerState.setStat(PlayerStats.COINS, +amount);
        scene.scene.sleep('CleanScene');
        scene.scene.launch('GameScene');
    },
    help: (scene) => {
        scene.scene.pause('GameScene');
        scene.scene.launch('HelpScene');

        const helpScene = scene.scene.get('HelpScene');
        helpScene.cameras.main.setAlpha(0);
        helpScene.tweens.add({
            targets: helpScene.cameras.main,
            alpha: 1,
            duration: 500,
            ease: 'Linear'
        });
    },
    exit: (scene) => {
        const helpScene = scene.scene.get('HelpScene');
        helpScene.tweens.add({
            targets: helpScene.cameras.main,
            alpha: 0,
            duration: 400,
            ease: 'Linear',
            onComplete: () => {
                scene.scene.stop('HelpScene');
                scene.scene.resume('GameScene');
            }
        });
    },
    home: (scene) => {
        scene.scene.stop(scene);
        scene.scene.launch('GameScene');
    },
    'start-over': (scene) => {
        scene.scene.stop('GameoverScene');
        creatureState.resetAll();
        playerState.resetAll();
        scene.scene.launch('WelcomeScene');
    },
    roll: (scene, payload) => {
        const { nameOptions, textObject } = payload;
        let randomNumber = Phaser.Math.Between(0, nameOptions.length - 1);
        const finalName = nameOptions[randomNumber];
        scene.rollNameAnimation(textObject, finalName);
        scene.currentName = finalName;
    },

    // shop handlers
    'buy-soap': () => console.log('buying soap'),
    'buy-food': () => console.log('buying food'),
    'buy-toys': () => console.log('buying toys')
};
