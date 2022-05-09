import { ReactNode } from "react";
import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "../sidebar";
import { dashboardRoutes } from "../../routes";

interface Props {
  children: ReactNode;
}

export default function Dashboard({ children }: Props) {
  return (
    <Flex>
      <Box display={{ sm: "none", lg: "block" }}>
        <Sidebar routes={dashboardRoutes} />
      </Box>
      <Box>{children}</Box>
    </Flex>
  );
}
