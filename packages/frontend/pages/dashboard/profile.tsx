import type { NextPage } from "next";
import DashboardLayout from "../../components/layout/dashboard";
import { SimpleGrid, Box } from "@chakra-ui/react";
import Balance from "../../components/dashboard/balance";
import DepositButton from "../../components/dashboard/deposit-button";

const Profile: NextPage = () => {
  return (
    <DashboardLayout>
      <SimpleGrid minChildWidth="400px" spacing={10}>
        <Balance />

        <Box bg="tomato" height="80px">
          <DepositButton />
        </Box>
        <Box bg="tomato" height="80px"></Box>
        <Box bg="tomato" height="80px"></Box>
        <Box bg="tomato" height="80px"></Box>
      </SimpleGrid>
    </DashboardLayout>
  );
};

export default Profile;
