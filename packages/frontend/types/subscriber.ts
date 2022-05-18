import { BigNumber } from "ethers";

export type Subscriber = {
  supporter: string;
  subscriptionPlanId: BigNumber;
  afterLastPeriod: BigNumber;
};
