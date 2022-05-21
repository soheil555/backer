import type { NextPage } from "next";
import {
  Container,
  Heading,
  Text,
  Box,
  Button,
  Spinner,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import useAppSelector from "../hooks/useAppSelector";
import { useRouter } from "next/router";
import HomeNavbar from "../components/Navbars/HomeNavbar";

const Web3Button = dynamic(
  () => import("../components/CustomButtons/Web3Button"),
  {
    ssr: false,
    loading: () => (
      <Button
        isLoading
        mt={10}
        variant="outline"
        colorScheme="purple"
        size="lg"
      />
    ),
  }
);

const Home: NextPage = () => {
  const router = useRouter();

  const { web3Provider } = useAppSelector((state) => state.web3);
  useEffect(() => {
    if (web3Provider) {
      router.push("/dashboard");
    }
  }, [web3Provider]);

  if (web3Provider) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" h="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box>
      <HomeNavbar />
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
          </Box>
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
    </Box>
  );
};

export default Home;
