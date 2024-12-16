import LocalQuizDataSource from '../dataSources/LocalQuizDataSource';

class QuizRepository {
  async getQuizData() {
    return await LocalQuizDataSource.loadQuizData();
  }
}

export default new QuizRepository();
