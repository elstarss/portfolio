import { creatureState } from '../State/CreatureState.js';
import { CreatureStats } from '../State/CreatureStats.js';

export const DayTransitionHandler = {
    async start(scene) {
        const camera = scene.cameras.main;
        await cameraFade(camera, 800);
        creatureState.age();
        creatureState.decreaseStatsForNextDay();
        creatureState.payDay();
        displayText(scene);
        await cameraFadeIn(camera, 800);
    }
};

function cameraFade(camera, duration) {
    return new Promise((resolve) => {
        camera.fadeOut(duration);
        camera.once('camerafadeoutcomplete', resolve);
    });
}

function displayText(scene) {
    const text = scene.add
        .text(
            scene.scale.width / 2,
            scene.scale.height / 2,
            `${creatureState.getName()} is ${creatureState.getStat(
                CreatureStats.AGE
            )}`,
            {
                fontFamily: 'MS PGothic',
                fontSize: 48,
                color: '#5f2199ff'
            }
        )
        .setOrigin(0.5);
    text.alpha = 0;
    scene.tweens.add({
        targets: text,
        alpha: 1,
        duration: 600,
        yoyo: true,
        hold: 400,
        onComplete: () => {
            text.destroy();
        }
    });
}

function cameraFadeIn(camera, duration) {
    return new Promise((resolve) => {
        camera.fadeIn(duration);
        camera.once('camerafadeincomplete', resolve);
    });
}
