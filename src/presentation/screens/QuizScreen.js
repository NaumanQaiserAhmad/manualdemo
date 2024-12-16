import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const QuizScreen = ({ route }) => {
  const navigation = useNavigation();
  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null); // Track selected option

  // Load the JSON data for quiz questions
  useEffect(() => {
    const loadQuizData = require('../../assets/quizData.json');  // Adjust the path to where the JSON is stored
    setQuizData(loadQuizData.questions); // Assuming the JSON has a "questions" key
    navigation.setOptions({
      headerShown: true,  // Show header with Back button
    });
  }, [navigation]);

  // Handle the selection of an answer
  const handleAnswer = (answer) => {
    setSelectedOption(answer); // Mark the selected option
  };

  // Proceed to the next question
  const handleNext = () => {
    const updatedAnswers = [...answers, selectedOption];
    setAnswers(updatedAnswers);
    setSelectedOption(null);  // Reset the selected option for the next question

    // If the user has reached the last question
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Check for rejection in the answers
      const rejection = updatedAnswers.some((ans) => ans.isRejection);
      if (rejection) {
        navigation.navigate('Result', {
          message: 'Unfortunately, we are unable to prescribe this medication for you. This is because finasteride can alter the PSA levels, which may be used to monitor for cancer. You should discuss this further with your GP or specialist if you would still like this medication.',
        });
      } else {
        navigation.navigate('Result', {
          message: 'Great news! We have the perfect treatment for your hair loss. Proceed to www.manual.co, and prepare to say hello to your new hair!',
        });
      }
    }
  };

  // Check if quizData is available and loaded
  if (!quizData || quizData.length === 0) {
    return <Text>Loading...</Text>; // Loading state
  }

  const currentQuestion = quizData[currentQuestionIndex];

  return (
    <View style={styles.container}>
      {/* Question */}
      <Text style={styles.question}>{currentQuestion.question}</Text>

      {/* Render options based on the type of question */}
      <View style={styles.optionsContainer}>
        {currentQuestion.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedOption === option && styles.selectedOption, // Apply styles for selected option
            ]}
            onPress={() => handleAnswer(option)}
          >
            {currentQuestion.type === 'ChoiceTypeImage' ? (
              // Render image options
              <Image source={{ uri: option.display }} style={styles.optionImage} />
            ) : (
              // Render text options
              <Text style={styles.optionText}>{option.display}</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Navigation buttons */}
      <View style={styles.navigationButtons}>
        <TouchableOpacity
          onPress={handleNext} // Proceed to next question
          style={[styles.nextButton, !selectedOption && styles.disabledButton]} // Disable Next button until an option is selected
          disabled={!selectedOption} // Disable button if no option is selected
        >
          <Text style={styles.navigationText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',  // Space the content between the options and the Next button
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#e6f0e2',
    paddingBottom: 40, // Ensure space at the bottom for the Next button
  },
  question: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 15, // Reduced margin-bottom to bring options closer
    textAlign: 'center',
    marginTop: 150, // Reduced margin-top to minimize space from top
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 170, // Reduced margin-bottom to minimize space between options and Next button
  },
  optionButton: {
    margin: 5,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3
  },
  selectedOption: {
    backgroundColor: '#d3e9d3', // Highlight selected option with a light green background
  },
  optionImage: {
    width: 60,
    height: 60,
  },
  optionText: {
    width: 60,
    height: 30,
    textAlign: 'center',
    fontSize: 16,
    color: '#2d3d3a',
  },
  navigationButtons: {
    alignItems: 'center', // Center the Next button at the bottom
    width: '100%',
    paddingHorizontal: 20,
  },
  nextButton: {
    padding: 15,
    backgroundColor: '#0B3B3C',
    borderRadius: 50, // Make the Next button round
    width: '80%',  // Ensure button is appropriately sized
  },
  disabledButton: {
    backgroundColor: '#c4c4c4', // Disable the Next button with a gray color
  },
  navigationText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});

export default QuizScreen;
