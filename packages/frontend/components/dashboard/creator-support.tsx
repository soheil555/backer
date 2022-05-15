import { Box, SimpleGrid } from "@chakra-ui/react";
import SendTip from "./send-tip";
import SubscriptionPlans from "../../components/dashboard/subscription-plans";
import Card from "../card";
interface Props {
  address: string;
}

export default function CreatorSupport({ address }: Props) {
  if (address.length === 0) return null;

  return (
    <SimpleGrid mt={10} minChildWidth="400px" spacing={10}>
      <Card>
        <SubscriptionPlans creator={address} />
      </Card>

      <SendTip address={address} />
    </SimpleGrid>
  );
}
