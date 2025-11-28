export default class UIBar {
    constructor(scene, x, y, width, height, maxValue, colour, statName) {
        this.statName = statName;
        this.maxValue = maxValue;
        this.width = width;
        this.bar = scene.add
            .rectangle(x, y, width, height, colour)
            .setOrigin(0);
    }

    setValue(newValue) {
        const percentage = newValue / this.maxValue;
        this.bar.width = this.width * percentage;
    }
}
