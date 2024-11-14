import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import SoundManager from '../SoundManager';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, runOnJS } from 'react-native-reanimated';

const { height } = Dimensions.get('window');

const songs = [
  { id: '1', title: 'Song One', uri: require('../../assets/sample1.mp3') },
  { id: '2', title: 'Song Two', uri: require('../../assets/sample2.mp3') },
  { id: '3', title: 'Song Three', uri: require('../../assets/sample3.mp3') },
];

const PlayerScreen = ({ route }) => {
  const { songId } = route.params; // Retrieve the songId passed from PlaylistScreen
  const initialIndex = songs.findIndex((song) => song.id === songId); // Find the initial song index
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const translateY = useSharedValue(0);

  const loadAndPlaySound = async (index: number) => {
    const songUri = songs[index].uri;
    await SoundManager.playSound(songUri); // Use SoundManager to play the sound
  };

  useEffect(() => {
    loadAndPlaySound(currentIndex);

    return () => {
      SoundManager.stopSound();
    };
  }, [currentIndex]);

  const handleSwipe = (direction: 'up' | 'down') => {
    let newIndex = currentIndex;

    if (direction === 'up' && currentIndex < songs.length - 1) {
      newIndex = currentIndex + 1;
    } else if (direction === 'down' && currentIndex > 0) {
      newIndex = currentIndex - 1;
    }

    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }
  };

  const onGestureEvent = ({ nativeEvent }) => {
    translateY.value = nativeEvent.translationY;
  };

  const onHandlerStateChange = ({ nativeEvent }) => {
    if (nativeEvent.state === 5) { // 5 means 'ENDED' state in gesture handler
      if (nativeEvent.translationY < -height / 3) {
        runOnJS(handleSwipe)('up');
      } else if (nativeEvent.translationY > height / 3) {
        runOnJS(handleSwipe)('down');
      }
      translateY.value = withSpring(0);
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent} onHandlerStateChange={onHandlerStateChange}>
      <Animated.View style={[styles.container, animatedStyle]}>
        <Text style={styles.title}>Now Playing</Text>
        <Text style={styles.songTitle}>{songs[currentIndex].title}</Text>
        <Text style={styles.instruction}>Swipe up for next song, down for previous</Text>
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height,
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
  instruction: {
    fontSize: 14,
    color: '#888',
    marginTop: 20,
  },
});

export default PlayerScreen;
