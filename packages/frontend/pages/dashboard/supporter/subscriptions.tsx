import {
  Container,
  Heading,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Spinner,
  Stat,
  StatLabel,
  StatNumber,
  Grid,
  GridItem,
  Button,
  useToast,
} from "@chakra-ui/react";
import { ReactElement } from "react";
import DashboardLayout from "../../../layouts/Dashboard";
import { Page } from "../../../types/page";
import Card from "../../../components/Card/Card";
import useAppSelector from "../../../hooks/useAppSelector";
import { calcRemainPeriods, parseBalance } from "../../../utils";
import UnsubscribeButton from "../../../components/CustomButtons/UnsubscribeButton";
import useSubscriptions from "../../../hooks/useSubscriptions";
import useBackerContract from "../../../hooks/useBackerContract";
import useCurrentPeriod from "../../../hooks/useCurrentPeriod";
import Status from "../../../components/Stat/Stat";
import StatTitle from "../../../components/Stat/StatTitle";
import StatText from "../../../components/Stat/StatText";

const Subscriptions: Page = () => {
  const { data: currentPeriod } = useCurrentPeriod();
  const toast = useToast();
  const { address } = useAppSelector((state) => state.web3);
  const backer = useBackerContract();
  const { data: subscriptions } = useSubscriptions(address);

  const handleRemoveExpiredSubscriptions = () => {
    if (backer && address) {
      (async () => {
        try {
          await backer.removeExpiredSubscriptions(address);
          toast({
            title: "Remove Expired subscriptions",
            description:
              "removed successfully. please wait for tx confirmation",
            status: "success",
            isClosable: true,
            duration: 5000,
          });
        } catch (error) {
          console.error(error);
          toast({
            title: "Remove Expired subscriptions",
            description: "failed to remove",
            status: "error",
            isClosable: true,
            duration: 5000,
          });
        }
      })();
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
      <Heading fontWeight="light">Your subscriptions</Heading>

      <Grid w="100%" templateColumns="repeat(1,1fr)" gap={4} mb={2}>
        <GridItem colSpan={{ sm: 1 }}>
          <Card alignItems="center" minH="90px">
            <Stat>
              <StatLabel>Number of subscriptions</StatLabel>
              <StatNumber>{subscriptions?.length}</StatNumber>
            </Stat>

            <Button
              onClick={handleRemoveExpiredSubscriptions}
              colorScheme="purple"
              variant="outline"
            >
              Remove expired subscriptions
            </Button>
          </Card>
        </GridItem>
      </Grid>

      {subscriptions ? (
        subscriptions.length ? (
          <Box w="100%">
            <Accordion allowToggle height="600px" pr={2} overflowY="scroll">
              {subscriptions.map((subscription, i) => {
                return (
                  <AccordionItem key={i}>
                    <h2>
                      <AccordionButton>
                        <Box flex="1" textAlign="left">
                          {subscription.subscriptionPlan.creator}
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Box>
                          <Status>
                            <StatTitle>Subscription plan:</StatTitle>
                            <StatText>
                              {subscription.subscriptionPlan.name}
                            </StatText>
                          </Status>

                          <Status>
                            <StatTitle>
                              Amount you would pay to the creator each period:
                            </StatTitle>
                            <StatText>
                              {parseBalance(
                                subscription.subscriptionPlan.amountPerPeriod
                              )}{" "}
                              Matic
                            </StatText>
                          </Status>

                          <Status>
                            <StatTitle>Number of remaining periods:</StatTitle>
                            <StatText>
                              {calcRemainPeriods(
                                subscription.afterLastPeriod,
                                currentPeriod
                              ).toString()}
                            </StatText>
                          </Status>
                        </Box>

                        <UnsubscribeButton
                          creator={subscription.subscriptionPlan.creator}
                          colorScheme="red"
                          variant="outline"
                        />
                      </Box>
                    </AccordionPanel>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </Box>
        ) : (
          <Heading fontWeight="light" color="gray.500">
            There is no subscription
          </Heading>
        )
      ) : (
        <Spinner size="xl" />
      )}
    </Container>
  );
};

Subscriptions.getLayout = (page: ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Subscriptions;
