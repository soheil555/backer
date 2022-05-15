import type { ReactNode } from "react";
import { Box } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar/Sidebar";
import { dashboardRoutes } from "../routes";
import DashboardNavbar from "../components/Navbars/DashboardNavbar";

interface Props {
  children: ReactNode;
}

export default function Dashboard({ children }: Props) {
  return (
    <Box>
      <DashboardNavbar />
      <Box display={{ sm: "none", lg: "block" }}>
        <Sidebar routes={dashboardRoutes} />
      </Box>
      <Box w={{ base: "100%", lg: "calc(100% - 340px)" }} float="right" p={4}>
        {children}
      </Box>
    </Box>
  );
}
