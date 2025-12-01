import { creatureState } from '../State/CreatureState.js';

export const ShopHandlers = {
    'buy-soap': () => console.log('buying soap'),
    'buy-food': () => console.log('buying food'),
    'buy-toys': () => console.log('buying toys'),
    home: (scene) => {
        scene.scene.start('GameScene');
    }
};
