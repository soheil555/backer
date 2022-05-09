import { NextPage } from "next";
import { Box } from "@chakra-ui/react";
import Sidebar from "../components/sidebar";
import { dashboardRoutes } from "../routes";

const Dashboard: NextPage = () => {
  return (
    <Box>
      <Box display={{ sm: "none", lg: "block" }}>
        <Sidebar routes={dashboardRoutes} />
      </Box>
    </Box>
  );
};

export default Dashboard;
