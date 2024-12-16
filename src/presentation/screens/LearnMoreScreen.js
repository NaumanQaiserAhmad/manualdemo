import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const LearnMoreScreen = ({ route, navigation }) => {
  const { learnMoreData, index, totalScreens } = route.params; // Access params passed from LandingScreen
  const currentData = learnMoreData[index]; // Get current screen data

  const handleNext = () => {
    if (index < totalScreens - 1) {
      navigation.navigate('LearnMore', { 
        learnMoreData: learnMoreData,
        index: index + 1, // Move to the next screen
        totalScreens: totalScreens,
      });
    } else {
      navigation.navigate('Landing'); // Navigate back to Landing when done
    }
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>{currentData.title}</Text>

      {/* Image */}
      <Image source={{ uri: currentData.imageUrl }} style={styles.image} />

      {/* Description */}
      <Text style={styles.description}>{currentData.description}</Text>

      {/* Next or Done Button */}
      {index < totalScreens - 1 ? (
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.doneButton} onPress={() => navigation.navigate('Landing')}>
          <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#e6f0e2',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d3d3a',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 40,
    color: '#2d3d3a',
  },
  nextButton: {
    backgroundColor: '#9b2d2d',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 5,
  },
  doneButton: {
    backgroundColor: '#2d3d3a',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LearnMoreScreen;
