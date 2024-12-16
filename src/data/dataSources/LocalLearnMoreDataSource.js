import { LearnMoreData } from '../models/LearnMoreData';

class LocalLearnMoreDataSource {
  getLearnMoreData() {
    const data = require('../../assets/learnMoreData.json').data;
    return data.map(item => new LearnMoreData(item.id, item.assetID, item.title, item.header, item.subtitle));
  }
}

export default new LocalLearnMoreDataSource();
