import { DayTransitionHandler } from './DayTransitionHandler.js';
import { Actions, performAction } from './ActionHandler.js';
import { playerState } from '../State/PlayerState.js';
import { PlayerStats } from '../State/Stats.js';

export const ButtonHandler = {
    start: (scene) => {
        scene.scene.stop('WelcomeScene');
        scene.scene.launch('GameScene');
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
        const amount = actionConfig.cost;
        playerState.setStat(PlayerStats.COINS, +amount);
        scene.scene.sleep('FeedScene');
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
    }
};
