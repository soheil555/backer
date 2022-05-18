import { Page } from "../../../types/page";
import { ReactElement, useEffect, useState } from "react";
import DashboardLayout from "../../../layouts/Dashboard";
import {
  Box,
  Container,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Spinner,
  VStack,
  Text,
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
import { Subscriber } from "../../../types/subscriber";
import Card from "../../../components/Card/Card";
import useCreatorPayment from "../../../hooks/useCreatorPayment";
import { parseBalance } from "../../../utils";

const Subscribers: Page = () => {
  const toast = useToast();
  const backer = useBackerContract();
  const { web3Provider, address } = useAppSelector((state) => state.web3);
  const [subscribers, setSubscribers] = useState<Subscriber[]>();
  const { data: creatorPayment } = useCreatorPayment(address);

  console.log("creatorPayment", creatorPayment);

  useEffect(() => {
    if (backer && web3Provider && address) {
      (async () => {
        const subscribers = await backer.getCreatorSubscribers(address);
        setSubscribers(subscribers);
      })();
    }
  }, [backer, web3Provider, address]);

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

      <Grid w="100%" templateColumns="repeat(3,1fr)" gap={4} mb={2}>
        <GridItem colSpan={{ sm: 3, lg: 1 }}>
          <Card alignItems="center" minH="90px">
            <Stat>
              <StatLabel>Number of subscribers</StatLabel>
              <StatNumber>{subscribers?.length}</StatNumber>
            </Stat>
          </Card>
        </GridItem>

        <GridItem colSpan={{ sm: 3, lg: 2 }}>
          <Card alignItems="center" minH="90px">
            <Stat>
              <StatLabel>Creator Payment</StatLabel>
              <StatNumber>
                {creatorPayment ? parseBalance(creatorPayment) : 0}
              </StatNumber>
            </Stat>

            <Tooltip
              hasArrow
              label="move entire payment to your account balance"
            >
              <Button
                onClick={handleClaim}
                colorScheme="purple"
                variant="outline"
                isDisabled={!creatorPayment || creatorPayment.isZero()}
              >
                Claim
              </Button>
            </Tooltip>
          </Card>
        </GridItem>
      </Grid>

      {subscribers ? (
        subscribers.length ? (
          <Box w="100%">
            <Accordion allowToggle height="600px" pr={2} overflowY="scroll">
              {subscribers.map((subscriber) => {
                return (
                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box flex="1" textAlign="left">
                          {subscriber.supporter}
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <VStack align="stretch" spacing={2}>
                        <Text>
                          Subscription plan id:{" "}
                          {subscriber.subscriptionPlanId.toString()}
                        </Text>

                        <Text>
                          After last period:{" "}
                          {subscriber.afterLastPeriod.toString()}
                        </Text>
                      </VStack>
                    </AccordionPanel>
                  </AccordionItem>
                );
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
