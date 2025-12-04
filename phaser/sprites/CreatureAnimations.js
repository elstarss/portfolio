export default function CreateAnimations(scene) {
    if (scene.anims.exists('creature_idle')) return;
    scene.anims.create({
        key: 'creature_idle',
        frames: scene.anims.generateFrameNumbers('creature', {
            start: 3,
            end: 7
        }),
        frameRate: 4,
        repeat: -1
    });
}
