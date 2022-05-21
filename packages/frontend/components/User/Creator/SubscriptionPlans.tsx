import { Heading, SimpleGrid, Spinner } from "@chakra-ui/react";
import useBackerContract from "../../../hooks/useBackerContract";
import { useEffect, useState } from "react";
import useAppSelector from "../../../hooks/useAppSelector";
import SubscriptionPlanComponent from "./SubscriptionPlan";
import Card from "../../Card/Card";
import { BigNumber } from "ethers";
import useSubscriptionPlans from "../../../hooks/useSubscriptionPlans";

interface Props {
  creator: string;
}

export default function SubscriptionPlans({ creator }: Props) {
  const { web3Provider, address } = useAppSelector((state) => state.web3);
  const backer = useBackerContract();
  const [currentPlanId, setCurrentPlanId] = useState<BigNumber>();
  const { data: plans } = useSubscriptionPlans(creator);

  useEffect(() => {
    if (web3Provider && backer && address) {
      (async () => {
        try {
          const currentPlan = await backer.getSupporterCreatorSubscription(
            address,
            creator
          );

          if (currentPlan.initialized) {
            setCurrentPlanId(currentPlan.subscriptionPlan.id);
          } else {
            setCurrentPlanId(undefined);
          }
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, [web3Provider, backer, plans]);

  return (
    <Card
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      w="100%"
      height="400px"
    >
      {plans ? (
        <SimpleGrid
          minChildWidth="250px"
          width="100%"
          height="100%"
          overflowY="scroll"
          spacing={10}
          pr={4}
        >
          {plans.length > 0 ? (
            plans.map((plan, i) => (
              <SubscriptionPlanComponent
                id={plan.id}
                name={plan.name}
                amountPerPeriod={plan.amountPerPeriod}
                creator={creator}
                currentPlanId={currentPlanId}
                key={i}
              />
            ))
          ) : (
            <Heading color="gray.500">
              No subscription plan is available.
            </Heading>
          )}
        </SimpleGrid>
      ) : (
        <Spinner size="xl" />
      )}
    </Card>
  );
}
