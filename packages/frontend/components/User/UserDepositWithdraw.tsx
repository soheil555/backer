import { Box, Text } from "@chakra-ui/react";
import Card from "../Card/Card";
import DepositButton from "../CustomButtons/DepositButton";
import WithdrawButton from "../CustomButtons/WithdrawButton";

export default function UserDepositWithdraw() {
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
