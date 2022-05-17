import {
  Box,
  useToast,
  Heading,
  IconButton,
  SimpleGrid,
} from "@chakra-ui/react";
import useBackerContract from "../../../hooks/useBackerContract";
import { useEffect, useState } from "react";
import useAppSelector from "../../../hooks/useAppSelector";
import type { SubscriptionPlan } from "../../../types/subscription-plan";
import { RepeatIcon } from "@chakra-ui/icons";
import SubscriptionPlanComponent from "./SubscriptionPlan";
import Card from "../../Card/Card";
import { BigNumber } from "ethers";

interface Props {
  creator: string;
}

export default function SubscriptionPlans({ creator }: Props) {
  const toast = useToast();
  const { web3Provider, address } = useAppSelector((state) => state.web3);
  const backer = useBackerContract();
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [currentPlanId, setCurrentPlanId] = useState<BigNumber>();

  useEffect(() => {
    if (web3Provider && backer && address) {
      (async () => {
        try {
          const plans = await backer.getCreatorSubscriptionPlans(creator);
          const currentPlan = await backer.getSupporterCreatorSubscription(
            address,
            creator
          );

          if (currentPlan.initialized) {
            setCurrentPlanId(currentPlan.subscriptionPlan.id);
          }
          setPlans(plans);
        } catch (error) {
          console.error(error);

          toast({
            title: "Plans",
            description: "Faild to fetch user subscription plans",
            status: "error",
            isClosable: true,
            duration: 5000,
          });
        }
      })();
    }
  }, [web3Provider, backer, refresh]);

  return (
    <Card flexDirection="column" w="100%">
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <IconButton
          onClick={() => setRefresh(!refresh)}
          aria-label="refresh"
          icon={<RepeatIcon />}
        />
      </Box>

      <SimpleGrid
        minChildWidth="250px"
        height="400px"
        overflowY="scroll"
        spacing={10}
        pr={4}
      >
        {plans.length > 0 ? (
          plans.map((plan) => (
            <SubscriptionPlanComponent
              id={plan.id}
              name={plan.name}
              amountPerPeriod={plan.amountPerPeriod}
              creator={creator}
              currentPlanId={currentPlanId}
            />
          ))
        ) : (
          <Heading color="gray.500">No subscription plan is available.</Heading>
        )}
      </SimpleGrid>
    </Card>
  );
}
