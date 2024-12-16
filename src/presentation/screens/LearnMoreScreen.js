import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GetLearnMoreData from '../../domain/usecases/GetLearnMoreData';

const LearnMoreScreen = ({ route }) => {
  const { index } = route.params; // Get the index of the current screen
  const [learnMoreData, setLearnMoreData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const navigation = useNavigation();

  // Fetch the data when the component mounts
  useEffect(() => {
    const data = GetLearnMoreData.getLearnMoreData(); // Fetch data from the use case
    setLearnMoreData(data); // Set the data into state
    setIsLoading(false); // Set loading to false once data is fetched
    console.log("Loaded Data: ", data); // Add debug log to check data
  }, []);

  // Hide the default header (action bar)
  useEffect(() => {
    navigation.setOptions({
      headerShown: false, // Hide the default header
    });
  }, [navigation]);

  // If data is still loading, show loading spinner
  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Get current data based on the index
  const currentData = learnMoreData[index];
  console.log("Current Data: ", currentData); // Log current data to verify it

  // If currentData is undefined (invalid index), show loading or error state
  if (!currentData) {
    return (
      <View style={styles.container}>
        <Text>Data not available</Text> {/* Ensure error message is inside <Text> */}
      </View>
    );
  }

  // Function to handle the image loading based on the index
  const getImageSource = () => {
    if (index === 0) {
      return require('../../assets/images/group1.png'); // Path to your first image
    } else if (index === 1) {
      return require('../../assets/images/group2.png'); // Path to your second image
    }
    return require('../../assets/images/group2.png'); // Optional fallback image
  };

  const handleNext = () => {
    if (index < learnMoreData.length - 1) {
      navigation.navigate('LearnMore', { 
        index: index + 1, // Move to the next screen
      });
    } else {
      navigation.navigate('Landing'); // Navigate back to Landing when done
    }
  };

  return (
    <View style={styles.container}>
      {/* Image */}
      <Image source={getImageSource()} style={styles.image} />

      {/* Title */}
      <Text style={styles.header}>{currentData.header}</Text>
      <Text style={styles.title}>{currentData.title}</Text>

      {/* Description */}
      <Text style={styles.subtitle}>{currentData.subtitle}</Text>

      {/* Next or Done Button */}
      {index < learnMoreData.length - 1 ? (
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text> {/* Text inside <Text> */}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.doneButton} onPress={() => navigation.navigate('Landing')}>
          <Text style={styles.buttonText}>Done</Text> {/* Text inside <Text> */}
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
  image: {
    height: 200,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    alignSelf: 'center', // Centers the image horizontally
  },
  header: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2d3d3a',
    marginBottom: 10,
    textAlign: 'left', // Aligns text to the left
    width: '100%', // Ensures that the text container spans the full width of its parent
    paddingLeft: 20, // Optional padding to ensure some space from the left edge
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2d3d3a',
    textAlign: 'left', // Aligns text to the left
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 40,
    textAlign: 'left', // Aligns text to the left
    color: '#2d3d3a',
    lineHeight: 24,
  },
  nextButton: {
    backgroundColor: '#9b2d2d',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 50,
    marginTop: 20,
  },
  doneButton: {
    backgroundColor: '#2d3d3a',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 50,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LearnMoreScreen;
