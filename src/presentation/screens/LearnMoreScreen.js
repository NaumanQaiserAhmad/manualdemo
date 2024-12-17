import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GetLearnMoreData from '../../domain/usecases/GetLearnMoreData';
import Ionicons from 'react-native-vector-icons/Ionicons'; // For the close/cancel icon

const LearnMoreScreen = ({ route }) => {
  const { index } = route.params;
  const [learnMoreData, setLearnMoreData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  // Fetch the data when the component mounts
  useEffect(() => {
    const data = GetLearnMoreData.getLearnMoreData(); // Fetch data from the use case
    setLearnMoreData(data); // Set the data into state

    // Hide the header (action bar)
    navigation.setOptions({
      headerShown: false,  // This removes the default header
    });

    setIsLoading(false); // Set loading to false once data is fetched
  }, []);

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

  // If currentData is undefined (invalid index), show loading or error state
  if (!currentData) {
    return (
      <View style={styles.container}>
        <Text>Data not available</Text>
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
        index: index + 1,
      });
    } else {
      navigation.navigate('Landing');
    }
  };

  return (
    <View style={styles.container}>
      {/* Custom Header Container */}
      <View style={styles.customHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={30} color="#2d3d3a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>What can we help with</Text>
      </View>

      {/* Top Content Section */}
      <View style={styles.topContainer}>
        {/* Image */}
        <Image source={getImageSource()} style={styles.image} />

        {/* Title */}
        <Text style={styles.header}>{currentData.header}</Text>
        <Text style={styles.title}>{currentData.title}</Text>

        {/* Description */}
        <Text style={styles.subtitle}>{currentData.subtitle}</Text>
      </View>

      {/* Bottom Container for Buttons */}
      <View style={styles.bottomContainer}>
        {/* Next or Done Button */}
        {index < learnMoreData.length - 1 ? (
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.doneButton} onPress={() => navigation.navigate('Landing')}>
            <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f0e2',
    marginTop: 50, // Adjust for custom header
  },
  customHeader: {
    width: '100%',
    height: 50,
    backgroundColor: '#e6f0e2',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    position: 'absolute',
    top: 0,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3d3a',
    textAlign: 'center',
    flex: 1,
    fontFamily: 'TTNormsProRegular', // Apply custom font
  },
  topContainer: {
    flex: 2,  // Adjust this to control the space it takes
    justifyContent: 'center',  // Center content vertically
    alignItems: 'center',
    paddingTop: 70,  // Adjusted for custom header height
    paddingHorizontal: 20,
  },
  image: {
    height: 200,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    alignSelf: 'center',
  },
  header: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2d3d3a',
    marginBottom: 10,
    textAlign: 'left',
    width: '100%',
    paddingLeft: 0,
    fontFamily: 'TTNormsProRegular', // Apply custom font
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2d3d3a',
    textAlign: 'left',
    marginBottom: 15,
    width: '100%',
    fontFamily: 'TTNormsProRegular', // Apply custom font
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 40,
    textAlign: 'left',
    color: '#2d3d3a',
    lineHeight: 24,
    width: '100%',
    fontFamily: 'TTNormsProRegular', // Apply custom font
  },
  bottomContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 40,
  },
  nextButton: {
    backgroundColor: '#2d3d3a',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 50,
    width: '80%', // Control the width of the button
    marginTop: 20,
  
  },
  doneButton: {
    backgroundColor: '#2d3d3a',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 50,
    width: '80%', // Control the width of the button
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'TTNormsProRegular', // Apply custom font
  },
});

export default LearnMoreScreen;
