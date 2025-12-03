import { PlayerStats } from './Stats.js';
import { EventBus } from '../Utilities/EventBus.js';

class PlayerState {
    #stats = {
        [PlayerStats.COINS]: { value: 5, max: Infinity },
        [PlayerStats.NUMBEROFHATS]: { value: 0, max: Infinity }
    };

    static getInstance() {
        if (!PlayerState.instance) {
            PlayerState.instance = new PlayerState();
        }
        return PlayerState.instance;
    }

    setStat(stat, change) {
        const s = this.#stats[stat];
        s.value = Phaser.Math.Clamp(s.value + change, 0, s.max);
        EventBus.emit('player:statChanged', stat, s.value);
        // console.log(`playerState setStat: new ${stat} stat: ${s.value}`);
    }
    getStat(stat) {
        return this.#stats[stat].value;
    }
    getMaxStat(stat) {
        return this.#stats[stat].max;
    }
    // next day
    payDay() {
        const wage = Phaser.Math.Between(1, 10);
        console.log(`wage today is: ${wage}`);
        this.setStat(PlayerStats.COINS, wage);
    }
}

export const playerState = PlayerState.getInstance();
