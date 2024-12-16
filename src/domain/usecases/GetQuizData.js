import QuizRepository from '../../data/repositories/QuizRepository';

class GetQuizData {
  async execute() {
    return await QuizRepository.getQuizData();
  }
}

export default new GetQuizData();
