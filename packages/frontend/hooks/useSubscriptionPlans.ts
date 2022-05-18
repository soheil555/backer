import useSWR from "swr";
import { Backer } from "../contracts/backer/Backer";
import useBackerContract from "./useBackerContract";
import useKeepSWRDataLiveAsBlocksArrive from "./useKeepSWRDataLiveAsBlocksArrive";

function getSubscriptionPlans(backer: Backer) {
  return async (_: string, creator: string) => {
    try {
      return await backer.getCreatorSubscriptionPlans(creator);
    } catch (error) {
      console.log("herere error");
      console.log(error);
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
