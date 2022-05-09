import { Container, Heading, Box } from "@chakra-ui/react";
import dynamic from "next/dynamic";

const Web3Button = dynamic(() => import("../components/web3-button"), {
  ssr: false,
});

export default function Navbar() {
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

        <Web3Button colorScheme="purple" />
      </Container>
    </Box>
  );
}
