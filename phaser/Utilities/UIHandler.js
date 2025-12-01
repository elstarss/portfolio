import { creatureState } from '../State/CreatureState.js';
import { DayTransitionHandler } from './DayTransitionHandler.js';
import { Actions, performAction } from './ActionHandler.js';

export const UIHandlers = {
    feed: () => performAction(Actions.FEED),
    pet: () => performAction(Actions.PLAY),
    clean: () => performAction(Actions.CLEAN),
    'next-day': (scene) => {
        DayTransitionHandler.start(scene);
    },
    shop: (scene) => {
        scene.scene.pause('GameScene');
        scene.scene.pause('UIScene');
        scene.scene.launch('ShopScene');
    }
};
