import { Box, Stat, StatLabel, StatNumber, Flex, Icon } from "@chakra-ui/react";
import { MdAccountBalanceWallet } from "react-icons/md";
import useAccountBalance from "../../hooks/useAccountBalance";
import useAppSelector from "../../hooks/useAppSelector";
import { parseBalance } from "../../utils";
import Card from "../card";

export default function Balance() {
  const { address } = useAppSelector((state) => state.web3);
  const { data } = useAccountBalance(address);

  return (
    <Card justifyContent="space-between" alignItems="center">
      <Box>
        <Stat alignItems="center">
          <StatLabel>Account Balance</StatLabel>
          <StatNumber>{parseBalance(data ?? 0)}</StatNumber>
        </Stat>
      </Box>
      <Icon as={MdAccountBalanceWallet} fontSize="5xl" />
    </Card>
  );
}
