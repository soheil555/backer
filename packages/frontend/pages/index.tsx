import type { NextPage } from "next";
import { Container, Heading, Text, Box } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useAppSelector } from "../redux/hooks";
import { useRouter } from "next/router";

const Web3Button = dynamic(() => import("../components/web3-button"), {
  ssr: false,
});

const Home: NextPage = () => {
  const router = useRouter();

  const { web3Provider } = useAppSelector((state) => state.web3);
  useEffect(() => {
    if (web3Provider) {
      router.push("/dashboard");
    }
  }, [web3Provider]);

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

      <Web3Button
        mt={10}
        letterSpacing="wider"
        variant="outline"
        colorScheme="purple"
        size="lg"
        _hover={{ bg: "purple.500", color: "white" }}
        disconnectedMessage="Connect Wallet to be a creator/supporter"
      />
    </Container>
  );
};

export default Home;
