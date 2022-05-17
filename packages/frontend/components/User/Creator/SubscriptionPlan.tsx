import { Box, Heading, Text, Button, ButtonGroup } from "@chakra-ui/react";
import { BigNumber } from "ethers";
import useAppSelector from "../../../hooks/useAppSelector";
import { SubscriptionPlan as SubscriptionPlanType } from "../../../types/subscription-plan";
import { parseBalance, parsePeriod } from "../../../utils";
import SubscribeButton from "../../CustomButtons/SubscribeButton";
import UnsubscribeButton from "../../CustomButtons/UnsubscribeButton";

type Props = {
  currentPlanId?: BigNumber;
} & SubscriptionPlanType;

export default function SubscriptionPlan({
  id,
  name,
  amountPerPeriod,
  creator,
  currentPlanId,
}: Props) {
  const { address } = useAppSelector((state) => state.web3);
  const isCreator = address === creator;

  return (
    <Box
      bg="purple.50"
      borderRadius="lg"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={2}
      minHeight="250px"
      p={4}
    >
      <Heading fontSize={28}>{name}</Heading>
      <Text>
        {parseBalance(amountPerPeriod)} Matic / {parsePeriod()}
      </Text>

      <ButtonGroup variant="outline" spacing={6}>
        {isCreator ? (
          <Button colorScheme="red">Delete</Button>
        ) : (
          !currentPlanId && (
            <SubscribeButton
              creator={creator}
              subscriptionPlanId={id}
              colorScheme="purple"
              amountPerPeriod={amountPerPeriod}
            />
          )
        )}

        {!!currentPlanId && currentPlanId.eq(id) ? (
          <UnsubscribeButton creator={creator} colorScheme="red" />
        ) : null}
      </ButtonGroup>
    </Box>
  );
}
