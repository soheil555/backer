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
  Text,
  Stat,
  StatLabel,
  StatNumber,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { ReactElement } from "react";
import DashboardLayout from "../../../layouts/Dashboard";
import { Page } from "../../../types/page";
import Card from "../../../components/Card/Card";
import useAppSelector from "../../../hooks/useAppSelector";
import { parseBalance } from "../../../utils";
import UnsubscribeButton from "../../../components/CustomButtons/UnsubscribeButton";
import useSubscriptions from "../../../hooks/useSubscriptions";

const Subscriptions: Page = () => {
  const { address } = useAppSelector((state) => state.web3);
  const { data: subscriptions } = useSubscriptions(address);

  return (
    <Container
      maxW="container.lg"
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={10}
    >
      <Heading fontWeight="light">Your subscriptions</Heading>

      <Grid w="100%" templateColumns="repeat(3,1fr)" gap={4} mb={2}>
        <GridItem colSpan={{ sm: 3, lg: 1 }}>
          <Card alignItems="center" minH="90px">
            <Stat>
              <StatLabel>Number of subscriptions</StatLabel>
              <StatNumber>{subscriptions?.length}</StatNumber>
            </Stat>
          </Card>
        </GridItem>
      </Grid>

      {subscriptions ? (
        subscriptions.length ? (
          <Box w="100%">
            <Accordion allowToggle height="600px" pr={2} overflowY="scroll">
              {subscriptions.map((subscription) => {
                return (
                  <AccordionItem>
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
                          <Text>
                            subscription plan :{" "}
                            {subscription.subscriptionPlan.name}
                          </Text>

                          <Text>
                            Amount you pays to the creator each period:{" "}
                            {parseBalance(
                              subscription.subscriptionPlan.amountPerPeriod
                            )}
                          </Text>

                          <Text>
                            After last period:{" "}
                            {subscription.afterLastPeriod.toString()}
                          </Text>
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
