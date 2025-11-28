import { creatureState } from '../State/CreatureState.js';

export const UIHandlers = {
    feed: () => creatureState.setHungerLevel(1),
    pet: () => creatureState.setJoyLevel(1),
    'next-day': () => creatureState.setAge(1),
    shop: (scene) => {
        scene.scene.pause('GameScene');
        scene.scene.pause('UIScene');
        scene.scene.launch('ShopScene');
    }
};
