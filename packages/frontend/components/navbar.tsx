import { Container, Heading, Box } from "@chakra-ui/react";

export default function Navbar() {
  return (
    <Box w="100%">
      <Container maxW="container.lg">
        <Heading p={3} fontWeight="light">
          Backer
        </Heading>
      </Container>
    </Box>
  );
}
