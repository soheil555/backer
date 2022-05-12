import {
  Box,
  Stat,
  StatLabel,
  StatNumber,
  Flex,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import { MdAccountBalanceWallet } from "react-icons/md";
import { RepeatIcon } from "@chakra-ui/icons";

export default function Balance() {
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
          <StatNumber>$12.00</StatNumber>
          <IconButton
            size="sm"
            icon={<RepeatIcon />}
            aria-label="refresh account balance"
          ></IconButton>
        </Stat>
      </Box>
      <Icon as={MdAccountBalanceWallet} fontSize="5xl" />
    </Flex>
  );
}
