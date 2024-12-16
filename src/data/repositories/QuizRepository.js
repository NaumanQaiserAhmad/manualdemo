import { QuizModel } from '../models/QuizModel';
import axios from 'axios';

export class QuizRepository {
  async getQuizData() {
    try {
      const response = await axios.get('path_to_your_quiz_json_file');  // Replace with actual path
      const quizData = response.data.questions.map((question) => new QuizModel(question.question, question.options));
      return quizData;
    } catch (error) {
      console.error("Error fetching quiz data:", error);
      return [];
    }
  }
}
