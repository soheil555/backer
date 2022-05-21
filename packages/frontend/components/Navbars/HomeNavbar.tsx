import { Container, Heading, Box } from "@chakra-ui/react";
import { MaticLogo } from "../Icons/Icons";

export default function HomeNavbar() {
  return (
    <Box w="100%" h="5rem">
      <Container
        maxW="container.lg"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box display="flex" alignItems="center">
          <MaticLogo fontSize="xl" />
          <Heading p={3} fontWeight="light">
            Backer
          </Heading>
        </Box>
      </Container>
    </Box>
  );
}
