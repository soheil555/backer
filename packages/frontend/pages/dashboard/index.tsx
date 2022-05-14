import type { NextPage } from "next";
import DashboardLayout from "../../components/layout/dashboard";
import { SimpleGrid } from "@chakra-ui/react";
import Balance from "../../components/dashboard/balance";
import UserInfo from "../../components/dashboard/user-info";
import DepositWithdraw from "../../components/dashboard/deposit-withdraw";

const Dashboard: NextPage = () => {
  return (
    <DashboardLayout>
      <UserInfo />

      <SimpleGrid minChildWidth="450px" spacing={10}>
        <Balance />
        <DepositWithdraw />
      </SimpleGrid>
    </DashboardLayout>
  );
};

export default Dashboard;
