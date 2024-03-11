// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Hello My world!</Text>
//       <Text>My world == Pratiksha!</Text>

//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });



import React, { useState } from 'react';
import { StatusBar, StyleSheet, Text, View, Image, TouchableOpacity, Animated, PanResponder } from 'react-native';
import pratikshaImage from './assets/pratzz.jpeg';

export default function App() {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [pan] = useState(new Animated.ValueXY());
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([
      null,
      { dx: pan.x, dy: pan.y }
    ]),
    onPanResponderRelease: (e, gesture) => {
      if (gesture.dx > 120) {
        setLiked(true);
        resetPosition();
      } else if (gesture.dx < -120) {
        setDisliked(true);
        resetPosition();
      } else {
        resetPosition();
      }
    }
  });

  const resetPosition = () => {
    Animated.spring(pan, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false
    }).start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.appHeading}>Dating App</Text>
      <Animated.View
        {...panResponder.panHandlers}
        style={[pan.getLayout(), styles.profileCard]}
      >
        <Image
          source={pratikshaImage}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Pratiksha</Text>
        <Text style={styles.profileDetails}>Charming | Cool</Text>
        <Text style={styles.profileBio}>Hello! I'm Pratiksha. I love watching animated movies and exploring new hobbies.</Text>
      </Animated.View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, liked && styles.likedButton]}
          onPress={() => {
            setLiked(true);
            resetPosition();
          }}
          disabled={liked || disliked}
        >
          <Text style={styles.buttonText}>Like</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, disliked && styles.dislikedButton]}
          onPress={() => {
            setDisliked(true);
            resetPosition();
          }}
          disabled={liked || disliked}
        >
          <Text style={styles.buttonText}>Dislike</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileCard: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    transform: [{ rotate: '-5deg' }],
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  profileDetails: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  profileBio: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 25,
    marginHorizontal: 10,
  },
  likedButton: {
    backgroundColor: '#4CAF50',
  },
  dislikedButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
