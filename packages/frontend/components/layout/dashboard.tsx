import { ReactNode } from "react";
import { Box } from "@chakra-ui/react";
import Sidebar from "../sidebar";
import { dashboardRoutes } from "../../routes";

interface Props {
  children: ReactNode;
}

export default function Dashboard({ children }: Props) {
  return (
    <Box>
      <Box display={{ sm: "none", lg: "block" }}>
        <Sidebar routes={dashboardRoutes} />
      </Box>
      <Box w={{ base: "100%", lg: "calc(100% - 340px)" }} float="right" p={4}>
        {children}
      </Box>
    </Box>
  );
}
