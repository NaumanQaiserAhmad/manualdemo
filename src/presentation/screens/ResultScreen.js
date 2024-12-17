import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';

const ResultScreen = ({ route, navigation }) => {
  const { message } = route.params;

  // Hide the action bar (header) on this screen
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,  // This removes the default header
    });
  }, [navigation]);

  // Function to handle the link press
  const handleLinkPress = (url) => {
    Linking.openURL(url);
  };

  // Function to render the message with clickable URLs
  const renderMessageWithLink = (message) => {
    // Regex to exactly match www.manual.co or www.manual.com
    const urlRegex = /(www\.manual\.(co|com))/g;

    // Split the message into parts
    const parts = message.split(urlRegex);  // Split the message by URLs

    return parts.map((part, index) => {
      // Check if the part is a URL
      if (urlRegex.test(part)) {
        return (
          <Text
            key={index}
            style={styles.linkText}
            onPress={() => handleLinkPress(`https://${part}`)}  // Make the URL clickable, add https:// if missing
          >
            {part}
          </Text>
        );
      }
      // Regular text
      return <Text key={index} style={styles.messageText}>{part}</Text>;
    });
  };

  return (
    <View style={styles.container}>
      {/* Custom Header without an icon */}
      <View style={styles.customHeader}>
        <Text style={styles.headerTitle}>Quiz</Text>
      </View>

      {/* Message Text - Centered */}
      <View style={styles.messageContainer}>
        {renderMessageWithLink(message)} {/* Render message with clickable links */}
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
    marginTop: 100, // Adjust for custom header height
    marginBottom: 40,
    paddingHorizontal: 30,
  },
  messageText: {
    fontSize: 18,
    color: '#2d3d3a',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'TTNormsProRegular',  // Custom font
  },
  linkText: {
    fontSize: 18,
    color: '#0066cc',  // Color for clickable links
    textDecorationLine: 'underline',  // Underlined for links
  },
  bottomContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 40,
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
