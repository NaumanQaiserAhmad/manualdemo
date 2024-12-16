import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ResultScreen = ({ route, navigation }) => {
  const { message } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.messageText}>{message}</Text>

      {/* OK Button */}
      <TouchableOpacity 
        style={styles.okButton} 
        onPress={() => navigation.navigate('Landing')}
      >
        <Text style={styles.okButtonText}>OK</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#e6f0e2', // Light green background matching the quiz screen
  },
  messageText: {
    fontSize: 18,
    color: '#2d3d3a',  // Dark green for the message
    textAlign: 'center',
    marginBottom: 40,  // Spacing between the message and button
    paddingHorizontal: 30,  // Ensure padding so the text doesn't touch the sides
  },
  okButton: {
    padding: 15,
    backgroundColor: '#0B3B3C',
    borderRadius: 50, // Make the Next button round
    width: '80%',  // Ensure button is appropriately sized
  },
  okButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});

export default ResultScreen;
