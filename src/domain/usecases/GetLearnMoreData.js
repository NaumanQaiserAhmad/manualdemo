import LearnMoreRepository from '../../data/repositories/LearnMoreRepository';

class GetLearnMoreData {
  getLearnMoreData() {
    return LearnMoreRepository.getLearnMoreData(); // Fetch data through the repository
  }
}

export default new GetLearnMoreData();
