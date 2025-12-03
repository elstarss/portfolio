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
        this.colour = colour;
        this.isIconPulsing = false;

        // icon
        this.icon = scene.add
            .image(x - 40, y + height / 2, iconKey)
            .setOrigin(0.5)
            .setScale(0.8);

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
        const percentageFull = this.targetValue / this.maxValue;
        this.displayValue = Phaser.Math.Linear(
            this.displayValue,
            percentageFull,
            0.1
        );
        this.bar.width = this.width * this.displayValue;

        if (percentageFull > 0.2 && percentageFull <= 0.35) {
            this.bar.setFillStyle(this.colour);
            if (!this.isIconPulsing) {
                this.isIconPulsing = true;
                this.iconPulseTween = this.scene.tweens.add({
                    targets: this.icon,
                    scale: 1.1,
                    yoyo: true,
                    repeat: -1,
                    duration: 800
                });
            }
        } else if (percentageFull <= 0.2) {
            this.bar.setFillStyle(0xff0000);
            if (!this.isIconPulsing) {
                this.isIconPulsing = true;
                this.iconPulseTween = this.scene.tweens.add({
                    targets: this.icon,
                    scale: 1.15,
                    yoyo: true,
                    repeat: -1,
                    duration: 250
                });
            }
        } else {
            this.bar.setFillStyle(this.colour);

            if (this.isIconPulsing) {
                this.isIconPulsing = false;
                if (this.iconPulseTween) {
                    this.iconPulseTween.stop();
                    this.iconPulseTween = null;
                }
                this.icon.setScale(1); // reset icon
            }
        }
    }
}
