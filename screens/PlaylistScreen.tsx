import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PlaylistScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Playlist</Text>
      {/* Here we'll add a list of songs */}
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
  },
});

export default PlaylistScreen;
