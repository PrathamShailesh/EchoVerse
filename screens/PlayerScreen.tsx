import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';

const PlayerScreen = ({ route }) => {
  const { songTitle } = route.params;
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/sample1.mp3') 
    );
    setSound(sound);
    setIsPlaying(true);
    await sound.playAsync();
  }

  async function pauseSound() {
    if (sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  }

  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Now Playing</Text>
      <Text style={styles.songTitle}>{songTitle}</Text>
      <View style={styles.controls}>
        {isPlaying ? (
          <Button title="Pause" onPress={pauseSound} />
        ) : (
          <Button title="Play" onPress={playSound} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  songTitle: {
    fontSize: 20,
    fontStyle: 'italic',
    marginBottom: 20,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
  },
});

export default PlayerScreen;
