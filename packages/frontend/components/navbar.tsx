import { Container, Heading, Box } from "@chakra-ui/react";

export default function Navbar() {
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
      </Container>
    </Box>
  );
}
