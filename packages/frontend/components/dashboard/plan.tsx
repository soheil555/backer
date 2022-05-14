import { Box } from "@chakra-ui/react";
import { BigNumber } from "ethers";
import { SubscriptionPlan } from "../../types";

type Props = {
  period: BigNumber;
} & SubscriptionPlan;

export default function Plan({ id, name, amountPerPeriod, period }: Props) {
  return <Box></Box>;
}
