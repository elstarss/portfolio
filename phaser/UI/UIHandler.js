import { creatureState } from '../State/CreatureState.js';
import { DayTransitionHandler } from '../Utilities/DayTransitionHandler.js';

export const UIHandlers = {
    feed: () => creatureState.feed(),
    pet: () => creatureState.play(),
    'next-day': (scene) => {
        DayTransitionHandler.start(scene);
    },
    clean: () => creatureState.clean(),
    shop: (scene) => {
        console.log('handling');
        scene.scene.pause('GameScene');
        scene.scene.pause('UIScene');
        scene.scene.launch('ShopScene');
    }
};
