import { Box, Text } from "@chakra-ui/react";
import Card from "../card";
import DepositButton from "./deposit-button";
import WithdrawButton from "./withdraw-button";

export default function DepositWithdraw() {
  return (
    <Card justifyContent="space-between" alignItems="center">
      <Text fontSize={23} mr={4}>
        Deposit/Withdraw money
      </Text>
      <Box display="flex">
        <DepositButton mr={2} colorScheme="purple" variant="outline" />
        <WithdrawButton colorScheme="purple" variant="outline" />
      </Box>
    </Card>
  );
}
