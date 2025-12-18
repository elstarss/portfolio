import { CreatureStats } from './Stats.js';
import { EventBus } from '../Utilities/EventBus.js';
class CreatureState {
    #name = 'Fluffy';
    #stats = {
        [CreatureStats.HUNGER]: { value: 8, max: 10 },
        [CreatureStats.CLEAN]: { value: 8, max: 10 },
        [CreatureStats.JOY]: { value: 8, max: 10 },
        [CreatureStats.FRIENDSHIP]: { value: 0, max: 50000 },
        [CreatureStats.AGE]: { value: 0, max: 50000 }
    };
    #accessoriesOn = [];
    constructor() {
        this.initialStats = JSON.parse(JSON.stringify(this.#stats));
    }
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
        // console.log(`creature setStat: new ${stat} stat: ${s.value}`);
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
    howIsCreatureFeeling() {
        const percentageHappy = this._getStatsAverage();
        if (this.areStatsEmpty()) {
            return 'sad';
        } else if (percentageHappy == 100) {
            return 'excited';
        } else if (percentageHappy <= 20) {
            return 'sad';
        } else if (percentageHappy <= 50) {
            return 'neutral';
        } else {
            return 'happy';
        }
    }
    _getStatsAverage(
        statsToCheck = [
            CreatureStats.HUNGER,
            CreatureStats.JOY,
            CreatureStats.CLEAN
        ]
    ) {
        let statsTotalActual = 0;
        let statsMax = 0;
        for (let i = 0; i < statsToCheck.length; i++) {
            statsMax += this.getMaxStat(statsToCheck[i]);
            statsTotalActual += this.getStat(statsToCheck[i]);
        }
        const percentageTotal = (statsTotalActual / statsMax) * 100;
        return percentageTotal;
    }
    getAllCreatureStats() {
        return Object.fromEntries(
            Object.entries(this.#stats).map(([key, stat]) => [key, stat.value])
        );
    }
    areStatsEmpty(
        statsToCheck = [
            CreatureStats.HUNGER,
            CreatureStats.JOY,
            CreatureStats.CLEAN
        ]
    ) {
        let emptyStatsArr = [];
        for (let i = 0; i < statsToCheck.length; i++) {
            if (this.getStat(statsToCheck[i]) <= 0) {
                emptyStatsArr.push(statsToCheck[i]);
            }
        }
        return emptyStatsArr.length == 0 ? false : emptyStatsArr;
    }
    // equipAccessory(accessoryKey) {
    //     if (this.#accessoriesOn[accessoryKey]) return;
    //     else this.#accessoriesOn.push(accessoryKey);
    //     console.log(this.#accessoriesOn);
    // }

    resetAll() {
        this.#stats = JSON.parse(JSON.stringify(this.initialStats));
        for (const stat in this.#stats) {
            EventBus.emit(
                'creature:statChanged',
                stat,
                this.#stats[stat].value
            );
        }
    }
}

export const creatureState = CreatureState.getInstance();
