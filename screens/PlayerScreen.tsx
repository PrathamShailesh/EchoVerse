import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PlayerScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Now Playing</Text>
      {/* Here we'll add song controls like play, pause, next */}
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

export default PlayerScreen;
