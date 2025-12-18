import { AUDIO } from '../State/Events.js';
import { EventBus } from './EventBus.js';

export class AudioManager {
    scene;
    bgMusic;
    isMuted = false;
    volume;

    constructor(scene, volume = 1) {
        this.scene = scene;
        this.volume = volume;

        EventBus.on(AUDIO.PLAY_MUSIC, (args) => {
            const key = args;
            this.playMusic(key);
        });
        EventBus.on(AUDIO.STOP_MUSIC, () => this.stopMusic());
        EventBus.on(AUDIO.TOGGLE_MUTE, () => this.toggleMute());

        EventBus.on(AUDIO.PLAY_SFX, (args) => {
            const key = args;
            this.playSfx(key);
        });
    }

    playMusic(key, loop = true) {
        if (this.bgMusic && this.bgMusic.isPlaying) return;
        this.bgMusic = this.scene.sound.add(key, {
            loop,
            volume: this.isMuted ? 0 : this.volume
        });
        this.bgMusic.play();
    }
    stopMusic() {
        this.bgMusic?.stop();
        this.bgMusic?.destroy();
        this.bgMusic = undefined;
    }

    playSfx(key) {
        this.scene.sound.play(key, { volume: this.isMuted ? 0 : this.volume });
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        if (this.bgMusic) {
            this.bgMusic.setVolume(this.isMuted ? 0 : this.volume);
        }
    }
    setVolume(volume) {
        this.volume = Phaser.Math.Clamp(volume, 0, 1);
        if (this.bgMusic && !this.isMuted) {
            this.bgMusic.setVolume(this.volume);
        }
    }
    getVolume() {
        return this.volume;
    }
    isCurrentlyMuted() {
        return this.isMuted;
    }
}
