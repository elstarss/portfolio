import { DayTransitionHandler } from './DayTransitionHandler.js';
import { Actions, performAction } from './ActionHandler.js';
import { playerState } from '../State/PlayerState.js';
import { PlayerStats } from '../State/Stats.js';

export const UIHandlers = {
    feed: (scene) => performAction(scene, Actions.FEED),
    pet: (scene) => performAction(scene, Actions.PLAY),
    clean: (scene) => performAction(scene, Actions.CLEAN),
    'next-day': (scene) => {
        DayTransitionHandler.start(scene);
    },
    shop: (scene) => {
        scene.scene.pause('GameScene');
        scene.scene.pause('UIScene');
        scene.scene.launch('ShopScene');
    },
    refund: (scene, amount) => {
        console.log(amount);
        playerState.setStat(PlayerStats.COINS, +amount);
        scene.scene.sleep('FeedScene');
        scene.scene.launch('GameScene');
    }
};
