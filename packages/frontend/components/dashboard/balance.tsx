import { Box, Stat, StatLabel, StatNumber, Flex, Icon } from "@chakra-ui/react";
import { MdAccountBalanceWallet } from "react-icons/md";
import useAccountBalance from "../../hooks/useAccountBalance";
import useAppSelector from "../../hooks/useAppSelector";
import { parseBalance } from "../../utils";

export default function Balance() {
  const { address } = useAppSelector((state) => state.web3);
  const { data } = useAccountBalance(address);

  return (
    <Flex
      justify="space-between"
      align="center"
      p={4}
      borderRadius="lg"
      minH="120px"
      bg="gray.50"
    >
      <Box>
        <Stat alignItems="center">
          <StatLabel>Account Balance</StatLabel>
          <StatNumber>{parseBalance(data ?? 0)}</StatNumber>
        </Stat>
      </Box>
      <Icon as={MdAccountBalanceWallet} fontSize="5xl" />
    </Flex>
  );
}
