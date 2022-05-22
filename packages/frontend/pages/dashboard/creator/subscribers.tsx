import { Page } from "../../../types/page";
import { ReactElement } from "react";
import DashboardLayout from "../../../layouts/Dashboard";
import {
  Box,
  Container,
  Heading,
  Accordion,
  Spinner,
  Stat,
  StatLabel,
  StatNumber,
  Grid,
  GridItem,
  Button,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import useBackerContract from "../../../hooks/useBackerContract";
import useAppSelector from "../../../hooks/useAppSelector";
import Card from "../../../components/Card/Card";
import useCreatorPayment from "../../../hooks/useCreatorPayment";
import { parseBalance } from "../../../utils";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import useSubscribers from "../../../hooks/useSubscribers";
import Subscriber from "../../../components/User/Creator/Subscriber";

const Subscribers: Page = () => {
  const toast = useToast();
  const backer = useBackerContract();
  const { web3Provider, address } = useAppSelector((state) => state.web3);
  const { data: creatorPayment } = useCreatorPayment(address);
  const { data: subscribers } = useSubscribers(address);

  const handleRemoveExpiredSubscribers = () => {
    if (backer && web3Provider && address) {
      (async () => {
        try {
          await backer.removeExpiredSubscribers(address);
          toast({
            title: "Remove Expired subscribers",
            description:
              "removed successfully. please wait for tx confirmation",
            status: "success",
            isClosable: true,
            duration: 5000,
          });
        } catch (error) {
          console.error(error);
          toast({
            title: "Remove Expired subscribers",
            description: "failed to remove",
            status: "error",
            isClosable: true,
            duration: 5000,
          });
        }
      })();
    }
  };

  const handleClaim = async () => {
    if (backer && web3Provider && address) {
      try {
        const signer = web3Provider.getSigner(address);
        await backer.connect(signer).claimCreatorPayment();

        toast({
          title: "Claim payment",
          description:
            "claimed payment successfully. please wait for tx confirmation",
          status: "success",
          isClosable: true,
          duration: 5000,
        });
      } catch (error) {
        console.error(error);

        toast({
          title: "Claim payment",
          description: "Failed to claim payment",
          status: "error",
          isClosable: true,
          duration: 5000,
        });
      }
    }
  };

  return (
    <Container
      maxW="container.lg"
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={10}
    >
      <Heading fontWeight="light">Subscribers</Heading>

      <Grid w="100%" templateColumns="repeat(4,1fr)" gap={4} mb={2}>
        <GridItem colSpan={{ sm: 4, lg: 2 }}>
          <Card
            flexWrap="wrap"
            gap={2}
            alignItems="center"
            justifyContent="center"
            minH="90px"
          >
            <Stat minW="40%">
              <StatLabel>Number of subscribers</StatLabel>
              <StatNumber>{subscribers?.length}</StatNumber>
            </Stat>

            <Button
              onClick={handleRemoveExpiredSubscribers}
              colorScheme="purple"
              variant="outline"
            >
              Remove expired subscribers
            </Button>
          </Card>
        </GridItem>

        <GridItem colSpan={{ sm: 4, lg: 2 }}>
          <Card alignItems="center" minH="90px">
            <Stat>
              <StatLabel>Creator Payment</StatLabel>
              <StatNumber>
                {creatorPayment ? parseBalance(creatorPayment) : 0}
              </StatNumber>
            </Stat>

            <Box display="flex" alignItems="center" gap={2}>
              <Tooltip
                hasArrow
                label="move entire payment to your account balance. High transaction fee"
              >
                <InfoOutlineIcon />
              </Tooltip>

              <Button
                onClick={handleClaim}
                colorScheme="purple"
                variant="outline"
                isDisabled={!creatorPayment || creatorPayment.isZero()}
              >
                Claim
              </Button>
            </Box>
          </Card>
        </GridItem>
      </Grid>

      {subscribers ? (
        subscribers.length ? (
          <Box w="100%">
            <Accordion allowToggle height="600px" pr={2} overflowY="scroll">
              {subscribers.map((subscriber, i) => {
                return <Subscriber key={i} subscriber={subscriber} />;
              })}
            </Accordion>
          </Box>
        ) : (
          <Heading fontWeight="light" color="gray.500">
            There is no subscriber
          </Heading>
        )
      ) : (
        <Spinner size="xl" />
      )}
    </Container>
  );
};

Subscribers.getLayout = (page: ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);
export default Subscribers;
