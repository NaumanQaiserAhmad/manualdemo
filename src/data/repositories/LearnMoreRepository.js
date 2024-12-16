import LocalLearnMoreDataSource from '../dataSources/LocalLearnMoreDataSource';

class LearnMoreRepository {
  getLearnMoreData() {
    return LocalLearnMoreDataSource.getLearnMoreData(); // Fetch data from local source
  }
}

export default new LearnMoreRepository();
