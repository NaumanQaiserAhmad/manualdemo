import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ResultScreen = ({ route, navigation }) => {
  const { message } = route.params;

  // Hide the action bar (header) on this screen
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,  // This removes the default header
    });
  }, [navigation]);

  // Ensure the message is a string, or set a default message if not
  const validMessage = typeof message === 'string' ? message : 'No message available';

  return (
    <View style={styles.container}>
      {/* Custom Header without an icon */}
      <View style={styles.customHeader}>
        <Text style={styles.headerTitle}>Quiz</Text>
      </View>

      {/* Message Text - Centered */}
      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>{validMessage}</Text> {/* Render message as simple text */}
      </View>

      {/* OK Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity 
          style={styles.okButton} 
          onPress={() => navigation.navigate('Landing')}
        >
          <Text style={styles.okButtonText}>OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f0e2',
    justifyContent: 'center',  // Vertically center all content
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 50,
  },
  customHeader: {
    width: '100%',
    height: 60,
    backgroundColor: '#e6f0e2',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3d3a',
    textAlign: 'center',
  },
  messageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80, // Adjusted for custom header height
    marginBottom: 40,
    paddingHorizontal: 30,
    flex: 1,  // Ensures the message container takes up remaining space
  },
  messageText: {
    fontSize: 18,
    color: '#2d3d3a',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'TTNormsProRegular',  // Custom font
  },
  bottomContainer: {
    justifyContent: 'flex-end',  // Pushes the button to the bottom
    alignItems: 'center',
    marginBottom: 40,  // Padding at the bottom for spacing
    width: '100%',
  },
  okButton: {
    padding: 15,
    backgroundColor: '#0B3B3C',
    borderRadius: 50,
    width: '80%',
  },
  okButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'TTNormsProRegular',
  },
});

export default ResultScreen;
