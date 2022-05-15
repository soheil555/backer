import { Box, SimpleGrid } from "@chakra-ui/react";
import SendTip from "./SendTip";
import SubscriptionPlans from "../Creator/SubscriptionPlans";
import Card from "../../Card/Card";
interface Props {
  address: string;
}

export default function Support({ address }: Props) {
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
