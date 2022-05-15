import { Box, Heading, Text, Button, ButtonGroup } from "@chakra-ui/react";
import useAppSelector from "../../hooks/useAppSelector";
import { SubscriptionPlan } from "../../types";
import { parseBalance, parsePeriod } from "../../utils";

type Props = {} & SubscriptionPlan;

export default function Plan({ id, name, amountPerPeriod, creator }: Props) {
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
      minHeight="120px"
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
          <Button colorScheme="purple">Subscribe</Button>
        )}
      </ButtonGroup>
    </Box>
  );
}
