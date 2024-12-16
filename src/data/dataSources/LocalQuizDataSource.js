import { Question } from '../models/Question';

class LocalQuizDataSource {
  async loadQuizData() {
    const quizData = require('../../assets/quizData.json');
    return quizData.questions.map(
      (item) => new Question(item.question, item.type, item.options)
    );
  }
}

export default new LocalQuizDataSource();
