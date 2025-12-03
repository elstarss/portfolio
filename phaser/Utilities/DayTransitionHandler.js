import { creatureState } from '../State/CreatureState.js';
import { playerState } from '../State/PlayerState.js';
import { CreatureStats } from '../State/Stats.js';

export const DayTransitionHandler = {
    async start(scene) {
        const camera = scene.cameras.main;
        await cameraFade(camera, 800);
        creatureState.age();
        creatureState.decreaseStatsForNextDay();
        const wage = playerState.payDay();
        displayText(scene, wage);
        await cameraFadeIn(camera, 800);
    }
};

function cameraFade(camera, duration) {
    return new Promise((resolve) => {
        camera.fadeOut(duration);
        camera.once('camerafadeoutcomplete', resolve);
    });
}

function displayText(scene, wage) {
    const text = scene.add
        .text(
            300,
            150,
            `${creatureState.getName()} is ${creatureState.getStat(
                CreatureStats.AGE
            )} today! \n\nyou earned ${wage} coins.`,
            {
                fontFamily: 'MS PGothic',
                fontSize: 32,
                fontStyle: 'bold',
                color: '#5f2199ff',
                shadow: {
                    offsetX: 0.9,
                    offsetY: 0.9,
                    color: '#4c1b7aff',
                    fill: true
                }
            }
        )
        .setOrigin(0.5);
    text.alpha = 0;
    scene.tweens.add({
        targets: text,
        alpha: 1,
        duration: 600,
        yoyo: true,
        hold: 1500,
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
