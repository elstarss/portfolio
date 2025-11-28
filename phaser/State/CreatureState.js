class CreatureState {
    #name = '';
    #age = 0;
    #hungerLevel = 8;
    #maxHunger = 10;
    #cleanLevel = 8;
    #maxClean = 10;
    #joyLevel = 5;
    #maxJoy = 10;
    #friendshipLevel = 0;

    static getInstance() {
        if (!CreatureState.instance) {
            CreatureState.instance = new CreatureState();
        }
        return CreatureState.instance;
    }

    getName() {
        return this.#name;
    }
    setName(newName) {
        this.#name = newName;
    }
    getAge() {
        return this.#age;
    }
    setAge(changeValue) {
        this.#age += changeValue;
    }
    getHungerLevel() {
        return this.#hungerLevel;
    }
    setHungerLevel(changeValue) {
        if (changeValue > 0 && this.#hungerLevel >= this.#maxHunger) {
            return;
        } else if (changeValue < 0 && this.#hungerLevel == 0) return;
        else this.#hungerLevel += changeValue;
    }
    getMaxHunger() {
        return this.#maxHunger;
    }
    getCleanLevel() {
        return this.#cleanLevel;
    }
    setCleanLevel(changeValue) {
        this.#cleanLevel += changeValue;
    }
    getMaxClean() {
        return this.#maxClean;
    }
    getJoyLevel() {
        return this.#joyLevel;
    }
    setJoyLevel(changeValue) {
        this.#joyLevel += changeValue;
    }
    getMaxJoy() {
        return this.#maxJoy;
    }
    getFriendshipLevel() {
        return this.#friendshipLevel;
    }
    setFriendshipLevel(changeValue) {
        this.#friendshipLevel += changeValue;
    }

    getAllCreatureStats() {
        return {
            age: this.#age,
            hungerLevel: this.#hungerLevel,
            cleanLevel: this.#cleanLevel,
            friendshipLevel: this.#friendshipLevel,
            joyLevel: this.#joyLevel
        };
    }
}

export const creatureState = CreatureState.getInstance();
