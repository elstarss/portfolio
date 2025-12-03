import { creatureState } from '../State/CreatureState.js';
import { playerState } from '../State/PlayerState.js';
import { CreatureStats, PlayerStats } from '../State/Stats.js';

export const Actions = {
    feed: {
        stat: CreatureStats.HUNGER,
        cost: 1,
        amount: +1,
        requiresInteraction: true,
        interactionScene: 'FeedScene'
    },
    clean: {
        stat: CreatureStats.CLEAN,
        cost: 1,
        amount: +1,
        requiresInteraction: false
    },
    play: {
        stat: CreatureStats.JOY,
        cost: 1,
        amount: +1,
        requiresInteraction: false
    }
};

export function performAction(scene, action) {
    const { stat, cost, amount, requiresInteraction, interactionScene } =
        action;
    const current = creatureState.getStat(stat);
    const max = creatureState.getMaxStat(stat);

    // is stat maxxed already?
    if (current >= max) {
        console.log(`${stat} is already full!`);
        return false;
    }
    // does player have enough coins
    const coins = playerState.getStat(PlayerStats.COINS);
    if (coins < cost) {
        console.log(`not enough coins! Need ${cost}.`);
        return false;
    }
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
