import { creatureState } from '../State/CreatureState.js';
import { playerState } from '../State/PlayerState.js';
import { CreatureStats, PlayerStats } from '../State/Stats.js';
import { EventBus } from './EventBus.js';
import { AUDIO } from '../State/Events.js';

export const Actions = {
    feed: {
        stat: CreatureStats.HUNGER,
        cost: 1,
        amount: +2,
        requiresInteraction: true,
        interactionScene: 'FeedScene'
    },
    clean: {
        stat: CreatureStats.CLEAN,
        cost: 1,
        amount: +3,
        requiresInteraction: true,
        interactionScene: 'CleanScene'
    },
    play: {
        stat: CreatureStats.JOY,
        cost: 1,
        amount: +3,
        requiresInteraction: true,
        interactionScene: 'PlayScene'
    },
    glasses: {
        accessoryKey: 'black-glasses'
    }
};
export const ShopActions = {
    glasses: {
        cost: 5,
        black: 'black-glasses',
        red: 'red-glasses',
        heart: 'heart-glasses'
    }
};

export function performAction(scene, action) {
    const { stat, cost, amount, requiresInteraction, interactionScene } =
        action;
    const current = creatureState.getStat(stat);
    const max = creatureState.getMaxStat(stat);

    // is stat maxxed already?
    if (current >= max || checkCoins(cost) == false) {
        EventBus.emit(AUDIO.PLAY_SFX, 'error');
        return false;
    }
    // might use diff sfx here later
    // if (checkCoins(cost) == false) {
    //     EventBus.emit(AUDIO.PLAY_SFX, 'error');
    //     return false;
    // }
    EventBus.emit(AUDIO.PLAY_SFX, 'click');

    // player has enough -> reduce coins
    playerState.setStat(PlayerStats.COINS, -cost);

    if (requiresInteraction) {
        scene.scene.sleep('GameScene');
        scene.scene.sleep('UIScene');
        scene.scene.launch(interactionScene, { action });
        return true;
    }

    // increase creature stat
    creatureState.setStat(stat, amount);

    return true;
}
export function checkCoins(cost) {
    const coins = playerState.getStat(PlayerStats.COINS);
    if (coins < cost) {
        console.log(`not enough coins! Need ${cost}.`);
        return false;
    } else {
        return true;
    }
}
