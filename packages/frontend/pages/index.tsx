import type { NextPage } from "next";
import { Container, Heading, Text, Box, Button } from "@chakra-ui/react";

const Home: NextPage = () => {
  return (
    <Container
      maxW="container.lg"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Heading fontWeight="light" mt={40} fontSize={50} textAlign="center">
        Welcome to Backer!
      </Heading>

      <Text fontSize={23} mt={5} maxW="container.md" textAlign="center">
        A decentralized platform to support your favorite creators on{" "}
        <Box as="span" color="purple.500">
          Polygon
        </Box>{" "}
        network.
      </Text>

      <Button
        mt={10}
        letterSpacing="wider"
        variant="outline"
        colorScheme="purple"
        size="lg"
        _hover={{ bg: "purple.500", color: "white" }}
      >
        Login to be a creator/supporter
      </Button>
    </Container>
  );
};

export default Home;
