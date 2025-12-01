import { creatureState } from '../State/CreatureState.js';
export default class UIBar {
    constructor(scene, x, y, width, height, statName, iconKey, colour) {
        this.scene = scene;
        this.statName = statName;
        this.width = width;
        this.height = height;
        this.maxValue = creatureState.getMaxStat(statName);
        this.targetValue = creatureState.getStat(statName);
        this.displayValue = this.targetValue / this.maxValue;

        // icon
        this.icon = scene.add
            .image(x - 40, y + height / 2, iconKey)
            .setOrigin(0.5)
            .setScale(0.6);

        // bg
        this.bg = scene.add
            .rectangle(x, y, width, height, 0x444444)
            .setOrigin(0)
            .setStrokeStyle(2, 0x000000);

        // coloured bar
        this.bar = scene.add
            .rectangle(x, y, width, height, colour)
            .setOrigin(0);
        this.setInstantValue(this.targetValue);
    }

    setInstantValue(value) {
        const percent = value / this.maxValue;
        this.bar.width = this.width * percent;
    }

    update() {
        const percent = this.targetValue / this.maxValue;
        this.displayValue = Phaser.Math.Linear(this.displayValue, percent, 0.1);
        this.bar.width = this.width * this.displayValue;
    }
}
