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

interface Props {
  creator: string;
}

export default function SubscriptionPlans({ creator }: Props) {
  const toast = useToast();
  const { web3Provider } = useAppSelector((state) => state.web3);
  const backer = useBackerContract();
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    if (web3Provider && backer) {
      backer
        .getCreatorSubscriptionPlans(creator)
        .then((plans) => {
          setPlans(plans);
        })
        .catch(() => {
          toast({
            title: "Plans",
            description: "Faild to fetch user subscription plans",
            status: "error",
            isClosable: true,
            duration: 5000,
          });
        });
    }
  }, [web3Provider, backer, refresh]);

  return (
    <Box w="100%">
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box mb={4} display="flex" alignItems="center" gap={3}>
          <Heading fontWeight="light">Subscription plans</Heading>

          <IconButton
            colorScheme="purple"
            variant="outline"
            aria-label="refresh plans"
            icon={<RepeatIcon />}
            _hover={{ color: "white", bg: "purple.500" }}
            onClick={() => setRefresh(!refresh)}
          />
        </Box>

        <Box w="70%">
          <Card flexDirection="column" height="400px" overflowY="scroll">
            <SimpleGrid minChildWidth="250px" spacing={10}>
              {plans.length > 0 ? (
                plans.map((plan) => (
                  <SubscriptionPlanComponent
                    id={plan.id}
                    name={plan.name}
                    amountPerPeriod={plan.amountPerPeriod}
                    creator={creator}
                  />
                ))
              ) : (
                <Heading color="gray.500">
                  No subscription plan is available.
                </Heading>
              )}
            </SimpleGrid>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
