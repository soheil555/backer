import DashboardLayout from "../../layouts/Dashboard";
import { Grid, GridItem } from "@chakra-ui/react";
import UserBalance from "../../components/User/UserBalance";
import UserInfo from "../../components/User/UserInfo";
import UserDepositWithdraw from "../../components/User/UserDepositWithdraw";
import { Page } from "../../types/page";
import { ReactElement } from "react";

const Dashboard: Page = () => {
  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={6}>
      <GridItem colSpan={2}>
        <UserInfo />
      </GridItem>

      <GridItem colSpan={{ sm: 2, lg: 1 }}>
        <UserBalance />
      </GridItem>

      <GridItem colSpan={{ sm: 2, lg: 1 }}>
        <UserDepositWithdraw />
      </GridItem>
    </Grid>
  );
};

Dashboard.getLayout = (page: ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default Dashboard;
