import {
  Container,
  Heading,
  Box,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";
import { SidebarResponsive } from "./sidebar";
import { dashboardRoutes } from "../routes";
import { HamburgerIcon } from "@chakra-ui/icons";

// import dynamic from "next/dynamic";

// const Web3Button = dynamic(() => import("../components/web3-button"), {
//   ssr: false,
// });

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box w="100%">
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
          {/* <Web3Button colorScheme="purple" /> */}

          <IconButton
            aria-label="toggle sidebar"
            icon={<HamburgerIcon />}
            onClick={onOpen}
            display={{ lg: "none" }}
            colorScheme="purple"
            variant="outline"
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
