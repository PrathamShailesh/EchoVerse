// src/SoundManager.ts
import { Audio } from 'expo-av';

class SoundManager {
  private static sound: Audio.Sound | null = null;

  static async playSound(uri: any) {
    // If a sound is already playing, stop and unload it
    if (SoundManager.sound) {
      await SoundManager.sound.stopAsync();
      await SoundManager.sound.unloadAsync();
    }

    // Create a new sound instance and play it
    const { sound } = await Audio.Sound.createAsync(uri);
    SoundManager.sound = sound;
    await SoundManager.sound.playAsync();
  }

  static async pauseSound() {
    if (SoundManager.sound) {
      await SoundManager.sound.pauseAsync();
    }
  }

  static async stopSound() {
    if (SoundManager.sound) {
      await SoundManager.sound.stopAsync();
      await SoundManager.sound.unloadAsync();
      SoundManager.sound = null;
    }
  }

  static getSoundInstance() {
    return SoundManager.sound;
  }
}

export default SoundManager;
