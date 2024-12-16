import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

const QuizOption = ({ option, selectedOption, onSelect }) => {
  return (
    <TouchableOpacity
      style={[
        styles.optionButton,
        selectedOption === option && styles.selectedOption,
      ]}
      onPress={() => onSelect(option)}
    >
      {option.type === 'ChoiceTypeImage' ? (
        <Image source={{ uri: option.display }} style={styles.optionImage} />
      ) : (
        <Text style={styles.optionText}>{option.display}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
  },
});

export default QuizOption;
