import { BigNumber } from "ethers";
import { SubscriptionPlan } from "./subscription-plan";

export type Subscription = {
  afterLastPeriod: BigNumber;
  initialized: boolean;
  subscriptionPlan: SubscriptionPlan;
};
