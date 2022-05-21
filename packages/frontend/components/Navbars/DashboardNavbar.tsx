import {
  Container,
  Heading,
  Box,
  useDisclosure,
  IconButton,
  Button,
} from "@chakra-ui/react";
import { SidebarResponsive } from "../Sidebar/Sidebar";
import { dashboardRoutes } from "../../routes";
import { HamburgerIcon } from "@chakra-ui/icons";
import dynamic from "next/dynamic";
import useCurrentPeriod from "../../hooks/useCurrentPeriod";
import { parsePeriod } from "../../utils";
import Status from "../../components/Stat/Stat";
import StatTitle from "../../components/Stat/StatTitle";
import StatText from "../../components/Stat/StatText";

const Web3Button = dynamic(() => import("../CustomButtons/Web3Button"), {
  ssr: false,
  loading: () => <Button isLoading variant="outline" colorScheme="purple" />,
});

export default function DashboardNavbar() {
  const { data: currentPeriod } = useCurrentPeriod();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box w="100%" h="5rem">
      <Container
        maxW="container.lg"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Heading p={3} fontWeight="light">
          Backer
        </Heading>

        <Box>
          <Status>
            <StatTitle>Period:</StatTitle>
            <StatText>{parsePeriod()}</StatText>
          </Status>

          <Status>
            <StatTitle>Current Period:</StatTitle>
            <StatText>{currentPeriod ? currentPeriod.toString() : 0}</StatText>
          </Status>
        </Box>

        <Box>
          <Web3Button colorScheme="purple" />

          <IconButton
            aria-label="toggle sidebar"
            icon={<HamburgerIcon />}
            onClick={onOpen}
            display={{ lg: "none" }}
            colorScheme="purple"
            variant="outline"
            ml={2}
          ></IconButton>

          <SidebarResponsive
            isOpen={isOpen}
            onClose={onClose}
            routes={dashboardRoutes}
          />
        </Box>
      </Container>
    </Box>
  );
}
