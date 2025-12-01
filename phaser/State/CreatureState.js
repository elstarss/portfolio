import { CreatureStats } from './Stats.js';
import { EventBus } from '../Utilities/EventBus.js';
import { playerState } from './PlayerState.js';
class CreatureState {
    #name = 'Creature';
    #stats = {
        [CreatureStats.HUNGER]: { value: 8, max: 10 },
        [CreatureStats.CLEAN]: { value: 8, max: 10 },
        [CreatureStats.JOY]: { value: 5, max: 10 },
        [CreatureStats.FRIENDSHIP]: { value: 0, max: Infinity },
        [CreatureStats.AGE]: { value: 0, max: Infinity }
    };

    static getInstance() {
        if (!CreatureState.instance) {
            CreatureState.instance = new CreatureState();
        }
        return CreatureState.instance;
    }
    setStat(stat, change) {
        const s = this.#stats[stat];
        s.value = Phaser.Math.Clamp(s.value + change, 0, s.max);
        EventBus.emit('creature:statChanged', stat, s.value);
        console.log(`creature setStat: new ${stat} stat: ${s.value}`);
    }
    getStat(stat) {
        return this.#stats[stat].value;
    }
    getMaxStat(stat) {
        return this.#stats[stat].max;
    }
    getName() {
        return this.#name;
    }
    setName(newName) {
        this.#name = newName;
    }

    age(amount = 1) {
        this.setStat(CreatureStats.AGE, amount);
    }
    decreaseStatsForNextDay(
        statsToDecrease = [
            CreatureStats.HUNGER,
            CreatureStats.JOY,
            CreatureStats.CLEAN
        ]
    ) {
        for (let i = 0; i < statsToDecrease.length; i++) {
            let randomNumber = Phaser.Math.Between(0, 5);
            this.setStat(statsToDecrease[i], -randomNumber);
        }
    }
    getAllCreatureStats() {
        return Object.fromEntries(
            Object.entries(this.#stats).map(([key, stat]) => [key, stat.value])
        );
    }
}

export const creatureState = CreatureState.getInstance();
