import { CreatureStats } from './CreatureStats.js';
class CreatureState {
    #name = '';
    #stats = {
        [CreatureStats.HUNGER]: { value: 8, max: 10 },
        [CreatureStats.CLEAN]: { value: 8, max: 10 },
        [CreatureStats.JOY]: { value: 5, max: 10 },
        [CreatureStats.FRIENDSHIP]: { value: 0, max: Infinity },
        [CreatureStats.AGE]: { value: 0, max: Infinity }
    };
    emitter = new Phaser.Events.EventEmitter();

    static getInstance() {
        if (!CreatureState.instance) {
            CreatureState.instance = new CreatureState();
        }
        return CreatureState.instance;
    }
    _setStat(stat, change) {
        const s = this.#stats[stat];
        s.value = Phaser.Math.Clamp(s.value + change, 0, s.max);
        this.emitter.emit('statChanged', stat, s.value);
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
    feed(amount = 1) {
        this._setStat(CreatureStats.HUNGER, amount);
    }
    play(amount = 1) {
        this._setStat(CreatureStats.JOY, amount);
    }
    clean(amount = 1) {
        this._setStat(CreatureStats.CLEAN, amount);
    }
    age(amount = 1) {
        this._setStat(CreatureStats.AGE, amount);
    }

    getAllCreatureStats() {
        return Object.fromEntries(
            Object.entries(this.#stats).map(([key, stat]) => [key, stat.value])
        );
    }
}

export const creatureState = CreatureState.getInstance();
