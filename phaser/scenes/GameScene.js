import { Creature } from '../Creature.js';
import { creatureState } from '../State/CreatureState.js';
export class GameScene extends Phaser.Scene {
    creature;
    constructor() {
        super('GameScene');
    }
    create() {
        this.scene.launch('UIScene');

        // bg
        const background = this.add
            .image(0, 0, 'bg')
            .setOrigin(0)
            .setDisplaySize(this.scale.width, this.scale.height);
        background.setDepth(0);

        // creature
        this.creature = new Creature(this, 200, 200, 'rolly', 0);
        this.creature.setDepth(1);

        // things i might want to use
        const emitter = new Phaser.Events.EventEmitter();

        console.log(creatureState.getAllCreatureStats());
    }

    update() {}
}
