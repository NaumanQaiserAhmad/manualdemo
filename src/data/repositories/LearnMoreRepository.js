import { LearnMoreModel } from '../models/LearnMoreModel';

export class LearnMoreRepository {
  async getLearnMoreData() {
    return [
      new LearnMoreModel("HAIR LOSS", "We're working around the clock to bring you a holistic approach to your wellness."),
      new LearnMoreModel("ERECTILE DYSFUNCTION", "We're working around the clock to bring you a holistic approach to your wellness."),
    ];
  }
}
