import { creatureState } from '../State/CreatureState.js';

export default class Button extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, effect) {
        super(scene, x, y, texture, frame);
        this.effect = effect;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setInteractive();
    }
    interact() {
        console.log('pressed ' + this.effect + ' button');

        if (this.effect === 'feed') creatureState.setHungerLevel(1);
        if (this.effect === 'pet') creatureState.setJoyLevel(1);
        if (this.effect === 'next-day') creatureState.setAge(1);

        console.log(creatureState.getAllCreatureStats());
    }
}
