import { PlayerStats } from './Stats.js';
import { EventBus } from '../Utilities/EventBus.js';

class PlayerState {
    #stats = { [PlayerStats.COINS]: { value: 5, max: Infinity } };

    static getInstance() {
        if (!PlayerState.instance) {
            PlayerState.instance = new PlayerState();
        }
        return PlayerState.instance;
    }

    _setStat(stat, change) {
        const s = this.#stats[stat];
        s.value = Phaser.Math.Clamp(s.value + change, 0, s.max);
        EventBus.emit('player:statChanged', stat, s.value);
    }
    getStat(stat) {
        return this.#stats[stat].value;
    }
    getMaxStat(stat) {
        return this.#stats[stat].max;
    }

    payDay() {
        const wage = Phaser.Math.Between(1, 10);
        console.log(`wage today is: ${wage}`);
        this._setStat(PlayerStats.COINS, wage);
    }
}

export const playerState = PlayerState.getInstance();
