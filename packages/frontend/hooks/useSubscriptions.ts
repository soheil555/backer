import useSWR from "swr";
import { Backer } from "../contracts/backer/Backer";
import { Subscription } from "../types/subscription";
import useBackerContract from "./useBackerContract";
import useKeepSWRDataLiveAsBlocksArrive from "./useKeepSWRDataLiveAsBlocksArrive";

function getSubscriptions(backer: Backer) {
  return async (_: string, supporter: string) => {
    return (await backer.getSupporterSubscriptions(
      supporter
    )) as Subscription[];
  };
}

export default function useSubscriptions(supporter?: string, suspense = false) {
  const backer = useBackerContract();

  const shouldFetch = !!backer && typeof supporter === "string";

  const result = useSWR(
    shouldFetch ? ["Subscriptions", supporter] : null,
    getSubscriptions(backer!),
    { suspense }
  );

  useKeepSWRDataLiveAsBlocksArrive(result.mutate);
  return result;
}
