import { PlayerStats } from './Stats.js';
import { EventBus } from '../Utilities/EventBus.js';

class PlayerState {
    #stats = {
        [PlayerStats.COINS]: { value: 5, max: 500000 },
        [PlayerStats.NUMBEROFHATS]: { value: 0, max: 500000 }
    };
    constructor() {
        this.initialStats = JSON.parse(JSON.stringify(this.#stats));
        console.log('COINS INITIAL:', this.initialStats[PlayerStats.COINS]);
    }

    static getInstance() {
        if (!PlayerState.instance) {
            PlayerState.instance = new PlayerState();
        }
        return PlayerState.instance;
    }

    setStat(stat, change) {
        // console.log(
        //     'current coin value is: ' + this.getStat(PlayerStats.COINS)
        // );
        const s = this.#stats[stat];
        s.value = Phaser.Math.Clamp(s.value + change, 0, s.max);
        EventBus.emit('player:statChanged', stat, s.value);
        // console.log(
        //     'after setting, coin value is ' + this.getStat(PlayerStats.COINS)
        // );
    }
    getStat(stat) {
        return this.#stats[stat].value;
    }
    getMaxStat(stat) {
        return this.#stats[stat].max;
    }
    getAllPlayerStats() {
        return Object.fromEntries(
            Object.entries(this.#stats).map(([key, stat]) => [key, stat.value])
        );
    }
    // next day
    payDay() {
        const wage = Phaser.Math.Between(1, 10);
        this.setStat(PlayerStats.COINS, wage);
        return wage;
    }
    resetAll() {
        this.#stats = JSON.parse(JSON.stringify(this.initialStats));
        for (const stat in this.#stats) {
            EventBus.emit('player:statChanged', stat, this.#stats[stat].value);
        }
        console.log(this.getStat(PlayerStats.COINS));
    }
}

export const playerState = PlayerState.getInstance();
