import type { BigNumber } from "ethers";

export interface SubscriptionPlan {
  id: BigNumber;
  name: string;
  creator: string;
  amountPerPeriod: BigNumber;
}
