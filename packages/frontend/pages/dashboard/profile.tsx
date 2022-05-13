import type { NextPage } from "next";
import DashboardLayout from "../../components/layout/dashboard";
import { SimpleGrid, Box, Text } from "@chakra-ui/react";
import Balance from "../../components/dashboard/balance";
import DepositButton from "../../components/dashboard/deposit-button";
import WithdrawButton from "../../components/dashboard/withdraw-button";
import UserInfo from "../../components/dashboard/user-info";

const Profile: NextPage = () => {
  return (
    <DashboardLayout>
      <UserInfo />

      <SimpleGrid minChildWidth="450px" spacing={10}>
        <Balance />

        <Box
          height="120px"
          bg="gray.50"
          display="flex"
          justifyContent="space-between"
          p={4}
          alignItems="center"
        >
          <Text fontSize={23} mr={4}>
            Deposit/Withdraw money
          </Text>
          <Box display="flex">
            <DepositButton mr={2} colorScheme="purple" variant="outline" />
            <WithdrawButton colorScheme="purple" variant="outline" />
          </Box>
        </Box>
      </SimpleGrid>
    </DashboardLayout>
  );
};

export default Profile;
