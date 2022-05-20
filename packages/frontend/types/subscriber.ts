import { BigNumber } from "ethers";
import { SubscriptionPlan } from "./subscription-plan";

export type Subscriber = {
  supporter: string;
  subscriptionPlan: SubscriptionPlan;
  afterLastPeriod: BigNumber;
};
