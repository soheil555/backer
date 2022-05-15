import DashboardLayout from "../../layouts/Dashboard";
import { SimpleGrid, Box } from "@chakra-ui/react";
import UserBalance from "../../components/User/UserBalance";
import UserInfo from "../../components/User/UserInfo";
import UserDepositWithdraw from "../../components/User/UserDepositWithdraw";
import { Page } from "../../types/page";
import { ReactElement } from "react";

const Dashboard: Page = () => {
  return (
    <Box>
      <UserInfo />

      <SimpleGrid minChildWidth="450px" spacing={10}>
        <UserBalance />
        <UserDepositWithdraw />
      </SimpleGrid>
    </Box>
  );
};

Dashboard.getLayout = (page: ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default Dashboard;
