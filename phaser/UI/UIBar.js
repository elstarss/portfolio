export default class UIBar {
    constructor(
        scene = this,
        x,
        y,
        width = 200,
        height = 50,
        maxValue,
        colour = 0x00ff00,
        updateFunction
    ) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.maxValue = maxValue;
        this.currentValue = updateFunction;
        this.colour = colour;
        this.updateFunction = updateFunction;

        this.bg = scene.add
            .rectangle(x, y, width, height, 0x333333)
            .setOrigin(0);
        this.bar = scene.add
            .rectangle(x, y, width, height, colour)
            .setOrigin(0);
    }

    setValue(newValue) {
        this.currentValue = Phaser.Math.Clamp(newValue, 0, this.maxValue);

        const percentage = this.currentValue / this.maxValue;
        this.bar.width = this.width * percentage;
    }

    update() {
        this.setValue(this.updateFunction());
    }
}
