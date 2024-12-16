import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const LandingScreen = ({ navigation }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Using require to load JSON data from the assets folder
    const learnMoreData = require('../../assets/learnMoreData.json');  // Adjust the path as needed
    setData(learnMoreData.data);  // Set the JSON data to the state

    // Remove the header (action bar) for this screen
    navigation.setOptions({
      headerShown: false,  // This removes the default header
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Top content container (logo) */}
      <View style={styles.topContainer}>
        {/* Logo */}
        <Image
          source={require('../../assets/images/symbol.png')}  // Replace with actual logo file location
          style={styles.logo}
        />
      </View>

      {/* Centered content container (title and subtitle) */}
      <View style={styles.centeredContainer}>
        {/* Title */}
        <Text style={styles.title}>Be good to yourself</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          We’re working around the clock to bring you a holistic approach to your wellness.
          From top to bottom, inside and out.
        </Text>
      </View>

      {/* Bottom content container (buttons) */}
      <View style={styles.bottomContainer}>
        {/* Learn More Button (Underlined Text) */}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('LearnMore', {
              learnMoreData: data, // Pass the loaded data to LearnMore screen
              index: 0,
              totalScreens: data.length,
            })
          }>
          <Text style={styles.learnMoreText}>LEARN MORE</Text>
        </TouchableOpacity>

        {/* Take the Quiz Button */}
        <TouchableOpacity
          style={styles.takeQuizButton}
          onPress={() => navigation.navigate('Quiz')} // Navigate to the Quiz screen
        >
          <Text style={styles.takeQuizText}>TAKE THE QUIZ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A5B79F', // Light green background
    paddingHorizontal: 20,
  },
  topContainer: {
    flex: 1,  // Takes up the remaining space
    justifyContent: 'flex-start',  // Align items to the top
    alignItems: 'center',  // Center the logo horizontally
    marginTop: 0,  // Added margin-top for better alignment
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: 150, // Adjust logo size and margin
  },
  centeredContainer: {
    flex: 1,  // Takes up the remaining space
    justifyContent: 'flex-start',  // Align items to the top
    alignItems: 'center',  // Center horizontally
  },
  title: {
    fontSize: 52,  // Adjusted size for better balance
    fontWeight: 'bold',
    color: '#2d3d3a', // Dark green color
    textAlign: 'center',
    marginBottom: 10, // Reduced space between title and subtitle
  },
  subtitle: {
    fontSize: 18,
    color: '#2d3d3a',
    textAlign: 'center',
    marginBottom: 30,  // Reduced margin to bring it closer to buttons
    marginHorizontal: 10,
  },
  bottomContainer: {
    justifyContent: 'flex-end', // Align the buttons to the bottom
    alignItems: 'center', // Center the buttons horizontally
    marginBottom: 40, // Padding at the bottom for spacing
  },
  learnMoreText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2d3d3a',
    textAlign: 'center',
    textDecorationLine: 'underline', // Underlined text for Learn More button
    marginBottom: 10,  // Reduced margin to bring it closer to Take the Quiz button
  },
  takeQuizButton: {
    backgroundColor: '#9b2d2d',  // Dark red for the button
    paddingVertical: 15,  // Adjust vertical padding for better size
    paddingHorizontal: 60,  // Adjust horizontal padding for a larger button
    borderRadius: 50, // Rounded corners for the button
    width: '80%', // Control the width of the button
    marginBottom: 20, // Add margin at the bottom to ensure spacing
  },
  takeQuizText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});

export default LandingScreen;
