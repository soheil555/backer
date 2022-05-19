import useSWR from "swr";
import { Backer } from "../contracts/backer/Backer";
import { SubscriptionPlan } from "../types/subscription-plan";
import useBackerContract from "./useBackerContract";
import useKeepSWRDataLiveAsBlocksArrive from "./useKeepSWRDataLiveAsBlocksArrive";

function getSubscriptionPlans(backer: Backer) {
  return async (_: string, creator: string) => {
    try {
      let plans = await backer.getCreatorSubscriptionPlans(creator);
      plans = [...plans].sort((a, b) =>
        a.id.toString().localeCompare(b.id.toString())
      );
      return plans as SubscriptionPlan[];
    } catch (error) {
      console.error(error);
    }
  };
}

export default function useSubscriptionPlans(
  creator: string,
  suspense = false
) {
  const backer = useBackerContract();

  const shouldFetch = !!backer;

  const result = useSWR(
    shouldFetch ? ["SubscriptionPlans", creator] : null,
    getSubscriptionPlans(backer!),
    { suspense }
  );

  useKeepSWRDataLiveAsBlocksArrive(result.mutate);
  return result;
}
