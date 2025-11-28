import { creatureState } from '../State/CreatureState.js';

export const UIHandlers = {
    feed: () => creatureState.feed(),
    pet: () => creatureState.play(),
    'next-day': () => creatureState.age(),
    clean: () => creatureState.clean(),
    shop: (scene) => {
        scene.scene.pause('GameScene');
        scene.scene.pause('UIScene');
        scene.scene.launch('ShopScene');
    }
};
