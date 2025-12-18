import { CreatureContainer } from './CreatureContainer.js';
export class ManualCreatureContainer extends CreatureContainer {
    mood;

    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.useState = false;
    }
    setMood(mood) {
        this.mood = mood;
    }
    getMood() {
        return this.mood;
    }

    updateMood() {
        const mood = this.mood;
        if (mood === 'neutral') this.playNeutralIdle();
        else if (mood === 'happy') this.playHappyIdle();
        else if (mood === 'walking') this.playWalk();
        else if (mood === 'excited') {
            this.playExcitedIdle();
        }
    }
}
