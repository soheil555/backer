import DashboardLayout from "../../components/layout/dashboard";
import { SimpleGrid, Box } from "@chakra-ui/react";
import Balance from "../../components/dashboard/balance";
import UserInfo from "../../components/dashboard/user-info";
import DepositWithdraw from "../../components/dashboard/deposit-withdraw";
import { Page } from "../../types/page";
import { ReactElement } from "react";

const Dashboard: Page = () => {
  return (
    <Box>
      <UserInfo />

      <SimpleGrid minChildWidth="450px" spacing={10}>
        <Balance />
        <DepositWithdraw />
      </SimpleGrid>
    </Box>
  );
};

Dashboard.getLayout = (page: ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default Dashboard;
