import { useState, useEffect } from 'react';
import { QuizRepository } from '../repositories/QuizRepository';

export const useQuizViewModel = () => {
  const [quizData, setQuizData] = useState([]);
  const quizRepository = new QuizRepository();

  useEffect(() => {
    const fetchQuizData = async () => {
      const data = await quizRepository.getQuizData();
      setQuizData(data);
    };
    fetchQuizData();
  }, []);

  return {
    quizData,
  };
};
