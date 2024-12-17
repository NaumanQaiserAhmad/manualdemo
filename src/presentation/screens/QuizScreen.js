import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GetQuizData from '../../domain/usecases/GetQuizData';
import Ionicons from 'react-native-vector-icons/Ionicons'; // For back arrow icon

const QuizScreen = () => {
  const navigation = useNavigation();
  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null); // Track selected option

  // Load the quiz data
  useEffect(() => {
    const fetchData = async () => {
      const data = await GetQuizData.execute();
      setQuizData(data);
    };
    fetchData();
    
    // Remove the header (action bar) for this screen
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleAnswer = (answer) => {
    setSelectedOption(answer); // Mark the selected option
  };

  const handleNext = () => {
    const updatedAnswers = [...answers, selectedOption];
    setAnswers(updatedAnswers);
    setSelectedOption(null);  // Reset the selected option for the next question

    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
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

  if (!quizData || quizData.length === 0) {
    return <Text>Loading...</Text>;
  }

  const currentQuestion = quizData[currentQuestionIndex];

  return (
    <View style={styles.container}>
      {/* Custom Header Container */}
      <View style={styles.customHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={30} color="#2d3d3a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Quiz</Text>
      </View>

      {/* Question and Options Section */}
      <View style={styles.topContainer}>
        <Text style={styles.question}>{currentQuestion.question}</Text>

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
                <Image source={{ uri: option.display }} style={styles.optionImage} />
              ) : (
                <Text style={styles.optionText}>{option.display}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Next Button */}
      <View style={styles.navigationButtons}>
        <TouchableOpacity
          onPress={handleNext}
          style={[styles.nextButton, !selectedOption && styles.disabledButton]}
          disabled={!selectedOption}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#e6f0e2',
    paddingBottom: 40,
    marginTop: 50, // Adjust for custom header
  },
  customHeader: {
    width: '100%',
    height: 50,
    backgroundColor: '#e6f0e2',
    flexDirection: 'row',
  
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
    flex: 1,
    fontFamily: 'TTNormsProRegular', // Apply your custom font here
  },
  topContainer: {
    flex: 2,
    justifyContent: 'center',  // Center content vertically
    alignItems: 'center',
    paddingTop: 70,  // Adjusted for custom header height
    paddingHorizontal: 20,
  },
  question: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    marginTop: 150,
    fontFamily: 'TTNormsProRegular', // Apply custom font
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 170,
  },
  optionButton: {
    margin: 5,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
  },
  selectedOption: {
    backgroundColor: '#d3e9d3',
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
    fontFamily: 'TTNormsProRegular', // Apply custom font
  },
  navigationButtons: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  nextButton: {
    padding: 15,
    backgroundColor: '#0B3B3C',
    borderRadius: 50,
    width: '80%',
  },
  disabledButton: {
    backgroundColor: '#c4c4c4',
  },
  navigationText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'TTNormsProRegular', // Apply custom font
  },
});

export default QuizScreen;
