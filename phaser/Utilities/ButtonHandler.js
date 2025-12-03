import { DayTransitionHandler } from './DayTransitionHandler.js';
import { Actions, performAction } from './ActionHandler.js';
import { playerState } from '../State/PlayerState.js';
import { PlayerStats } from '../State/Stats.js';

export const ButtonHandler = {
    feed: (scene) => performAction(scene, Actions.feed),
    pet: (scene) => performAction(scene, Actions.play),
    clean: (scene) => performAction(scene, Actions.clean),
    'next-day': (scene) => {
        DayTransitionHandler.start(scene);
    },
    shop: (scene) => {
        console.log('scene: ' + scene);
        scene.scene.pause('GameScene');
        scene.scene.launch('ShopScene');
    },
    refundFeed: (scene, actionConfig) => {
        console.log(actionConfig);
        const amount = actionConfig.cost;
        console.log(amount);
        playerState.setStat(PlayerStats.COINS, +amount);
        scene.scene.sleep('FeedScene');
        scene.scene.launch('GameScene');
    }
};
