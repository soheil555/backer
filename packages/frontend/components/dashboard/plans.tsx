import { SubscriptionPlan } from "../../types";
import { Heading, SimpleGrid } from "@chakra-ui/react";
import Card from "../card";
import Plan from "./plan";

interface Props {
  plans: SubscriptionPlan[];
  creator: string;
}

export default function Plans({ plans, creator }: Props) {
  return (
    <Card flexDirection="column" height="400px" overflowY="scroll">
      <SimpleGrid minChildWidth="250px" spacing={10}>
        {plans.length > 0 ? (
          plans.map((plan) => (
            <Plan
              id={plan.id}
              name={plan.name}
              amountPerPeriod={plan.amountPerPeriod}
              creator={creator}
            />
          ))
        ) : (
          <Heading color="gray.500">You have no subscription plan.</Heading>
        )}
      </SimpleGrid>
    </Card>
  );
}
